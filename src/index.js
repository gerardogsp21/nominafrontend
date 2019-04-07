import { app, BrowserWindow, Menu } from 'electron';
var Client = require('node-rest-client').Client;
const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
	});
}

let mainWindow, listWindowEmployees, listWindowPayrolls;

app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'views/employees/employees.html'),
		protocol: 'file',
		slashes: true
	}));

	const mainMenu =  Menu.buildFromTemplate(optionsMenu);
	Menu.setApplicationMenu(mainMenu);

	mainWindow.on('closed', () => {
		app.quit();
	});
});

const optionsMenu = [
	{
		label: 'Empleados',
		click() {
			listNewEmployee();
		},
		// submenu: [
		// 	{
		// 		label: 'Ver',
		// 		accelerator: 'Ctrl+N',
		// 		click() {
		// 			listNewEmployee();
		// 		}				
		// 	}
		// ]
	},
	{
		label: 'Nominas',
		click() {
			listNewPayrolls();
		},
	},
	{
		label: 'Salir',
		accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
		click() {
			app.quit();
		}
	}
];

function listNewEmployee() {
	listWindowEmployees = new BrowserWindow({
		width: 600,
		height: 600,
		title: 'Empleados'
	});

	listWindowEmployees.loadURL(url.format({
		pathname: path.join(__dirname, 'views/employees/employees.html'),
		protocol: 'file',
		slashes: true
	}));
	listWindowEmployees.setMenu(null);

	listWindowEmployees.on('closed', () => {
		listWindowEmployees = null;
	});
}

function listNewPayrolls() {
	listWindowPayrolls = new BrowserWindow({
		width: 600,
		height: 600,
		title: 'Nominas'
	});

	listWindowPayrolls.loadURL(url.format({
		pathname: path.join(__dirname, 'views/payrolls/payrolls.html'),
		protocol: 'file',
		slashes: true
	}));
	listWindowPayrolls.setMenu(null);

	listWindowPayrolls.on('closed', () => {
		listWindowPayrolls = null;
	});
}

if (process.env.NODE_ENV !== 'production') {
	optionsMenu.push({
		label: 'DevTools',
		submenu: [
			{
				label: 'Show DevTools',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				},
				accelerator: 'f12'
			},
			{
				label: 'Actualizar',
				role: 'reload',
				accelerator: 'Ctrl+f5'				
			}
		]
	});
}