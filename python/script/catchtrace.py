import os 
import subprocess
import sys

def check_phone_status():
    print("Start ................................")
    status = -1
    output = subprocess.Popen("adb devices", shell=True, stdout=subprocess.PIPE)
    values = output.stdout.readlines()
    print (len(values))
    if len(values) <= 2:
        status = 1
        print ("No device connected!")
        return
    elif len(values) > 3:
        status = 2
        print ("More than one device connected!")
        return
    output = subprocess.Popen("adb root", shell=True, stdout=subprocess.PIPE)
    output = subprocess.Popen("adb remount", shell=True, stdout=subprocess.PIPE)
    values = output.stdout.readlines()
    print (values[0])
    if (values[0].find("Not running as root") != -1) :
        status = 3
        print ("This is unroot load")
    if (values[0].find("remount succeeded") != -1) :
        status = 0
    return status

def catch_unroot_phone_systrace():
    print "start to catch"
    cmd = "python E:\\mtk_tool\\systrace\\systrace\\systrace.py --time=10 -b 10000 -o mytrace.html sched gfx input view wm am res dalvik freq power camera"
    os.system(cmd)
    # output = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    # values = output.stdout.readlines()
    # print values

def catch_root_phone_systrace():
    pass

def main():
    phone_status = check_phone_status()
    if phone_status == 0:
        print ('ready to catch trace')
        catch_unroot_phone_systrace()
    elif phone_status == 1:
        pass
    elif phone_status == 2:
        pass
    elif phone_status == 3:
        catch_unroot_phone_systrace()
    else:
        catch_root_phone_systrace()


if __name__ == '__main__':
    main()