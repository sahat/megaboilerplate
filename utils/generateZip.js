let fs = require('fs');
let path = require('path');
let archiver = require('archiver');

function generateZip(req, res) {
  let archive = archiver('zip');

  archive.on('error', function(err) {
    res.status(500).send(err.message);
  });

  res.on('close', function() {
    console.log('closing...')
    console.log('Archive wrote %d bytes', archive.pointer());
    return res.status(200).send('OK').end();
  });

  res.attachment('megaboilerplate-express.zip');

  archive.pipe(res);

  let files = [
    __base + '/modules/express/app.js',
    __base + '/modules/express/package.json'
  ];

  for (let i in files) {
    archive.append(fs.createReadStream(files[i]), { name: path.basename(files[i]) });
  }

  archive.finalize();
}

module.exports = generateZip;
