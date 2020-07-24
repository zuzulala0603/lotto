const express = require("express")
app = express()
//
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)
app.use("/static", express.static(__dirname + "/public"))

//
app.get("/", (req, res) => {
  res.render("index")
})
//
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("server on!")
})
