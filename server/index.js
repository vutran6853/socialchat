require('dotenv').config();
const express = require('express');
const port = process.env.SERVER_PORT || 3003;
const { json } = require('body-parser');
const cors = require('cors');
const app = express();
const massive = require('massive');

app.use(cors());
app.use(json());

////  Massive connect to SQL system functionality
massive(process.env.CONNECTION_STRING)
.then((dbInstace) => {
  // console.log(dbInstace)
  app.set('db', dbInstace)
})
.catch((error) => console.log(`Danger check SQL connection ${ error }`));


app.listen(port, () => {
  console.log(`Server is UP and listen to port ${ port }`);
});
