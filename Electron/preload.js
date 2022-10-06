const _setImmediate = setImmediate;
const _clearImmediate = clearImmediate;

const { ipcRenderer } = require('electron');

process.once('loaded', () => {
    global.setImmediate = _setImmediate;
    global.clearImmediate = _clearImmediate;
});

window.reload = function () {
    ipcRenderer.send('reload');
};

window.resizeWindow = function () {
    ipcRenderer.send('resize-to-bigger');
};

window.resizeDouble = function () {
    ipcRenderer.send('resize-to-double');
};

window.resizeWindowSmaller = function () {
    ipcRenderer.send('resize-to-smaller');
};


