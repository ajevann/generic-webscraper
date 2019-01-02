const rp = require('request-promise');
const path = require('path');
const fs = require('fs');

// Directory to save items to
var dir = 'pages';

// Create it if it doesn't exist
if (!fs.existsSync('./' + dir)){
    fs.mkdirSync('./' + dir);
}

// Base url (not always necessary)
var baseUrl = 'https://en.wikipedia.org/wiki/';

// Default extension
var extension = '.html';

// Load pages json array
var contents = fs.readFileSync("pages.json");
var pages = JSON.parse(contents);

// Iterate through each
pages.forEach(page => {
  var url = baseUrl ? baseUrl + page.path : page.path;
  var filename = page.title || page.path;
  filename += page.extension || extension;

  rp(url).then(function(html){

    // Write contents to file
    fs.writeFile(path.resolve(__dirname + '/' + dir + '/' + filename), html, 'utf8', function (err) {});
    console.log(page.path, '... success');

  }).catch(function(err){
    
    // Write out error
    console.log(page.path, '... error');

  });
});
