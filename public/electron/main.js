const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");

const { WINDOW, SHOW_FILEMENU, HIDE_DEVTOOLS } = require('./utils/constants');



function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    x: WINDOW.position.x,
    y: WINDOW.position.y,
    width: WINDOW.size.x,
    height: WINDOW.size.y,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    },
    autoHideMenuBar: SHOW_FILEMENU //hide menu bar
  });


  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev && !HIDE_DEVTOOLS) {
    // Errors are thrown if the dev tools are opened
        // before the DOM is ready
        win.webContents.once("dom-ready", async () => {
          await installExtension([REDUX_DEVTOOLS])
              .then((name) => console.log(`Added Extension:  ${name}`))
              .catch((err) => console.log("INSTALL EXTENSION ERROR >> ", err))
              .finally(() => {
                  win.webContents.openDevTools();
              });
      });

    //win.webContents.openDevTools({ /* mode: 'detach' */ });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

/* app.on("ready", () =>
{
	setTimeout(createWindow, 400);
	installExtension(REDUX_DEVTOOLS)
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log("An error occurred: ", err));
}); */

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});