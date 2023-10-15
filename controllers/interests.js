const Interests = require('../models/interests');

exports.getInterests  = async(req, res)=>{
    try {
        const interests = await Interests.find();
        if (interests.length === 0) {
          res.json({
                success: false,
                interests: null,
            });
        } else {
          res.json({
                success: true,
                interests: interests,
            }); 
        }
    } catch (err) {
        res.json({
            success: false,
            error: err.message ,
        });
    }
}

exports.getInterest  = async (req, res) => {
  try {
    const { _id } = req.body;
    const interest = await Interests.findOne({ _id: _id })

    if (!interest) {
      res.json({
        success: false,
        interest: null,
      });
    } else {
      res.json({
        success: true,
        interest: interest,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};
  