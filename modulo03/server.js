const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
});

server.get("/", function(req, res) {
  const about = {
    avatar_url:
      "https://avatars2.githubusercontent.com/u/47065398?s=460&u=6445d7762a537fbe15ea4effb8ac983ad4d706a3&v=4",
    name: "Bruno Delacqua",
    role: "Frontend Developer",
    description:
      'Em aprendizagem. Estudando o Launchbase 1.0 da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
    links: [
      { name: "Github", url: "https://github.com/delacquab" },
      { name: "Twitter", url: "https://twitter.com/delacquab" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/bruno-delacqua/" }
    ]
  };
  return res.render("about", { about });
});

server.get("/portfolio", function(req, res) {
  return res.render("portfolio", { items: videos });
});

server.get("/video", function(req, res) {
  const id = req.query.id;

  const video = videos.find(function(video) {
    return video.id == id;
  });

  if (!video) {
    return res.send("Video not found");
  }

  return res.render("video", { item: video });
});

server.listen(5000, function() {
  console.log("Server is running");
});
