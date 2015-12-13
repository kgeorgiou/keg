var app = angular.module('kurl', ['ngMaterial']);

var SERVER_URL = "http://localhost:3000";

app.controller('ShorteningController', ['$scope', '$http', function ($scope, $http) {

    $scope.shortUrl = undefined;
    $scope.longUrl = undefined;

    $scope.expiry = {
        flag: false,
        expMinutes: 42,
        expHours: 0,
        expDays: 0
    };

    $scope.$watch('expiry.expMinutes', function (newVal, oldVal) {
        /* Make sure minutes can get value of zero only if at least on of the other
         time values are greater than zero to avoid having 0 minutes, 0 hours and 0 days */
        if (newVal == 0 && $scope.expiry.expHours == 0 && $scope.expiry.expDays == 0) {
            $scope.expiry.expMinutes = 1;
        }
    });

    $scope.toggleExpiryFlag = function () {
        $scope.expiry.flag = !$scope.expiry.flag;
    };

    $scope.getExpiryString = function () {
        var exp = $scope.expiry;
        var strNeverExpires = 'Kurl will never expire.';

        if (!exp.flag) {
            return strNeverExpires;
        }

        var m = exp.expMinutes;
        var strMinutes = m == 1 ? '1 minute' : m + ' minutes';
        var h = exp.expHours;
        var strHours = h == 1 ? '1 hour' : h + ' hours';
        var d = exp.expDays;
        var strDays = d == 1 ? '1 day' : d + ' days';

        var str = '';

        if (m > 0) {
            if (h > 0 && d > 0) {
                str += strDays + ', ' + strHours + ' and ';
            } else if (h <= 0 && d > 0) {
                str += strDays + ' and ';
            } else if (h > 0 && d <= 0) {
                str += strHours + ' and ';
            }
            str += strMinutes;
        } else {
            if (h > 0 && d > 0) {
                str += strDays + ' and ' + strHours;
            } else if (h <= 0 && d > 0) {
                str += strDays;
            } else if (h > 0 && d <= 0) {
                str += strHours;
            } else {
                return strNeverExpires;
            }
        }

        return 'Kurl will expire in ' + str + '.';
    };

    $scope.shortenUrl = function () {

        if (!$scope.longUrl) {
            return;
        }

        var kurlObject = {
            long_url: $scope.longUrl
        };

        var exp = $scope.expiry;
        if (exp.flag) {
            var lifespan = exp.expMinutes * 60 * 1000
                + exp.expHours * 60 * 60 * 1000
                + exp.expDays * 24 * 60 * 60 * 1000;
            var now = Date.now();
            kurlObject['life_span'] = lifespan;
            kurlObject['expires_at'] = lifespan + now;
        }

        $http.post(SERVER_URL + '/kurl', kurlObject)
            .success(function (data) {
            $scope.shortUrl = data.short_url;
        }).error(function (status, error) {
            console.error('Error Status: ', status);
        });

    };

    $scope.shortUrlExists = function () {
        return $scope.shortUrl && $scope.shortUrl.length > 0;
    };

}]);