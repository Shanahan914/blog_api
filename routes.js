import express from 'express';
import { getAllPosts, getSinglePost, updatePost, createPost, deletePost } from './models.js'
const routes = express.Router()


//gets all posts
// api/posts
routes.get('/posts', getAllPosts);

//create a new post
// api/posts
routes.post('/posts', createPost)

//gets post with given id param. Need next for error handling
//api/posts/id
routes.get('/posts/:id', getSinglePost);

// updates an existing post with a given id
// api/posts/id
routes.put('/posts/:id', updatePost);

// deletes an existing post with a given id
// api/posts/id
routes.delete('/posts/:id', deletePost );


export default routes