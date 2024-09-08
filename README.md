# Blogging Platform API

Simple CRUD API made using Express with Node JS.
Created as a solution to the roadmap Bloggging Platform API project https://roadmap.sh/projects/blogging-platform-api. 

## Features
- Create a new post
- Edit an existing post
- View all posts
- View a single post
- Delete a post

## Installation
Clone repo.
```
git clone https://github.com/your-username/blog-api.git
cd blog-api
```
Install.
```
npm install
```
Create your .env file.
```
PORT = ??
PG_PASSWORD = ??
```
Create your db table in pg

```
CREATE TABLE posts  (
	title  VARCHAR(255),
	content VARCHAR(255),
	category VARCHAR(255),
	tags  text[],
	createdAt  timestamp default current_timestamp,
	updatedAt timestamp default current_timestamp
```
Run.
```
npm run dev
```

## API endpoints

## API Endpoints

| Method | Endpoint               | Description                           | Request Body                                                                                              |
|--------|------------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------|
| GET    | `/posts`               | Get all blog posts                    | None                                                                                                       |
| GET    | `/posts/:id`           | Get a single post by ID               | None                                                                                                       |
| POST   | `/posts`               | Create a new blog post                | `{ "title": "Post Title", "content": "Post Content", "category": "Category Name", "tags": ["tag1", "tag2",...] }` |
| PUT    | `/posts/:id`           | Update an existing post by ID         | `{ "title": "Updated Title", "content": "Updated Content", "category": "Updated Category", "tags": ["tag1", "tag2",...] }` |
| DELETE | `/posts/:id`           | Delete a post by ID                   | None                                                                                                       |
| GET    | `/posts/?term=`  | Search posts by title or content            | None                                                                                                       |








