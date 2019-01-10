require('dotenv').config();
const express = require('express');
const port = process.env.SERVER_PORT || 3003;
const { json } = require('body-parser');
const cors = require('cors');
const app = express();
const massive = require('massive');

app.use(cors());
app.use(json());

const { userLogin, userRegister, userByIDPost, getSinglePost, getAllPostBySearch, getAllPostByNoSeach } = require('./controllers/socialchatControllers');

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
app.post('/api/post/:id', userByIDPost)
app.get('/api/getSinglePost', getSinglePost)
app.get('/api/getAllPostBySearch/:id', getAllPostBySearch)
app.get('/api/getAllPostByNoSeach/:id', getAllPostByNoSeach)

app.listen(port, () => {
  console.log(`Server is UP and listen to port ${ port }`);
});
