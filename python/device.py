import subprocess
import os
import re

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
def get_standard_systrace_path():
    parentpath=os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
    return os.path.join(parentpath,"tools","systrace","systrace.py")
    # print scriptpath
def catch_root_trace():
    pass
def catch_mtk_trace():
    if root_phone():
        catch_root_trace()
    else:
        print("Phone can not root successfully, will use standard way to catch trace!")
        catch_standard_trace()
def run_cmd(cmd):
    return subprocess.Popen(cmd,
                            shell=True,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE).communicate()
def root_phone():
    command="adb root"
    output = run_cmd(command)
    command="adb remount"
    output = run_cmd(command)
    if len(output) > 1:
        data = output[0].split('\r\n')
        for item in data:
            if item.find("remount succeeded") != -1:
                return True
    return False

def catch_standard_trace():
    cmd = get_standard_systrace_path()
    argument=" --time=10 -b 10000 -o coldstart.html sched gfx input view wm am res dalvik freq power camera"
    cmd = "python " + cmd + argument
    output = subprocess.Popen(cmd)
def catchtrace():
    product = get_phoneproduct()
    print product
    if product.find('alps') != -1:
        print ("MTK platform phone detect")
        catch_mtk_trace()
    else:
        catch_standard_trace()
def get_phoneproduct():
    product = ''
    output = subprocess.check_output('adb shell getprop').split("\r\n".encode(encoding="utf-8"))
    if len(output):
        for item in output:
            if(item.find("ro.product.manufacturer")!=-1):
                value = re.findall(r'\[.*?\]',item)
                if len(value) == 2:
                    product = value[1]
                    break
    return product

def main():
    connected = connectDevcie()
    if connected:
        print ("Device connected!")
        catchtrace()
        # if len(deviceInfo) > 2:
        #     print ("More than one device connected, please check it!")
        # else:
        #     cmd='Python E:\\Open_Source_Code\\Github\\performance_tool\\tools\\systrace\\systrace.py -b 32768 -t 5 -o mytrace.html wm gfx input view sched freq'
        #     output = subprocess.Popen(cmd)
    else:
        print ("Please make sure the device is connected!")

if __name__ == '__main__':
    # main()
    catchtrace()