const Dislikes = require('../models/dislikes');
const auth = require('../middlewares/authenticate');
const Users = require('../models/users');

exports.addDislike = [auth,async(req, res) => {

    try{

        const { disliker_userId, disliked_userId } = req.body;    

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const _userId = decodedToken.userId;

        if(disliker_userId === _userId){

            const user = await Users.findById(disliker_userId);

            if (!user) {

                return res.json({

                    success: false,
                    error: 'User not found.',

                });

            }

            const validateDislike = await Dislikes.findOne({_disliker_userId: disliker_userId, _disliked_userId: disliked_userId });

            if(validateDislike){

                return res.json({

                    success: false,
                    error: 'Error dislike already exists.',

                });

            }

            const dislike = Dislikes({
                _disliker_userId: disliker_userId, 
                _disliked_userId: disliked_userId
            });
          
            await dislike.save();

            res.json({

                success: true,
                dislike: dislike,
                token

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
