// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'

        })
    
     //child state for hometab
    .state('tabs.home', {
            url: '/home',
            views: {
                'home-tab': {
                    templateUrl: 'templates/home.html',

                }
            }
        })
        //child state for lists
        .state('tabs.list', {
            url: '/list',
            views: {
                'list-tab': {
                    templateUrl: 'templates/list.html',
                    controller: 'ListController'
                }
            }
        })
   // child state for artist detail sub-page
       .state('tabs.detail', {
            url: '/list/:aId',
            views: {
                'list-tab': {
                    templateUrl: 'templates/detail.html',
                     controller: 'ListController'

            }
        }

    })

   
        //default for tab view  
    $urlRouterProvider.otherwise('/tab/home');
})


.controller('ListController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $http.get('js/data.json').success(function (data) {
        $scope.artists = data.artists;
        $scope.whichartist = $state.params.aId;

        $scope.onItemDelete = function (item) {
                $scope.artists.splice($scope.artists.indexOf(item), 1);
            }
            //pull to refresh code......      
        $scope.doRefresh = function () {
            $http.get('js/data.json').success(function (data) {
                $scope.artists = data;

                // Stop the ion-refresher from spinning......
                $scope.$broadcast('scroll.refreshComplete')
            })
        }


        $scope.toggleStar = function (item) {
            item.star = !item.star;
        }

        $scope.moveItem = function (item, fromIndex, toIndex) {
            $scope.artists.splice(fromIndex, 1);
            $scope.artists.splice(toIndex, 0, item);
        };

    });
}]);