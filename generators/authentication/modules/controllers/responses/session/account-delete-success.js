req.logout();
req.flash('info', { msg: 'Your account has been permanently deleted.' });
res.redirect('/');
