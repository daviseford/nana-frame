#!/bin/bash

export DISPLAY=:0
BASEDIR=$(dirname $0)

xset s noblank
xset s off
xset -dpms

unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

# Start a local python server
python3 -m http.server 8080 --directory=${BASEDIR} &

# Wait a couple seconds for it to get going
sleep 2

# Launch Chromium in kiosk mode
/usr/bin/chromium-browser --use-gl=egl --noerrdialogs --disable-infobars --kiosk http://localhost:8080/build/ &

# Open raspi-config in a separate terminal in the background
lxterminal -e sudo raspi-config