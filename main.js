
const path =require('path')
const url =require('url')
const { BrowserWindow, app } =require('electron')

let window = null;

app.once('ready', () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#D6D8DC"
  });
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))
})