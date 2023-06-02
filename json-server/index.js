const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()
const express = require("express")
const fileUpload = require("express-fileupload")
const app = express();
const cors = require("cors")
const port = 4000
const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: "dhknvtaq2",
  api_key: "536311875473995",
  api_secret: "kRp_WUvXGZvIqTizithrdO8VxJA"
})

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}))
app.use(fileUpload({
  useTempFiles: true
}))

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
app.get('/pets', (req, res) => {
  res.json({
    message: "ok"
  })
})

app.post('/pets', (req, res) => {
  console.log(req);
  /* const obj = JSON.parse(JSON.stringify(req.files)); */
  let file = obj.file
  console.log(obj);
  cloudinary.uploader.upload(file.tempFilePath, { folder: "ojt" }, function (err, result) {
    console.log("ERR", err);
    console.log("result", result);
    res.json({
      message: result.url
    })

  })
})

  // To handle POST, PUT and PATCH you need to use a body-parser
  // You can use the one used by JSON Server
  server.use(jsonServer.bodyParser)
  server.use((req, res, next) => {
    if (req.method === 'POST') {
      req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
  })

  // Use default router
  server.use( router)
  
  server.listen(8000, () => {
    console.log('JSON Server is running')
  })
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })