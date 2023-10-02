const City = require('../models/cities');


exports.createCity = async(req, res) => {
    
    try{
        const { name,province_id } = req.body;

        const newCity = City({
          name,
          province_id
        });

        await newCity.save('nebula');

        res.json({
            success: true,
            evento: newCity,
        }); 
        
    }catch(err){
        res.json({
            success: false,
            error: err.message,
        });
    }
}

exports.getCitiesByProvince_id  = async(req, res)=>{
    try {
        const { province_id } = req.body;

        const cities = await City.find({ province_id: province_id });

        if (cities.length === 0) {
          res.json({
                success: false,
                cities: null,
            });
        } else {
          res.json({
                success: true,
                cities: cities,
            }); 
        }
    } catch (err) {
        res.json({
            success: false,
            error: err.message ,
        });
    }
}

exports.getCity = async (req, res) => {
  try {
    const { _id } = req.body;
    const city = await City.findOne({ _id: _id })

    if (!city) {
      res.json({
        success: false,
        city: null,
      });
    } else {
      res.json({
        success: true,
        city: city,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};
  