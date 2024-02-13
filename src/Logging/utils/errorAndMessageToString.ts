import { IndentedStringBuilder } from '../../IO';
import { isNullOrEmpty } from '../../TypeHelpers';
import errorToLogMessage from '../../errorToLogMessage';

/**
 * Returns the {@link message} first then the {@link error} using {@link errorToLogMessage}.
 * @param message Summary of the error
 * @param error The error
 * @returns 
 */
export default function errorAndMessageToString(message: string | undefined, error: Error): string
{
    const sb = new IndentedStringBuilder(0);
    if (!isNullOrEmpty(message))
    {
        sb.appendLine(message);
        sb.indent();
        errorToLogMessage(error, sb);
        sb.unindent();
    }
    else
    {
        errorToLogMessage(error, sb);
    }
    return sb.toString();
}
