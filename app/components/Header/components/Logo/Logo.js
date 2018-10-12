import React from 'react'
import { CSS, units, color, constants } from 'electron-css';
import { Link } from 'react-router-dom'

//import styles from './Logo.scss'

const styles_logoContainer= CSS({
  'height': '100%',
  'width': '100%',
  'padding': '12px',
  'background': 'var(--backgroundLight)'
});

const styles_logoText= CSS({
  'height': '24px',
  'width': '166px',
  'display': 'inline-block',
  'background-image': 'url(./components/Header/components/Logo/alchemy_text-white.svg)',
  'background-position': 'center',
  'background-repeat': 'no-repeat'
})

const Logo = () => (
  <Link to='/folders/bucket'>
    <div className={styles_logoContainer}>
      <div className={styles_logoText} />
    </div>
  </Link>
)


export default Logo
