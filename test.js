var test = require('tape');
var objectEqual = require('object-equal');
var breadcrumb = require('./index');

test('should return one element', function(t){
  var crumbs = breadcrumb('/', {home: 'home'});
  t.deepEqual(crumbs, [{name: 'home', NAME: 'home', url: '/'}]);
  t.end();
});

test('should return one element', function(t){
  var crumbs = breadcrumb('/', {home: 'home', endingSlash: true});
  t.deepEqual(crumbs, [{name: 'home', NAME: 'home', url: '/'}]);
  t.end();
});

test('should return one element without hash', function(t){
  var crumbs = breadcrumb('/#crumbs');
  t.deepEqual(crumbs, [{name: '⌂', NAME: '⌂', url: '/'}]);
  t.end();
});

test('should return one element with replaced -_ with space and decoded name and NAME', function(t){
  var crumbs = breadcrumb('/my-page/Not%20a_NICE-thing#crumbs');
  t.deepEqual(crumbs, [
    {name: '⌂', NAME: '⌂', url: '/'},
    {name: 'my-page', NAME: 'my page', url: '/my-page'},
    {name: 'Not a_NICE-thing', NAME: 'Not a NICE thing', url: '/my-page/Not%20a_NICE-thing'}
  ]);
  t.end();
});

test('should accept custom beautify function', function(t){
  var crumbs = breadcrumb('/A%20-%20B', {beautify: function(str){
    return str.toLocaleLowerCase();
  }});
  t.deepEqual(crumbs, [
    {name: '⌂', NAME: '⌂', url: '/'},
    {name: 'A - B', NAME: 'a - b', url: '/A%20-%20B'}
  ]);
  t.end();
});

test('should return one element without hash', function(t){
  var crumbs = breadcrumb('/?hello=world#crumbs', {endingSlash: true});
  t.deepEqual(crumbs, [{name: '⌂', NAME: '⌂', url: '/'}]);
  t.end();
});

test('should return two elements', function(t){
  var breadcrumb = require('./index');
  var crumbs = breadcrumb('/users');
  t.deepEqual(crumbs, [{name: '⌂', NAME: '⌂', url: '/'}, {name: 'users', NAME: 'users', url: '/users'}]);
  t.end();
});

test('should return two elements without ending slash', function(t){
  var breadcrumb = require('./index');
  var crumbs = breadcrumb('/users/');
  t.deepEqual(crumbs, [{name: '⌂', NAME: '⌂', url: '/'}, {name: 'users', NAME: 'users', url: '/users'}]);
  t.end();
});

test('should return two elements without ending slash', function(t){
  var breadcrumb = require('./index');
  var crumbs = breadcrumb('/users/', {endingSlash: true});
  t.deepEqual(crumbs, [{name: '⌂', NAME: '⌂', url: '/'}, {name: 'users', NAME: 'users', url: '/users/'}]);
  t.end();
});

test('should return three elements without querystring', function(t){
  var crumbs = breadcrumb('/users?name=a&password=b', {home : 'home'});
  t.deepEqual(crumbs, [{name: 'home', NAME: 'home', url: '/'}, {name: 'users', NAME: 'users', url: '/users'}]);
  t.end();
});

test('should return five elements without ending slash', function(t){
  var crumbs = breadcrumb('/users/profile/change/address?street=imZiel&nr=3#confirm', {home : 'home'});
  t.deepEqual(crumbs, [
    {name: 'home', NAME: 'home', url: '/'},
    {name: 'users', NAME: 'users', url: '/users'},
    {name: 'profile', NAME: 'profile', url: '/users/profile'},
    {name: 'change', NAME: 'change', url: '/users/profile/change'},
    {name: 'address', NAME: 'address', url: '/users/profile/change/address'}
  ]);
  t.end();
});

test('should return five elements with ending slash', function(t){
  var crumbs = breadcrumb('/users/profile/change/address?street=imZiel&nr=3#confirm', {endingSlash : true});
  t.deepEqual(crumbs, [
    {name: '⌂', NAME: '⌂', url: '/'},
    {name: 'users', NAME: 'users', url: '/users/'},
    {name: 'profile', NAME: 'profile', url: '/users/profile/'},
    {name: 'change', NAME: 'change', url: '/users/profile/change/'},
    {name: 'address', NAME: 'address', url: '/users/profile/change/address'}
  ]);
  t.end();
});
