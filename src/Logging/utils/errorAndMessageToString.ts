import { IndentedStringBuilder } from '../../IO';
import errorToLogMessage from '../../errorToLogMessage';

export default function errorAndMessageToString(msg: string | undefined, err: Error): string
{
    const sb = new IndentedStringBuilder(0);
    if (msg !== undefined)
    {
        sb.appendLine(msg);
        sb.indent();
        errorToLogMessage(err, sb);
        sb.unindent();
    }


    else
    {
        errorToLogMessage(err, sb);
    }
    return sb.toString();
}
