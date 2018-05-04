var jwt = require('jsonwebtoken');

var { User } = require('../models/user');

// GET ALL [/users]
const index = (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            res.json({ error: "Token invalid; token may have expired" })
        }
        else {
            User.find().exec((err, users) => {
                res.json({ users });
            })
        }
    });
}

// GET BY ID [/users/:id]
const getById = (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, async (err, authData) => {
        if (err) {
            res.json({ error: "Token invalid; token may have expired" })
        }
        else {
            try {
                let user = await User.findById(req.params.id).exec();
                user === null ? res.status(404).json({ message: "User Not Found" }) : res.json(user);
            } catch (err) {
                res.json({ error: err.message })
            }
        }
    });
}
// CREAT new User
const createNewUser = async (req, res) => {
    if (req.headers.key === process.env.REG_CODE) {
        try {
            let creation = await User.create(req.body);
            res.json({
                success: true,
                user: creation
            });
        } catch (err) {
            res.json({ error: err.message });
        }
    } else {
        res.json({
            success: false
        })
    }
    
}

// DELETE User
const destroy = (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            res.json({ error: "Token invalid; token may have expired" })
        }
        else {
            User.findByIdAndRemove(req.params.id, (err, user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                } else {
                    res.json(user);
                }
            })
        }
    });

}

// LOGIN: Find user, verify password
const login = (req, res) => {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else if (err) {
            res.json({ error: error });
        }
        else {
            user.verifyPassword(req.body.password, function (err, isMatch) {
                if (isMatch) {
                    jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '24hr' }, (err, token) => {
                        res.json({
                            success: true,
                            token: token
                        });
                    })

                }
                else {
                    res.json({ success: false });
                }
            });
        }

    });
}

//check token
const tokenCheck = (req, res) => {
    console.log("TOKEN", req.token)
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            res.json({ success: false })
        }
        else {
            res.json({ success: true })
        }
    });
}

module.exports = {
    index,
    getById,
    destroy,
    login,
    tokenCheck,
    createNewUser
}