const Orientations = require('../models/orientations');

exports.getOrientations  = async(req, res)=>{
    try {
        const orientations = await Orientations.find();
        if (orientations.length === 0) {
          res.json({
                success: false,
                orientations: null,
            });
        } else {
          res.json({
                success: true,
                orientations: orientations,
            }); 
        }
    } catch (err) {
        res.json({
            success: false,
            error: err.message ,
        });
    }
}

exports.getOrientation  = async (req, res) => {
  try {
    const { _id } = req.body;
    const orientation = await Orientations.findOne({ _id: _id })

    if (!orientation) {
      res.json({
        success: false,
        orientation: null,
      });
    } else {
      res.json({
        success: true,
        orientation: orientation,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};
  