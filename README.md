     ____               _                    _
    |  __| ____ ____  _| |    ___  ____   __| | ____ ____
    |  __ / _  |\  _\| | |   / _ \|  _ \ / _  |/ _  |    \
    |  __| (_| |_\ \ | | |__| (__/| | | | (_| | (_| | |__/
    |____|\____|\___\|_|____|\___ |_| |_|\____|\____|_|\_\  Alpha test 1.2
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
    - [Uninstalling EasiLendar](#uninstalling-easilendar)
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
The main project contains 3 folders:

1. Documents: contains all documents, such as group meeting minutes, design documents, team rule, etc.  
2. EasiLendar: contain mainframe, images, templates, libraries and all other project files.  
3. EasiLendar coming soon: contain the demo website of EasiLendar.

All the detail of each folder is written in each README.md file in this folder.

###External link
Website: [EasiLendar](http://easilendar.wc.lt "EasiLendar")  
Facebook page: [EasiLendar App Page](https://www.facebook.com/EasiLendar "EasiLendar page")  
YouTube channel: [TEXAS Group YouTube Channel](https://www.youtube.com/channel/UC3tYd_GAkPAAp_QXKOTdsxw "TEXAS Group Channel")

Video Demo:

- [EasiLendar Commercial Version 1](https://www.youtube.com/watch?v=TGB8TLSTENM "Commercial version 1")
- [EasiLendar Commercial Version 2](https://www.youtube.com/watch?v=c0a6OfEMsEw "Commercial version 2")
- [EasiLendar Demo 1.2](https://www.youtube.com/watch?v=6iD-pWrTYTY "Demo 1.2")

##About this application
###Why choose EasiLendar over others?
Many people use Doodle and similar services to find times to meet. When the number of participants is more than three or four, this usually leads to one of two scenarios:  

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
- Support complex attendance requirements, e.g., “persons A,B, and C, are necessary; persons X,Y, and Z are invited but not necessary for the meeting; at least two of M,N, and O should be present.”
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
Coming soon...

####Uninstalling EasiLendar
Coming soon...

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