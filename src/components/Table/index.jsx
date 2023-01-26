import styles from "./index.module.scss";

export function Table({ config = {} }) {
  const {
    headers = [],
    rows = [],
    headerProps = {},
    bodyProps = {},
    title,
    rowTitle,
    noDataMessage,
    ...props
  } = config;

  const renderTableHead = () => {
    if (!Array.isArray(headers)) return null;

    return (
      <thead {...headerProps} className={styles["headers__wrapper"]}>
        {title && (
          <tr className={styles["table__title"]}>
            <th colSpan={headers.length}>{title}</th>
          </tr>
        )}
        <tr>
          {headers.map((header, index) => {
            return <th key={header?.label || index}>{header?.label}</th>;
          })}
        </tr>
      </thead>
    );
  };

  const renderTableRows = () => {
    if (!Array.isArray(rows)) return null;

    const renderColumns = (data) => {
      if (!data) return null;

      return headers.map(({ accessor }) => {
        const key = data[accessor]?.toString();

        return <td key={key}>{key}</td>;
      });
    };

    return (
      <tbody {...bodyProps} className={styles["rows__wrapper"]}>
        {rows.map((row, rowNum) => {
          return (
            <tr
              {...row?.props}
              key={rowNum}
              title={rowTitle}
            >
              {renderColumns(row.data)}
            </tr>
          );
        })}
        {rows.length === 0 && (
          <tr key={"no_data"}>
            <td colSpan={headers.length} className={styles["no__data"]}>
              {noDataMessage || "No data"}
            </td>
          </tr>
        )}
      </tbody>
    );
  };

  return (
    <table {...props} className={styles["table__wrapper"]}>
      {renderTableHead()}
      {renderTableRows()}
    </table>
  );
}
