import express from 'express';
import cors from 'cors';
import formatUTCDate from './utils.js';
const app = express();

var corOptions = {
    origin: '*',
    methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH' ],
    allowedHeaders: [ 'Content-Type', 'Authorization' ],
    credentials: true,
    setHeaders: function (res, path, stat) {
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    }

};

app.use(express.json());
app.use(cors(corOptions));
app.use(express.urlencoded({ extended: true }));
app.route('/').get((req, res)=>{
    return res.status(200).send({
        message: "backend_logic API"
    })
})
app.route('/api').get((req, res) => {
    try {
        const { slack_name, track } = req.query;
        if (!(slack_name && track)){ return res.status(400).send({
            data: null,
            message: "Query parameter slack_name or track is required",
            status: false,
            status_code: 400
        });
    }
        const daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
        const currentDate = new Date();
        const dayName = daysOfWeek[ currentDate.getDay() ];
        return res.status(200).send({
            "slack_name": "Boniface Mbogho",
            "current_day": dayName,
            "utc_time": formatUTCDate(currentDate),
            "track": "backend",
            "github_file_url": 'https://github.com/CABON-TECH/HNGx-stage_one_task/app.js',
            "github_repo_url": 'https://github.com/CABON-TECH/HNGx-stage_one_task',
            "status_code": 200
        })
    } catch (error) {
             return res.status(500).send({
                 data: null,
                 message: error.message,
                 status: false,
                 status_code: 500
             })
    }
});

app.listen(8000, () => {
    console.log(`listening on port 3000`);
});