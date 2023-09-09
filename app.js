import express from 'express'

const app = express()

app.listen(5000, () => console.log('Server running on port 5000'))

app.get('/api', (req, res) => {
    let { slack_name, track } = req.query

    let currentDate = new Date()
    let day = currentDate.getDay()
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    res.json({
        slack_name,
        current_day: days[day],
        utc_time: currentDate.toISOString().slice(0, -2) + 'Z',
        track,
        github_file_url: 'https://github.com/CABON-TECH/HNGx-stage_one_task/blob/main/app.js',
        github_repo_url: 'https://github.com/CABON-TECH/HNGx-stage_one_task',
        status_code: 200
    })
})
