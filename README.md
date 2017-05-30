# Todo App

A PhoneGap Todo App

# Useful notes
# To install
 - Git 
 - Nodejs >= 6
 - Visual Code


# Install phonegap
1. npm install -g phonegap

2. phonegap template list

# Getting familiar with android tools

~/Library/Android/Sdk/tools/
 - `./monitor` to launch android device monitor, show logs
 - `./android` to launch the android sdk
 - `./android avd` to launch the avd
 - `./emulator  -list-avds` to list the avAndroid_Accelerated_x86ailable android emulator
 - 

> **Note:** Run the x86 emulator it's about 10x faster 
> **Note:** You should turn off other instance of VirtualBox 4.3 to run the emulator (until fixed)

## Session 03
We learned how to run the app from the emulator/device, manage app plugins, organize our code and move out services into separate files, and how to use a transpiler to transpile our JavaScript code to work on older platforms.

We have used the TypeScript transpiler version 2.2.2 at the time of writing.

### PhoneGap commands in this session

#### Plugins commands

You can search for plugins from http://cordova.apache.org/plugins/

 - `phonegap plugins list` to list installed plugins in my app
 - `phonegap plugins add <plugin-name>` to install a plugin from the internet
 - `phonegap plugins remove <plugin-name>` to remove an installed plugin

 > **note:** do not confuse between `cordova` and `phonegap` commands, always you should use `phonegap`

 

#### Running commands

 - `phonegap run` to run the application on the available devices/emulators for all platforms
 - `phonegap run android` to run the application on the available devices/emulators for android
 - `phonegap run ios` to run the application on the available devices/emulators for ios
 - `phonegap emulate` to run the application on the available emulators for all platforms
 - `phonegap emulate ios` to run the application on the available emulators for ios
 - `phonegap emulate android` to run the application on the available emulators for android


 ### Android commands in this session

You can find the path of android sdk by default under the following:

 - for mac users: `cd ~/Library/Android/sdk/`
 - for win users: `cd %USERPROFILE%/AppData/Local/Android/sdk`

 > **Warning:** These are the default, these path may change depend on your installation


 From the `<android-sdk-folder>/tools` run:
  - `./emulator -list-avds` to list the installed avd (Android Virtual Device)
  - `./emulator -avd <avd-name>` to run a specific avd

  > **note:** It's recommended to run the `x86` image if available
  > **note:** Android commands can be used directly from Android Studio

### Other commands

- `npm install -g typescript` to install the **tsc** compiler globally
- `tsc --init` to initialize a new `tscconfig.json` file (this command should be run from my todo project)
- `tsc --watch --project .` to run the compiler in watch mode for this project (this command should be run from my todo project)

## Session 04
In this session we learned how to discover errors in our application by:

1. Wrap our code with `try` `catch` statements

```js
try {
  getItemsFromDatabase(); // this method will throw exception if no internet connection found
} catch(error) {
  alert('Make sure you have a valid internet connection');
}
``` 

2. Use android `monitor` tool
![Android Monitor Tool](./docs/android-monitor.png)

We can open this tool from `<ANDROID_SDK>/tools/monitor`

This tool show a list of connected devices, we can filter the logs by the application name

3. Use the chrome inspector (most recommended)

By opening Google Chrome go to: `chrome://inspect` select **devices** tab, then click on **inspect** next to your emulator/device.

![Chrome Inspector](./docs/chrome-inspector.png)

We can set **breakpoint** by clicking on the line number (under the **Sources** tab) or by writing `debugger;` in our code.
