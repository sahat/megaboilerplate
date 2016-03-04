app.get('/signup', user.signupGet);
app.post('/signup', user.signupPost);
app.get('/login', user.loginGet);
app.post('/login', user.loginPost);
app.get('/forgot', user.forgotPasswordGet);
app.post('/forgot', user.forgotPasswordPost);
app.get('/reset/:token', user.resetPasswordGet);
app.post('/reset/:token', user.resetPasswordPost);
