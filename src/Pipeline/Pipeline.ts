import { ILogger } from '../Logging/_types';
import { isFunction } from '../TypeHelpers';
import isUndefinedOrNull from '../TypeHelpers/isUndefinedOrNull';
import { IPipelineTaskQueue, IPipelineTask, IContext } from './_types';

export default class Pipeline implements IPipelineTaskQueue
{
    readonly #logger: ILogger;
    readonly #queue: IPipelineTask[];

    constructor(logger: ILogger)
    {
        this.#logger = logger.scope('Pipeline');
        this.#queue = [];
    }

    public start<T>(task: IPipelineTask | ((context: IContext<T>) => Promise<void>)): this
    {
        if (isFunction(task))
        {
            const pTask: IPipelineTask = {
                name: task.toString(),
                async executeAsync<T1 = T>(context: IContext<T1>)
                {
                    await task(context);
                }
            };

            this.#queue.push(pTask);
        }
        else
        {
            this.#queue.push(task as IPipelineTask);
        }

        return this;
    }

    public then<T>(task: IPipelineTask | ((context: IContext<T>) => Promise<void>)): this
    {
        if (isFunction(task))
        {
            const pTask: IPipelineTask = {
                name: task.toString(),
                async executeAsync<T1 = T>(context: IContext<T1>)
                {
                    await task(context);
                }
            };

            this.#queue.push(pTask);
        }
        else
        {
            this.#queue.push(task as IPipelineTask);
        }

        return this;
    }

    public async executeAsync<T>(context: IContext<T>): Promise<void>
    {
        const queue = [...this.#queue];
        const logger = this.#logger.scope('Execute');

        logger.debug(`Starting Pipeline`);

        while (queue.length > 0)        
        {
            const curr = queue.shift();
            if (!isUndefinedOrNull(curr))
            {
                logger.debug(`Executing ${curr.name}`);

                await curr.executeAsync(context);

                logger.debug(`Completed ${curr.name}`);
            }
        }

        logger.debug(`Finished Pipeline`);
    }
}