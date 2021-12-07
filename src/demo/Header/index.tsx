import React from "react";

import styles from "./index.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo} />
      </div>
    </div>
  );
};

export default Header;
