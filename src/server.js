const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

const mongoose = require('mongoose');
const app = require('./index');

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE)
    .then((con) => {
        console.log('DB connection success');
    })

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`http://localhost:${port}`));