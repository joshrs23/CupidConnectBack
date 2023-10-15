const Identities = require('../models/identities');

exports.getIdentities  = async(req, res)=>{
    try {
        const identities = await Identities.find();
        if (identities.length === 0) {
          res.json({
                success: false,
                identities: null,
            });
        } else {
          res.json({
                success: true,
                identities: identities,
            }); 
        }
    } catch (err) {
        res.json({
            success: false,
            error: err.message ,
        });
    }
}

exports.getIdentity  = async (req, res) => {
  try {
    const { _id } = req.body;
    const identity = await Identities.findOne({ _id: _id })

    if (!identity) {
      res.json({
        success: false,
        identity: null,
      });
    } else {
      res.json({
        success: true,
        identity: identity,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};
  