import Exception from './Exceptions/Exception';
import { IIndentedStringBuilder } from './IO/_types';

export default function errorToLogMessage(error: Error | Exception, sb: IIndentedStringBuilder): void
{
    sb.appendLine(`Error '${error.name}': ${error.message}`);
    if (error.stack !== undefined)
    {
        sb.indent();
        sb.appendLine(error.stack);
        sb.unindent();
    }

    if (Exception.isException(error) && error.innerException !== undefined)
    {
        sb.appendLine("The following errors were also encountered:");
        sb.indent();
        errorToLogMessage(error.innerException, sb);
        sb.unindent();
    }
}