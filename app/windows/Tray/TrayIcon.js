const path = require('path');
const { Tray } = require('electron');
const { ipcRenderer } = require('electron');
import is from 'electron-is'

class TrayIcon {
  constructor(trayWindow, mainWindow) {

    let iconPath;
    if(is.windows()) {
      iconPath = path.join(__dirname, './public/icons/Win-Taskbar@1x.png');
    }else if(is.macOS()) {
      iconPath = path.join(__dirname, './public/icons/Win-Taskbar@1x.png');
    }else {
      iconPath = path.join(__dirname, './public/icons/Win-Taskbar@1x.png');
    }

    this.trayIcon = new Tray(iconPath);
    this.trayIcon.setToolTip('Electron Alchmy');

    this.trayIcon.on('right-click', (e, bounds) => {
      if ( trayWindow.isVisible() ) {
        trayWindow.hide();
      } else {
        if(is.windows()) {
          trayWindow.setPosition(bounds.x - 210 + bounds.width / 2, bounds.y - 109 + bounds.height);
        }else if(is.macOS()){
          trayWindow.setPosition(bounds.x, bounds.y);
        }
        trayWindow.setAlwaysOnTop(true);
        trayWindow.show();
      }
    });

    this.trayIcon.on('click', (e) => {
      mainWindow.show();
      // ***** mac *****
      // app.dock.show();
      // ***** windwos *****
      trayWindow.hide();
    });

  }

  updateTitle(title) {
    this.trayIcon.setTitle(title)
  }
}

module.exports = TrayIcon;
