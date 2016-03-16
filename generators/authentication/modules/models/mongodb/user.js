var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  // essential fields
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  // optional profile fields
  gender: String,
  location: String,
  website: String,
  picture: String,

  // unique user identifiers
  facebook: String,
  twitter: String,
  google: String
}, { timestamps: true });

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.virtual('gravatar').get(function() {
  if (!this.get('email')) {
    return 'https://gravatar.com/avatar/?s=200&d=retro';
  }
  var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
});

var User = mongoose.model('User', userSchema);

module.exports = User;
