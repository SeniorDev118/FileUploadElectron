'use strict';

const path = require('path');
const { BrowserWindow } = require('electron');

let TrayWindow = class TrayWindow {
  constructor() {

    let htmlPath = path.join(__dirname, './TrayWindow.html');

    this.window = new BrowserWindow({
      show: false,
      height: 109,
      width: 210,
      frame: false,
      backgroundColor: '#E4ECEF',
      resizable: false,
      transparent: true
    });

    this.window.loadURL(htmlPath);

    this.window.on('blur', () => {
      this.window.hide();
    });
  }
};


module.exports = TrayWindow;
//# sourceMappingURL=TrayWindow.js.map