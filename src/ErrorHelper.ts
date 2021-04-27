import Exception from './Exceptions/Exception';
import IndentedStringBuilder from "./IndentedStringBuilder";

namespace ErrorHelper
{
    export function errorToLogMessage(error: Error | Exception, sb: IndentedStringBuilder): void
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
            ErrorHelper.errorToLogMessage(error.innerException, sb);
            sb.unindent();
        }
    }

    export function serialize(error: Error): string
    {
        return JSON.stringify(Object.assign({}, error));
    }
}

export default ErrorHelper;
