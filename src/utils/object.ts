import { isEmpty } from '../array';

export const isObjectEmpty = (object: object): object is Record<string, unknown> => isEmpty(Object.keys(object));
