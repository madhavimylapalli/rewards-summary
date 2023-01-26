import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useState,
} from "react";

import { HomeContext } from "context";
import { getPoints, getTransactions, getUsers } from "mockData";
import { MonthlyPointsList, TransactionList, UserList } from "components";

import styles from "./index.module.scss";
import { Header } from "../../components/Title/index";

export function Home() {
  // States
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [pointsTable, setPointsTable] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(null);

  // Constants
  const searchId = useId();
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    Promise.all([getUsers(), getTransactions(), getPoints()]).then(
      ([_users, _transactions, _userPoints]) => {
        // Considering them to be formatted
        setUsers(_users);
        setTransactions(_transactions);
        setPointsTable(_userPoints);
      }
    );
  }, []);

  useEffect(() => {
    getPoints(deferredSearch).then((_users) => setUsers(_users));
  }, [deferredSearch]);

  const handleActiveUserClick = useCallback(
    (user) => {
      setActiveUser(user);
    },
    [setActiveUser]
  );

  const handleUserSearch = (event) => {
    const { value } = event.target;

    setSearch(value);
  };

  return (
    <HomeContext.Provider
      value={{
        users,
        transactions,
        pointsTable: pointsTable,
        activeUser,
        handleActiveUserClick,
      }}
    >
      <div className={styles["links-container"]}>
        <button
          className={
            styles["button"] +
            " " +
            styles["margin-right"] +
            (activePage === 1 ? " " + styles["active"] : "")
          }
          onClick={() => {
            setActivePage(1);
          }}
        >
          View User reward Points
        </button>
        <button
          className={
            styles["button"] + (activePage === 2 ? " " + styles["active"] : "")
          }
          onClick={() => {
            setActivePage(2);
          }}
        >
          View reward Transactions
        </button>
      </div>
      <div className={styles["home-container"]}>
        {activePage === 1 ? (
          <>
            <Header title="Users Reward Summary" />
            <div className={styles["search__container"]}>
              <label htmlFor={searchId}>Search User</label>
              <input
                type="text"
                name="username"
                placeholder="Search user by name"
                id={searchId}
                value={search}
                onChange={handleUserSearch}
              />
            </div>
            <div className={styles["users__container"]}>
              <UserList />
              <MonthlyPointsList />
            </div>
          </>
        ) : null}
        {activePage === 2 ? (
          <>
            <Header title="User reward transactions" />
            <div className={styles["transactions__list__container"]}>
              <TransactionList />
            </div>
          </>
        ) : null}
      </div>
    </HomeContext.Provider>
  );
}
