import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    slack_name: {
      type: String,
      required: [true, 'slackname is needed'],
    },
    track: {
      type: String,
      required: [true, 'track is needed'],
    },
    current_day: {
      type: String,
      enum: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      required: [true, 'currentDay is needed'],
    },
    github_file_url: {
      type: String,
    },
    github_repo_url: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtual properties when converting to JSON
  }
);

// Define a virtual property for utc_time that calculates the current UTC time when accessed
userSchema.virtual('utc_time').get(function () {
  const currentDate = new Date();
  return new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toISOString().slice(0, -5) + 'Z';
});

const User = mongoose.model('User', userSchema);

export default User;
