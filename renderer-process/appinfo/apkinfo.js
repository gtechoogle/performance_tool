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

function getAppinfo(apkpath) {
    var temppath = __filename;
    var index = temppath.indexOf('renderer-process')
    var parentpath = temppath.slice(0,index)
    console.log(parentpath)
    const path=require('path');
    var aaptpath = path.join(parentpath,'tools','aapt','aapt.exe')
    console.log(aaptpath)
    var exec = require('child_process').exec;
    var cmdStr = aaptpath + " dump badging " + apkpath;
    console.log(cmdStr)
    exec(cmdStr, function(err, stdout, stderr) {
        if (err) {
            console.log('get weather api error:' + stderr);
        } else {
            /*
            the content of stdout is liking bellows：
            {"weatherinfo":{"city":"Hongkong","cityid":"101","temp":"3","WSE":"3","qy":"1019"}}
            */
        //    console.log(stdout)
            data = stdout.split('\r\n')
            parseinfo(data[0])
            console.log(data[0]);
        }
    });
}

function parseinfo(data) {
    var apkinfo = data.split(" ")
    for (const info in apkinfo) {
        if (info.match("name") != null) {

        } else if (info.match("versionName") != null) {

        }
    }
}