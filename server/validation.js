const Joi = require('@hapi/joi')
// registerValidation
const registerValidation = (data) => {

    const schema = Joi.object().keys( {

        name: Joi.string()
                     .min(4)
                     .required(),
        
        email: Joi.string()
                  .min(6)
                  .required()
                  .email(),
    
        password: Joi.string()
                     .min(6)
                     .required(),
      
        token: Joi.string(),
       
        isAdmin: Joi.string(),        
                      
    })
    return schema.validate(data);
}


// loginValidation
const loginValidation = (data) => {

    const schema =  Joi.object().keys( { 

        email: Joi.string()
                  .min(6)
                  .required()
                  .email(),
        password: Joi.string()
                     .min(6)
                     .required()
    })
    return schema.validate(data);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
 