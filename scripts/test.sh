#!/bin/bash

(crontab -l ; echo "* * * * * cd /home/pi/nana-frame/ && git pull")| crontab -