import { any } from '../Arrays';
import { ArgumentNullException, NullReferenceException } from '../Exceptions';
import { IExpiryPolicyDelegate } from './_types';


export default function expire<T>(...predicates: IExpiryPolicyDelegate<T>[]): IExpiryPolicyDelegate<T> 
{
    if (predicates.length === 0)
    {
        throw new ArgumentNullException("predicates");
    }
    else
    {
        let isExpired = false;
        const delegate = (value?: T) =>
        {
            return isExpired || (isExpired = predicates.some(p => p(value)));
        };

        return delegate;
    }
}

expire.when = expire;
expire.at = expireAt;
expire.in = expireIn;
expire.now = expire(() => true);
expire.never = expire(() => false);
expire.tomorrow = expireTomorrow;
expire.inSeconds = expireInSeconds;
expire.inMinutes = expireInMinutes;
expire.inHours = expireInHours;
expire.inDays = expireInDays;
expire.inMonths = expireInMonths;
expire.inYears = expireInYears;

function expireAt(date: Date) 
{
    return expire(() => date <= new Date());
};

function expireIn(time: number)
{
    const expires = new Date();
    expires.setTime(expires.getTime() + time);
    return expireAt(expires);
};

function expireTomorrow()
{
    return expireInDays(1);
};

function expireInSeconds(seconds: number)
{
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + seconds);
    return expireAt(expires);
};

function expireInMinutes(minutes: number)
{
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + minutes);
    return expireAt(expires);
};

function expireInHours(hours: number)
{
    const expires = new Date();
    expires.setHours(expires.getHours() + hours);
    return expireAt(expires);
};

function expireInDays(days: number)
{
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    return expireAt(expires);
};

function expireInMonths(months: number)
{
    const expires = new Date();
    expires.setMonth(expires.getMonth() + months);
    return expireAt(expires);
};

function expireInYears(years: number)
{
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + years);
    return expireAt(expires);
};