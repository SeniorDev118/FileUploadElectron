'use strict';

var _electronIs = require('electron-is');

var _electronIs2 = _interopRequireDefault(_electronIs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = require('path');
const { Tray } = require('electron');
const { ipcRenderer } = require('electron');
let TrayIcon = class TrayIcon {
  constructor(trayWindow, mainWindow) {

    let iconPath;
    if (_electronIs2.default.windows()) {
      iconPath = path.join(__dirname, '../../public/icons/Win-Taskbar@1x.png');
    } else if (_electronIs2.default.macOS) {
      iconPath = "file://" + path.join(__dirname, '../../public/icons/Mac-Menubar.png');
    } else {
      iconPath = path.join(__dirname, '../../public/icons/Win-Taskbar@1x.png');
    }

    this.trayIcon = new Tray(iconPath);
    this.trayIcon.setToolTip('Electron Alchmy');

    this.trayIcon.on('right-click', (e, bounds) => {
      if (trayWindow.isVisible()) {
        trayWindow.hide();
      } else {
        trayWindow.setPosition(bounds.x - 210 + bounds.width / 2, bounds.y - 109 + bounds.height);
        trayWindow.setAlwaysOnTop(true);
        trayWindow.show();
      }
    });

    this.trayIcon.on('click', e => {
      mainWindow.show();
      // ***** mac *****
      // app.dock.show();
      // ***** windwos *****
      trayWindow.hide();
    });
  }

  updateTitle(title) {
    this.trayIcon.setTitle(title);
  }
};


module.exports = TrayIcon;
//# sourceMappingURL=TrayIcon.js.map