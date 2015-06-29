/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 28/06/2015
 * type: module all shared functions used for this app
 */

angular.module('MainApp.shareds.application', [])
    /**
     * Toast service
     */
    .factory('eToast', function(toastr, toastrConfig) {
        return {
            // toast success
            // color #419696
            toastSuccess: function(message, delay) {
                toastrConfig.positionClass = 'easi-toast-success';
                toastr.success(message, {
                    timeOut: delay
                });
            },
            // toast info
            // color #33CCCC
            toastInfo: function(message, delay) {
                toastrConfig.positionClass = 'easi-toast-info';
                toastr.info(message, {
                    timeOut: delay
                });
            },
            // toast error
            // color #D65930
            toastError: function(message, delay) {
                toastrConfig.positionClass = 'easi-toast-error';
                toastr.error(message, {
                    timeOut: delay
                });
            },
            // toast warning
            // color #646464
            toastWarning: function(message, delay) {
                toastrConfig.positionClass = 'easi-toast-warning';
                toastr.warning(message, {
                    timeOut: delay
                });
            },
        };
    })

/**
 * Check friend service
 * Local functions
 */
.factory('eCheckFriend', function(eUser) {
    return {
        // return true if ID is my friend
        isFriend: function(ID) {
            return (eUser.uFriend !== null && eUser.uFriend[ID] !== undefined);
        },
        // return true if ID is my friend
        isRequested: function(ID) {
            return (eUser.uRequested !== null &&
                eUser.uRequested[ID] !== undefined);
        },
        // return true if ID is my friend
        isRequestedMe: function(ID) {
            return (eUser.uFRequest !== null &&
                eUser.uFRequest[ID] !== undefined);
        }
    };
})

/**
 * Local storage
 */
.factory('$localstorage', function($window, eSettings, eUser) {
    return {
        // use any key
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        },
        // use easilendar as key
        saveData: function() {
            $window.localStorage['easilendar'] = JSON.stringify(eUser);
        },
        getData: function() {
            return JSON.parse($window.localStorage['easilendar'] || 'null');
        },
        deleteData: function() {
            $window.localStorage['easilendar'] = JSON.stringify(null);
        },
        // use easilendarS as key
        saveSetting: function() {
            $window.localStorage['easilendarS'] = JSON.stringify(eSettings);
        },
        getSetting: function() {
            return JSON.parse($window.localStorage['easilendarS'] || 'null');
        },
        deleteSetting: function() {
            $window.localStorage['easilendarS'] = JSON.stringify(null);
        }
    }
});
