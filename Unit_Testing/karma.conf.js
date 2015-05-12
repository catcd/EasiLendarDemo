// Karma configuration
// Generated on Wed May 13 2015 01:30:21 GMT+0700 (SE Asia Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'/*, 'requirejs'*/],


    // list of files / patterns to load in the browser
    files: [
      '../EasiLendar/www/lib/ionic/js/angular/angular.js',
      '../EasiLendar/www/lib/ionic/js/ionic.js',
      '../EasiLendar/www/lib/ionic/js/ionic.bundle.js',
      '../EasiLendar/www/lib/cordova/ng-cordova.js',
      '../EasiLendar/www/lib/firebase/firebase.js',
      '../EasiLendar/www/lib/toast/js/angular-toastr.tpls.js',
      '../EasiLendar/www/lib/jquery/jquery-1.11.2.min.js',
      {pattern: '../EasiLendar/www/js/controllers/AboutController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/ComingSoonController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/DayController.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/controllers/EditEventController.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/controllers/EventDetailController.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/controllers/FriendPanelController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/HomeController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/ListController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/LoadingController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/MonthController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/MyProfileController.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/controllers/PopOverController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/ProfileController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/ResultController.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/controllers/SearchController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/SearchFilterController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/SettingController.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/controllers/ShareController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/SideMenuController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/SignInController.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/controllers/SyncController.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/controllers/WeekController.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/shareds/Algorithm.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/shareds/Application.data.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/shareds/Application.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/shareds/Calendar.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/shareds/DataBase.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/shareds/Directive.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/shareds/EasiLendarClass.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/shareds/Event.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/shareds/MultiCalendar.js', watched: true, included: true, served: true},
      {pattern: '../EasiLendar/www/js/shareds/Sync.js', watched: true, included: false, served: true},
      {pattern: '../EasiLendar/www/js/shareds/TimeHeap.js', watched: true, included: true, served: true},
      'jasmine/lib/jasmine-2.2.0/angular-mocks.js',
      {pattern: 'jasmine/js/controllers/AboutControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/ComingSoonControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/DayControllerTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/controllers/EditEventControllerTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/controllers/EventDetailControllerTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/controllers/FriendPanelControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/HomeControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/ListControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/LoadingControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/MonthControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/MyProfileControllerTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/controllers/PopOverControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/ProfileControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/ResultControllerTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/controllers/SearchControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/SearchFilterControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/SettingControllerTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/controllers/ShareControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/SideMenuControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/SignInControllerTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/controllers/SyncControllerTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/controllers/WeekControllerTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/shareds/AlgorithmTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/shareds/ApplicationDataTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/shareds/ApplicationTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/shareds/CalendarTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/shareds/DataBaseTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/shareds/DirectiveTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/shareds/EasiLendarClassTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/shareds/EventTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/shareds/MultiCalendarTest.js', watched: true, included: true, served: true},
      {pattern: 'jasmine/js/shareds/SyncTest.js', watched: true, included: false, served: true},
      {pattern: 'jasmine/js/shareds/TimeHeapTest.js', watched: true, included: true, served: true},
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      '../EasiLendar/www/js/shareds/*.js': ['coverage'],
      '../EasiLendar/www/js/controllers/*.js': ['coverage'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      dir: 'coverage',
      subdir: 'report'
      // Would output the results into: .'/coverage/report'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
