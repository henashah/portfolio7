const express = require('express')
const app = express()
const bodyparser = require('body-parser')
// const fs = require('fs')
const csv = require('fast-csv')
const cors = require('cors')
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
 
//use express static folder
app.use(cors())

// serve static files from the "build" directory
app.use(express.static(path.join(__dirname, '/frontend/build')));

console.log(__dirname);
// handle all requests and serve the React app's index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})
app.use(express.json())
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
 
// database connection
const db = mysql.createConnection({
    host: "my-database-1-instance-1.czwhfi5uavam.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "g0disg00d",
    database: "main"
})

 
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

// create connection
const PORT = process.env.PORT || 3000
// const PORT = 443
app.listen(PORT, () => console.log(`pm learning project is listening on port ${PORT}!`));

// get server status
app.get('/api/status', (req, res) => {
    res.send({status: "I'm running"});
  });

// API Endpoint to Submit Testimony
app.post('/api/submit-testimony', (req, res) => {
    const { name, content } = req.body;
    const sql = 'INSERT INTO testimonies (name, content) VALUES (?, ?)';
    db.query(sql, [name, content], (err, result) => {
      if (err) {
        console.error('Error submitting testimony to database:', err);
        res.status(500).json({ error: 'Failed to submit testimony' });
      } else {
        console.log('Testimony submitted to database');
        res.json({ message: 'Testimony submitted successfully' });
      }
    });
  });
  
  // API Endpoint to Fetch Testimonies
  app.get('/api/testimonies', (req, res) => {
    const sql = 'SELECT * FROM testimonies';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching testimonies from database:', err);
        res.status(500).json({ error: 'Failed to fetch testimonies' });
      } else {
        res.json(results);
      }
    });
  });

// get testimony
app.post("/api/insert") , (req, res) => {
    db.connect((error) => {
        if (error) {
            console.error("DB err_________________" + error);
        } else {
            const query = 'INSERT INTO testimonials (name, profile, message) VALUES ?';;
            db.query(query, res, (error, response) => {
                console.log(error || response);
            });
        }
    });
}

// generate chart
app.get("/api/chart", (req, res) => {
    console.log("calling chart api");
    const query = 'SELECT urgency, importance, tag FROM tasks';
    db.query(query, (err, result) => {
    res.send(result);
    });
});

// upload csv to "uploads folder"
const upload = multer({ dest: 'uploads/' })
app.post('/api/uploadfile', upload.single('uploadfile'), (req, res) =>{
    console.log(req.file);
    UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
    console.log('CSV file data has been uploaded in mysql database');
});

// upload csv data into database
function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
  
            // Open the MySQL connection
            db.connect((error) => {
                if (error) {
                    console.error("DB err_________________" + error);
                } else {
                    let query = 'INSERT INTO tasks (title, tag, urgency, importance) VALUES ?';
                    db.query(query, [csvData], (error, response) => {
                        console.log(error || response);
                    });
                }
            });
             
            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            // fs.unlinkSync(filePath)
        });
  
    stream.pipe(csvStream);
}
 

//------------------------
//! Use of Multer
// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads/')    
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
 
// var upload = multer({
//     storage: storage
// });

// //@type   POST
// // upload csv to database
// app.post('/uploadfile', upload.single('uploadfile'), (req, res) =>{
//     // console.log(req.file);
//     UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
//     console.log('CSV file data has been uploaded in mysql database ' + err);
// });

// // app.post('/uploadfile',upload.single('uploadfile'), function(req, res, next) {
// //     // req.file is the `uploadCsv` file 
// //     // req.body will hold the text fields, if there were any 
// //     console.log(req.file);
// //     // the buffer here containes your file data in a byte array 
// //     var csv=req.file.toString('utf8');
// // });

