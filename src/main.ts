import { app, BrowserWindow } from 'electron';
import fetch from 'node-fetch';
import { nanoid } from 'nanoid';
import { lowerCase } from 'lodash-es';

app.whenReady().then(async () => {
    console.log(lowerCase(nanoid()));
    const resp = await fetch('https://rspack.dev');
    if (!resp.ok) {
        console.error('Failed to fetch rspack.dev:', resp.statusText);
        app.quit();
        return;
    }
    console.log('rspack.dev is reachable');
    const wnd = new BrowserWindow({ show: false });
    await wnd.loadURL('https://rspack.dev');
    wnd.show();
});
