import data from './data';

export default class Api {
  fetchUsers(start = 0, step = 30) {
    return new Promise((resolve) =>
      setTimeout(() => {
          resolve({
            data: this.getUsersInRange(start, step),
            success: true,
          });
        }, 444)
    );
  }

  getUsersInRange(start, step) {
    const users = this.queryResult();
    const rangeLength = start + step;
    const usersLength = users.length;
  
    if (start > usersLength) {
      return {
        users: [],
        newStart: usersLength + 1,
      };
    }
  
    if (rangeLength > usersLength) {
      const normalisedStep = step - (rangeLength - usersLength);
      return this.getUsersInRange(start, normalisedStep);
    }
  
    if (usersLength >= rangeLength) {
      const end = start + step;
      return {
        users: users.slice(start, end),
        newStart: usersLength === rangeLength ? (end + 1) : end,
      }
    }
  }

  queryResult() {
    const { users } = data;
    return users;
  }
}