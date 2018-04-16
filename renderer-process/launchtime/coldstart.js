const { BrowserWindow } = require('electron').remote
const path = require('path')

const manageWindowBtn = document.getElementById('start-cold-launch')
const showtraceBtn = document.getElementById('show-trace')
const consoleScreen = document.getElementById('console-output')
let win

manageWindowBtn.addEventListener('click', (event) => {
    //   const modalPath = path.join('file://', __dirname, '../../sections/windows/manage-modal.html')
    //   win = new BrowserWindow({ width: 400, height: 275 })

    //   win.on('resize', updateReply)
    //   win.on('move', updateReply)
    //   win.on('close', () => { win = null })
    //   win.loadURL(modalPath)
    //   win.show()

    //   function updateReply () {
    //     const manageWindowReply = document.getElementById('manage-window-reply')
    //     const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`
    //     manageWindowReply.innerText = message
    //   }
    const manageWindowBtn = document.getElementById('cold-launch')

    cmd = "E:\\mtk_tool\\systrace\\systrace\\systrace.py"
    var PythonShell = require('python-shell');
    var pyshell = new PythonShell(cmd);

    // sends a message to the Python script via stdin
    // pyshell.send('hello');
    var outmessage = ""
    pyshell.on('message', function(message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);

        showOnConsole(message)
    });
})

showtraceBtn.addEventListener('click', (event) => {
    win = new BrowserWindow({ width: 720, height: 600 })

    // win.on('resize', updateReply)
    // win.on('move', updateReply)
    win.on('close', () => { win = null })
    win.loadURL('https://github.com')
    win.show()

    // function updateReply() {
    //     const manageWindowReply = document.getElementById('manage-window-reply')
    //     const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`
    //     manageWindowReply.innerText = message
    // }
})

function showOnConsole(message) {
    var console_content = consoleScreen.innerText + message + '\n';
    consoleScreen.innerHTML = console_content;

}