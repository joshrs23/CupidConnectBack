const jwt = require('jsonwebtoken');
const Matches = require('../models/matches');
const Likes = require('../models/likes');
const auth = require('../middlewares/authenticate');
const Users = require('../models/users');

exports.getMatchesByUser  = [auth,async (req, res) => {

    try {

        const { userId } = req.body;

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const _userId = decodedToken.userId;

        if(userId === _userId){

            const user = await Users.findById(userId);

            if (!user) {

                return res.json({

                    success: false,
                    error: 'User not found.',

                });

            }

            const matches = await Matches.find({ $or: [{ _userId1: userId }, { _userId2: userId }] });

            if (!matches) {

                res.json({
                    success: false,
                    matches: null,
                });

            } else {


                //now we need to get all the ids of the match

                const userIds = matches.reduce((userIds, match) => {

                    if (match._userId1 !== userId) {
                        userIds.push(match._userId1);
                    }

                    if (match._userId2 !== userId) {
                        userIds.push(match._userId2);
                    }

                    return userIds;

                }, []);

                //now obtain all the users

                const users = await Users.find({
                  _id: { $in: userIds }
                });

                res.json({
                    success: true,
                    matches: users,
                });

            }

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });
        }

    } catch (err) {

        res.json({
            success: false,
            error: err.message,
        });

    }

}];

exports.DeleteMatch  = [auth,async (req, res) => {

    try {

        const { userId1,userId2  } = req.body;

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const _userId = decodedToken.userId;

        if(userId1 === _userId){

            const user = await Users.findById(userId1);

            if (!user) {

                return res.json({

                    success: false,
                    error: 'User not found.',

                });

            }

            const deletedMatch = await Matches.findOneAndRemove({
              $or: [
                { _userId1: userId1, _userId2: userId2 },
                { _userId1: userId2, _userId2: userId1 },
              ],
            });

            if (!deletedMatch) {

                res.json({
                  success: false,
                  error: 'Error match does not exists.'
                });

            } else {

                res.json({

                    success: true,
                    message: 'Match deleted successfully.'

                });

            }

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        res.json({
            success: false,
            error: err.message,
        });

    }

}];