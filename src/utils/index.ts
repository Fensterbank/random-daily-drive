/**
 * This method runs over an array of items and calls a method with the item as first parameter
 * @param arr The array of items
 * @param asyncMethod The async method which will be called with the item as first parameter
 */
export const serialAsyncForEach = (arr: any[], asyncMethod: (item: any) => Promise<any>) =>
  arr.reduce((accPromise, item) => accPromise.then(() => asyncMethod(item)), Promise.resolve());
