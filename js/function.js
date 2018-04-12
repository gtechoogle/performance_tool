document.getElementById("catch_trace").onclick = function() {
    // alert('123')
    // require('child_process').exec('python test.py')
    // var exec = require('child_process').exec;
    // var arg1 = 'hello'
    // var arg2 = 'jzhou'
    // exec('python test.py',function(error,stdout,stderr){
    //     if(stdout.length >1){
    //         console.log('you offer args:',stdout);
    //     } else {
    //         console.log('you don\'t offer args');
    //     }
    //     if(error) {
    //         console.info('stderr : '+stderr);
    //     }
    // });
    // var PythonShell = require('python-shell');
    // var pyshell = new PythonShell('test.py');

    // sends a message to the Python script via stdin
    // pyshell.send('hello');

    // pyshell.on('message', function (message) {
    // // received a message sent from the Python script (a simple "print" statement)
    // console.log(message);
    // });

    // PythonShell.run('test.py', function (err) {
    // if (err) throw err;
    // console.log('2');
    // console.log('finished');
    // });
    var fs = require("fs")
    path = require('path');
    path = __dirname + "\\python\\script\\catchtrace.py"
    console.log(path)
    var exec = require('child_process').exec;
    var arg1 = 'hello'
    var arg2 = 'jzhou'
    cmd = "python " + path;
    exec(cmd, function(error, stdout, stderr) {
        if (stdout.length > 1) {
            console.log("-----------------------\n");
            console.log('you offer args:\n', stdout);
            showdata(stdout);
        } else {
            console.log('you don\'t offer args');
        }
        if (error) {
            console.info('stderr : ' + stderr);
            console.log('you offer args:', stderr);
        }
    });
};

function showdata(stdout) {
    document.getElementById("console_output").innerText = stdout
}