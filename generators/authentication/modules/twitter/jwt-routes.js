app.post('/auth/twitter', UserController.authTwitter);
app.get('/auth/twitter/callback', UserController.authTwitterCallback);
