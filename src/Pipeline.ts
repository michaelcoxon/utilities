import { ILogger } from './Logging/_types';
import InvalidOperationException from './Exceptions/InvalidOperationException';
import { isContext } from 'node:vm';
import { isUndefinedOrNull } from './TypeHelpers';

export interface IContext<T = any, TPrevious extends any = undefined>
{
    readonly frame: string;
    readonly data: T;
    readonly previous?: IContext<TPrevious>;
}

export interface IPipelineTask
{
    readonly name: string;
    executeAsync<TContext>(context: TContext, next?: IPipelineTask): Promise<void>;
}

export interface IPipelineTaskQueue
{
    then<TPipelineTask extends IPipelineTask>(task: TPipelineTask): IPipelineTaskQueue;
}

export default class Pipeline implements IPipelineTaskQueue
{
    private readonly _logger: ILogger;
    private readonly _queue: IPipelineTask[];

    constructor(logger: ILogger)
    {
        this._logger = logger;
        this._queue = [];
    }

    public start<TPipelineTask extends IPipelineTask>(task: TPipelineTask): IPipelineTaskQueue
    {
        this._queue.push(task);
        return this;
    }

    public then<TPipelineTask extends IPipelineTask>(task: TPipelineTask): IPipelineTaskQueue
    {
        this._queue.push(task);
        return this;
    }

    public async executeAsync<TContext extends IContext<T, TPrevious>, T = any, TPrevious extends any = undefined>(context: TContext): Promise<void>
    {
        let next = this._queue.pop();
        let curr = this._queue.pop();

        if (isUndefinedOrNull(curr))
        {
            if (isUndefinedOrNull(next))
            {
                return;
            }

            curr = next;
            next = undefined;
        }

        const tasks: { name: string; promise: (ctx: TContext) => Promise<void>; }[] = [];

        do
        {
            tasks.push({ name: curr.name, promise: (ctx) => curr.executeAsync(ctx, next) });
            next = curr;
        }
        while (curr = this._queue.pop());

        let _ctx = context;

        for (const task of tasks)
        {
            const newCtx: TContext = { ..._ctx, previous: _ctx, frame:task.name };
            await task.promise(newCtx);
            _ctx = newCtx;
        }

        context = _ctx;
    }
}