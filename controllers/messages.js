const jwt = require('jsonwebtoken');
const auth = require('../middlewares/authenticate');
const Users = require('../models/users');
const Messages = require('../models/messages');

exports.getMessagesByMatch  = [auth,async (req, res) => {

    try {

        const { matchId,userId } = req.body;

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

            const messages = await Messages.find({  _matchId: matchId  });

            if (!messages) {

                res.json({
                    success: false,
                    messages: null,
                });

            } else {

                res.json({
                    success: true,
                    messages: messages,
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

exports.addMessage = [auth,async(req, res) => {

    try{

        const { /*userId,*/ matchId, sender,text } = req.body;    

        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const _userId = decodedToken.userId;

        if(sender === _userId){

            const user = await Users.findById(sender);

            if (!user) {

                return res.json({

                    success: false,
                    error: 'User not found.',

                });

            }

            /*const messages = Messages({
                _matchId: matchId, 
                sender: sender,
                text: text
            });*/
          
            //await messages.save();
            const result = await saveMessageToDB({ matchId, sender, text });

            /*res.json({

                success: true

            });*/

            if (result.success) {

                res.json({ success: true });

            } else {

                res.json({ success: false, error: result.error });

            }
             

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

async function saveMessageToDB({ matchId, sender, text }) {

    try {

        const message = Messages({
                _matchId: matchId, 
                sender: sender,
                text: text
            });

        await message.save();

        return { success: true };

    } catch (error) {

        return { success: false, error: error.message };

    }

}

exports.saveMessageToDB = saveMessageToDB;