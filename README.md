     ____               _                    _
    |  __| ____ ____  _| |    ___  ____   __| | ____ ____
    |  __ / _  |\  _\| | |   / _ \|  _ \ / _  |/ _  |    \
    |  __| (_| |_\ \ | | |__| (__/| | | | (_| | (_| | |__/
    |____|\____|\___\|_|____|\___ |_| |_|\____|\____|_|\_\  Alpha test 1.3
#**_The Very Best Meeting Planer_**  

Planning meetings with some services is tedious and difficult with more than a few people who each have many constraints. For this project we create a better meeting planner, one that fills the same purpose as Doodle, but more efficiently (in terms of user time and elapsed time to find a meeting time).

##**Table of Contents**

- [About this project](#about-this-project)
  - [Development model](#development-model)
  - [Project structure](#project-structure)
  - [External link](#external-link)
- [About this application](#about-this-application)
  - [Why choose EasiLendar over others?](#why-choose-easilendar-over-others)
  - [What can it do?](#what-can-it-do)
    - [Common features](#common-features)
    - [Advanced features](#advanced-features)
  - [Requirements](#requirements)
    - [System](#system)
    - [Connection](#connection)
  - [Installation](#installation)
    - [Installing EasiLendar](#installing-easilendar)
      - [Install on Android](#install-on-android)
    - [Uninstalling EasiLendar](#uninstalling-easilendar)
      - [Uninstall from Android](#uninstall-from-android)
- [About us](#about-us)

##About this project
###Development model
The Spiral Life Cycle Model is a type of iterative software development model which is generally implemented in high risk projects. It was first proposed by Boehm. In this system development method, we combine the features of both, waterfall model and prototype model. In Spiral model we can arrange all the activities in the form of a spiral.  

Each loop in a spiral represents a development phase (and we can have any number of loops according to the project). Each loop has four sections or quadrants :

1. To determine the objectives, alternatives and constraints. We try to understand the product objectives, alternatives in design and constraints imposed because of cost, technology, schedule, etc.  
2. Risk analysis and evaluation of alternatives. Here we try to find which other approaches can be implemented in order to fulfill the identified constraints. Operational and technical issues are addressed here. Risk mitigation is in focus in this phase. And evaluation of all these factors determines future action.  
3. Execution of that phase of development. In this phase we develop the planned product. Testing is also done. In order to do development, waterfall or incremental approach can be implemented.  
4. Planning the next phase. Here we review the progress and judge it considering all parameters. Issues which need to be resolved are identified in this phase and necessary steps are taken.  

Subsequent loops of spiral model involve similar phases. Analysis and engineering efforts are applied in this model. Large, expensive or complicated projects use this type of life cycle. If at any point of time one feels the risk involved in the project is a lot more than anticipated, one can abort it. Reviews at different phases can be done by an in-house person or by an external client.

###Project structure
The main project contains 6 folders:

1. __APK file__: contains all version of apk files for running on Android device.  
2. __Documents__: contains all documents, such as group meeting minutes, design documents, team rule, etc.  
3. __EasiLendar__: contains mainframe, images, templates, libraries and all other project files.  
4. __EasiLendar build__: contains the same folder and file as EasiLendar folder but they are optimized for build mobile app.  
5. __EasiLendar__ coming soon: contains the demo website of EasiLendar.  
6. __Unit testing__: contains all testing folder of EasiLendar

All the detail of each folder is written in each "__README.md__" file in this folder.

###External link
Website: [EasiLendar](http://easilendar.wc.lt "EasiLendar")  
Facebook page: [EasiLendar App Page](https://www.facebook.com/EasiLendar "EasiLendar page")  
YouTube channel: [TEXAS Group YouTube Channel](https://www.youtube.com/channel/UC3tYd_GAkPAAp_QXKOTdsxw "TEXAS Group Channel")

Video Demo and Commercial:

- [EasiLendar Commercial Version 1](https://www.youtube.com/watch?v=TGB8TLSTENM "Commercial version 1")
- [EasiLendar Commercial Version 2](https://www.youtube.com/watch?v=c0a6OfEMsEw "Commercial version 2")
- [EasiLendar Demo 1.2](https://www.youtube.com/watch?v=6iD-pWrTYTY "Demo 1.2")
- [EasiLendar Demo 1.3](https://www.youtube.com/watch?v=jRAoN45CPbk "Demo 1.3")

##About this application
###Why choose EasiLendar over others?
Many people use some calendar applications and similar services to find times to meet. When the number of participants is more than three or four, this usually leads to one of two scenarios:  

- A poll is distributed with a few proposed meeting times. Each prospective participant has conflicts with at least one of the proposed times. A flurry of email follows, then either a new poll is distributed with agreed candidate times, or else the meeting time is just settled by email.
- To avoid the first scenario, a poll is distributed with many time slots. It is tedious to fill out, but at least it is possible to find an acceptable meeting time in a single round.  

To avoid both of these scenarios, we have a meeting time arranger that can start with plausible meeting times, based on the schedules of prospective participants. To find plausible meeting times, the meeting planner draw from participants' calendars and possibly other sources of information.  
Drawing data from a person's calendar or schedule entails dealing properly with issues of privacy, confidentiality, and security.

###What can it do?
In particularly, it make it possible to find a meeting time in common with minimum disclosure of schedule information. An analysis of privacy and security is an integral part of the project.

####Common features
EasiLendar meeting planner have following features:

- It draws from [Google Calendar](http://google.com/calendar/ "Google Calendar") and other widely used calendaring applications to help choose prospective meeting times.
- It works for users who do not use the same calendaring application, or who choose not to share that information.
- It respects privacy and security preferences.

####Advanced features
Many enhancements and extensions, including:

- Draw from multiple calendar and scheduling systems, e.g., Google Calendar and Microsoft Outlook, and include a well-documented protocol or interface for including additional calendar systems.
- Support both web-based and email-based responses from prospective meeting participants, on both desktop/laptop and mobile platforms.
- Support complex attendance requirements, e.g., "persons A,B, and C, are necessary; persons X,Y, and Z are invited but not necessary for the meeting; at least two of M,N, and O should be present."
- Distinguish between preferred meeting times and possible meetings times, flexibly ranking proposed times both by which attendees can attend and by how convenient the time is.
- Handle time zones appropriately and robustly. For example, a teleconference at 3pm for the Seattle participants and midnight for participants in Lisbon and Milano would likely be less desirable than a meeting at 8am for the Seattle participants and 5pm for the Lisbon and Milano participants. Each prospective participant should have an opportunity to say which hours of the day are suitable for meetings.

###Requirements
####System
Features and usability of client interfaces that can be run in:

- Android
- IOS
- Web browsers (with HTML5 and CSS3)

####Connection
EasiLendar work with a web database so the device must be connected to the Internet to use entire features. The users have been logging in and use Remember Me function can use some limited local features.

###Installation
####Installing EasiLendar
#####Android
This app is not publish on __Google Play Store__, it is only published on our Github project folder.  
In these cases you will usually have to manually download and install an __.apk__ file. An __.apk__ file behaves in a similar manner to a "__.exe__" file on Windows, you need to copy it to your device and run it. Here are some ways that you can manually install our application without going through the __Google Play Store__.
######Enable Unknown Sources
Before attempting a manual installation of apps using the .apk files, you must first allow your phone to install from "__Unknown Sources__" (i.e. non-Market applications).

To do this, navigate to __Menu -> Settings -> Applications__ and check the box marked "__Unknown Sources__".
If you have done this action before, just skip it.

![alt text][enable-unknow-source]

[enable-unknow-source]: http://www.maketecheasier.com/wp-content/uploads/2011/01/apkinstaller-unknown.png "Enable Unknown Sources"

######1. Installing app Using The Conventional Method
######Step 1: Install File Manager
Android does not natively come with any method of browsing the data on your [SD card](http://www.microsoftstore.com/store/msusa/en_US/pdp/productID.266842800 "Buy one SD card"), so you will need to install a file manager from a market. There are a large variety of file managers available on Android, but my personal favourite is [ASTRO File Manager](https://play.google.com/store/apps/details?id=com.metago.astro "ASTRO File Manager").

![alt text][astro-screen]

[astro-screen]: http://www.maketecheasier.com/wp-content/uploads/2011/01/apkinstaller-astro-file-manager.jpg "ASTRO File Manager"

######Step 2: Copy .apk file to SD card
Once you have ASTRO File Manager installed, connect your Android device to your PC using your USB cable. Mount the SD card and copy over our version of .apk file you would like to install.

######Step 3: Install .apk
On your Android device, navigate to the .apk file using ASTRO File Manager and select it.

This will open a dialog box allowing you to install the app. Select "__Open App Manager__".

![alt text][astro-dialog]

[astro-dialog]: http://www.maketecheasier.com/wp-content/uploads/2011/01/apkinstaller-app.png "ASTRO File Manager dialog"

On the next two pages, select "__Install__" and "__Install__" again to install the .apk as the following instalation of Swipe.

![alt text][install-one]

![alt text][install-two]

[install-one]: http://www.maketecheasier.com/wp-content/uploads/2011/01/apkinstaller-installapp.jpg "Install Step 1"
[install-two]: http://www.maketecheasier.com/wp-content/uploads/2011/01/apkinstaller-appinstall.jpg "Install Step 2"

Our EasiLendar app is now installed on your device.

######2. Installing app using Dropbox
Dropbox is really a versatile app and is a waste if we don’t fully utilize it.  
The method is simple. In your computer, download the apk file to your Dropbox folder. Let it finish syncing. In your phone, open the Dropbox app, navigate to the folder where you keep the apk file, click on it.  
Dropbox will then download the apk file. The usual installation follows.

######3. Installing app Using the Online Apk Installer
The online apk installer is a web app created by a helpful XDA-Developers forum member *__htc-hd2__*, with the aim to make manual installation of an .apk file much easier. It is useful if you want to share an apk file with a friend.

######Step 1: Upload File
First, navigate to [www.apkinstall.com](http://www.apkinstall.com/ "http://www.apkinstall.com/").

Here you will see a black "__Browse Files…__" button. Select this and choose the apk file on your PC.

![alt text][browse-file]

[browse-file]: http://www.maketecheasier.com/wp-content/uploads/2011/01/apkinstaller-browse.png "Browse File..."

The apk file will remain active on the website for 30 minutes.

######Step 2: Scan QR Code

Once you have uploaded the file, a QR code will appear on the website.

![alt text][qrcode]

[qrcode]: http://www.maketecheasier.com/wp-content/uploads/2011/01/apkinstaller-qrcode.png "Scan QR code with camera"

You must scan this QR code with a Barcode Scanner. The website suggests using [Barcode Scanner](https://play.google.com/store/apps/details?id=com.google.zxing.client.android "Barcode Scanner"), however I personally prefer using [Google Goggles](https://play.google.com/store/apps/details?id=com.google.android.apps.unveil "Google Goggles").

![alt text][googles]

[googles]: http://www.maketecheasier.com/wp-content/uploads/2011/01/apkinstaller-barcode.png "Google Goggles"

Once the QR code has scanned, you can click on the link to download the __.apk__ file straight to your device.

######Step 3: Install .apk
After the .apk file has downloaded to your Android device you can install it by simply clicking on it and navigating through the installation pages.


![alt text][install-app]

[install-app]: http://www.maketecheasier.com/wp-content/uploads/2011/01/apkinstaller-download.png "Install Apps"

####Uninstalling EasiLendar
#####Android
######1. The Settings Menu
Navigate to your devices settings and press the icon to launch the setting application. While in the settings menu, you will see a listing of all the settings that you can change.  
Select the "__Applications__" listing to continue with the uninstalling process.

######2. Manage Applications
After pressing the __Applications__ menu from __Settings__, you will see a list of 5 choices. Press the "__Manage applications__" icon that will allow you to manage and remove your installed apps.

######3. Selecting the App to Delete
Once in the __Manage applications__ sub menu, you will see a list of your installed applications. On the top of the screen, you will see four icons; __Downloaded__, which will list all the apps that you downloaded and installed; __Running__, which shows all currently running apps; __All__, that lists all the apps installed on your device; and __On SD Card__ that lists any apps that you have installed on your SD card.  
For the purposes of this article, make sure that your are looking at the apps under the "__Downloaded__" menu.

######4. Deleting the Application
Press on the app listed that you want to delete. A screen will appear that will give some details about the app, including how much storage the app consumes, how much of information is stored in your cache file and any default launch settings.  
Once you are certain that you have selected the correct app and that you want to delete it from your phone, press the "__Unistall__" button. This will begin to delete the app from your device. Once finished deleting, your screen will show that the app has been deleted.

##About us
###_The Very Best Meeting Planer._

>###__TEXAS Group__  

>- Can Duy Cat.  
- Nguyen Minh Trang.  
- Ngo Duc Dung.  
- Nguyen Manh Duy.  
- Nguyen Thi Luong.  

__Contact__  
Phone: +84-969-422-782  
Email: ninjameo9x@gmail.com