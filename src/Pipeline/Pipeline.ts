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
        this.#logger = logger;
        this.#queue = [];
    }

    public start(task: IPipelineTask | ((context: IContext) => Promise<void>)): this
    {
        this.#queue.push(isFunction(task) ? { name: task.toString(), executeAsync: task } : task);
        return this;
    }

    public then(task: IPipelineTask | ((context: IContext) => Promise<void>)): this
    {
        this.#queue.push(isFunction(task) ? { name: task.toString(), executeAsync: task } : task);
        return this;
    }

    public async executeAsync(context: IContext): Promise<void>
    {
        const queue = [...this.#queue];
        const logger = this.#logger.scope('Pipeline::Execute');

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