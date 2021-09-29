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
