req.flash('info', { msg: 'An email has been sent to ' + user.email + ' with further instructions.' });
res.redirect('/forgot');
