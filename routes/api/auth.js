const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// bring in middleware
const auth = require('../../middleware/auth');

// bring in user model
const User = require('../../models/User');

// bring in json webtoken
const jwt = require('jsonwebtoken');
// bring in config to get the jsonwebtoken that is stored there
const config = require('config');
// bring in encryption library
const bcrypt = require('bcryptjs');






/******************************************************************************
 *                          Route - GET api/auth     
 *                               Auth route
 *                            access -> Private
 ******************************************************************************/

/*
 * Get user object and assign to thisUser. Middleware returns a decoded user id inside the jwttoken;
 * this searches our user model for a user with id that matches the id in the decoded jwtToken and 
 * returns everything but the password.
 */
router.get('/', auth, async (req, res) => {
    // Beginning Logs for dev 
    console.log('Inside api/auth/');
    console.log(req.user);
    // End Logs for dev

    try{

        let thisUser = await User.findById(req.user.id);

        if( !thisUser ){

            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] }); 

        }

        res.json( thisUser );

    }catch( err ){

        res.status(500).send('Server Error');

    }

});






/******************************************************************************
 *                          Route - POST api/auth    
 *                               Auth route
 *                            access -> Private
 ******************************************************************************/

/*
 * Gets input and validates input type on server side. 
 * Checks if user exists and if password matches password in database.
 * Returns token for use on frontend.
 */
router.post('/',
[
    check('email', 'Please include a valid Email Address')
    .isEmail(),
    check('password', 'Password is required to continue')
    .exists()
],
async (req, res) => {
    // Beginning Logs for dev
    console.log('inside post auth')
    // End Logs for dev

    const errors = validationResult(req);

    if( !errors.isEmpty() ){

        return res.status(400).json({ errors: errors.array() });

    }

    const { email, password } = req.body;

    try{

        let thisUser = await User.findOne({ email: email });

        if( !thisUser ){

            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

        };

        const isMatch = await bcrypt.compare( password, thisUser.password );

        if( !isMatch ){

            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

        };

        const payload = {

            user: {
                id: thisUser.id
            }

        };

        jwt.sign(payload, config.get('jwtSecret'),
        { expiresIn: 36000 },
        ( err, token ) => {
            if( err ) throw err;
            res.json({ token });
        });

    } catch( err ){

        res.status(500).send('Server Error');
    
    };

});





module.exports = router;




