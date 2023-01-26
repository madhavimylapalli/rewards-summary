import { useContext, useMemo } from "react";
import { Table } from "components";
import { HomeContext } from "context";

import styles from "./index.module.scss";

const defaultConfig = {
  title: "Note: Click on row to view user reward points",
};

export function UserList() {
  const { users, handleActiveUserClick } = useContext(HomeContext);

  const tableConfig = useMemo(() => {
    const headers = [
      {
        label: "User Id",
        accessor: "id",
      },
      {
        label: "User Name",
        accessor: "name",
      },
      {
        label: "Points",
        accessor: "points",
      },
    ];

    const rows = users?.map((row) => ({
      props: {
        onClick: () => handleActiveUserClick(row.user),
        style: {
          cursor: "pointer",
        },
      },
      data: { ...row?.user, points: row.points },
    }));

    return {
      ...defaultConfig,
      noDataMessage: "No users",
      rowTitle: "Click to view user monthly reward points",
      headers,
      rows,
    };
  }, [users, handleActiveUserClick]);

  return (
    <div className={styles["user__list__wrapper"]}>
      <Table config={tableConfig} />
    </div>
  );
}
