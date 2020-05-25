#!/bin/bash

# Not working
# xset s noblank
# xset s off
# xset -dpms

unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

DISPLAY=:0 chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:8080/build/

sudo /usr/bin/chromium-browser

python3 -m http.server 8080
