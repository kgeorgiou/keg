var app = angular.module('kurl', []);

var SERVER_URL = "http://localhost:3000/v1";

app.controller('ShorteningController', ['$scope', '$http', function($scope, $http) {

    $scope.shortUrl = undefined;
    $scope.longUrl = undefined;

    $scope.shortenUrl = function() {

        if (!$scope.longUrl) {
            return;
        }

        $http.post(SERVER_URL + '/kurl', {
            long_url: $scope.longUrl
        }).success(function (data) {
            $scope.shortUrl = data.short_url;
        }).error(function (status, error) {
            console.error('Error Status: ', status);
        });

    };

    $scope.shortUrlExists = function() {
        return $scope.shortUrl && $scope.shortUrl.length > 0;
    };

}]);