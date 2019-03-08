var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'UserName field is required'],
    unqiue: [true, 'Username Already Exists'],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

var eventSchema = mongoose.Schema({
  title: {
    required: [true, 'title field is required'],
    type: String
  },
  text: {
    type: String
  },
  startDate: Date,
  endDate: Date,
  location: String,
  username: {
    type: String,
    required: [true, 'UserName field is required'],
    trim: true,
    lowercase: true
  }
});

if (!userSchema.options.toObject) {
  userSchema.options.toObject = {};
}

userSchema.options.toObject.transform = (document, transformedDocument) => {
  delete transformedDocument.password;
  return transformedDocument;
};

mongoose.model('User', userSchema);
mongoose.model('Event', eventSchema);