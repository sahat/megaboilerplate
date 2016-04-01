new User({ id: req.user.id })
  .fetch()
  .then(function(user) {
    switch (req.params.provider) {
      case 'facebook':
        user.set('facebook', null);
        break;
      case 'google':
        user.set('google', null);
        break;
      case 'twitter':
        user.set('twitter', null);
        break;
      case 'vk':
        user.set('vk', null);
        break;
      default:
        //= PROVIDER_UNLINK_ERROR
    }
    user.save(user.changed, { patch: true }).then(function() {
      //= PROVIDER_UNLINK_SUCCESS
    });
  });
