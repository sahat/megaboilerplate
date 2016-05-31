
app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});
