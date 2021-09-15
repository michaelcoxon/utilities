export const slowtest: boolean | undefined = (process && process.env.SKIP_SLOW_TESTS) || (global['window'] && (global['window']['slowtest']));
