require('dotenv').config();
const express = require('express');
const port = process.env.SERVER_PORT || 3006;
const { json } = require('body-parser');
const cors = require('cors');
const app = express();
const massive = require('massive');
const session = require('express-session');
const path = require('path'); // Usually moved to the start of file

const { userLogin, userRegister, userByIDPost, userLogout,
        getAllPostBySearch, getAllPostByNoSeach, getSinglePostById,
        getComments, postUserComment } = require('./controllers/socialchatControllers');

const { editUserAccount, postNewprofilePic, postUserEmail, postUserPassword } = require('./controllers/account');

// const checkForSession = require('./controllers/checkForSession');

app.use(cors());
app.use(json());

// app.use( express.static( `${__dirname}/../build` ) );

//// Init Session setting. This will save userID in browser 
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
//   })
// );

////  check user on session
// app.use(checkForSession);

////  Massive connect to SQL system functionality
massive(process.env.CONNECTION_STRING)
.then((dbInstace) => {
  // console.log(dbInstace)
  app.set('db', dbInstace)
})
.catch((error) => console.log(`Danger check SQL connection ${ error }`));


////  Auth Endpoint
app.post('/api/auth/login', userLogin)
app.post('/api/auth/register', userRegister)
// app.post('/api/auth/userId', userId)
app.post('/api/auth/logout', userLogout)

////  Post Endpoint
app.post('/api/post/:id', userByIDPost)
app.get('/api/getAllPostBySearch/:id', getAllPostBySearch)
app.get('/api/getAllPostByNoSearch/:id', getAllPostByNoSeach)
app.get('/api/getSinglePostById/:id', getSinglePostById)
app.post('/api/getComments', getComments)
app.post('/api/postUserComment', postUserComment)


/// Account Endpoint
app.put('/api/editUserAccount', editUserAccount)
app.put('/api/postNewprofilePic', postNewprofilePic)
app.put('/api/postUserEmail', postUserEmail)
app.put('/api/postUserPassword', postUserPassword)


/// Server 
app.listen(port, () => {
  console.log(`Server is UP and listen to port ${ port }`);
});
