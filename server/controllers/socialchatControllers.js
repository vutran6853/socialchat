const axios = require('axios');
const bcrypt = require('bcryptjs');

const userLogin = (req, res, next) => {

  const dbInstace = req.app.get('db');

  dbInstace.login_user(req.body.userName)
  .then((response) => {

    if(!response[0]) {
      res.status(409).send(response)
    } else {
      const isAuthenticated = bcrypt.compareSync(req.body.passWord, response[0].user_password);

      if(isAuthenticated) {
        res.status(200).send(response)
      } else {
        console.log('placeholder');
      }
    }
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}


const userRegister = (req, res, next) => {

  const dbInstace = req.app.get('db');
  const salt = bcrypt.genSaltSync(10)
  const hashPassword = bcrypt.hashSync(req.body.passWord, salt)

  dbInstace.register_newUser(req.body.userName, hashPassword, `https://robohash.org/${ req.body.userName }`)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((error) => res.status(400).send(error));
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
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const getAllPostBySearch = (req, res, next) => {
  let { userposts, searchItem } = req.query;
  let { id } = req.params;

  const dbInstace = req.app.get('db');

  dbInstace.allPostBySearch(searchItem)
  .then((response) => {
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
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}

const getSinglePostById = (req, res, next) => {
  let { id } = req.params;

  const dbInstace = req.app.get('db');

  dbInstace.singlePostById(id)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}

const getComments = (req, res, next) => {

  const dbInstace = req.app.get('db');

  dbInstace.getCommentsByID(req.body.post_id)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}

const postUserComment = (req, res, next) => {

  const dbInstace = req.app.get('db');

  dbInstace.postUserComment(req.body.userInput, req.body.userId, req.body.post_id)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}

const likeOrDislikePost = (req, res, next) => {

  const dbInstace = req.app.get('db');

  dbInstace.UpdatePostLikeOrDislike(req.body.like, req.body.dislike, req.body.id)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}

const likeCommentOfPost = (req, res, next) => {

  const dbInstace = req.app.get('db');

  dbInstace.UpdateLikeCommentOfPost(req.body.like + 1, req.body.comments_id)
  .then((response) => {
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

  dbInstace.getCommentsByID(req.body.post_id)
  .then((response) => {
    res.status(200).send(response)
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
  likeOrDislikePost,
  likeCommentOfPost,
}