import { Predicate } from '..';
import { IExpiryPolicyDelegate } from './_types';


export default function expire<T>(): IExpiryPolicyDelegate<T> 
{
    return () => true;
}


expire.at = function (date: Date) 
{
    return expire.when(() => date > new Date());
};

expire.in = function (time: number)
{
    const expires = new Date();
    expires.setTime(expires.getTime() + time);
    return expire.when(() => expires > new Date());
};

expire.now = function ()
{
    return expire.when(() => true);
};

expire.when = function <T>(predicate: IExpiryPolicyDelegate<T>)
{
    return predicate;
};

expire.tomorrow = function ()
{
    return expire.inDays(1);
};

expire.inSeconds = function (time: number)
{
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + time);
    return expire.when(() => expires < new Date());
};

expire.inMinutes = function (time: number)
{
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + time);
    return expire.when(() => expires < new Date());
};

expire.inHours = function (time: number)
{
    const expires = new Date();
    expires.setHours(expires.getHours() + time);
    return expire.when(() => expires < new Date());
};

expire.inDays = function (time: number)
{
    const expires = new Date();
    expires.setDate(expires.getDate() + time);
    return expire.when(() => expires < new Date());
};

expire.inMonths = function (time: number)
{
    const expires = new Date();
    expires.setMonth(expires.getMonth() + time);
    return expire.when(() => expires < new Date());
};

expire.inYears = function (time: number)
{
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + time);
    return expire.when(() => expires < new Date());
};