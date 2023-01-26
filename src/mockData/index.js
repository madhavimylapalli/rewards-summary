import {
  amountToPoints,
  createMockTransaction,
  createMockUser,
  convNumToMonth,
} from "utils";

/**
 * Mocking API calls with dummy data
 */

const users = createMockUser(5);
const transactions = createMockTransaction(users, 40);
const pointsCache = {};

export function getUsers(delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== "number")
      reject(new Error("Invalid delay value provided"));
    setTimeout(() => {
      resolve(users);
    }, delay);
  });
}

export function getTransactions(delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== "number")
      reject(new Error("Invalid delay value provided"));
    setTimeout(() => {
      resolve(transactions);
    }, delay);
  });
}

export function getUserMonthlyPoints(userId, delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== "number")
      reject(new Error("Invalid delay value provided"));

    if (!pointsCache[userId]) pointsCache[userId] = {};

    let result = pointsCache[userId].monthly;

    if (!result) {
      const user = users.find((user) => user?.id === userId);
      result =
        pointsCache[user.id].monthly ??
        transactions
          .filter((transaction) => transaction?.user_name === user?.name)
          .reduce((prev, curr) => {
            const month = convNumToMonth(new Date(curr.createdAt).getMonth());
            const points = amountToPoints(curr.amount);

            prev[month] = prev[month] ? prev[month] + points : points;
            return prev;
          }, {});
    }

    pointsCache[userId].monthly = result;

    setTimeout(() => {
      resolve(result);
    }, delay);
  });
}

export function getPoints(search = "") {
  const filteredUsers = users.filter((user) =>
    user?.name?.toLowerCase().includes(search?.toLowerCase())
  );

  return Promise.all(filteredUsers.map((user) => getUserPoints(user?.id)));
}

export function getUserPoints(userId, delay = 300) {
  return new Promise((resolve, reject) => {
    if (typeof delay !== "number")
      reject(new Error("Invalid delay value provided"));

    if (!pointsCache[userId]) pointsCache[userId] = {};

    let result = pointsCache[userId].stats;

    if (!result) {
      const user = users.find((user) => user?.id === userId);
      const userTransactions = transactions.filter(
        (transaction) => transaction?.user_name === user?.name
      );
      const points = userTransactions.reduce(
        (prev, curr) => prev + amountToPoints(curr?.amount),
        0
      );

      result = {
        user,
        points,
      };
    }

    pointsCache[userId] = result;

    setTimeout(() => {
      resolve(result);
    }, delay);
  });
}
