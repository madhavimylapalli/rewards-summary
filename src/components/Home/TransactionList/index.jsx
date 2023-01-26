import { useContext, useMemo } from "react";
import { HomeContext } from "context";

import styles from "./index.module.scss";
import { Table } from "components";

const defaultConfig = {};
const renamedColumns = {
  user_trans_id: "User trans. Id",
  user_name: "user name",
  createdAt: "created on",
};

export function TransactionList() {
  const { transactions } = useContext(HomeContext);

  const tableConfig = useMemo(() => {
    if (!transactions[0]) return defaultConfig;

    const headers = Object.keys(transactions[0]).map((key) => ({
      label: (renamedColumns[key] ? renamedColumns[key] : key)?.toUpperCase(),
      accessor: key,
    }));
    const rows = transactions.map((transaction) => {
      return {
        data: {
          ...transaction,
          createdAt: transaction.createdAt?.toLocaleDateString(),
        },
      };
    });

    return Object.assign(defaultConfig, { headers, rows });
  }, [transactions]);

  return (
    <div className={styles["transactions__list__wrapper"]}>
      <Table config={tableConfig} />
    </div>
  );
}
