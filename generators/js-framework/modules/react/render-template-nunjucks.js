nunjucks.render('views/layout.html', { html: html, initialState: store.getState() }, function(err, html) {
  res.send(html);
});
