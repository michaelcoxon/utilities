
/**
 * Interface for implementing your own console.
 */
 export interface IConsole
{
    log: (message?: unknown, ...optionalParams: unknown[]) => void;

    // these are optional as they are only supported by some console implementations
    warn?: (message?: unknown, ...optionalParams: unknown[]) => void;
    trace?: (message?: unknown, ...optionalParams: unknown[]) => void;
    info?: (message?: unknown, ...optionalParams: unknown[]) => void;
    error?: (message?: unknown, ...optionalParams: unknown[]) => void;
}
