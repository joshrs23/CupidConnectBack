const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const Likes = require('../models/likes');
const Dislikes = require('../models/dislikes');
const auth = require('../middlewares/authenticate');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = 'img';
    cb(null, path.join('/home/nebula/public_html/', fileType));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
exports.uploadFile = upload.single('_profilePicture', 5);

exports.createUser = async(req, res) => {

    try{

        const _active = true;
        const _type = 1;

        const {

            _email,
            _username,
            _fname,
            _lname,
            _password,
            country,
            province,
            city,
            _address,
            _dob

        } = req.body;      

        const user = Users({

            _email,
            _username,
            _fname,
            _lname,
            _password,
            country,
            province,
            city,
            _address,
            _dob,
            _type,
            _active

        });

        try {
              // Save the user data
              await user.save();

              const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {

                expiresIn: '1d',

              });

              res.json({

                success: true,
                user: user,
                token

              });
             

              
        } catch (validationError) {

          if (validationError.errors && validationError.errors._email) {
            
            return res.json({

              success: false,
              error: 'Email already exists',

            });

          }
          
          return res.json({

            success: false,
            error: 'Validation error',

          });

        } 
        
    }catch(error){
        res.json({
          success: false,
          error: "Error en el servidor "+error,
        });
    }
}


exports.userSignIn = async (req, res)=> {

    const {_email , _password} = req.body;

    const user = await Users.findOne({_email})
    
    if(!user){ 
        return res.json({
            success: false,
            error: 'User is not registered.',
        })
    }
    if(!user._active){
        return res.json({
            success: false,
            error: 'User is not active.',
        })
    }

    const isMatch = await user.comparePassword(_password);

    if(!isMatch) return res.json({
        success: false,
        error: 'Incorrect password.',
    })

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    res.json({
        success: true,
        user: user,
        token
    })
}

exports.deleteUser = [auth,async (req, res) => {
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
            
            const updateResult = await Users.updateOne(

              { _id: userId }, 
              { $set: { _active: false } } 

            );

            if (updateResult.nModified === 0) {
              res.json({ success: false, error: 'Error user not deleted.' });
            }

            res.json({

                success: true,
                message: 'User has been successfully deleted.',

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });
        }

    } catch (err) {

        console.error(err);
        res.json({

          success: false,
          error: 'An error occurred while deleting the user : '+err,

        });

    }
}];

exports.changePassword = [auth, async (req, res) => {
    try {

        const { userId, oldPassword, newPassword } = req.body; 

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

            const result = await bcrypt.compare(oldPassword, user._password);


            if(!result){

                return res.json({

                    success: false,
                    error: 'old pasword doesnt match.',

                });

            }

            const hashedPassword = await bcrypt.hash(newPassword, 9);

            const updateResult = await Users.updateOne(

              { _id: userId }, 
              { $set: { _password: hashedPassword } } 

            );

            if (updateResult.nModified === 0) {

              res.json({ success: false, error: 'Error password was not updated.' });
              
            }

            res.json({

                success: true,
                message: 'Password has been updated.',

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while changing password : '+err,

        });

    }
}];

exports.changeIdentity = [auth, async (req, res) => {
    try {

        const { userId, newIdentity } = req.body; 

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

            const updateResult = await Users.updateOne(

              { _id: userId }, 
              { $set: { identities: newIdentity } } 

            );

            if (updateResult.nModified === 0) {

              res.json({ success: false, error: 'Error identities was not updated.' });
              
            }

            res.json({

                success: true,
                message: 'Identities has been updated.',

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while changing identities : '+err,

        });

    }
}];

exports.changeOrientations = [auth, async (req, res) => {
    try {

        const { userId, newOrientations } = req.body; 

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

            const updateResult = await Users.updateOne(

              { _id: userId }, 
              { $set: { _orientations: newOrientations } } 

            );

            if (updateResult.nModified === 0) {

              res.json({ success: false, error: 'Error orientations was not updated.' });
              
            }

            res.json({

                success: true,
                message: 'Orientations has been updated.',

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while changing orientations : '+err,

        });

    }
}];

exports.changeInterests = [auth, async (req, res) => {
    try {

        const { userId, newInterests } = req.body; 

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

            const updateResult = await Users.updateOne(

              { _id: userId }, 
              { $set: { _interests: newInterests } } 

            );

            if (updateResult.nModified === 0) {

              res.json({ success: false, error: 'Error interests was not updated.' });
              
            }

            res.json({

                success: true,
                message: 'Interests has been updated.',

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while changing interests : '+err,

        });

    }
}];

exports.changeDescription = [auth, async (req, res) => {
    try {

        const { userId, newDescriptions } = req.body; 

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

            const updateResult = await Users.updateOne(

              { _id: userId }, 
              { $set: { _description: newDescriptions } } 

            );

            if (updateResult.nModified === 0) {

              return res.json({ success: false, error: 'Error description was not updated.' });
              
            }

            res.json({

                success: true,
                message: 'Description has been updated.',

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while changing description : '+err,

        });

    }
}];

exports.getIdentityByUser = [auth, async (req, res) => {
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

            
            if(!user.identities){

                return res.json({

                    success: false,
                    error: 'User does not have identities saved.',

                });

            }

            res.json({

                success: true,
                identities: user.identities,

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while getting identities : '+err,

        });

    }
}];

exports.getOrientationsByUser = [auth, async (req, res) => {
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

            
            if(!user._orientations){

                return res.json({

                    success: false,
                    error: 'User does not have orientations saved.',

                });

            }

            res.json({

                success: true,
                orientations: user._orientations,

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while getting orientations : '+err,

        });

    }
}];

