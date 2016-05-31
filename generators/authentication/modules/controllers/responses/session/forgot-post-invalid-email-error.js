req.flash('error', { msg: 'The email address ' + req.body.email + ' is not associated with any account.' });
return res.redirect('/forgot');
