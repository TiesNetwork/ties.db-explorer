import React from 'react';

// Containers
import About from './containers/About';
import Connections from './containers/Connections';

// Styles
import styles from './Welcome.scss';

const Welcome = () => (
  <div className={styles.Root}>
    <div className={styles.About}>
      <About />
    </div>

    <div className={styles.Connections}>
      <Connections />
    </div>
  </div>
);

export default Welcome;
