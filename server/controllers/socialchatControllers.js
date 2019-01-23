const axios = require('axios');

const userLogin = (req, res, next) => {

  const dbInstace = req.app.get('db');

  dbInstace.login_user(req.body.userName, req.body.passWord)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}


const userRegister = (req, res, next) => {

  const dbInstace = req.app.get('db');

  dbInstace.register_newUser(req.body.userName, req.body.passWord, `https://robohash.org/${ req.body.userName }`)
  .then((response) => {
    console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}

const userLogout = (req, res, next) => {
  // console.log('hit 38');

  // const { session } = req;
  // session.destroy();
  // res.status(200).send( req.session );

}



const userByIDPost = (req, res, next) => {
  let { title, imageUrl, content } = req.body;

  const dbInstace = req.app.get('db');

  dbInstace.userSubmitPost(req.params.id, title, imageUrl, content)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const getAllPostBySearch = (req, res, next) => {
  // console.log('Line 67:', req.query);
  // console.log('Line 68:', req.params);

  let { userposts, searchItem } = req.query;
  let { id } = req.params;

  const dbInstace = req.app.get('db');

  dbInstace.allPostBySearch(searchItem)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const getAllPostByNoSeach = (req, res, next) => {
  let { userposts, searchItem } = req.query;
  let { id } = req.params;

  const dbInstace = req.app.get('db');

  dbInstace.allPostByNoSeach(id)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const getSinglePostById = (req, res, next) => {
  let { id } = req.params;

  const dbInstace = req.app.get('db');

  dbInstace.singlePostById(id)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const getComments = (req, res, next) => {

  const dbInstace = req.app.get('db');

  dbInstace.getCommentsByID(req.body.post_id)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const postUserComment = (req, res, next) => {
  console.log(req.body);

  const dbInstace = req.app.get('db');

  dbInstace.postUserComment(req.body.userInput, req.body.userId, req.body.post_id)
  .then((response) => {
    console.log(response)
    // res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));


}

module.exports = {
  userLogin,
  userRegister,
  userLogout,
  userByIDPost,
  getAllPostBySearch,
  getAllPostByNoSeach,
  getSinglePostById,
  getComments,
  postUserComment,
}