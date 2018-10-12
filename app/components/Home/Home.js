import React from 'react'
import { CSS, units, color, constants } from 'electron-css';

import UnAuthenticated from '../Auth/components/Auth/UnAuthenticated'
import Container from '../../shared/components/Grid/Container'
import Welcome from './components/Welcome'
// import Inspim './components/Footer'

// import styles from './Home.scss'
const styles_container= CSS({
  'padding': '0',
  '> div' : {
    'margin': '0 auto',
    'width': '100%',
    'position': 'relative',
  }
});
const Home = () => (
  <UnAuthenticated>
    <Container className={styles_container}>
      <Welcome />
    </Container>
  </UnAuthenticated>
)

export default Home
{/* <UnAuthenticated>
<Container className={styles_container}>
  <Welcome />
</Container>
</UnAuthenticated> */}