import api from '../../src/api';

describe('Test API', () => {
  const mockedUsers = [1,2,3,4,5,6,7,8,9];
  const testApi = new api();
  const spy = jest.spyOn(testApi, 'queryResult');
  spy.mockReturnValue(mockedUsers)

  it('returns empty array when starting out of bounds', () => {
    expect(testApi.getUsersInRange(10, 1).users.length).toEqual(0);
    expect(testApi.getUsersInRange(10, 1).newStart).toBe(10);
  });

  it('returns remainder of array items when step exceeds array length', () => {
    expect(testApi.getUsersInRange(3, 118).users.length).toEqual(6);
  });

  it('returns as many items as provided by the step', () => {
    const firstApiCall = testApi.getUsersInRange(0, 2).users;
    expect(firstApiCall).toEqual([1,2]);

    const secondApiCall = testApi.getUsersInRange(4, 4).users;
    expect(secondApiCall).toEqual([5,6,7,8]);
  });

  it('returns the updated starting index for subsequent queries', () => {
    const firstApiCall = testApi.getUsersInRange(0,5);
    const { newStart } = firstApiCall;

    expect(firstApiCall.users).toEqual([1,2,3,4,5]);
    expect(newStart).toBe(5);

    const secondApiCall = testApi.getUsersInRange(newStart, 5);
    expect(secondApiCall.users).toEqual([6,7,8,9]);
    expect(secondApiCall.newStart).toBe(10);
  });
});