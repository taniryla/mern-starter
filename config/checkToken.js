const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // check for the token being sent in a header or as a query parameter
    let token = req.get('Authorization') || req.query.token;
    if (token) {
        // Remove the 'Bearer" if it was included in the token
        token = token.replace('Bearer ', '');
        // check if the token is valid and not expired
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            // if valid token, decoded will be the token's entire payload
           // if invalid token, err will be set
           req.user = err ? null : decoded.user;
           // if your app cares... (optional)
           req.exp = err ? null : new Date(decoded.exp * 1000);
           return next();
            });
        } else {
            req.user = null;
            return next();
         }
    }
