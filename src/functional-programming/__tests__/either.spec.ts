import { isLeft, isRight, Left, Right, Maybe, either, tryCatch, whenRight } from '../either';
import { compose } from '../compose';
import { pipe } from '../pipe';
import { prop } from '../../utils';

describe('either constructors and guards', () => {
  it('should create Left value', () => expect(Left('error')).toEqual({ tag: 'left', value: 'error' }));
  it('should create Right value', () => expect(Right('ok')).toEqual({ tag: 'right', value: 'ok' }));
  it('should detect Left values', () => expect(isLeft(Left('error'))).toEqual(true));
  it('should detect Right values', () => expect(isRight(Right('ok'))).toEqual(true));
});

describe('either', () => {
  it('should resolve left branch', () => {
    expect(
      either(
        (value) => `left:${value}`,
        (value) => `right:${value}`,
        Left('error'),
      ),
    ).toEqual('left:error');
  });

  it('should resolve right branch', () => {
    expect(
      either(
        (value) => `left:${value}`,
        (value) => `right:${value}`,
        Right('ok'),
      ),
    ).toEqual('right:ok');
  });
});

describe('when Right', () => {
  it('should be ok', async () => {
    const isAuth = (is: boolean): Maybe<{ authToken: string }> => (is ? Right({ authToken: 'xxx' }) : Left(new Error('Authentication Error')));

    const getProfile = (isTokenValid: boolean) => async (): Promise<Maybe<{ username: string }>> =>
      isTokenValid ? Right({ username: 'Pepa' }) : Left(new Error('Invalid auth token'));

    const getUsername = async (isAuthenticated: boolean, isTokenValid: boolean) =>
      pipe(
        isAuth(isAuthenticated),
        whenRight(compose(await getProfile(isTokenValid), prop('authToken'))),
        whenRight((user) => user.username),
      );

    expect(await getUsername(false, false)).toEqual(Left(new Error('Authentication Error')));
    expect(await getUsername(true, false)).toEqual(Left(new Error('Invalid auth token')));
    expect(await getUsername(true, true)).toEqual('Pepa');
  });

  it('should keep Left value unchanged', async () => {
    const result = await whenRight((value: number) => value * 2)(Left(new Error('stop')));
    expect(result).toEqual(Left(new Error('stop')));
  });
});

describe('tryCatch', () => {
  it('should wrap resolved value into Right', async () => {
    await expect(tryCatch(async () => 'ok')).resolves.toEqual(Right('ok'));
  });

  it('should wrap thrown error into Left', async () => {
    const error = new Error('failure');
    await expect(tryCatch(async () => Promise.reject(error))).resolves.toEqual(Left(error));
  });
});
