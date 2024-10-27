import React, { useState } from 'react'
import styles from './UserSettings.module.css'

const UserSettings = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }
  return (
    <div className={styles.userSettings}>
      <div className={styles.settingContainer}>
        <span>SMS Preferences</span>
      </div>
      <div className={styles.settingContainer}>
        <span>Order related SMS cannot be disabled as they are critical to provide service</span>
      </div>
      <div className={styles.settingContainer}>
        <div className={styles.settingChilds}>
          <span>Recommendations & Reminders</span>
          <button onClick={handleToggle} style={{
            backgroundColor: toggle ? "#fc8019" : "rgb(200, 200, 200)"
          }}
          >
            <span style={{
            left: toggle ? "" : '10%',
            right: toggle ? '10%' : "",
            }}
            ></span>
          </button>
        </div>
        <div className={styles.settingChilds}>
          <span>Keep this on to receive offer recommendations & timely reminders based on your interests</span>
        </div>
      </div>
    </div>
  )
}

export default UserSettings