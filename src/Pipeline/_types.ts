export interface IContext<T>
{
    readonly data: T;
}

export interface IPipelineTask
{
    readonly name: string;
    executeAsync<T>(context: IContext<T>): Promise<void>;
}

export interface IPipelineTaskQueue
{
    then(task: IPipelineTask | (<T>(context: IContext<T>) => Promise<void>)): IPipelineTaskQueue;
}
