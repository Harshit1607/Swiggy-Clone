import React from 'react';
import styles from './Footer.module.css'; // Importing the module CSS
import instasvg from '../../../assets/insta.svg';
import gitsvg from '../../../assets/github.svg';
import  linkedinsvg from '../../../assets/linkedin.svg';

const Footer = () => {
  return <div className={styles.footer}>
    <div className={styles.logos}>
    <a href='https://www.instagram.com/harshit_bareja07/' target="_blank" rel="noopener noreferrer">
  <img src={instasvg} alt='' />
</a>
<a href='https://github.com/Harshit1607' target="_blank" rel="noopener noreferrer">
  <img src={gitsvg} alt='' />
</a>
<a href='https://www.linkedin.com/in/harshit-bareja-359a36292/' target="_blank" rel="noopener noreferrer">
  <img src={linkedinsvg} alt='' />
</a>

</div>

<a href='https://harshitbareja.onrender.com/' target="_blank" rel="noopener noreferrer">
  <span className={styles.name}>Created by <span>Harshit Bareja</span></span>
</a>

  </div>;
};

export default Footer;