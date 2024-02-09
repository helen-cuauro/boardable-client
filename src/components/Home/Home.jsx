import styles from "./styles.module.css";
import logo from "../../assets/Vector.svg";
import Header from "../Header";

import BoardList from "../BoardList";

import BoardSort from "../BoardSort/BoardSort";

function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.container}>
          <div className={styles.boards}>
            <BoardSort />
            <BoardList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
