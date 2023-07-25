import styles from "./Desktop.module.scss";

export default function Desktop({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.desktop}>
      <div className={styles.wallpaper}></div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
