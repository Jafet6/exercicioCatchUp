const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middlewares');
const { posts } = require('./posts');

const app = express();

app.use(bodyParser.json());
app.use(middleware.logger);

const post = (_req, res) => {
  res.status(200).json({ posts });
}

const postId = (req, res, next) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === parseInt(id, 10));
  
  if (post) {
    return res.status(200).json({ post })
  }
  return next({ message: 'id não encontrado.' });
}

app.get('/posts', post)
app.get('/posts/:id', postId)

app.use((err, _req, res, _next) => {
  return res.status(404).json({ message: err.message });
});

app.listen(3000, () => console.log('Listening port 3000'));
