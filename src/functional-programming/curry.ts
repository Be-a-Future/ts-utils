/* eslint-disable @typescript-eslint/no-explicit-any */
export const curry = <F extends (...args: any) => any>(fn: F) => {
  const result = (args: any) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (...secArgs) => result([...args, ...secArgs]);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (...args) => result(args);
};
