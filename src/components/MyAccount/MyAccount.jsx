import Header from "../Header";
import styles from "./styles.module.css";

function MyAccount() {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.title}>My Account</h1>
        <div className={styles["conatainer-form"]}>
          <form className={styles.form}>
            <div className={styles["input-group"]}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={styles.input}
              />
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="Name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                className={styles.input}
                required
              />
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className={styles.input}
                required
              />
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles["button-update"]}>
              Update
            </button>
            <button type="submit" className={styles["button-delete"]}>
              Delete my account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
