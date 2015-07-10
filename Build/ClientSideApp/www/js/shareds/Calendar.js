/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 12/05/2015
 * type: module all shared variables and functions use for calendar
 */

angular.module('MainApp.shareds.calendar', [])

.factory('eCalendar', function() {
    var doubleChar = function(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return '' + num;
        }
    };
    return {
        /*
         * Calendar variables
         */
        weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        weekDaysFull: ['Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        months: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        shortMonths: ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
            'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
        ],
        // background name
        bkgs: ['bkg_01_jan.jpg', 'bkg_02_feb.jpg', 'bkg_03_mar.jpg',
            'bkg_04_apr.jpg', 'bkg_05_may.jpg', 'bkg_06_jun.jpg',
            'bkg_07_jul.jpg', 'bkg_08_aug.jpg', 'bkg_09_sep.jpg',
            'bkg_10_oct.jpg', 'bkg_11_nov.jpg', 'bkg_12_dec.jpg'
        ],

        /*
         * Calendar functions
         */
        easiConvertTime: function(date) {
            var nday = date.getDay(),
                nmonth = date.getMonth(),
                ndate = date.getDate(),
                nyear = date.getFullYear(),
                nhour = date.getHours(),
                nmin = date.getMinutes(),
                nsec = date.getSeconds(),
                ap;

            if (nhour === 0) {
                ap = ' AM';
                nhour = 12;
            } else if (nhour < 12) {
                ap = ' AM';
            } else if (nhour == 12) {
                ap = ' PM';
            } else if (nhour > 12) {
                ap = ' PM';
                nhour -= 12;
            }

            return {
                date: '' + this.weekDaysFull[(nday + 6) % 7] + ', ' +
                    this.months[nmonth] + ' ' +
                    ndate + ', ' +
                    nyear + '',
                time: '' + nhour + ':' +
                    doubleChar(nmin) + ':' +
                    doubleChar(nsec) +
                    ap + '',
            };
        },

        // parse date
        // return {date: 'Month, day', year: year}
        parseDate: function(date) {
            return {
                date: this.months[date.getMonth()] + ', ' + date.getDate(),
                year: date.getFullYear()
            };
        },

        // Find the number of day in a month
        daysOfMonth: function(month, year) {
            switch (month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return 31;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                case 2:
                    if (year % 4 === 0 && year % 100 !== 0 ||
                        year % 400 === 0) {
                        return 29;
                    }
                    return 28;
                default:
                    return 0;
            }
        },

        /*
         * Caculate the next and previous day of one day
         */
        // tomorrow of Date
        tomorrow: function(today) {
            var d = today.getTime();
            var result = new Date(d + 86400000);
            // 86400000 is number of miliseconds in a day
            return result;
        },

        // yesterday of Date:
        yesterday: function(today) {
            var d = today.getTime();
            var r = new Date(d - 86400000);
            // 86400000 is number of miliseconds in a day
            return r;
        },

        // convert time function
        // input: an event
        // output: a string
        // format from hh:mm to hh:mm
        convertTime: function(event) {
            // get and convert start time
            var mStart = (event.start.dateTime.getHours() < 10 ? '0' : '') +
                event.start.dateTime.getHours() + ':' +
                (event.start.dateTime.getMinutes() < 10 ? '0' : '') +
                event.start.dateTime.getMinutes();

            // get and convert start date
            var mStartDate = (event.start.dateTime.getDate() < 10 ? '0' : '') +
                event.start.dateTime.getDate() + '/' +
                (event.start.dateTime.getMonth() < 9 ? '0' : '') +
                (event.start.dateTime.getMonth() + 1) + '/' +
                event.start.dateTime.getFullYear();

            // get and convert end time
            var mEnd = (event.end.dateTime.getHours() < 10 ? '0' : '') +
                event.end.dateTime.getHours() + ':' +
                (event.end.dateTime.getMinutes() < 10 ? '0' : '') +
                event.end.dateTime.getMinutes();
            // get and convert end date

            var mEndDate = (event.end.dateTime.getDate() < 10 ? '0' : '') +
                event.end.dateTime.getDate() + '/' +
                (event.end.dateTime.getMonth() < 9 ? '0' : '') +
                (event.end.dateTime.getMonth() + 1) + '/' +
                event.end.dateTime.getFullYear();

            // return data
            // if start date and end date are equal
            // return once
            if (mStartDate == mEndDate) {
                return 'from ' + mStart + ' to ' + mEnd + ' ' + mEndDate;
            }
            // if they are not equal
            // return both start date and end date
            else {
                return 'from ' + mStart + ' ' + mStartDate +
                    ' to ' + mEnd + ' ' + mEndDate;
            }
        }
    };
});
