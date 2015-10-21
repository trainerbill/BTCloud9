
module.exports = function (app) {
    //Add Routes Here
    // a route and its handler function (middleware system) which handles GET requests to /user/:id
    app.post('/process', function (req, res, next) {
      var gateway = app.get('btgateway');
      console.log(req.body);
      
      var form = req.body;
      
      /*
        THIS IS WHERE YOU SHOULD BE DOING YOUR EDITS.
        This piece of code looks at the form input btaction and does actions based on it.  So on the HTML file it correspondes to the hidden input:
        
        <input type="hidden" name="btaction" value="getclienttoken" />
        
        So when you do other api calls like void you would just set the input value to
        <input type="hidden" name="btaction" value="void" />
        
        Then do the corresponding BT api call here.
        
        
        For some api calls you will need different stuff passed in.  For example the void transaction needs a transaction ID.  So you would make an input on the form:
        
        <input type="text" name="trxid" value="" />
        
        That value will come in as form.trxid so now you would use that to submit the void api call
      */
      
      if (req.body.btaction === 'getclienttoken') {
        gateway.clientToken.generate({}, function (err, response) {
          if (err) {
            res.send(err);
          } else {
            res.send(response);
          }
        });
      } else if (req.body.btaction === 'void') {
        gateway.transaction.void(form.trxid, function (err, response) {
          if (err) {
            res.send(err);
          } else {
            res.send(response);
          }
        });
      } 
    });
    
    /*
      DONT TOUCH ME.  I AM A ROUTE TO GET A CLIENT TOKEN FOR THE JS SDK
    */
    app.get('/token/:customerId?', function (req, res, next) {
      var gateway = app.get('btgateway');
      var config = {};
      if (req.params.customerId) {
        config.customerId = req.params.customerId;
      }
      
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.send(err);
        } else {
          res.send(response.clientToken);
        }
      });
    });
}