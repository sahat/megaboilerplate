app.get('/logout', user.logout);
app.get('/unlink/:provider', passportConf.isAuthenticated, user.unlink);
