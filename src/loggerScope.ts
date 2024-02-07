import { ILogger } from './Logging/_types';

/**
 * Decorator for setting the logger scope of an ILogger instance
 * @param name
 */
export default function loggerScope(name: string): (target: Record<string, any>, key: string) => void
{
    return (target: Record<string, any>, key: string) =>
    {
        const logger = target[key] as ILogger;
        if (!logger)
        {
            throw "logger is no set yet";
        }
        target[key] = logger.scope(name);
    };
}
