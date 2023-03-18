const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const Blog = require("./models/modelSchema1");

// mongoose is conecting here and we cuted the code pelow and put it in then
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://First_project:First_project@cluster0.0jujmcc.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then((res) => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });




  
app.get("/", (req, res) => {
  res.send("link To /html");
});

app.get("/html", (req, res) => {
  // res.render("index", { mytite: "HOME" });
  // res.render("index");

  // how to get data from mongoo
  Blog.find()
    .then((result) => {
      res.render("index", { mytite: "HOME", arrBlog: result });
    })
    .catch((err) => {
      clg(err);
    });
});

app.get("/add0new-box", (req, res) => {
  res.render("index-new", { mytite: "ADD" });
});

//post req
app.post("/html", (req, res) => {
  const boxs = new Blog(req.body);
  // console.log(req.body);
  boxs
    .save()
    .then((result) => {
      res.redirect("/html");
    })
    .catch((err) => {
      clg(err);
    });
});

app.get("/:id", (req, res) => {
  // res.render("detailOfProduct", { mytitle: "detials" });

  // daynamice url
  Blog.findById(req.params.id)
    .then((result) => {
      // console.log(result);
      res.render("detailOfProduct", { mytitle: "detials", objBlog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/:id", (req, res) => {
  // daynamice url and DELETE
  Blog.findByIdAndDelete(req.params.id)
    .then((params) => {
      res.json({ mylink: "/html" });
    })
    .catch((err) => {
      console.log(err);
    });
});
