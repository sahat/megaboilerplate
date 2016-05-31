req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
return res.redirect('/signup');
