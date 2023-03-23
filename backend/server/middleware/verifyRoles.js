const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const { user } = req
        console.log(...allowedRoles);
        console.log(user);
        if (user && allowedRoles.includes(user.role)) {
            next(); // role is allowed, so continue on the next middleware
        } else {
            res.status(403).json({ message: "Unauthorized" }); // user is forbidden
        }
    }
}

module.exports = verifyRoles