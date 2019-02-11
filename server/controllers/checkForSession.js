module.exports = function( req, res, next ) {

  const { session } = req;

  // if (!session.userInfo) {
  //   session.userInfo = []
  // } 
  
  next();
};