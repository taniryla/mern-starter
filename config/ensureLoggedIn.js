module.exports = function (req, res, next) {
    // send back status code 401 - 'Unauthorized' if they are not logged in
    if (!req.user) return res.status(401).json('Unauthorized');
    // everything is okay
    next();
};