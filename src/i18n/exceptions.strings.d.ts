interface ExceptionResources
{
    ArgumentUndefinedException_message: string;
    ArgumentNullException_message: string;
    InvalidTypeException_message: string;
    OutOfBoundsException_message: string;
    IndexOutOfRangeException_message: string;
    FileNotFoundException_message: string;
    KeyNotFoundException_message: string;
    KeyAlreadyDefinedException_message: string;
}

declare module "*.exceptions.strings.json"
{
    const val: ExceptionResources;
    export = val;
}