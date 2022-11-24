import { IExpiryPolicyDelegate } from './_types.js';


export default function expire<T>(): IExpiryPolicyDelegate<T> 
{
    return () => true;
}

expire.when = expireWhen;
expire.at = expireAt;
expire.in = expireIn;
expire.now = expireNow;
expire.tomorrow = expireTomorrow;
expire.inSeconds = expireInSeconds;
expire.inMinutes = expireInMinutes;
expire.inHours = expireInHours;
expire.inDays = expireInDays;
expire.inMonths = expireInMonths;
expire.inYears = expireInYears;


function expireWhen<T>(predicate: IExpiryPolicyDelegate<T>)
{
    return predicate;
};

function expireAt(date: Date) 
{
    return expireWhen(() => date <= new Date());
};
/**
 * Time in milliseconds
 */
function expireIn(time: number)
{
    const expires = new Date();
    expires.setTime(expires.getTime() + time);
    return expireAt(expires);
};

function expireNow()
{
    return expireWhen(() => true);
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