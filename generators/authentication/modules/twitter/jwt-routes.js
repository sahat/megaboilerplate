app.post('/auth/twitter', UserController.authTwitter);
app.post('/auth/twitter/callback', UserController.authTwitterCallback);
