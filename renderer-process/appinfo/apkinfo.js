var drag = document.getElementById("file-holder")
var apkname
var versionname

drag.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length == 1) {
        filepath = e.dataTransfer.files[0].path;
        getAppinfo(filepath)
    } else {
        for (let f of e.dataTransfer.files) {
            console.log('File(s) you dragged here: ', f.path)
        }
    }

    document.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
})

function getAppinfo(path) {
    var exec = require('child_process').exec;
    var cmdStr = 'E:\\Open_Source_Code\\Github\\performance_tool\\tools\\aapt\\aapt.exe dump badging ' + path;
    console.log(cmdStr)
    exec(cmdStr, function(err, stdout, stderr) {
        if (err) {
            console.log('get weather api error:' + stderr);
        } else {
            /*
            the content of stdout is liking bellows：
            {"weatherinfo":{"city":"Hongkong","cityid":"101","temp":"3","WSE":"3","qy":"1019"}}
            */
            data = stdout.split('\r\n')
            parseinfo(data)
            console.log(data[0]);
        }
    });
}

function parseinfo(params) {
    var apkinfo = params.split(" ")
    for (const info in apkinfo) {
        if (info.match("name") != null) {

        } else if (info.match("versionName") != null) {

        }
    }
}