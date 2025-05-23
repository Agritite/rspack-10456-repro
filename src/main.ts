import { app, BrowserWindow } from 'electron';
import isThirteen from 'is-thirteen';

app.whenReady().then(async () => {
    console.log(isThirteen(13).thirteen());
    const wnd = new BrowserWindow({ show: false });
    await wnd.loadURL('https://rspack.dev');
    wnd.show();
});
