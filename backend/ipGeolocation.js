module.exports.ipGeolocation =  function ipGeolocation(app, connection) {
  app.get('/ipInfo', function (request, response) {
      var header = request.headers;
      var ips = new Object();
      connection.query('SELECT DISTINCT serverIPAddress as ip, count(*) as numReq FROM Entry where username=(?) AND serverIPAddress IS NOT NULL group by serverIPAddress;', [header.username], function(err,result,fields){
          if (err) throw  err;
          for(var i in result){
            if(result[i]['ip'] !== '')
              ips[result[i]['ip'].match(/\w.*\w/)[0].toString()]=result[i]['numReq']
          }
          console.log(ips)
          response.send(ips)
        });

      //response.sendFile(path.resolve('html/profileSettings.html'));
  });

}