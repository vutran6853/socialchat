require('dotenv').config();
const express = require('express');
const port = process.env.SERVER_PORT || 3003;
const { json } = require('body-parser');
const cors = require('cors');
const app = express();
const massive = require('massive');
const session = require('express-session');

const { userLogin, userRegister, userByIDPost, userLogout,
        getAllPostBySearch, getAllPostByNoSeach, getSinglePostById } = require('./controllers/socialchatControllers');

// const checkForSession = require('./controllers/checkForSession');

app.use(cors());
app.use(json());


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

app.post('/api/post/:id', userByIDPost)
app.get('/api/getAllPostBySearch/:id', getAllPostBySearch)
app.get('/api/getAllPostByNoSeach/:id', getAllPostByNoSeach)
app.get('/api/getSinglePostById/:id', getSinglePostById)

app.listen(port, () => {
  console.log(`Server is UP and listen to port ${ port }`);
});
