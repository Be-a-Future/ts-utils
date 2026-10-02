import { Optional } from './common';

export const parseJson = <T>(json: string): Optional<T> => {
  try {
    return JSON.parse(json);
  } catch {
    return;
  }
};
