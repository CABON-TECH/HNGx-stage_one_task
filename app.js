import express from 'express'

const app = express()

app.listen(5000, () => console.log('Server running on port 5000'))

app.get('/api', (req, res) => {
    let { slack_name, track } = req.query;

    try {
        // Get the current UTC time with a +/-2 minute window
        let currentDate = new Date();
        let currentDateWithWindow = new Date(currentDate.getTime() - 2 * 60 * 1000);

        if (isNaN(currentDateWithWindow.getTime())) {
            throw new Error('Invalid date object');
        }

        // Format the UTC time as required
        let formattedUtcTime = currentDateWithWindow.toISOString().slice(0, -5) + 'Z'; // Remove milliseconds and trailing 'Z'

        res.json({
            slack_name,
            current_utc_time: formattedUtcTime,
            track,
            github_file_url: 'https://github.com/CABON-TECH/HNGx-stage_one_task/blob/main/app.js',
            github_repo_url: 'https://github.com/CABON-TECH/HNGx-stage_one_task',
            status_code: 200
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});