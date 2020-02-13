export const slowtest: boolean | undefined = (process && process.env.SKIP_SLOW_TESTS) || (<any>global).window && (<any>global).window.slowtest;
