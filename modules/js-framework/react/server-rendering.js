app.get('/', function(req, res) {
  res.render('home.html', {
    html: ReactDOM.renderToString(HomeComponent())
  });
});
