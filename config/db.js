const mongoose = require('mongoose');
const config = require('config');
const dbUri = config.get('mongoURI');

const db =async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('Mongodb connect ...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = db;