import React from "react";
import styles from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={`${styles.layout} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Layout;
