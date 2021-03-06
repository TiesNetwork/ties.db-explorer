const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

const Database = require('../server/database');
const menu = require('./menu');
const server = require('../server');

let mainWindow;
let connectionWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 480,
    title: 'Ties.DB | Connection',
    width: 800,
  });

  mainWindow.loadURL(
    `${process.env.ELECTRON_START_URL}#/connections` || url.format({
      pathname: path.join(__dirname, './../build/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  isDev && mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  !isDev && Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
};

app.on('activate', () => mainWindow === null && createWindow());
app.on('ready', async() => {
  await Database.get(`${app.getPath('userData')}/db`);
  app.server = server.listen(3001, () => setTimeout(() => createWindow(), 2000));
});
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

ipcMain.on('reload', event => mainWindow && mainWindow.reload());
