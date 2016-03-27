app.put('/account', UserController.ensureAuthenticated, UserController.accountPut);
app.delete('/account', UserController.ensureAuthenticated, UserController.accountDelete);
