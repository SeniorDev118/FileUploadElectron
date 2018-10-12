import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { CSS, units, color, constants } from 'electron-css'
import Logo from '../Logo/Logo'
import HeaderMenu from './HeaderMenu'
import { InputFieldWithIcon, Container, Row, Column, Icon, Tags } from '../../../../shared/index'
import { styles_icon_profile } from '../../../../shared/components/Icon/Icon'
import { loadTagsAction } from '../../../../shared/entities/tagActions'

//import styles from './Header.scss'

const styles_header= CSS({
  'display': 'flex',
  'flex-direction': 'row',
  'height': 'var(--headerHeight)',
  'width': '100%',
  'position': 'fixed',
  'z-index': '10',
  'margin-right': '-15px',
  'margin-left': '-15px',
  'color': 'var(--white)',
  'background': 'var(--lightBgGrey)'
});

const styles_headerSearch= CSS({
  'font-size': '14px',
  'display': 'inline-block',
  'width': '350px',
  'height': '100%',
  'padding': '10px 0'
});

const styles_profileButton= CSS({
  'height': '50px',
  'width': '50px',
  'background': 'transparent',
  'text-align': 'center',
  'white-space': 'nowrap',
  'vertical-align': 'middle',
  'user-select': 'none',
  'cursor': 'pointer',
  'border': 'none',
  'padding-left': '20px',
  'padding-top': '10px',
  'position': 'relative',
  ['focus']: {
    'outline': 'none'
  }
});


class Header extends Component {
  constructor(props) {
    super(props)

    this.menuRef = React.createRef()
    this.menuButtonRef = React.createRef()
  }

  state = {
    inputValue: '',
    menuOpen: false
  };

  componentDidMount() {
    this.props.loadTags()
    document.addEventListener('mousedown', this.handeClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handeClick, false)
  }

  onSearch = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  onProfileClick = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  navigateToSharedLinks = () => {
    this.setState({ menuOpen: false }, () => {
      this.props.navigateTo('/shared-links')
    })
  }

  navigateToSettings = () => {
    this.setState({ menuOpen: false }, () => {
      this.props.navigateTo('/settings')
    })
  }

  handeClick = (e) => {
    if (!this.menuRef.current || !this.menuButtonRef.current) {
      return null
    }

    if (!this.menuButtonRef.current.contains(e.target) && !this.menuRef.current.contains(e.target)) {
      this.setState({
        menuOpen: false
      })
    }
  }

  filterTags = () => {
    const { inputValue } = this.state
    const { tags } = this.props

    const value = inputValue.toLowerCase()

    if (value.length < 2) {
      return []
    }

    return tags.filter(data => value.includes(data.name.toLowerCase()))
  };

  render() {
    const { inputValue, menuOpen } = this.state
    const { tags } = this.props

    return (
      <div className={styles_header}>
        <Container>
          <Row>
            <Column width={220}>
              <Logo />
            </Column>
            <Column>
              {false && (
                <div className={styles_headerSearch}>
                  <InputFieldWithIcon
                    icon="magnify"
                    value={inputValue}
                    theme="light"
                    placeholder="Search tags, folders, files..."
                    onChange={this.onSearch}
                  />
                </div>
              )}
              {false && tags && <Tags items={this.filterTags()} />}
            </Column>
            <Column width={60} align="right">
              <button
                ref={this.menuButtonRef}
                className={styles_profileButton}
                onClick={this.onProfileClick}
              >
                <Icon icon={styles_icon_profile} />
              </button>
              {menuOpen && (
                <HeaderMenu
                  ref={this.menuRef}
                  onSettingsClick={this.navigateToSettings}
                  onSharedLinksClick={this.navigateToSharedLinks}
                />
              )}
            </Column>
          </Row>
        </Container>
      </div>
    )
  }
}

Header.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape()),
  loadTags: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired
}

Header.defaultProps = {
  tags: null
}

const mapStateToProps = state => ({
  tags: state.tags.items
})

const mapDispatchToProps = dispatch => ({
  loadTags: () => dispatch(loadTagsAction()),
  navigateTo: url => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)


