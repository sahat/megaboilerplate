app.get('/', function(req, res) {
  res.render('home.html', {
    title: 'Home'
  });
});