exports.getInterestsByUser = [auth, async (req, res) => {
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

            
            if(!user._interests){

                return res.json({

                    success: false,
                    error: 'User does not have interests saved.',

                });

            }

            res.json({

                success: true,
                interests: user._interests,

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while getting interests : '+err,

        });

    }
}];

exports.getDescriptionsByUser = [auth, async (req, res) => {
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

            
            if(!user._description){

                return res.json({

                    success: false,
                    error: 'User does not have a description saved.',

                });

            }

            res.json({

                success: true,
                descriptions: user._description,

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while getting description : '+err,

        });

    }
}];

exports.getUsersForLikes = [auth, async (req, res) => {
    try {

        const { userId/*, page*/ } = req.body; 

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


            if(!user._orientations || !user.identities){

                return res.json({

                    success: false,
                    error: 'Before search others, define your orientations and identities!.',

                });


            }

            //const skip = (page - 1) * 10;//10 is itemsPerPage 
            const orientations = user._orientations;
            const identities = user.identities;
            var identitiesSelected = "";
            var valSkipt = false;

            if(identities == "650f5a16f2cfff2f499f0803"){//hombre

                if(orientations == "650f59c3f2cfff2f499f07ed"){//hetero

                    identitiesSelected = "650f5a16f2cfff2f499f0804";//mujer

                }else if(orientations == "650f59c4f2cfff2f499f07ee"){//homosexual

                    identitiesSelected = "650f5a16f2cfff2f499f0803";//hombre

                }else{

                    valSkipt = true;

                }

            }else if(identities == "650f5a16f2cfff2f499f0804"){//mujer

                if(orientations == "650f59c3f2cfff2f499f07ed"){//hetero

                    identitiesSelected = "650f5a16f2cfff2f499f0803";//hombre

                }else if(orientations == "650f59c4f2cfff2f499f07ee"){//homosexual

                    identitiesSelected = "650f5a16f2cfff2f499f0804";//mujer

                }else{

                    valSkipt = true;

                }

            }else{//cualquier otro

                valSkipt = true;

            }

            const query = {
                _orientations: orientations,
                identities: identitiesSelected
            }

            var users;

            if(valSkipt){

                users = await Users.find({ _id: { $ne: userId } });
                      //.skip(skip)
                      //.limit(10);

            }else{

                users = await Users.find({ $and: [query, { _id: { $ne: userId } } ] });
                      //.skip(skip)
                      //.limit(10);

            }
            

            const userLikes = await Likes.find({ _liker_userId: userId });

            const userDislikes = await Dislikes.find({ _disliker_userId: userId });
            
            const usersToDisplay = users.filter((user) => {
                const userId = user._id.toString(); // Convierte el _id a una cadena
                    return (
                        !userLikes.some((like) => like._liked_userId === userId) &&
                        !userDislikes.some((dislike) => dislike._disliked_userId === userId)
                    );
            });

            res.json({

                success: true,
                //usersToDisplay: user.usersToDisplay,
                usersToDisplay: usersToDisplay,

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });

        }

    } catch (err) {

        console.error(err);
        res.json({

            success: false,
            error: 'An error occurred while getting description : '+err,

        });

    }
}];

exports.getUser = [auth,async (req, res) => {
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
           

            res.json({

                success: true,
                user: user,

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });
        }

    } catch (err) {

        console.error(err);
        res.json({

          success: false,
          error: 'An error occurred while deleting the user : '+err,

        });

    }
}];                


exports.updatePicture = [auth,async (req, res) => {
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
           
            if (user._pictures.length >= 3) {
              
              return res.json({

                    success: false,
                    error: 'User has already 3 photos.',

                });

            }

            upload.single('_profilePicture')(req, res, async function (err) {
          
                if (err instanceof multer.MulterError) {
                    return res.json({
                      success: false,
                      error: err.message+" error 400",
                    });
                } else if (err) {
                    return res.json({
                      success: false,
                      error: err.message+" error 500",
                    });
                }

                var _picture;
                if (req.file) {
                  _picture = req.file.filename;
                }else {
                  _picture = "";
                }
                // Save the user picture
                await Users.updateOne({ _id: userId }, { $push: { _pictures: _picture } });

                res.json({
                    success: true,
                });               

            });

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });
        }

    } catch (err) {

        console.error(err);
        res.json({

          success: false,
          error: 'An error occurred while deleting the user : '+err,

        });

    }
}];                

exports.deletePicture = [auth,async (req, res) => {
    try {

        const { userId, index } = req.body; 

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


            if (index >= 0 && index < user._pictures.length) {
             
              user._pictures.splice(index, 1);
              //await user.save();
              await Users.updateOne({ _id: userId }, { _pictures: user._pictures })

              res.json({ success: true, message: 'Photo deleted.' });

            } else {

              return res.json({

                    success: false,
                    error: 'Invalid index.',

                });

            }    

        }else{

            res.json({

                success: false,
                error: "This user is not the owner of the account.",

            });
        }

    } catch (err) {

        console.error(err);
        res.json({

          success: false,
          error: 'An error occurred while deleting the user : '+err,

        });

    }
}];                

exports.getUserVisitor = (req, res) => {
    try {

        const { userId } = req.body; 

        const user = await Users.findById(userId);

        if (!user) {

            return res.json({

                success: false,
                error: 'User not found.',

            });

        }
       

        res.json({

            success: true,
            user: user,

        });


    } catch (err) {

        console.error(err);
        res.json({

          success: false,
          error: 'An error occurred while deleting the user : '+err,

        });

    }
}