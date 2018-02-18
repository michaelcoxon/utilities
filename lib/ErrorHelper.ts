﻿import { StringBuilder } from "./StringBuilder";
import { Exception } from "./Exceptions";

export class ErrorHelper
{
    public static errorToLogMessage(error: Error | Exception): string
    {
        const sb = new StringBuilder();

        sb.appendLine(`Error '${error.name}': ${error.message}`);
        if (error.stack !== undefined)
        {
            sb.appendLine(error.stack);
        }

        if (Exception.isException(error) && error.innerException !== undefined)
        {
            sb.appendLine("The following errors were also encountered:");
            sb.appendLine(ErrorHelper.errorToLogMessage(error.innerException));
        }

        return sb.toString();
    }

    public static serialize(error: Error): string
    {
        return JSON.stringify(Object.assign({}, error));
    }
}