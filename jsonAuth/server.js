/* const fs = require('fs') */
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const axios = require("axios")
const server = jsonServer.create()
const router = jsonServer.router('./database.json')
/* const userdb = JSON.parse(fs.readFileSync('./users.json',"utf-8")) */

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token 
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}



// Check if the user exists in database
/* function isAuthenticated({email, password}){
 return(userdb.users.findIndex(
    (user) => user.email === email && user.password === password)!==-1)
    
} */

// Register New User
server.post('/auth/register', async (req, res) => {
  const { email, username, password } = req.body;
  const db = await axios.get(`http://localhost:8000/users?email`)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err);
    })

  console.log("register endpoint called; request body:");

 
  console.log(req.body);
  console.log("db", db);
  let findIndex = db.findIndex((user) => user.email === email)
  console.log(findIndex);
  if (findIndex !== -1) {

    const message = 'Email already exist';
    return res.json({ db:db[findIndex], status: 401, mess: message });

  } 
  if (findIndex === -1) {
    axios.post(`http://localhost:8000/users`,
      {
        id: Date.now(),
        ...req.body
      })

    return res.json({ mess: "Register Success" })

  }

  const access_token = createToken({ email, password })
  console.log("Access Token:" + access_token);
  res.json({ access_token })
})
// Login to one of the users from ./users.json
server.post('/auth/login', async (req, res) => {

  const { email, password } = req.body;

  const db = await axios.get("http://localhost:8000/users")
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err);
    })
  console.log("login", db);
  let findIndex = db.findIndex(user => user.email === email && user.password === password)
  console.log("findIndex", findIndex);
  if (findIndex !== -1) {
   
  
    return res.json({
      mess: "Login Success",
      data:
      {
        ...db[findIndex]
      }
    })

    
  } 
  if (findIndex === -1){

    const message = 'Email not exist or password not correct';
    return res.json({ mess:message})
  }


  const access_token = createToken({ email, password })
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token })

})
server.post('/auth/change-pass', async (req, res) => {

  const { id, password } = req.body;
  console.log(id);
  const db = await axios.put(`http://localhost:8000/users/${id}`)
    .then(response => {
      return res.json({mess:true})
    })
    .catch(err => {
      return res.json({mess:false})

    })
  


  const access_token = createToken({ id, password })
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token })

})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({ status, message })
    return
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401
      const message = 'Access token not provided'
      res.status(status).json({ status, message })
      return
    }
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({ status, message })
  }
})

server.use(router)

server.listen(8080, () => {
  console.log('Run Auth API Server')
})