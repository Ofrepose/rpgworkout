const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// bcryptjs for encrypting passwords
const bcrypt = require('bcryptjs');

//Bring in json web jsonwebtoken
const jwt = require('jsonwebtoken');

//bring in config to get the jsonwebtoken that is stored there
const config = require('config')

// get Middleware
const auth = require('../../middleware/auth');


//get Models
const User = require('../../models/User');




// @route GET api/users
// @desc User route
// @access Private

/*
 * Get user object and assign to thisUser. Middleware returns a decoded user id inside the jwttoken;
 * this searches our user model for a user with id that matches the id in the decoded jwtToken and 
 * returns everything but the password.
 */
router.get('/', auth, async (req,res) => {
    // Beginning Logs for dev

    // End Logs for dev

    try{

        thisUser = await User.findById( req.user.id ).select('-password');

        if( !thisUser ){
            
            return res.status(404).json({ msg: 'User not found' });

        };

        res.json( thisUser );

    } catch( err ){

        if( err.kind === 'ObjectId' ) return res.status(400).json({ msg: 'Unauthorized - err' });

        res.status(500).send( 'Server Error ');

    }

});



// @route POST api/User
// @desc create a new User
// @access Public

/*
 * Takes json object and validates values.
 * Creates variables for body content
 * Checks if user already exists by email address
 * If user doesn't exist create new user
 * Encrypts user inputed password and sends to middleware for jwtwebtoken
 * Returns payload with user data 
 */
router.post('/', [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Valid Email Address is required')
    .isEmail(),
    check('password', 'Valid password is required')
    .isLength({ min: 6 })
], async (req, res) => {
    // Beginning Logs for dev 

    // End Logs for dev

    const errors = validationResult( req );

    if( !errors.isEmpty() ){
        
        return res.status(400).json({ errors: errors.array() });

    }

    const {
        name,
        email,
        password        
    } = req.body;

    try{

        const thisUser = await User.findOne({ email: email });

        if( thisUser ) return res.status(400).json({ errors: [{ msg: 'User already exits' }] });

        const newUser = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash( password, salt );

        await newUser.save();

        const payload = {
            user: {
                id: newUser.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
            if( err ) throw err;
            res.json({ token });
        });

    } catch( err ){

        res.status(500).send( 'Server Error' );

    }

});


// @route GET api/users/:id
// @desc Get User by ID
// @access Public

/*
 * Get user object and assign to thisUser. Middleware returns a decoded user id inside the jwttoken;
 * this searches our user model for a user with id that matches the id in the decoded jwtToken and 
 * returns everything but the password.
 */
router.get('/:id', auth, async (req, res) => {
    // Beginning Logs for dev 

    // End Logs for dev

    const thisUser = await User.findById( req.user.id );

    try{

        if( req.params.id.toString() !== thisUser.id.toString() ) {

            return res.status(404).json({ msg: "Not Authorized" });

        };

        res.json( thisUser );

    } catch( err ){

        if( err.kind === 'ObjectId' ) return res.status(400).json({ msg: 'Not a user' });

        res.status(500).send( 'Server Error' );
    }

});





// @route POST api/users/update/xp
// @desc Edit user info
// @access Private

/*
 * Get user object and assign to thisUser. Middleware returns a decoded user id inside the jwttoken;
 * this searches our user model for a user with id that matches the id in the decoded jwtToken and 
 * returns everything but the password.
 */
router.post('/update/health', auth, async ( req, res ) => {
    // Beginning Logs for dev 
    console.log('api /update/health')
    // End Logs for dev  

    try{
        let userToEdit = await User.findById( req.user.id );
        if( userToEdit.id.toString() !== req.user.id.toString() ){
            return res.status(404).json({ msg: "Unauthorized" });
        }

        const{
            health
        } = req.body;

        let userEdited = {}

        if(userToEdit.characterHealth - health >= 0){
            userEdited.characterHealth = userToEdit.characterHealth - health;
        }else{
            userEdited.characterHealth = 0;
        }
        userToEdit = await User.findOneAndUpdate({ _id: req.user.id }, { $set: userEdited }, { new: true });
        
        return res.json( userToEdit );                
    }catch(err){
        console.log( err.message );
        if( err.kind === 'ObjectId' ){
            return res.status( 400 ).json({ msg: "Err not found" });
        }
        res.status( 500 ).send( "Server Error" );
    }
});






// @route POST api/users/update/xp
// @desc Edit user info
// @access Private

/*
 * Get user object and assign to thisUser. Middleware returns a decoded user id inside the jwttoken;
 * this searches our user model for a user with id that matches the id in the decoded jwtToken and 
 * returns everything but the password.
 */
router.post('/update/xp', auth, async ( req, res ) => {
    // Beginning Logs for dev 
    console.log('api /update/xp')
    // End Logs for dev

    try{
        let userToEdit = await User.findById( req.user.id );
        if( userToEdit.id.toString() !== req.user.id.toString() ){
            return res.status(404).json({ msg: "Unauthorized" });
        }

        const{
            exp
        } = req.body;

        let userEdited = {}

        userEdited.exp = userToEdit.exp + exp;
        userEdited.totalExp = userToEdit.totalExp + exp;

        userToEdit = await User.findOneAndUpdate({ _id: req.user.id }, { $set: userEdited }, { new: true });
        
        return res.json( userToEdit );

    }
    catch(err){
        console.log( err.message );
        if( err.kind === 'ObjectId' ){
            return res.status( 400 ).json({ msg: "Err not found" });
        }
        res.status( 500 ).send( "Server Error" );
    }
});







// @route POST api/users/update/initialInfo
// @desc Edit user info
// @access Private

/*
 * Get user object and assign to thisUser. Middleware returns a decoded user id inside the jwttoken;
 * this searches our user model for a user with id that matches the id in the decoded jwtToken and 
 * returns everything but the password.
 */
router.post('/update/initialInfo', auth, async (req, res) => {
    // Beginning Logs for dev 
    console.log('inside api initialInfo')
    console.log(req.user.id)
    // End Logs for dev
    
    try{
        let userToEdit = await User.findById( req.user.id );
        if(userToEdit.id.toString() !== req.user.id.toString()){
            return res.status(404).json({ msg: "Unauthorized" });
        }

        const{
            inPushups,
            inJumpingJacks,
            inStepUps,
            inMountainClimbers,
            inSquatJumps,
            inBurpees
        } = req.body;

        let userEdited = {}

        if( inPushups ) userEdited.inPushups = inPushups;
        if( inJumpingJacks ) userEdited.inJumpingJacks = inJumpingJacks;
        if( inStepUps ) userEdited.inStepUps = inStepUps;
        if( inMountainClimbers ) userEdited.inMountainClimbers = inMountainClimbers;
        if( inSquatJumps ) userEdited.inSquatJumps = inSquatJumps;
        if( inBurpees ) userEdited.inBurpees = inBurpees;

        userEdited.totalExp = 5;        
        userEdited.exp = 5;
       

        userToEdit = await User.findOneAndUpdate({ _id: req.user.id }, { $set: userEdited }, { new: true });
        
        return res.json( userToEdit );
    }
    catch(err){
        console.log( err.message );
        if( err.kind === 'ObjectId' ){
            return res.status( 400 ).json({ msg: "Err not found" });
        }
        res.status( 500 ).send( "Server Error" );
    }
})



module.exports = router;