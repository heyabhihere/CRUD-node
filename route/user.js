const express = require('express')
const { user } = require('../db')
const { default: mongoose } = require('mongoose')

const router = express.Router()

//get request
router.get('/user', async (req, res) => {
    try {
        const users = await user.find()
        return res.json(users);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error fetching users"
        });
    }
})


router.post('/post', async (req, res) => {

    try {
        await user.create({
            username: req.body.username,
            password: req.body.password
        })
        return res.json({
            msg: "user created"
        })
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: "Bad request"
        })
    }

})


// put request
router.put('/update', async (req, res) => {


    try {
        const existinguser = await user.findOne({ username: req.body.username })
        console.log(existinguser, "---")
        if (!existinguser) {
            return res.status(404).json({
                msg: "user not found"
            })
        }
        const filter = { username: req.body.username };
        const update = { password: req.body.password };
        await user.findOneAndUpdate(filter, update);

        return res.json({
            msg: "updated"
        });
    } catch (error) {
        console.error(error);
        return res.json({
            error: "error updating user"
        })
    }

});



//delete request
router.delete('/delete', async (req, res) => {
    try {
        const username = { username: req.body.username }
        await user.deleteOne(username)
        return res.send({
            msg: "delete"
        })
    } catch (error) {
        console.error(error);
        return res.json({
            error: "error deleting user"
        })
    }
})
module.exports = router





