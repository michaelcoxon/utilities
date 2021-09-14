import { ILogger } from './Logging/_types';
import isUndefinedOrNull from './TypeHelpers/isUndefinedOrNull';

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
    readonly #logger: ILogger;
    readonly #queue: IPipelineTask[];

    constructor(logger: ILogger)
    {
        this.#logger = logger;
        this.#queue = [];
    }

    public start<TPipelineTask extends IPipelineTask>(task: TPipelineTask): IPipelineTaskQueue
    {
        this.#queue.push(task);
        return this;
    }

    public then<TPipelineTask extends IPipelineTask>(task: TPipelineTask): IPipelineTaskQueue
    {
        this.#queue.push(task);
        return this;
    }

    public async executeAsync<TContext extends IContext<T, TPrevious>, T = any, TPrevious extends any = undefined>(context: TContext): Promise<void>
    {
        let next = this.#queue.pop();
        let curr = this.#queue.pop();

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
            tasks.push({
                name: curr?.name,
                promise: async (ctx) => await curr?.executeAsync(ctx, next)
            });
            next = curr;
        }
        while ((curr = this.#queue.pop()));

        let _ctx = context;

        for (const task of tasks)
        {
            const newCtx: TContext = { ..._ctx, previous: _ctx, frame: task.name };
            await task.promise(newCtx);
            _ctx = newCtx;
        }

        context = _ctx;
    }
}