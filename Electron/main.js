const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        center: true,
        titleBarStyle: 'hiddenInset',
        icon: __dirname + 'icon.icns',
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

}

ipcMain.on('resize-to-bigger', (event, arg) => {
    mainWindow.setSize(1300, 750, false);
    mainWindow.center();
    mainWindow.setMinimumSize(1300, 750);
});

ipcMain.on('resize-to-smaller', (event, arg) => {
    mainWindow.setMinimumSize(800, 600);
    mainWindow.setSize(800, 600, false);
    mainWindow.center();
});

ipcMain.on('resize-to-double', (event, arg) => {
    if (!mainWindow.isMaximized()) {
        mainWindow.maximize()
    } else {
        mainWindow.setSize( mainWindow.getMaximumSize()[0],  mainWindow.getMaximumSize()[1], true);
        mainWindow.center();
    }
});

app.on('ready', createWindow);
