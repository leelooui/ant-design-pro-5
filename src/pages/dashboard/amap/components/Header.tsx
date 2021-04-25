import React from 'react';
import styles from './Header.less';

const Header: React.FC<any> = (props) => {
  const { count, pCount, iCount } = props;

  return (
    <div className={styles.hBox}>
      <div className={styles.item}>
        <span className={styles.text}>高德地图</span>
      </div>
    </div>
  );
};
export default Header;
