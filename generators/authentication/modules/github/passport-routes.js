app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email profile repo' ] }));
app.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login' }));
