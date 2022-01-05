
export interface IConsole
{
    log: (message?: any, ...optionalParams: any[]) => void;

    // these are optional as they are only supported by some console implementations
    warn?: (message?: any, ...optionalParams: any[]) => void;
    trace?: (message?: any, ...optionalParams: any[]) => void;
    info?: (message?: any, ...optionalParams: any[]) => void;
    error?: (message?: any, ...optionalParams: any[]) => void;
}
