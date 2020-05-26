#!/bin/bash

export DISPLAY=:0
BASEDIR=$(dirname $0)

xset s noblank
xset s off
xset -dpms

unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

python3 -m http.server 8080 --directory=${BASEDIR} &

sleep 3

# /usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:8080/build/ &
/usr/bin/chromium-browser --noerrdialogs http://localhost:8080/build/ &

lxterminal -e sudo raspi-config