const dontenv = require('dotenv');
const bcrypt = require('bcryptjs');
// Load ENV vars
dontenv.config({ path: './config/config.env' });

// Connect to DB
const db = require('./models');

// Import data

const importData = async () => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('123456', salt);
    const users = {
        name: 'admin', password: password, email: 'admin@admin.com', remember_token: '123455',
        role: 'admin'
    }
    try {
        await db.User.create(users);
        console.log('User Data imported...');
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

// Delete data
const deleteData = async () => {
    try {
        db.User.destroy({
            where: {},
            truncate: true
        })
        console.log('User Data destroyed...');
        if (process.argv[2] === '-d') {
            process.exit();
        }
    } catch (error) {
        console.error(error);
    }
};

// Reset Data
const resetData = async () => {
    try {
        console.log('Deleting data...');
        await deleteData();
        console.log('data deleted');
        console.log('Importing data...');
        await importData();
        console.log('data imported');
    } catch (error) {
        console.error(error);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else if (process.argv[2] === '-r') {
    resetData();
}