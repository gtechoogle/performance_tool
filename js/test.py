import os
import subprocess

cwd = os.getcwd()
# if 'python' in os.listdir(cwd):
print "i am in"
os.chdir('F:\\workspaces\\Github_workspaces\\performance_tool\python\\systrace')
print os.getcwd()
cmd = 'systrace.bat'
b = os.system(cmd)
# os.chdir(cwd)
    # filepath="D:/path/to/batch/myBatch.bat"
    # p = subprocess.Popen(filepath, shell=True, stdout = subprocess.PIPE)

    # stdout, stderr = p.communicate()
    # print p.returncode # is 0 if success