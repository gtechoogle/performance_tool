import subprocess

deviceInfo=[]
def connectDevcie():
    try:
        output= subprocess.check_output('adb devices -l').split("\r\n")
        for item in output:
            if item != '':
                deviceInfo.append(item)
        if len(deviceInfo) <= 1:
            return False
        else:
            return True
    except Exception,e:  
        print "Device Connect Fail:",e

def main():
    connected = connectDevcie()
    if connected:
        print "Device connected!"
        if len(deviceInfo) > 2:
            print "More than one device connected, please check it!"
    else:
        print "Please make sure the device is connected!"

if __name__ == '__main__':
    main()