var jwt = require('jsonwebtoken');

var { Venue } = require('../models/venue');

// GET ALL [/venues]
const index = (req, res) => {
    // jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    //     if (err) {
    //         res.json({ error: "Token invalid; token may have expired" })
    //     }
    //     else {
    //         Venue.find().exec((err, venues) => {
    //             res.json({ venues });
    //         })
    //     }
    // });

    Venue.find().exec((err, venues) => {
        res.json({ venues });
    })
}

// GET BY ID [/venues/:id]
const getById = (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, async (err, authData) => {
        if (err) {
            res.json({ error: "Token invalid; token may have expired" })
        }
        else {
            try {
                let venue = await Venue.findById(req.params.id).exec();
                venue === null ? res.status(404).json({ message: "Venue Not Found" }) : res.json(venue);
            } catch (err) {
                res.json({ error: err.message })
            }
        }
    });
}
// CREAT new Venue
const createNewVenue = async (req, res) => {
    // jwt.verify(req.token, process.env.JWT_KEY, async (err, authData) => {
    //     if (err) {
    //         res.json({ error: err})
    //     }
    //     else {
    //         try {
    //             let creation = await Venue.create(req.body);
    //             res.json({
    //                 success: true,
    //                 venue: creation
    //             });
    //         } catch (err) {
    //             res.json({ error: err.message })
    //         }
    //     }

        try {
            let creation = await Venue.create(req.body);
            res.json({
                success: true,
                venue: creation
            });
        } catch (err) {
            res.json({ error: err.message })
        }

    // });
}

// DELETE Venue
const destroy = (req, res) => {
        jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
            if (err) {
                res.json({ error: "Token invalid; token may have expired" })
            }
            else {
                Venue.findByIdAndRemove(req.params.id, (err, venue) => {
                    if (!venue) {
                        res.status(404).json({ message: 'Venue not found' });
                    } else {
                        res.json(venue);
                    }
                })
            }
        });

    }


    // //check token
    // const tokenCheck = (req, res) => {
    //     console.log("TOKEN", req.token)
    //     jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    //         if (err) {
    //             res.json({ success: false })
    //         }
    //         else {
    //             res.json({ success: true })
    //         }
    //     });
    // }

    module.exports = {
        index,
        getById,
        destroy,
        // tokenCheck,
        createNewVenue
    }