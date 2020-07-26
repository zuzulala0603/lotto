const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")

app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)
app.use("/static", express.static(__dirname + "/public"))

//
const checkLottoRouter = require("./routes/checkLotto")
app.use("/", checkLottoRouter)
//
app.get("/", (req, res) => {
  res.render("index")
})
//
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("server on!")
})
