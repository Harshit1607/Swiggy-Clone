import React from 'react'
import styles from './UserButtonContainer.module.css';

const UserButtonContainer = () => {

  return (
    <div className={styles.userButtonContainer}>
      <div className={styles.userButtons}>
        <span>Address</span>
      </div>
      <div className={styles.userButtons}>
        <span>Orders</span>
      </div>
      <div className={styles.userButtons}>
        <span>Favourite</span>
      </div>
      <div className={styles.userButtons}>
        <span>Settings</span>
      </div>
    </div>
  )
}

export default UserButtonContainer