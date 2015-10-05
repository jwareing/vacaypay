(function() {
  'use strict';

  angular.module('app')
  .factory('Auth', function ($http, $state, $window) {
    var currentUserId;
    var currentUserName;

    var services = {
      signin: signin,
      signup: signup,
      isAuth: isAuth,
      currentUser: currentUser,
      signout: signout
    };

    return services;

    function signin (user, callback) {
      $window.localStorage.setItem('username', user.username);
      $http.post('/users/signin', user)
      .then(function (res) {
        currentUserId = res.data.user;
        console.log(currentUserId);
        $window.localStorage.setItem('userId', currentUserId);
        callback(res.data.token);
      }, function (res) {
        console.log('Sign in error');
      });
    }

    function signup (user, callback) {
      $window.localStorage.setItem('username', user.username);
      $http.post('/users/signup', user)
      .then(function (res) {
        console.log('Signed up!');
        currentUserId = res.data.user;
        $window.localStorage.setItem('userId', currentUserId);
        callback(res.data.token);
      }, function (res) {
        console.log('Error during sign up');
      });
    }

    function isAuth () {
      return !!$window.localStorage.getItem('com.vacaypay');
    }

    function currentUser () {
      console.log(currentUserId,'is ID');
      return currentUserId;
    }

    function signout () {
      $window.localStorage.removeItem('com.vacaypay');
      $state.transitionTo('signin');
    }

  });
})();