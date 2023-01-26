import styles from "./index.module.scss";

export function DefaultLayout({ children }) {
  return (
    <div className={styles["default__wrapper"]}>
      <main>{children}</main>
    </div>
  );
}
