'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDevelopment = process.env.NODE_ENV === 'development';

const TrayWindow = require('../renderer/windows/Tray/TrayWindow');
const TrayIcon = require('../renderer/windows/Tray/TrayIcon');

let mainWindow = null;
let trayWindow = null;
let trayIcon = null;

let forceQuit = false;
let tray = undefined;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

_electron.crashReporter.start({
  productName: 'Electron Alchemy',
  companyName: 'Electron Co',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false
});

_electron.app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  //createTray();

  // var remote = require('electron').remote;     
  // remote.getGlobal('Global_Var').API_URL = "https://api.alchemy.is";     

  mainWindow = new _electron.BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden',
    width: 372,
    height: 538,
    minWidth: 372,
    minHeight: 538,
    // maxWidth: 372,
    // maxHeight: 538,
    show: true
  });

  trayWindow = new TrayWindow();
  trayIcon = new TrayIcon(trayWindow.window, mainWindow);

  mainWindow.loadFile(_path2.default.resolve(_path2.default.join(__dirname, '../renderer/index.html')));
  mainWindow.setMenu(null);

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.on('blur', () => {
    mainWindow.hide();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      _electron.app.on('activate', () => {
        mainWindow.show();
      });

      _electron.app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {

      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });

  if (isDevelopment) {
    // auto-open dev tools
    //mainWindow.webContents.openDevTools();

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      _electron.Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(props.x, props.y);
        }
      }]).popup(mainWindow);
    });
  }

  const hideWindow = () => {
    if (mainWindow != null) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
        //***** mac *****
        // app.dock.hide();
      }
    }
  };

  const showWindow = () => {
    if (mainWindow != null) {
      if (!mainWindow.isVisible()) {
        mainWindow.show();
        // ***** mac *****
        // app.dock.show();
        // ***** windwos *****
      }
    }
  };
  _electron.ipcMain.on('show-window', () => {
    showWindow();
  });

  _electron.ipcMain.on('hide-window', () => {
    hideWindow();
  });

  _electron.ipcMain.on('signout-window', () => {
    trayWindow.window.hide();
  });

  _electron.ipcMain.on('quit-app', function () {
    _electron.app.quit();
  });
});
//# sourceMappingURL=index.js.map