app.post('/auth/vkontakte', userController.authVkontakte);
app.get('/auth/vkontakte/callback', userController.authVkontakteCallback);
