import format from '../Strings/format.js';
import { empty } from '../Strings/_consts.js';
import Exception from './Exception.js';
import SR from '../i18n/en.exceptions.strings.json';


export default class InvalidTypeException extends Exception
{
    constructor(variableName: string, expectedTypeName: string, message?: string, innerException?: Exception)
    {
        const _message = format(SR.InvalidTypeException_message, variableName, expectedTypeName, message !== undefined ? message : empty);
        if (innerException)
        {
            super(_message, innerException);
        }

        else
        {
            super(_message);
        }

        this.name = 'InvalidTypeException';
    }
}
