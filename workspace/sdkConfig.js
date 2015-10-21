var braintree = require('braintree');

module.exports = function (app) {
    //Initialize SDK
  var gateway = braintree.connect({
    environment: braintree.Environment['Sandbox'],
    merchantId: 'jxr4n8f2ttsbjs4r',
    publicKey: '3rd5wqzpxfw78tq5',
    privateKey: '86d9433c9c5395d1bc93e367973b2480'
  });
  app.set('btgateway', gateway);
}