# nana-frame

A digital picture frame for Nana

## Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Pi scripts

Run `rpi_setup.sh` on your new Pi.

Then use `kiosk.sh` to test.

(crontab -l ; echo "* * * * * cd /home/pi/nana-frame/ && git pull")| crontab -
(crontab -l ; echo "@hourly cd /home/pi/nana-frame/ && git pull")| crontab -


`0 * * * * cd /home/pi/nana-frame/ && git pull`
`@reboot sh /home/pi/Desktop/nana-frame/kiosk.sh &`

#### Autostart on reboot

`cd /home/pi/Desktop/nana-frame/ && git pull && sh kiosk.sh`

To get to wireless settings:

Windows Key -> Preferences

To quit full-screen slideshow:

ALT + FN + F4



sudo nano /etc/xdg/lxsession/LXDE/autostart