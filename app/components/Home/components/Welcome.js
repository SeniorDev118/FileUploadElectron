import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CSS, units, color, constants } from 'electron-css';
import { postRequest } from '../../../shared/utils/ApiRepository'
import { getTagId, getFolderId, isTagRoute, isFolderRoute } from '../../../shared/utils/LocationHelper'

//import styles from './FrontTop.scss'
const div_window = CSS({
  'display': 'block',
  'text-align': 'right',
  'width': '100%',
});

const window_button = CSS({
  'color': 'white',
  'background-color': '#171717',
  'border': '0px',
  'font-size': '20px'
});

const container_welcome = CSS({
  'background-color': '#171717',
  'padding': '40px 20px'
});

const div_logo = CSS({
  'margin': '8px auto 0',
  'width': '183px',
  'height': '19px',
  'color': 'white',
  'text-align': 'center'
});

const container_imagePath = CSS({
  'background-color': '#171717',
  'padding': '40px 20px',
  'text-align': 'left'
});

const container_logo = CSS({
  'background-color': '#171717',
  'padding': '40px 20px',
  'text-align': 'left'
});


const container_fileUpload = CSS({
  'background-color': '#171717',
  'padding': '40px 20px',
  'text-align': 'left'
});

const styles_emptyContentText = CSS({
  'width': '100%',
  'height': '100%',
  'display': 'flex',
  'justify-content': 'center',
  'align-items': 'center'
});

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = { text_logo: '' };
  }

  componentDidMount = () => {
    this.startWatcher(global.IMAGE_PATH, this);
  }

  componentWillUnmount = () => {

  }

  closeWindow = () => {
    // const { BrowserWindow } = require('electron').remote
    // var window = BrowserWindow.getFocusedWindow();
    // window.close();
  }

  minimizeWindow = (e) => {
    this.props.onMinimize();
  }

  setLogoText = (logo) => {
    this.setState({ text_logo: logo });
  }

  startWatcher = (path, parent) => {
    var parent = parent;
    var chokidar = require("chokidar");
    var isScanStart = false;
    
    const { userId } = parent.props

    var watcher = chokidar.watch(path, {
      ignored: /[\/\\]\./,
      persistent: true
    });

    function onWatcherReady(logo) {
      parent.setLogoText(logo);
    }

    function isImageFile(path) {
      var extension = (path.split('.').pop()).toLowerCase();
      if (extension == 'jpg' || extension == 'png' || extension == 'git') {
        if (path.indexOf('screenshot') != -1 || path.indexOf('screen shot') != -1) {
          return true;
        }
      }
      return false;
    }

    function getFileExtension(path) {
      return (path.split('.').pop()).toLowerCase();
    }

    function getFileName(path) {
      if (path) {
        var startIndex = (path.indexOf('\\') >= 0 ? path.lastIndexOf('\\') : path.lastIndexOf('/'));
        var filename = path.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1);
        }
      }
    }

    watcher
      .on('ready', function () {
        if (!this.isScanStart) {
          //onWatcherReady('Ready');
          this.isScanStart = true;
        }
      })
      .on('add', function (path) {
        if (this.isScanStart) {
          console.log('File', path, 'has been added');
          if (isImageFile(path)) {
            var fs = require('fs');
            var fileImage = fs.readFileSync(path);
            // convert binary data to base64 encoded string
            var bitmap = new Buffer(fileImage);
            var base64 = bitmap.toString('base64');
            var size = fileImage.length;

            var sizeOf = require('image-size');
            var dimensions = sizeOf(path);
            console.log(dimensions.width, dimensions.height);

            var width = dimensions.width;
            var height = dimensions.height;
            var name = getFileName(path);

            var fileExtension = getFileExtension(path);

            var base64str = "data:image/" + fileExtension + ";base64," + base64;
            //var base64str = "data:image/jpeg;base64," + base64;
            const filesData = [{
              file: base64str,
              name: name,
              width: width,
              height: height,
              size: size,
              user: userId,
              folder: null
            }];

            postRequest('assets/bulk', filesData).then((responses) => {
              onWatcherReady('File ' + path + ' is uploaded')
            }).catch(() => {
              this.setState({ isUploading: false })
            })
          }
        }
      })
      .on('addDir', function (path) {
        if (this.isScanStart) {
          console.log('Directory', path, 'has been added');
          onWatcherReady('Directory' + path + ' has been added')
        }
      })
      .on('change', function (path) {
        if (this.isScanStart) {
          console.log('File', path, 'has been changed');
          onWatcherReady('File' + path + ' has been changed')
        }
      })
      .on('unlink', function (path) {
        if (this.isScanStart) {
          console.log('File', path, 'has been removed');
          onWatcherReady('File' + path + ' has been removed')
        }
      })
      .on('unlinkDir', function (path) {
        if (this.isScanStart) {
          console.log('Directory', path, 'has been removed');
          onWatcherReady('Directory' + path + ' has been removed')
        }
      })
      .on('error', function (error) {
        if (this.isScanStart) {
          console.log('Error happened', error);
          onWatcherReady('Error happened')
        }
      })
      .on('raw', function (event, path, details) {
        // This event should be triggered everytime something happens.
        if (this.isScanStart) {
          console.log('Raw event info:', event, path, details);
        }
      });
  }

  // onFilesChange = (files) => {
  //   if (files.length > 0) {
  //     this.onFileUpload(files)
  //   }
  // };

  onFilesError = (error) => {
    throw new Error(`error code ${error.code}: ${error.message}`)
  };

  render() {

    const { pathname } = ''
    const tag = (isTagRoute(pathname) && tags.find(t => t.id === getTagId(pathname))) || null
    const folder = (isFolderRoute(pathname) && folders.find(f => f.id === getFolderId(pathname))) || null

    return (
      <div className={div_window}>
        <div id="title-bar-btns" className="style_titlebar">
          <button className={window_button} id="minimize-btn" onClick={this.minimizeWindow}>―</button>
          <button className={window_button} id="close-btn" onClick={this.closeWindow}>X</button>
        </div>
        <div className={container_welcome}>
          <div className={div_logo}>
            You are Welcome
          </div>
        </div>
        <div className={container_imagePath}>
          <div>
            <font className={div_logo}>{global.IMAGE_PATH} is your watch folder</font>
          </div>
        </div>
        <div className={container_logo}>
          <div>
            <font className={div_logo}>{this.state.text_logo}</font>
          </div>
        </div>
        <div className={container_fileUpload}>
        </div>
      </div>
    )
  }
}
// {/* <div className={container_fileUpload}>
//   <FileUpload
//     tag={tag}
//     folder={folder}
//     className={styles_emptyContentText}
//     onFolderUpload={this.onFolderUpload}
//   >
//     <UploadText />
//   </FileUpload>

// </div> */}

Welcome.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape()),
  folders: PropTypes.arrayOf(PropTypes.shape()),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  onMinimize: PropTypes.func,
}

Welcome.defaultProps = {
  tags: null,
  folders: null
}

const mapStateToProps = state => ({
  tags: state.tags.items,
  folders: state.folders.items,
  userId: state.auth.user.url,
})

const mapDispatchToProps = dispatch => ({
  loadTags: () => dispatch(loadTagsAction()),
  loadFolders: () => dispatch(loadFoldersAction())
})


export default connect(mapStateToProps)(Welcome)