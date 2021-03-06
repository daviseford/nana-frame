#!/bin/bash

# https://pimylifeup.com/raspberry-pi-kiosk/

export EDITOR=vim.tiny
BASEDIR=$(dirname $0)

# Remove unused packages
sudo apt-get purge wolfram-engine scratch scratch2 nuscratch sonic-pi idle3 -y
sudo apt-get purge smartsim java-common minecraft-pi libreoffice* -y

# Clean up
sudo apt-get clean
sudo apt-get autoremove -y
sudo apt-get update
sudo apt-get upgrade

# Deps
sudo apt-get install xscreensaver xdotool unclutter sed chromium-browser --yes

# Remove any existing crontab
crontab -r

# Write crontab
(crontab -l ; echo "@daily cd /home/pi/nana-frame/ && git pull")| crontab -

# Auto-start script
cp -f ${BASEDIR}/autostart.txt ~/.config/lxsession/LXDE-pi/autostart

# Disable screensaver
echo "Disable screensaver with xscreensaver"
lxterminal -e xscreensaver-demo

echo "sudo raspi-config -> Boot Options -> Desktop Autologin"
echo "sudo raspi-config -> Advanced Options -> Compositor -> xcompmgr composition manager -> Choose 'No'"
lxterminal -e sudo raspi-config
