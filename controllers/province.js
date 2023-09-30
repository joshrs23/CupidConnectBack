const Province = require('../models/province');


exports.createProvince = async(req, res) => {
    
    try{
        const { name } = req.body;

        const newProvince = Province({
          name,
        });

        await newProvince.save('nebula');

        res.json({
            success: true,
            evento: newProvince,
        }); 
        
    }catch(err){
        res.json({
            success: false,
            error: err.message,
        });
    }
}

exports.getProvincesByCountry  = async(req, res)=>{
    try {
        const { country_id } = req.body;

        const provinces = await Province.find({ country_id: country_id });

        if (provinces.length === 0) {
          res.json({
                success: false,
                provinces: null,
            });
        } else {
          res.json({
                success: true,
                provinces: provinces,
            }); 
        }
    } catch (err) {
        res.json({
            success: false,
            error: err.message ,
        });
    }
}

exports.getProvince = async (req, res) => {
  try {
    const { _id } = req.body;
    const province = await Province.findOne({ _id: _id })

    if (!province) {
      res.json({
        success: false,
        province: null,
      });
    } else {
      res.json({
        success: true,
        province: province,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};
  