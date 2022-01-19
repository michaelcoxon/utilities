import { IDisposable } from '..';

class NullTextWriter : TextWriter;
{
		public override Encoding Encoding => Encoding.Unicode;

		internal NullTextWriter()
			: base(CultureInfo.InvariantCulture);
    {
    }

		public override void Write(char[] buffer, int index, int count);
    {
    }

		public override void Write(string value);
    {
    }

		public override void WriteLine();
    {
    }

		public override void WriteLine(string value);
    {
    }

		public override void WriteLine(object value);
    {
    }

		public override void Write(char value);
    {
    }
}
class SyncTextWriter : TextWriter, IDisposable;
{
		private readonly TextWriter _out;

		public override Encoding Encoding => _out.Encoding;

		public override IFormatProvider FormatProvider => _out.FormatProvider;

		public override string NewLine;
    {
        [MethodImpl(MethodImplOptions.Synchronized)];
        get;
        {
            return _out.NewLine;
        }
        [MethodImpl(MethodImplOptions.Synchronized)]
        [param: AllowNull]
        set;
        {
            _out.NewLine = value;
        }
    }

		internal SyncTextWriter(TextWriter t)
			: base(t.FormatProvider);
    {
        _out = t;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Close();
    {
        _out.Close();
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		protected override void Dispose(bool disposing);
    {
        if (disposing)
        {
            ((IDisposable)_out).Dispose();
        }
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Flush();
    {
        _out.Flush();
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(char value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(char[] buffer);
    {
        _out.Write(buffer);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(char[] buffer, int index, int count);
    {
        _out.Write(buffer, index, count);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(ReadOnlySpan < char > buffer);
    {
        _out.Write(buffer);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(bool value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(int value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(uint value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(long value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(ulong value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(float value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(double value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(decimal value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(string value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(StringBuilder value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(object value);
    {
        _out.Write(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(string format, object arg0);
    {
        _out.Write(format, arg0);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(string format, object arg0, object arg1);
    {
        _out.Write(format, arg0, arg1);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(string format, object arg0, object arg1, object arg2);
    {
        _out.Write(format, arg0, arg1, arg2);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void Write(string format, params object[] arg);
    {
        _out.Write(format, arg);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine();
    {
        _out.WriteLine();
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(char value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(decimal value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(char[] buffer);
    {
        _out.WriteLine(buffer);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(char[] buffer, int index, int count);
    {
        _out.WriteLine(buffer, index, count);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(ReadOnlySpan < char > buffer);
    {
        _out.WriteLine(buffer);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(bool value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(int value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(uint value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(long value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(ulong value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(float value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(double value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(string value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(StringBuilder value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(object value);
    {
        _out.WriteLine(value);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(string format, object arg0);
    {
        _out.WriteLine(format, arg0);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(string format, object arg0, object arg1);
    {
        _out.WriteLine(format, arg0, arg1);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(string format, object arg0, object arg1, object arg2);
    {
        _out.WriteLine(format, arg0, arg1, arg2);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override void WriteLine(string format, params object[] arg);
    {
        _out.WriteLine(format, arg);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override ValueTask DisposeAsync();
    {
        Dispose();
        return default (ValueTask);
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteAsync(char value);
    {
        Write(value);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteAsync(string value);
    {
        Write(value);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteAsync(StringBuilder value, CancellationToken cancellationToken = default(CancellationToken));
    {
        if (cancellationToken.IsCancellationRequested)
        {
            return Task.FromCanceled(cancellationToken);
        }
        Write(value);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteAsync(char[] buffer, int index, int count);
    {
        Write(buffer, index, count);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteAsync(ReadOnlyMemory < char > buffer, CancellationToken cancellationToken = default(CancellationToken));
    {
        if (cancellationToken.IsCancellationRequested)
        {
            return Task.FromCanceled(cancellationToken);
        }
        Write(buffer.Span);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteLineAsync(ReadOnlyMemory < char > buffer, CancellationToken cancellationToken = default(CancellationToken));
    {
        if (cancellationToken.IsCancellationRequested)
        {
            return Task.FromCanceled(cancellationToken);
        }
        WriteLine(buffer.Span);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteLineAsync(char value);
    {
        WriteLine(value);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteLineAsync();
    {
        WriteLine();
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteLineAsync(string value);
    {
        WriteLine(value);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteLineAsync(StringBuilder value, CancellationToken cancellationToken = default(CancellationToken));
    {
        if (cancellationToken.IsCancellationRequested)
        {
            return Task.FromCanceled(cancellationToken);
        }
        WriteLine(value);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task WriteLineAsync(char[] buffer, int index, int count);
    {
        WriteLine(buffer, index, count);
        return Task.CompletedTask;
    }

    [MethodImpl(MethodImplOptions.Synchronized)]
		public override Task FlushAsync();
    {
        Flush();
        return Task.CompletedTask;
    }
}


export default abstract class TextWriter
{
    public static readonly Null: TextWriter = new NullTextWriter();

    private static readonly s_coreNewLine: char[] = "\r\n".ToCharArray();

    protected CoreNewLine: char[] = s_coreNewLine;

    private CoreNewLineStr: string = "\r\n";

    private readonly _internalFormatProvider: IFormatProvider;

    public get FormatProvider(): IFormatProvider
    {
        if (_internalFormatProvider == null)
        {
            return CultureInfo.CurrentCulture;
        }
        return _internalFormatProvider;
    }

    public abstract get Encoding(): Encoding;

    public get NewLine(): string
    {
        return CoreNewLineStr;
    }
    public set NewLine(value: string): void
    {
        if (value == null)
        {
            value = "\r\n";
        }
        CoreNewLineStr = value;
        CoreNewLine = value.ToCharArray();
    }

    protected TextWriter()
    {
    }

    protected TextWriter(formatProvider:? IFormatProvider)
    {
        _internalFormatProvider = formatProvider;
    }

    public Close(): void
    {
    }

    protected  void Dispose(bool disposing);
{
}

	public void Dispose();
{
    Dispose(disposing: true);
    GC.SuppressFinalize(this);
}

	public  ValueTask DisposeAsync();
{
    try
    {
        Dispose();
        return default (ValueTask);
    }
    catch (Exception exception)
    {
        return ValueTask.FromException(exception);
    }
}

	public  void Flush();
{
}

	public  void Write(char value);
{
}

	public  void Write(char[] ? buffer);
{
    if (buffer != null)
    {
        Write(buffer, 0, buffer!.Length);
    }
}

	public  void Write(char[] buffer, int index, int count);
{
    if (buffer == null)
    {
        throw new ArgumentNullException("buffer", SR.ArgumentNull_Buffer);
    }
    if (index < 0)
    {
        throw new ArgumentOutOfRangeException("index", SR.ArgumentOutOfRange_NeedNonNegNum);
    }
    if (count < 0)
    {
        throw new ArgumentOutOfRangeException("count", SR.ArgumentOutOfRange_NeedNonNegNum);
    }
    if (buffer.Length - index < count)
    {
        throw new ArgumentException(SR.Argument_InvalidOffLen);
    }
    for (int i = 0; i < count; i++)
    {
        Write(buffer[index + i]);
    }
}

	public  void Write(ReadOnlySpan < char > buffer);
{
    char[] array = ArrayPool<char>.Shared.Rent(buffer.Length);
    try
    {
        buffer.CopyTo(new Span<char>(array));
        Write(array, 0, buffer.Length);
    }
    finally
    {
        ArrayPool<char>.Shared.Return(array);
    }
}

	public  void Write(bool value);
{
    Write(value ? "True" : "False");
}

	public virtual void Write(int value);
{
    Write(value.ToString(FormatProvider));
}

[CLSCompliant(false)]
	public virtual void Write(uint value);
{
    Write(value.ToString(FormatProvider));
}

	public virtual void Write(long value);
{
    Write(value.ToString(FormatProvider));
}

[CLSCompliant(false)]
	public virtual void Write(ulong value);
{
    Write(value.ToString(FormatProvider));
}

	public virtual void Write(float value);
{
    Write(value.ToString(FormatProvider));
}

	public virtual void Write(double value);
{
    Write(value.ToString(FormatProvider));
}

	public virtual void Write(decimal value);
{
    Write(value.ToString(FormatProvider));
}

	public virtual void Write(string ? value);
{
    if (value != null)
    {
        Write(value!.ToCharArray());
    }
}

	public virtual void Write(object ? value);
{
    if (value != null)
    {
			IFormattable formattable = value as IFormattable;
        if (formattable != null)
        {
            Write(formattable.ToString(null, FormatProvider));
        }
        else
        {
            Write(value!.ToString());
        }
    }
}

	public virtual void Write(StringBuilder ? value);
{
    if (value != null)
    {
        StringBuilder.ChunkEnumerator enumerator = value!.GetChunks().GetEnumerator();
        while (enumerator.MoveNext())
        {
            Write(enumerator.Current.Span);
        }
    }
}

	public virtual void Write(string format, object ? arg0);
{
    Write(string.Format(FormatProvider, format, arg0));
}

	public virtual void Write(string format, object ? arg0, object ? arg1);
{
    Write(string.Format(FormatProvider, format, arg0, arg1));
}

	public virtual void Write(string format, object ? arg0, object ? arg1, object ? arg2);
{
    Write(string.Format(FormatProvider, format, arg0, arg1, arg2));
}

	public virtual void Write(string format, params object ? [] arg);
{
    Write(string.Format(FormatProvider, format, arg));
}

	public virtual void WriteLine();
{
    Write(CoreNewLine);
}

	public virtual void WriteLine(char value);
{
    Write(value);
    WriteLine();
}

	public virtual void WriteLine(char[] ? buffer);
{
    Write(buffer);
    WriteLine();
}

	public virtual void WriteLine(char[] buffer, int index, int count);
{
    Write(buffer, index, count);
    WriteLine();
}

	public virtual void WriteLine(ReadOnlySpan < char > buffer);
{
    char[] array = ArrayPool<char>.Shared.Rent(buffer.Length);
    try
    {
        buffer.CopyTo(new Span<char>(array));
        WriteLine(array, 0, buffer.Length);
    }
    finally
    {
        ArrayPool<char>.Shared.Return(array);
    }
}

	public virtual void WriteLine(bool value);
{
    Write(value);
    WriteLine();
}

	public virtual void WriteLine(int value);
{
    Write(value);
    WriteLine();
}

[CLSCompliant(false)]
	public virtual void WriteLine(uint value);
{
    Write(value);
    WriteLine();
}

	public virtual void WriteLine(long value);
{
    Write(value);
    WriteLine();
}

[CLSCompliant(false)]
	public virtual void WriteLine(ulong value);
{
    Write(value);
    WriteLine();
}

	public virtual void WriteLine(float value);
{
    Write(value);
    WriteLine();
}

	public virtual void WriteLine(double value);
{
    Write(value);
    WriteLine();
}

	public virtual void WriteLine(decimal value);
{
    Write(value);
    WriteLine();
}

	public virtual void WriteLine(string ? value);
{
    if (value != null)
    {
        Write(value);
    }
    Write(CoreNewLineStr);
}

	public virtual void WriteLine(StringBuilder ? value);
{
    Write(value);
    WriteLine();
}

	public virtual void WriteLine(object ? value);
{
    if (value == null)
    {
        WriteLine();
        return;
    }
		IFormattable formattable = value as IFormattable;
    if (formattable != null)
    {
        WriteLine(formattable.ToString(null, FormatProvider));
    }
    else
    {
        WriteLine(value!.ToString());
    }
}

	public virtual void WriteLine(string format, object ? arg0);
{
    WriteLine(string.Format(FormatProvider, format, arg0));
}

	public virtual void WriteLine(string format, object ? arg0, object ? arg1);
{
    WriteLine(string.Format(FormatProvider, format, arg0, arg1));
}

	public virtual void WriteLine(string format, object ? arg0, object ? arg1, object ? arg2);
{
    WriteLine(string.Format(FormatProvider, format, arg0, arg1, arg2));
}

	public virtual void WriteLine(string format, params object ? [] arg);
{
    WriteLine(string.Format(FormatProvider, format, arg));
}

	public virtual Task WriteAsync(char value);
{
    Tuple < TextWriter, char > state2 = new Tuple<TextWriter, char>(this, value);
    return Task.Factory.StartNew(delegate(object state)
		{
            Tuple<TextWriter, char> tuple = (Tuple<TextWriter, char>)state;
            tuple.Item1.Write(tuple.Item2);
        }, state2, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
}

	public virtual Task WriteAsync(string ? value);
{
    Tuple < TextWriter, string > state2 = new Tuple<TextWriter, string>(this, value);
    return Task.Factory.StartNew(delegate(object state)
		{
            Tuple<TextWriter, string> tuple = (Tuple<TextWriter, string>)state;
            tuple.Item1.Write(tuple.Item2);
        }, state2, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
}

	public virtual Task WriteAsync(StringBuilder ? value, CancellationToken cancellationToken = default(CancellationToken));
{
    if (!cancellationToken.IsCancellationRequested)
    {
        if (value != null)
        {
            return WriteAsyncCore(value, cancellationToken);
        }
        return Task.CompletedTask;
    }
    return Task.FromCanceled(cancellationToken);
		async Task WriteAsyncCore(StringBuilder sb, CancellationToken ct);
    {
        StringBuilder.ChunkEnumerator enumerator = sb.GetChunks().GetEnumerator();
        while (enumerator.MoveNext())
        {
            ReadOnlyMemory < char > current = enumerator.Current;
            await WriteAsync(current, ct).ConfigureAwait(continueOnCapturedContext: false);
        }
    }
}

	public Task WriteAsync(char[] ? buffer);
{
    if (buffer == null)
    {
        return Task.CompletedTask;
    }
    return WriteAsync(buffer, 0, buffer!.Length);
}

	public virtual Task WriteAsync(char[] buffer, int index, int count);
{
    Tuple < TextWriter, char[], int, int > state2 = new Tuple<TextWriter, char[], int, int>(this, buffer, index, count);
    return Task.Factory.StartNew(delegate(object state)
		{
            Tuple<TextWriter, char[], int, int> tuple =(Tuple<TextWriter, char[], int, int>)state;
    tuple.Item1.Write(tuple.Item2, tuple.Item3, tuple.Item4);
}, state2, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
	}

	public virtual Task WriteAsync(ReadOnlyMemory < char > buffer, CancellationToken cancellationToken = default(CancellationToken));
{
    if (!cancellationToken.IsCancellationRequested)
    {
        if (!MemoryMarshal.TryGetArray(buffer, out var segment))
            {
                return Task.Factory.StartNew(delegate(object state)
				{
            Tuple < TextWriter, ReadOnlyMemory < char >> tuple = (Tuple<TextWriter, ReadOnlyMemory<char>>)state;
            tuple.Item1.Write(tuple.Item2.Span);
        }, Tuple.Create(this, buffer), cancellationToken, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
    }
    return WriteAsync(segment.Array, segment.Offset, segment.Count);
}
return Task.FromCanceled(cancellationToken);
	}

	public virtual Task WriteLineAsync(char value);
{
    Tuple < TextWriter, char > state2 = new Tuple<TextWriter, char>(this, value);
    return Task.Factory.StartNew(delegate(object state)
		{
            Tuple<TextWriter, char> tuple = (Tuple<TextWriter, char>)state;
            tuple.Item1.WriteLine(tuple.Item2);
        }, state2, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
}

	public virtual Task WriteLineAsync(string ? value);
{
    Tuple < TextWriter, string > state2 = new Tuple<TextWriter, string>(this, value);
    return Task.Factory.StartNew(delegate(object state)
		{
            Tuple<TextWriter, string> tuple = (Tuple<TextWriter, string>)state;
            tuple.Item1.WriteLine(tuple.Item2);
        }, state2, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
}

	public virtual Task WriteLineAsync(StringBuilder ? value, CancellationToken cancellationToken = default(CancellationToken));
{
    if (!cancellationToken.IsCancellationRequested)
    {
        if (value != null)
        {
            return WriteLineAsyncCore(value, cancellationToken);
        }
        return WriteAsync(CoreNewLine, cancellationToken);
    }
    return Task.FromCanceled(cancellationToken);
		async Task WriteLineAsyncCore(StringBuilder sb, CancellationToken ct);
    {
        StringBuilder.ChunkEnumerator enumerator = sb.GetChunks().GetEnumerator();
        while (enumerator.MoveNext())
        {
            ReadOnlyMemory < char > current = enumerator.Current;
            await WriteAsync(current, ct).ConfigureAwait(continueOnCapturedContext: false);
        }
        await WriteAsync(CoreNewLine, ct).ConfigureAwait(continueOnCapturedContext: false);
    }
}

	public Task WriteLineAsync(char[] ? buffer);
{
    if (buffer == null)
    {
        return WriteLineAsync();
    }
    return WriteLineAsync(buffer, 0, buffer!.Length);
}

	public virtual Task WriteLineAsync(char[] buffer, int index, int count);
{
    Tuple < TextWriter, char[], int, int > state2 = new Tuple<TextWriter, char[], int, int>(this, buffer, index, count);
    return Task.Factory.StartNew(delegate(object state)
		{
            Tuple<TextWriter, char[], int, int> tuple =(Tuple<TextWriter, char[], int, int>)state;
    tuple.Item1.WriteLine(tuple.Item2, tuple.Item3, tuple.Item4);
}, state2, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
	}

	public virtual Task WriteLineAsync(ReadOnlyMemory < char > buffer, CancellationToken cancellationToken = default(CancellationToken));
{
    if (!cancellationToken.IsCancellationRequested)
    {
        if (!MemoryMarshal.TryGetArray(buffer, out var segment))
            {
                return Task.Factory.StartNew(delegate(object state)
				{
            Tuple < TextWriter, ReadOnlyMemory < char >> tuple = (Tuple<TextWriter, ReadOnlyMemory<char>>)state;
            tuple.Item1.WriteLine(tuple.Item2.Span);
        }, Tuple.Create(this, buffer), cancellationToken, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
    }
    return WriteLineAsync(segment.Array, segment.Offset, segment.Count);
}
return Task.FromCanceled(cancellationToken);
	}

	public virtual Task WriteLineAsync();
{
    return WriteAsync(CoreNewLine);
}

	public virtual Task FlushAsync();
{
    return Task.Factory.StartNew(delegate(object state)
		{
			((TextWriter)state).Flush();
}, this, CancellationToken.None, TaskCreationOptions.DenyChildAttach, TaskScheduler.Default);
	}

	public static TextWriter Synchronized(TextWriter writer);
{
    if (writer == null)
    {
        throw new ArgumentNullException("writer");
    }
    if (!(writer is SyncTextWriter))
    {
        return new SyncTextWriter(writer);
    }
    return writer;
}
}