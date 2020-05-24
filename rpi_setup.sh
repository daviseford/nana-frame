#!/bin/bash

# https://pimylifeup.com/raspberry-pi-kiosk/


# Remove unused
sudo apt-get purge wolfram-engine scratch scratch2 nuscratch sonic-pi idle3 -y
sudo apt-get purge smartsim java-common minecraft-pi libreoffice* -y

# Clean up
sudo apt-get clean
sudo apt-get autoremove -y
sudo apt-get update
sudo apt-get upgrade

# Deps
sudo apt-get install xdotool unclutter sed

# Now within the tool go to 3 Boot Options -> B1 Desktop / CLI -> B4 Desktop Autologin
echo "Now within the tool go to 3 Boot Options -> B1 Desktop / CLI -> B4 Desktop Autologin"
sudo raspi-config