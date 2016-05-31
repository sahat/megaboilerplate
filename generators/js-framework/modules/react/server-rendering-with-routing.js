
// React server rendering
app.use(function(req, res) {
  //= REDUX_INITIAL_STATE_INDENT1

  var store = configureStore(initialState);

  Router.match({ routes: routes.default(store), location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
        React.createElement(Router.RouterContext, renderProps)
      ));
      //= RENDER_TEMPLATE_INDENT3
    } else {
      res.sendStatus(404);
    }
  });
});
