// alll global initial start here

module.exports = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar
};

console.log('------initialize parse API------');

const Parse = require('parse/node');

Parse.initialize('Calculator', 'UpdKbelU7zvtsCCW', 'jQAr0Xqhbkw45mSW');
// change URL to server ip not localhost
Parse.serverURL = 'http://18.223.112.55:8080/v1';
// Parse.serverURL = 'http://127.0.0.1:8080/v1';

Parse.masterKey = 'jQAr0Xqhbkw45mSW';
