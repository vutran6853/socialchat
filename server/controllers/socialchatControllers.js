const axios = require('axios');

const userLogin = (req, res, next) => {
  // console.log('login::')
  // console.log(req.body)

  const dbInstace = req.app.get('db');

  dbInstace.login_user(req.body.userName, req.body.passWord)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const userRegister = (req, res, next) => {
  // console.log('register::')
  // console.log(req.body)

  const dbInstace = req.app.get('db');

  dbInstace.register_newUser(req.body.userName, req.body.passWord, `https://robohash.org/${ req.body.userName }`)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}

const userByIDPost = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.params);

  let { title, imageUrl, content } = req.body;

  const dbInstace = req.app.get('db');

  dbInstace.userSubmitPost(req.params.id, title, imageUrl, content)
  .then((response) => {
    console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const getSinglePost = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.params);

  // let { title, imageUrl, content } = req.body;

  // const dbInstace = req.app.get('db');

  // dbInstace.userSubmitPost(req.params.id, title, imageUrl, content)
  // .then((response) => {
  //   console.log(response)
  //   res.status(200).send(response)
  // })
  // .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const getAllPostBySearch = (req, res, next) => {
  console.log('Line 67:', req.query);
  console.log('Line 68:', req.params);

  let { userposts, searchItem } = req.query;
  let { id } = req.params;

  const dbInstace = req.app.get('db');

  dbInstace.getAllPostBySearch(searchItem)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const getAllPostByNoSeach = (req, res, next) => {
  console.log('hit');
}

module.exports = {
  userLogin,
  userRegister,
  userByIDPost,
  getSinglePost,
  getAllPostBySearch,
  getAllPostByNoSeach
}