/*
 * The Article module
 */

var common = require('../view/common');
var async = require('async');
<<<<<<< Updated upstream:my/ctrls/article.js

// models
var Post = require('../model/post')
  , Catalog = require('../model/catalog')
  ;
=======
var model = require('../my/model');
>>>>>>> Stashed changes:routes/article.js

exports.catalog = function catalog(req, res) {
  var catalog = req.params.catalog;
  async.parallel({
    posts: function(callback) {
      model.Post.list({'catalog.id': catalog}, callback);
    }, 
    catalog: function(callback) {
      model.Catalog.get(catalog, callback);
    }
  }, function (err, results) {
      if (!err) {
        res.render('catalog', {
          title: results.catalog.name,
          description: results.catalog.description,
          posts: results.posts
        });
      } else {
        common.error(res, err, '/');
      }
  });
};

exports.article = function article(req, res) {
<<<<<<< Updated upstream:my/ctrls/article.js
  var article = req.params[0];
  Post.getByUrl(article, function(err, post) {
=======
  var article = req.params.article;
  model.Post.getByUrl(article, function(err, post) {
>>>>>>> Stashed changes:routes/article.js
    if (post) {
      res.render('article', {
        title: post.title,
        post: post
      });
    } else {
      common.error(res, '没有这篇文章吧？', '/');
    }
  });
};

exports.tag = function tag(req, res) {
  var tags = req.param('tag')?req.param('tag').split(/\s*,\s*/):[];
  model.Post.list({tag:{$all:tags}}, function(err, posts) {
    if (err) {
      common.error(res, err, '/');
    } else {
      res.render('catalog', {
        title: tags.toString(),
        description: '所有关于“' + tags.toString() + '”的文章',
        posts: posts
      });
    }
  });
};
