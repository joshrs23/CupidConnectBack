const jwt = require('jsonwebtoken');
const Likes = require('../models/likes');
const auth = require('../middlewares/authenticate');
const Users = require('../models/users');
const Matches = require('../models/matches');

exports.addLike = [auth,async(req, res) => {

    try{

        const { liker_userId, liked_userId } = req.body;    

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const _userId = decodedToken.userId;

        if(liker_userId === _userId){

            const user = await Users.findById(liker_userId);

            if (!user) {

                return res.json({

                    success: false,
                    error: 'User not found.',

                });

            }

            const validateLike = await Likes.findOne({_liker_userId: liker_userId, _liked_userId: liked_userId });

            if(validateLike){

                return res.json({

                    success: false,
                    error: 'Error like already exists.',

                });

            }

            const like = Likes({
                _liker_userId: liker_userId, 
                _liked_userId: liked_userId
            });
          
            await like.save();

            //valide if match 

            const posibleMatch = await Likes.findOne({
              _liker_userId: liked_userId,
              _liked_userId: liker_userId
            });
            
            
            if (posibleMatch) {
              
              const result = await Likes.deleteMany({
                $or: [
                  { $and: [
                    { _liker_userId: liker_userId, _liked_userId: liked_userId }
                  ]},
                  { $and: [
                    { _liker_userId: liked_userId, _liked_userId: liker_userId }
                  ]}
                ]
              });

              if (result.deletedCount > 0) {
                
                const match = Matches({
                  _userId1: liker_userId,
                  _userId2: liked_userId
                });

                await match.save();

              }else{

                  return res.json({

                    success: false,
                    error: 'Error deleting likes.',

                });

              }

            }
            //end posibleMatach

            res.json({

                success: true,
                like: like

            });
             

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }     
        
        
    }catch(error){
        res.json({
          success: false,
          error: "Error in the server : "+error,
        });
    }

}];

exports.DeleteLike  = [auth,async (req, res) => {

    try {

        const { liker_userId, liked_userId  } = req.body;

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const _userId = decodedToken.userId;

        if(liker_userId === _userId){

            const user = await Users.findById(liker_userId);

            if (!user) {

                return res.json({

                    success: false,
                    error: 'User not found.',

                });

            }

            const validateLike = await Likes.findOne({_liker_userId: liker_userId, _liked_userId: liked_userId });

            if (!validateLike) {

                res.json({
                  success: false,
                  error: 'Error like does not exists.'
                });

            } else {

                const deletionResult = await validateLike.deleteOne();

                if (deletionResult.ok === 1) {

                    res.json({

                        success: true,
                        message: 'Like deleted successfully.'

                    });

                } else {
                
                    res.json({

                        success: false,
                        error: 'Error Failed to delete the like.'

                    });

                }

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
  
exports.getLikesByUser  = [auth,async (req, res) => {

    try {

        const { liker_userId } = req.body;

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const _userId = decodedToken.userId;

        if(liker_userId === _userId){

            const user = await Users.findById(liker_userId);

            if (!user) {

                return res.json({

                    success: false,
                    error: 'User not found.',

                });

            }

            const likes = await Likes.find({ _liker_userId: liker_userId })

            if (!likes) {

                res.json({
                    success: false,
                    likes: null,
                });

            } else {

                const likedUserIds = likes.map(like => like._liked_userId);

                const usersWhoILiked = await Users.find({ _id: { $in: likedUserIds } });

                res.json({
                    success: true,
                    usersWhoILiked: usersWhoILiked,
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

exports.validateLike  = [auth,async (req, res) => {
    try {//if it is true, create a match

        const { liker_userId, liked_userId } = req.body;

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const _userId = decodedToken.userId;

        if(liker_userId === _userId){

            const user = await Users.findById(liker_userId);

            if (!user) {

                return res.json({

                    success: false,
                    error: 'User not found.',

                });

            }

            const like = await Likes.findOne({
                                      $and: [
                                        { _liker_userId: liker_userId, _liked_userId: liked_userId },
                                        { _liker_userId: liked_userId, _liked_userId: liker_userId }
                                      ]
                                    });

            if (!like) {

                res.json({
                    success: false,
                    like: null,
                });

            } else {

                res.json({
                    success: true,
                    like: like,
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

exports.getLikesToUser  = [auth,async (req, res) => {

    try {

        const { _liked_userId } = req.body;

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const _userId = decodedToken.userId;

        if(_liked_userId === _userId){

            const user = await Users.findById(_liked_userId);

            if (!user) {

                return res.json({

                    success: false,
                    error: 'User not found.',

                });

            }

            const likes = await Likes.find({ _liked_userId: _liked_userId })

            if (!likes) {

                res.json({
                    success: false,
                    likes: null,
                });

            } else {

                const likerUserIds = likes.map(like => like._liker_userId);

                const usersWhoLiked = await Users.find({ _id: { $in: likerUserIds } });

                res.json({
                    success: true,
                    usersWhoLiked: usersWhoLiked,
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