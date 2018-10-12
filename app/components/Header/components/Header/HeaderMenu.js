import React from 'react'
import { Link } from 'react-router-dom'
import HorizontalList from '../../../../shared/components/List/HorizontalList'

//import styles from './HeaderMenu.scss'

import { CSS, units, color, constants } from 'electron-css';

const styles_headerMenu = CSS({
  'color': 'var(--white)',
  'background': 'var(--lightBgGrey)',
  'padding': '20px 25px',
  'text-align': 'left',
  'position': 'absolute',
  'top': '60px',
  'right': '10px',
  'width': '230px',
  'box-shadow': '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);'
});

const styles_arrowUp = CSS({
  'width': '0',
  'height': '0',
  'border-left': '5px solid transparent',
  'border-right': '5px solid transparent',
  'border-bottom': '5px solid var(--lightBgGrey)',
  'top': '-5px',
  'position': 'absolute',
  'right': '15px'
});

const styles_itemList = CSS({
  'padding': '0 0 20px'
});

const styles_footer = CSS({
  'display': 'flex',
  'font-size': '10px'
});

const styles_footerInfo = CSS({
  'color': 'var(--darkTextGrey)',
  'width': '50%'
});

const styles_footerAction = CSS({
  'width': '50%',
  'text-align': 'right',
  ['a']: {
    'color': 'var(--purple)',
    ['hover']: {
      'color': 'var(--purple)'
    }
  }
});

const HeaderMenu = React.forwardRef((props, ref) => (
  <div ref={ref} className={styles_headerMenu}>
    <div className={styles_arrowUp} />
    <div className={styles_itemList}>
      <HorizontalList
        items={[
          { onClick: props.onSettingsClick, text: 'Settings' },
          { onClick: props.onSharedLinksClick, text: 'My shared links' }
        ]}
      />
    </div>
    <div className={styles_footer}>
      <div className={styles_footerInfo}>Alchemy Beta 0.2</div>
      <div className={styles_footerAction}>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  </div>
))
export default HeaderMenu
