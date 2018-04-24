var drag = document.getElementById("file-holder")
var apkinfotable = document.getElementById("app-section")
var apkname
var versionname

drag.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length == 1) {
        var filepath = e.dataTransfer.files[0].path;
        if (filepath.endsWith("apk") == false) {
            alert("The file format is incorrect, please select an apk file!");
            return;
        }
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
    var parentpath = temppath.slice(0, index)
    console.log(parentpath)
    const path = require('path');
    var aaptpath = path.join(parentpath, 'tools', 'aapt', 'aapt.exe')
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
            updateDragbox(apkpath)
            apkinfo = parseinfo(data[0])
            console.log(data[0]);
            insertData(apkinfo)
        }
    });
}

function updateDragbox(apkpath) {
    // console.log(apkpath)
    // var temp = apkpath
    var elementP = document.getElementById("apk-file-path")
    elementP.innerText = apkpath
}

function insertData(data) {
    var code = '<TABLE>';
    code += '<TR><TH>Package Name</TH><TH>App version</TH></TR>';
    code += '<TR><TD>' + data[0] + '</TD><TD>' + data[1] + '</TD></TR>';
    apkinfotable.innerHTML = code + '</TABLE>';
}

function parseinfo(data) {
    var pkgname = ''
    var apkversion = ''
    var apkinfo = data.split(" ")
    console.log('parseinfo')
    console.log(apkinfo)
    apkinfo.forEach(element => {
        if (element.indexOf("name") != -1) {
            pkgname = element.substring(element.indexOf("'") + 1, element.lastIndexOf("'"));
            console.log("------")
            console.log(pkgname)
        } else if (element.indexOf("versionName") != -1) {
            apkversion = element.substring(element.indexOf("'") + 1, element.lastIndexOf("'"));
        }
    });
    return [pkgname, apkversion]
}