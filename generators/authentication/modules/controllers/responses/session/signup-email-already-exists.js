req.flash('error', { msg: 'The email address you have entered is already associated with an account.' });
return res.redirect('/signup');
