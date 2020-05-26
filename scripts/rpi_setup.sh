#!/bin/bash

# https://pimylifeup.com/raspberry-pi-kiosk/

export EDITOR=vim.tiny

# Remove unused
sudo apt-get purge wolfram-engine scratch scratch2 nuscratch sonic-pi idle3 -y
sudo apt-get purge smartsim java-common minecraft-pi libreoffice* -y

# Clean up
sudo apt-get clean
sudo apt-get autoremove -y
sudo apt-get update
sudo apt-get upgrade

# Deps
sudo apt-get install xscreensaver xdotool unclutter sed chromium-browser --yes

# Now within the tool go to 3 Boot Options -> B1 Desktop / CLI -> B4 Desktop Autologin
echo "Don't forget to set Boot Options to Desktop Autologin with sudo raspi-config"
# sudo raspi-config

# Remove any existing crontab
crontab -r

# Write crontab
(crontab -l ; echo "@hourly cd /home/pi/nana-frame/ && git pull")| crontab -

# Auto-start script
cp -f scripts/autostart.txt ~/.config/lxsession/LXDE-pi/autostart