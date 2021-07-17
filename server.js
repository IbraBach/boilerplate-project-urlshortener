require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res)=>{
  let regex = /http|https:\/\/\w+.\w+/gmi;
  let url = req.body.url;
  if (regex.test(url)){
    let short = shortUrl (url);
    res.json({ original_url : url, short_url : short})
  } else {
    res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:data', function(req, res) {
  let data = req.params.data;
  res.redirect(url_start+'?'+data);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
