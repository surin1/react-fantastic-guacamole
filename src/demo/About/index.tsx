import React from "react";

import styles from "./index.module.css";

const About = () => (
  <div className={styles.container}>
    <div className={styles.header}>React Musiio Player</div>
    <input
      className={styles.input}
      readOnly={true}
      value="npm install react-musiio-player"
    />
  </div>
);

export default About;
