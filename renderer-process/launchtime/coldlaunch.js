const { BrowserWindow } = require('electron').remote
const path = require('path')

const startcatchBtn = document.getElementById('start-cold-launch')
const showtraceBtn = document.getElementById('show-cold-launch-trace')
const consoleScreen = document.getElementById('cold-launch-console')
let win
var consoleOutput = ""

startcatchBtn.addEventListener('click', (event) => {
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

    const filepath = path.join(__dirname, '../../python/device.py')
    // cmd = "E:\\mtk_tool\\systrace\\systrace\\systrace.py"
    var PythonShell = require('python-shell');
    var pyshell = new PythonShell(filepath);

    // sends a message to the Python script via stdin
    // pyshell.send('hello');
    var outmessage = ""
    pyshell.on('message', function(message) {
        // received a message sent from the Python script (a simple "print" statement)
        // console.log(message);
        showOnConsole(message)
        if (message.indexOf("Device connected!")!=-1)
        {
            console.log("go to next step")
        } else if (message.indexOf("Trace catch done!")!=-1) 
        {
            alert("asdf ")
        }
    });
})

showtraceBtn.addEventListener('click', (event) => {
    win = new BrowserWindow({ width: 720, height: 600 })

    // win.on('resize', updateReply)
    // win.on('move', updateReply)
    win.on('close', () => { win = null })
    win.loadURL('E:\\mtk_tool\\systrace\\systrace\\YY_O1.html')
    win.show()
    // function updateReply() {
    //     const manageWindowReply = document.getElementById('manage-window-reply')
    //     const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`
    //     manageWindowReply.innerText = message
    // }
})

function showOnConsole(message) {
    consoleOutput= consoleOutput + message + "<br />";
    console.log(consoleOutput)
    consoleScreen.innerHTML = consoleOutput;

}