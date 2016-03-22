# url-breadcrumb

> A simple function that creates a breadcrumb array from an url path string

- works on the server as well as in the browser
- the path string must start with a slash '/'
- node.js e.g. `req.url`
- browser e.g. `window.pathname`

## install

```sh
npm install --save url-breadcrumb
```

## usage

```js
var breadcrumb = require('url-breadcrumb');
var crumbs = breadcrumb(req.url);

crumbs = breadcrumb('/#crumbs');
// -> [{name: '⌂', NAME: '⌂', url: '/'}]

crumbs = breadcrumb('/A%20-%20B', { beautify: function(str){
  return str.toLocaleLowerCase();
}});
/* ->
[
  {name: '⌂', NAME: '⌂', url: '/'},
  {name: 'A - B', NAME: 'a - b', url: '/A%20-%20B'}
]
*/

crumbs = breadcrumb('/users/profile/change/address?street=imZiel&nr=3#confirm', {home : 'home'});
/* ->
[
  {name: 'home', NAME: 'home', url: '/'},
  {name: 'users', NAME: 'users', url: '/users'},
  {name: 'profile', NAME: 'profile', url: '/users/profile'},
  {name: 'change', NAME: 'change', url: '/users/profile/change'},
  {name: 'address', NAME: 'address', url: '/users/profile/change/address'}
]
*/

crumbs = breadcrumb('/users/profile/change/address?street=imZiel&nr=3#confirm', {endingSlash : true});
/* ->
[
  {name: '⌂', NAME: '⌂', url: '/'},
  {name: 'users', NAME: 'users', url: '/users/'},
  {name: 'profile', NAME: 'profile', url: '/users/profile/'},
  {name: 'change', NAME: 'change', url: '/users/profile/change/'},
  {name: 'address', NAME: 'address', url: '/users/profile/change/address'}
]
*/
```

Check [test.js](test.js) for more examples.

## options

the following optional options can be provided as {Object} in the second argument.

- home {String}: name for the home link
- endingSlash {Boolean}: true, if the url elements should contain the ending slash '/'
- beautify {Function}: beautify function

## test

```sh
npm test
```

## license

MIT

## author

Andi Neck | [@andineck](https://twitter.com/andineck) | andi.neck@intesso.com | intesso