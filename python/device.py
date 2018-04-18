import subprocess
import os

deviceInfo=[]
def connectDevcie():
    # try:
    output = subprocess.check_output('adb devices -l').split("\r\n".encode(encoding="utf-8"))
    for item in output:
        item = bytes.decode(item)
        if item != '':
            deviceInfo.append(item)
    if len(deviceInfo) <= 1:
        return False
    else:
        return True
    # except Exception, e:  
    #     print "Device Connect Fail:",e
def getscriptpath():
    print os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir)) 
def catchtrace():
    cwd = getscriptpath()
    output = os.Popen()
    pass
def main():
    connected = connectDevcie()
    if connected:
        print ("Device connected!")
        catchtrace()
        if len(deviceInfo) > 2:
            print ("More than one device connected, please check it!")
        else:
            cmd='Python E:\\Open_Source_Code\\Github\\performance_tool\\tools\\systrace\\systrace.py -b 32768 -t 5 -o mytrace.html wm gfx input view sched freq'
            output = subprocess.Popen(cmd)
    else:
        print ("Please make sure the device is connected!")

if __name__ == '__main__':
    main()