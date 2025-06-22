const mongoose = require('mongoose');

require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database created/connected'))
.catch((err) => console.error(err)); 
