const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
  })

  win.maximize();
  win.show();
  win.setMenu(null);

  win.loadFile('pages/dash.html')
  // win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()


  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
