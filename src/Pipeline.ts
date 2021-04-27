import { ILogger } from './ILogger';
import  InvalidOperationException from './Exceptions/InvalidOperationException';


export interface IPipelineTask
{
}


export default class Pipeline<TContext>
{
    private readonly _logger: ILogger;
    private _entryPoint?: IPipelineTask;

    constructor(logger: ILogger)
    {
        this._logger = logger;
    }

    public start<TPipelineTask extends IPipelineTask>(task: TPipelineTask): TPipelineTask
    {
        if (this._entryPoint)
        {
            throw new InvalidOperationException();
        }
        return this._entryPoint = task;
    }
}