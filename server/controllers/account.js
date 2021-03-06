const editUserAccount = (req, res, next) => {
  // console.log('2', req.body)

  const dbInstace = req.app.get('db');

  dbInstace.updateUserName(req.body.userID, req.body.userName)
  .then((response) => {
    res.status(200).send(response)
  })
  // .catch((error) => console.log(`Danger! BackEnd error ${ error }`));
  .catch((error) => res.status(400).send(error));
}

const postNewprofilePic = (req, res, next) => {
  // console.log(req.body)
  const dbInstace = req.app.get('db');

  dbInstace.updateUserPhoto(req.body.userID, req.body.photo)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const postUserEmail = (req, res, next) => {
  // console.log(req.body)

  const dbInstace = req.app.get('db');

  dbInstace.updateUserEmail(req.body.id, req.body.email)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

const postUserPassword = (req, res, next) => {
  // console.log(req.body)

  const dbInstace = req.app.get('db');

  dbInstace.updateUserPassword(req.body.id, req.body.password)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => console.log(`Danger! BackEnd error ${ error }`));

}

module.exports = {
  editUserAccount,
  postNewprofilePic,
  postUserEmail,
  postUserPassword
}