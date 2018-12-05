const electron = require('electron')
const {
	app,
	elelectron,
	BrowserWindow,
	Menu,
	MenuItem,
	globalShortcut,
	ipcMain,
	BrowserView
} = electron

let mainWindow = null
let child = null

function createWindow() {
	// 获取屏幕大小
	const { width: screenWidth, height: screenHeight} = electron.screen.getPrimaryDisplay().workAreaSize

	mainWindow = new BrowserWindow({
		width: screenWidth,
		height: screenHeight,
		show: false,
		//backgroundColor: '#2e2c29',
		title: 'hello'
	})

	mainWindow.loadFile('index.html')

	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	// 模态子窗口
	/* child = new BrowserWindow({
		parent: mainWindow,
		modal: true,
		show: false,
		useContentSize: true, // 使用 web 页面的尺寸
		center: true, // 窗口在屏幕居中
		movable: true, // 窗口是否可移动
		closable: true, // 是否可关闭
	})
	child.loadURL('https://github.com')
	child.once('ready-to-show', () => {
		child.show()
	}) */
}

ipcMain.on('loadurl', (event, arg) => {
	console.log(arg)
	event.returnValue = 'pong'
})

app.on('ready', () => {
	createWindow()

	// 注册全局快捷键
	globalShortcut.register('CommandOrControl+Y', () => {
		console.log('CommandOrControl + Y')
	})
})

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
