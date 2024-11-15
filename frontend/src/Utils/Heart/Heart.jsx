import React from 'react'
import styles from './Heart.module.css';

const Heart = ({red, onClick}) => {
  return (
   <div className={`${styles.heart} ${red ? styles.redHeart : ''}`} onClick={onClick} ></div>
  )
}

export default Heart