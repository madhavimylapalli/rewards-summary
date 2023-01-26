import { useContext, useEffect, useState } from "react";
import { HomeContext } from "context";

import styles from "./index.module.scss";
import { getUserMonthlyPoints } from "mockData";
import { Table } from "components";

export function MonthlyPointsList() {
  const { activeUser } = useContext(HomeContext);
  const [tableConfig, setTableConfig] = useState({});

  useEffect(() => {
    if (activeUser?.id)
      getUserMonthlyPoints(activeUser?.id).then((data) => {
        const headers = [
          {
            label: "Month",
            accessor: "month",
          },
          {
            label: "Points",
            accessor: "points",
          },
        ];
        const rows = Object.entries(data).map(([month, points]) => ({
          data: { month, points },
        }));
        const title = `${activeUser?.name} Monthly Reward Points`;

        setTableConfig({
          headers,
          rows,
          title,
        });
      });
  }, [activeUser]);

  return (
    activeUser && (
      <div className={styles["month__stats__wrapper"]}>
        <Table config={tableConfig} />
      </div>
    )
  );
}
