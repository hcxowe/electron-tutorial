const electron = require('electron')
const {
	app,
	elelectron,
	BrowserWindow,
	Menu,
	MenuItem,
	globalShortcut
} = electron

let mainWindow = null

function createWindow() {
	// 获取屏幕大小
	const { width: screenWidth, height: screenHeight} = electron.screen.getPrimaryDisplay().workAreaSize

	mainWindow = new BrowserWindow({
		width: screenWidth,
		height: screenHeight
	})

	mainWindow.loadFile('index.html')

	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})