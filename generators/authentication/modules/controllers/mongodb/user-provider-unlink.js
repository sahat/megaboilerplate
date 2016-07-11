User.findById(req.user.id, function(err, user) {
  switch (req.params.provider) {
    case 'facebook':
      user.facebook = undefined;
      break;
    case 'google':
      user.google = undefined;
      break;
    case 'twitter':
      user.twitter = undefined;
      break;
    case 'vk':
      user.vk = undefined;
      break;
    case 'github':
        user.github = undefined;
      break;      
    default:
      //= PROVIDER_UNLINK_ERROR
  }
  user.save(function(err) {
    //= PROVIDER_UNLINK_SUCCESS
  });
});
