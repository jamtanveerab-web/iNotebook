const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;
//Route 1: create user using : post("/api/auth/createuser") . no login required
router.post('/createuser', [
    body('email', 'enter a valid email').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('password', 'password must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // if there are error , return bsd request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() })
    }
    // check weahter the user with this email exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "sorry, a user with this email already exists" })

        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //creating a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        //res.json(user)
        success = true;
        res.json({success, authToken });
        // catch error
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
//Route 2:  Authendicate a user using : post("/api/auth/login") . no login required
router.post('/login', [
    body('email', 'mail').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
     let  success = false;
    // if there are error , return bsd request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
              success = false;
            return res.status(400).json({success, error: "please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
             success = false;
            return res.status(400).json({success , error: "please try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success,authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
//Route 3:  Get loggin user details  using : post("/api/auth/getuser") .login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
module.exports = router