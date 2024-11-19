import React from 'react';
import styles from './Footer.module.css'; // Importing the module CSS
import instasvg from '../../../assets/insta.svg';
import gitsvg from '../../../assets/github.svg';
import  linkedinsvg from '../../../assets/linkedin.svg';

const Footer = () => {
  return <div className={styles.footer}>
    <div className={styles.logos}>
      <a href='https://www.instagram.com/harshit_bareja07/'>
        <img src={instasvg} alt=''/>
      </a>
      <a href='https://github.com/Harshit1607'>
        <img src={gitsvg} alt=''/>
      </a>
      <a href='https://www.linkedin.com/in/harshit-bareja-359a36292/'>
        <img src={linkedinsvg} alt=''/>
      </a>
    </div>
    <span className={styles.name}>Created by <span>Harshit Bareja</span></span>
  </div>;
};

export default Footer;