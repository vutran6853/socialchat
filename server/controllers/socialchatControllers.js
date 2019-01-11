const axios = require('axios');

const userLogin = (req, res, next) => {
  let { session } = req;
  console.log('req.session:', session);


  const dbInstace = req.app.get('db');

  dbInstace.login_user(req.body.userName, req.body.passWord)
  .then((response) => {
    // console.log('line 10', response[0])

    if(req.session.userInfo) {
      console.log('true', true);
      req.session.userInfo.user_id = response[0].user_id
      // req.session.userInfo.push( {
      //   user_id: response[0].user_id,
      //   user_username: response[0].user_username,
      //   user_profile_pic: response[0].user_profile_pic
      // })
    }

      console.log('session::', req.session);
    res.status(200).send(session)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));


}

const userRegister = (req, res, next) => {
  let { session } = req;

  const dbInstace = req.app.get('db');

  dbInstace.register_newUser(req.body.userName, req.body.passWord, `https://robohash.org/${ req.body.userName }`)
  .then((response) => {
    // console.log(response)
    session.userInfo = {
      user_id: response[0].user_id,
      user_username: response[0].user_username,
      user_profile_pic: response[0].user_profile_pic
    }
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
}

const userId = (req, res, next) => {
  let { session } = req;
  console.log('object', req.session);
  // console.log(req)
}

const userLogout = (req, res, next) => {
  console.log('hit 38');

  const { session } = req;
  session.destroy();
  res.status(200).send( req.session );

}



const userByIDPost = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.params);

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





module.exports = {
  userLogin,
  userRegister,
  userId,
  userLogout,
  userByIDPost,
  getAllPostBySearch,
  getAllPostByNoSeach,
  getSinglePostById,
}