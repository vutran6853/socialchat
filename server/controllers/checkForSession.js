module.exports = function( req, res, next ) {
  // console.log('HIT 2');
  const { session } = req;

  // if (!session.userInfo) {
  //   session.userInfo = []
  // } 
  
  next();
};