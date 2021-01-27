 const jwt = require ('jsonwebtoken')

// check the token if verify in every route that inport
 
 exports.verify = function (req, res, next){
    
    const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) {
         return res.status(401).send({ message: 'Invalid Token' });
      }
       req.user = decode;
       next();
       return;
    });
   }else {
      return res.status(401).send({ message: 'Token is not supplied.' });
  }
};
     
// send token with this request with 2 days
  exports.getToken = function (user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
      process.env.TOKEN_SECRET,
    {
      expiresIn: '48h',
    }
  );
};
