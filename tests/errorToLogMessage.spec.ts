import { errorToLogMessage } from '../src';
import { Exception } from '../src/Exceptions';
import { IndentedStringBuilder, StringBuilder } from '../src/IO';



describe("errorToLogMessage", () =>
{
    it("single exception", () =>
    {
        const ex = new Exception();
        errorToLogMessage(ex, new IndentedStringBuilder(0));
    });

    it("nested exception", () =>
    {
        const ex = new Exception(undefined, new Exception());
        errorToLogMessage(ex, new IndentedStringBuilder(0));
    });
});