export interface IContext<T = any>
{
    readonly data: T;
}

export interface IPipelineTask
{
    readonly name: string;
    executeAsync(context: IContext): Promise<void>;
}

export interface IPipelineTaskQueue
{
    then(task: IPipelineTask | ((context: IContext) => Promise<void>)): IPipelineTaskQueue;
}
