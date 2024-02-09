import styles from "./styles.module.css";

function BoardSort() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Boards</h1>
      <div className={styles.order}>
        <label htmlFor="sort-select" className={styles.label}>
          Sort by
        </label>
        <select id="sort-select" className={styles.select}>
          <option value="date-asc">Date (Oldest to Newest)</option>
          <option value="date-desc">Date (Newest to Oldest)</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>
      </div>
    </div>
  );
}

export default BoardSort;
