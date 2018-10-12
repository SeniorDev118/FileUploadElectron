const path = require('path');
const { BrowserWindow } = require('electron');

class TrayWindow {
  constructor() {

console.log("====================");
console.log(__dirname);
console.log("====================");
    // let htmlPath = 'file://' + path.join(__dirname, './TrayWindow.html');
    let htmlPath = 'file://' + path.join(__dirname, './windows/Tray/TrayWindow.html');
console.log("+++++++++++++++++++++");
console.log(htmlPath);
console.log("+++++++++++++++++++++");

    this.window = new BrowserWindow({
      show: false,
      height: 109,
      width: 210,
      frame: false,
      backgroundColor: '#E4ECEF',
      resizable:false,
      transparent: true      
    });

    this.window.loadURL(htmlPath);

    this.window.on('blur', () => {
      this.window.hide();
    });
  }
}

module.exports = TrayWindow;