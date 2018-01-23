# -*- coding: utf-8 -*-
"""
Created on Mon Jan 22 14:14:52 2018

@author: binjade
"""

import serial
import time
import requests
import json
import random as rd

firebase_url = 'https://ntuyeeee.firebaseio.com/'
READ = False
UPLOAD = False
water_data = []

#Connect to Serial Port for communication
ser = serial.Serial('/dev/ttyACM1', 9600)
#Setup a loop to send Temperature values at fixed intervals
#in seconds
fixed_interval = 3
while 1:
    read_serial = ser.readline()
    if read_serial == "START\r\n":
        READ = True
        
    elif READ:
        if read_serial == "END\r\n":
            READ = False
            UPLOAD = True
        elif read_serial != "":
            water_data.append(read_serial)
            
    elif UPLOAD:
        try:
            print(water_data)
            location = 'Saraburi_TEST2' #current location
            Now = time.time() #current time and date
            tds = int(water_data[1])  #test(ppm)
            pH = float(rd.randrange(69, 76))/10.0 #test
            temperature = int(water_data[0]) #test(Celsius)

            print(location, Now, tds, pH, temperature)
            #insert record
            data = {'time':Now,'TDS':tds,'pH':pH,'temperature':temperature}
            result = requests.post(firebase_url + '/' + location + '/water.json', data=json.dumps(data))
            
            print 'Record inserted. Result Code = ' + str(result.status_code) + ',' + result.text
            time.sleep(fixed_interval)
            UPLOAD = False
            water_data = []
        
        except IOError:
            UPLOAD = False
            water_data = []
            print('Error! Something went wrong.')

time.sleep(fixed_interval)
