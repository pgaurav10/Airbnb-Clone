const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const User = require('./models/users')

require('dotenv').config()
const bcryptSalt = bcrypt.genSaltSync(8);

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5176',
}));


mongoose.connect(process.env.MONGO_URL);
app.get('/test', (req, res)=> {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const userDoc = await User.findOne( {
            email: email
        })

        if(userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password)
            if(passOk) {
                res.json('password Okay')
            } else {
                res.json('password not Ok')
            }

        } else {

            res.json('not found');
        }

    } catch (e) {
        res.status(422).json(e);
    }
})
app.listen(4000);