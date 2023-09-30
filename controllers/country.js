const Country = require('../models/country');


exports.createCountry = async(req, res) => {
    
    try{
        const { __name } = req.body;

        const newCountry = Country({
          __name,
        });

        await newCountry.save('nebula');

        res.json({
            success: true,
            evento: newCountry,
        }); 
        
    }catch(err){
        res.json({
            success: false,
            error: err.message,
        });
    }
}

exports.getCountries  = async(req, res)=>{
    try {
        const countries = await Country.find();
        if (countries.length === 0) {
          res.json({
                success: false,
                countries: null,
            });
        } else {
          res.json({
                success: true,
                countries: countries,
            }); 
        }
    } catch (err) {
        res.json({
            success: false,
            error: err.message ,
        });
    }
}

exports.getCountry  = async (req, res) => {
  try {
    const { _id } = req.body;
    const country = await Country.findOne({ _id: _id })

    if (!country) {
      res.json({
        success: false,
        country: null,
      });
    } else {
      res.json({
        success: true,
        country: country,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
};
  