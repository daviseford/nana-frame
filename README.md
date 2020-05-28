# Digital Slideshow for AWS Images

A digital picture slideshow powered by React.

## Environmental Variables

Edit `.env` file with the variables needed to access your AWS bucket.

## Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.

## Pi Settings/Installation

### Scripts

Run `rpi_setup.sh` on your new Pi. This will set up dependencies, `crontab`, and `autostart` scripts.

Then use `kiosk.sh` to test.

### To get to wireless settings on the Pi:

ALT + TAB, go to the ugly terminal, scroll to Network Options

#### Alternative

Close the fullscreen slideshow by hitting ALT + FN + F4.

Click the WiFi icon top right in the toolbar.

### To quit full-screen slideshow:

ALT + FN + F4
