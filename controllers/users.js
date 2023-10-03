const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const auth = require('../middlewares/authenticate');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = file.mimetype.startsWith('image') ? 'img' : 'vid';
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

              res.json({

                success: true,
                user: user,

              });

              
              const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {

                expiresIn: '1d',

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

        const { userId } = req; 

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

            user._active = false;

            await user.save();

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

        const { userId, newPassword } = req; 

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

            user._password = newPassword;

            await user.save();

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

  