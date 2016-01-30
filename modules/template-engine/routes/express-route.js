app.get('/', function(req, res) {
  res.render('home', {
    title: 'Home'
  });
});
