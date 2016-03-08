app.get('/account', passportConf.isAuthenticated, user.accountGet);
app.put('/account', passportConf.isAuthenticated, user.accountPut);
app.delete('/account', passportConf.isAuthenticated, user.accountDelete);
