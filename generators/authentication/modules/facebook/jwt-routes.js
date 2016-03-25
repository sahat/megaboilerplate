app.post('/auth/facebook', UserController.authFacebook);
app.get('/auth/facebook/callback', UserController.authFacebookCallback);
