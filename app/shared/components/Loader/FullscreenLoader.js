import React from 'react'
import { CSS, units, color, constants } from 'electron-css';
//import styles from './FullscreenLoader.scss'

const styles_container = CSS({
  'align-items': 'center',
  'display': 'flex',
  'height': '100vh',
  'margin': '0 auto',
  'width': '100%',
  'background-color': 'var(--darkBgGrey)',
  'z-index': '20'
});

const styles_loader = CSS({
  'height': '100px',
  'width': '120px',
  'background-image': 'url(./public/images/loader.svg)',
  'background-repeat': 'no-repeat',
  'margin': '0 auto',
  'align-self': 'center',
});


const FullscreenLoader = () => (
  <div className={styles_container}>
    <div className={styles_loader} />
  </div>
)

export default FullscreenLoader
