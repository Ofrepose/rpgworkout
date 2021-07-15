const jwt = require('jsonwebtoken');
const config = require('config');






/*
* Get token from header.
* If can't find token return 401.
* Verify token and secret.
* Take the request object and assign value to user variable.
* Next() continues application.
*/
module.exports = function(req, res, next) {
  // Beginning Logs for dev 
  console.log('inside middleware api auth')
  // End Logs for dev

  const token = req.header('x-auth-token');

  if( !token ){

    return res.status(401).json({ msg: 'No Token, authorization denied' });

  };

  try{
    
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    
    req.user = decoded.user;
    
    next();

  }catch( err ){

    res.status(401).json({ msg: 'Token is not valid' });

  };

};
