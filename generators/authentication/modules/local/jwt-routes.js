app.post('/signup', UserController.signupPost);
app.post('/login', UserController.loginPost);
app.post('/forgot', UserController.forgotPost);
app.post('/reset/:token', UserController.resetPost);
