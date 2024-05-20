// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Date API endpoint
/* =================================
Purpose: Will return JSON object with proper format
Output: 
================================= */
app.get("/api/:date?", (req, res) => {
  console.log("================================");
  console.log(req.params.date);

  let retValue = {}

  if (req.params.date == undefined) {
    retValue.utc = new Date().toUTCString();
    retValue.unix = Date.now();
  } else {
    console.log(typeof(req.params.date));

    let unixDate = Date.parse(req.params.date);
    let utcDate = new Date(req.params.date);
    
    // console.log(unixDate);
    // console.log(utcDate);

    // If can't parse utc date, assume date is in Unix format
    if (utcDate == "Invalid Date") {
      unixDate = parseInt(req.params.date);
      utcDate = new Date(parseInt(req.params.date));

      // console.log("\nIn unix date format");
      // console.log(unixDate);
      // console.log(utcDate);
    }

    if (unixDate == null || utcDate == "Invalid Date") {
      retValue.error = "Invalid Date";
    } else {
      retValue.unix = unixDate;
      retValue.utc = utcDate.toUTCString();
    }
  }
  
  res.json(retValue);
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
