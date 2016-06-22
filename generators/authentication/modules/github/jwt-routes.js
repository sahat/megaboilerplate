app.post('/auth/github', userController.authGithub);
app.get('/auth/github/callback', userController.authGithubCallback);
