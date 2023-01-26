export const convNumToMonth = (month = 0) => {
  if (month > 11) {
    throw new Error("Invalid month input value");
  }
  const names = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  return names[month];
};

export const getRandomNumber = (min = 1, max = Number.MAX_SAFE_INTEGER) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getDateLastNDays = (days = 0) => {
  if (typeof days !== "number") throw new Error("Invalid number of days given");

  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
};

export const amountToPoints = (amount = 0) => {
  if (amount < 50) return 0;
  else if (amount >= 50 && amount <= 100) return amount;

  return (amount - 100) * 2 + 50;
};

const createUser = (id) => {
  return {
    id: id + 1,
    name: `Customer-${id + 1}`,
  };
};

/**
 * Used for generating mock users data
 *
 * @param {number} count number users need to create
 *
 * - returns {USER[]} Array of users with id, name
 */
export const createMockUser = (count = 1) => {
  return Array.from({ length: count }).map((_, index) => createUser(index));
};

const createTransaction = (users, id) => {
  const MIN_AMOUNT = 10,
    MAX_AMOUNT = 100;
  const userIndex = getRandomNumber(0, users.length - 1);
  const randomUser = users[userIndex];

  return {
    id,
    user_trans_id: `trans${id}`,
    user_name: randomUser?.name,
    amount: getRandomNumber(MIN_AMOUNT, MAX_AMOUNT),
    status: "completed",
    createdAt: getDateLastNDays(getRandomNumber(0, 365)),
  };
};

/**
 * @param {number} count No of mock transaction needs to be created
 *
 * - returns {TRANSACTION[]} Array of transaction with id, name
 */
export const createMockTransaction = (users, count = 1) => {
  return Array.from({ length: count }).map((_, index) =>
    createTransaction(users, index)
  );
};
