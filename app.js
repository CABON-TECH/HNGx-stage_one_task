const express = require('express');
const moment = require('moment-timezone');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  const slackName = 'boniface mbogho';
  const track = 'backend';

  // Validating query parameters
  if (!slackName || !track) {
    return res.status(400).json({ error: 'slack_name and track are required parameters' });
  }

  // Get current day of the week
  const currentDay = moment().tz('UTC').format('dddd');

  // Get current UTC time with validation of +/-2 minutes
  const currentUtcTime = getCurrentUtcTime();

  // Construct GitHub URLs
  const githubRepoUrl = 'https://github.com/CABON-TECH/HNGx-stage_one_task';
  const githubFileUrl = `${githubRepoUrl}/HNGx-stage_one_task/app.js`;

  // Prepare the response JSON
  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: currentUtcTime.toISOString(),
    track: track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  };

  res.status(200).json(response);
});

function getCurrentUtcTime() {
  const currentUtcTime = moment().tz('UTC');
  // Checking if the current time is within +/-2 minutes
  const validRange = moment.duration(2, 'minutes');
  const timeDifference = moment().tz('UTC').diff(currentUtcTime);
  
  if (Math.abs(timeDifference) > validRange) {
    throw new Error('UTC time validation failed');
  }

  return currentUtcTime;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});