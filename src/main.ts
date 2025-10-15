import { app, BrowserWindow } from 'electron';

app.whenReady().then(async () => {
    console.log(require.resolve('electron/LICENSE'));
    console.log(require.resolve('ctrlc-windows/dist/x64/process-killer.exe'));
    const wnd = new BrowserWindow({ show: false });
    await wnd.loadURL('https://rspack.dev');
    wnd.show();
});
