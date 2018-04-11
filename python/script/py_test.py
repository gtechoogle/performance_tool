# -*-coding:utf-8 -*-
import sys
import os
import subprocess
print (sys.argv)
print ('start to get trace data')
print (os.listdir())

# output = os.popen('python E:\\program_tools\\sdk\\platform-tools\\systrace\\systrace.py')
# print (output.read())
# print ('here we are')

(status, output) = subprocess.getstatusoutput('python E:\\program_tools\\sdk\\platform-tools\\systrace\\systrace.py')
print (status)
print (output)
