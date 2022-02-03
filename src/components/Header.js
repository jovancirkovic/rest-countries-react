import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import styles from "./Header.module.css";
import { BsSun, BsMoon } from "react-icons/bs";

const Header = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const changeTheme = () => {
    setIsClicked(!isClicked);

    document.body.classList.toggle("light");
  };

  useEffect(() => {
    props.onClickHandler(isClicked);
  }, [isClicked, props]);

  const classes = isClicked ? `${styles.light}` : `${styles.header}`;

  return (
    <header className={classes}>
      <Layout className={styles.content}>
        <div>
          <h3>Where in the world?</h3>
        </div>
        <div className={styles.button}>
          {isClicked ? (
            <>
              <BsMoon style={{ fontSize: "1rem", marginRight: "0.2rem" }} />
              <button style={{ color: "#000" }} onClick={changeTheme}>
                Dark Mode
              </button>
            </>
          ) : (
            <>
              <BsSun style={{ fontSize: "1rem", marginRight: "0.2rem" }} />
              <button style={{ color: "#fff" }} onClick={changeTheme}>
                Light Mode
              </button>
            </>
          )}
        </div>
      </Layout>
    </header>
  );
};

export default Header;
