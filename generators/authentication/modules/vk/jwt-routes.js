app.post('/auth/vkontakte', UserController.authVkontakte);
app.get('/auth/vkontakte/callback', UserController.authVkontakteCallback);
