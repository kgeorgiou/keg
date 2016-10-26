var app = angular.module('keg', ['config', 'ngMaterial']);

app.controller('ShorteningController', ['$scope', '$http', 'env', function ($scope, $http, env) {

    $scope.shortUrl = undefined;
    $scope.longUrl = undefined;

    $scope.expiry = {
        flag: false,
        expMinutes: 45,
        expHours: 8,
        expDays: 30
    };

    $scope.toggleExpiryFlag = function () {
        $scope.expiry.flag = !$scope.expiry.flag;
    };

    $scope.getExpiryString = function () {
        var exp = $scope.expiry;
        var strNeverExpires = 'Pint will never expire.';

        if (!exp.flag) {
            return strNeverExpires;
        }

        var minutes = exp.expMinutes;
        var strMinutes = minutes == 1 ? '1 minute' : minutes + ' minutes';
        var hours = exp.expHours;
        var strHours = hours == 1 ? '1 hour' : hours + ' hours';
        var days = exp.expDays;
        var strDays = days == 1 ? '1 day' : days + ' days';

        var str = '';

        if (minutes > 0) {
            if (hours > 0 && days > 0) {
                str += strDays + ', ' + strHours + ' and ';
            } else if (hours <= 0 && days > 0) {
                str += strDays + ' and ';
            } else if (hours > 0 && days <= 0) {
                str += strHours + ' and ';
            }
            str += strMinutes;
        } else {
            if (hours > 0 && days > 0) {
                str += strDays + ' and ' + strHours;
            } else if (hours <= 0 && days > 0) {
                str += strDays;
            } else if (hours > 0 && days <= 0) {
                str += strHours;
            } else {
                return strNeverExpires;
            }
        }

        return 'Pint will expire in ' + str + '.';
    };

    $scope.shortenUrl = function () {

        if (!$scope.longUrl) {
            return;
        }

        var kegObject = {
            long_url: $scope.longUrl
        };

        var exp = $scope.expiry;
        if (exp.flag && (exp.expMinutes || exp.expHours || exp.expDays)) {
            var lifespan = exp.expMinutes * 60 * 1000
                + exp.expHours * 60 * 60 * 1000
                + exp.expDays * 24 * 60 * 60 * 1000;
            var now = Date.now();
            kegObject['life_span'] = lifespan;
            kegObject['expires_at'] = lifespan + now;
        }

        $http.post(env.apiEndpoint + 'keg', kegObject)
            .success(function (data) {
                $scope.shortUrl = data.short_url;
            }).error(function (status, error) {
            console.error('Error Status: ', status);
        });

    };

    $scope.shortUrlExists = function () {
        return $scope.shortUrl && $scope.shortUrl.length > 0;
    };

    /* Make sure minutes can be zero only if at least one of the other
     time values are greater than zero to avoid having 0 minutes, 0 hours and 0 days */
    $scope.$watch('expiry.expMinutes', function (newVal, oldVal) {
        if (newVal == 0 && $scope.expiry.expHours == 0 && $scope.expiry.expDays == 0) {
            $scope.expiry.expMinutes = 1;
        }
    });

    $scope.$watch('expiry.expHours', function (newVal, oldVal) {
        if (newVal == 0 && $scope.expiry.expMinutes == 0 && $scope.expiry.expDays == 0) {
            $scope.expiry.expMinutes = 1;
        }
    });

    $scope.$watch('expiry.expDays', function (newVal, oldVal) {
        if (newVal == 0 && $scope.expiry.expMinutes == 0 && $scope.expiry.expHours == 0) {
            $scope.expiry.expMinutes = 1;
        }
    });

    /* Modified RegExp from https://gist.github.com/dperini/729294 */
    $scope.validUrlRegExp = new RegExp(
        "^(?:(?:https?|t?ftps?|mailto|data|wss?)://)?(?:\\S+(?::\\S*)?@)?" +
        "(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|localhost|" +
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$", "i")
}]);
