import Exception from './Exceptions/Exception';
import { IScopedStringBuilder } from './IO/_types';

export default function errorToLogMessage(error: Error | Exception, sb: IScopedStringBuilder): void
{
    sb.appendLine(`Error '${error.name}': ${error.message}`);
    if (error.stack !== undefined)
    {
        sb.beginScope();
        sb.appendLine(error.stack);
        sb.endScope();
    }

    if (Exception.isException(error) && error.innerException !== undefined)
    {
        sb.appendLine("The following errors were also encountered:");
        sb.beginScope();
        errorToLogMessage(error.innerException, sb);
        sb.endScope();
    }
}