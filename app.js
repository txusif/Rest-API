const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const urlencodedParser = bodyParser.urlencoded({ extended: true });
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
const articleSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("article", articleSchema);

app.get("/", (req, res) => {
  res.send("Hell World");
});

// Requests targetting all Articles
app.route("/articles")
  .get((req, res) => {
    Post.find({}, (err, item) => {
      if (!err) {
        res.send(item);
      } else {
        res.send(er);
      }
    });
  })
  .post((req, res) => {
    const newArticle = new Post({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      if (!err) {
        res.send("Successfully added a new Article.");
      } else {
        res.send(err);
      }
    });
  })
  .delete((req, res) => {
    Post.deleteMany({}, (err) => {
      if (!err) {
        res.send("Successfully deleted all the Articles.");
      } else {
        res.send(err);
      }
    });
  });

// Requests targetting Individual Articles
app.route("/articles/:articleTitle")
  .get((req, res) => {
    Post.find({ title: req.params.articleTitle }, (err, item) => {
      if (!err) {
        res.send(item);
      } else {
        res.send(err);
      }
    });
  })
  .put((req, res) => {
    Post.replaceOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err) => {
        if (!err) {
          res.send("Successfully Updated Article. (Put)");
        } else {
          res.send("No article found with the title provided.");
        }
      }
    );
  })
  .patch((req, res) => {
    Post.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body },
      (err) => {
        if (!err) {
          res.send("Successfully Updated Article. (Patch)");
        } else {
          res.send("No article found with the title provided.");
        }
      }
    );
  })
  .delete((req, res) => {
    Post.deleteOne({ title: req.params.articleTitle }, (err) => {
      if (!err) {
        res.send("Successfully deleted the article.");
      } else {
        res.send("No article found with the title provided.");
      }
    });
  });

// app.get("/articles", (req, res) => {
//   Post.find({}, (err, item) => {
//     if (!err) {
//       res.send(item);

//       // item.forEach((ele) => {
//       //   console.log(ele.title);
//       // });
//     } else {
//       res.send(err);
//     }
//   });
// });

// Send a post request with data body from Postman
// app.post("/articles", (req, res) => {
//   // console.log(req.body.title);
//   // console.log(req.body.content);

//   const newArticle = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });

//   newArticle.save((err) => {
//     if (!err) {
//       res.send("Successfully added a new article.");
//     } else {
//       res.send(err);
//     }
//   });
// });

// Send a delete request from Postman
// app.delete("/articles", (req, res) => {
//   Post.deleteMany({}, (err) => {
//     if (!err) {
//       res.send("Successfully deleted all the Articles.");
//     } else {
//       res.send(err);
//     }
//   });
// });

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port} - http://localhost:${port}`);
});
