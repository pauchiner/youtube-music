const {app, BrowserWindow} = require('electron')

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      partition: 'persist:data'
    }
  })

  mainWindow.loadURL('https://music.youtube.com');

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.show();
  })

  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
  createWindow();

  const persistSession = mainWindow.webContents?.session;
  
  if(!persistSession) return;

  persistSession.cookies.flushStore();
  persistSession.flushStorageData();
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', () => {
  if (mainWindow === null) createWindow();
})
