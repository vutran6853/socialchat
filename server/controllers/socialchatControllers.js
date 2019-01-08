const axios = require('axios');

const login = (req, res, next) => {
  console.log('login::')
  console.log(req.body)

  const dbInstace = req.app.get('db');

  dbInstace.login_user(req.body.userName, req.body.passWord)
  .then((response) => {
    console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const register = (req, res, next) => {
  // console.log('register::')
  console.log(req.body)

  const dbInstace = req.app.get('db');

  dbInstace.register_newUser(req.body.userName, req.body.passWord, `https://robohash.org/${ req.body.userName }`)
  .then((response) => {
    console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}


module.exports = {
  login,
  register,
}