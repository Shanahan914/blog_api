import pg from "pg";
const { Pool } = pg;
const pw = process.env.PGPASSWORD

export const pool = new Pool({
  user: "my_role",
  host: "localhost",
  database: "blog_api",
  password: pw,
  port: 5432,
});

//gets all posts
//optional search parameter 'term' can be added. Searches in title, content and category. 
export const getAllPosts = (req, res, next) => {
    const term = req.query.term ? req.query.term : "";
    const searchTerm = `%${term}%`
  pool.query("SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 OR category ILIKE $1", [searchTerm], (error, result) => {
    if (error) {
      res.status(500).json({ msg: "internal server error" });
      return;
    }
    res.status(200).json(result.rows);
  });
};

//gets a single post
export const getSinglePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM posts WHERE id = $1", [id], (error, result) => {
    if (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
    console.log(result.rows.length);
    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ msg: `no post with an id of ${id} was found` });
    }
    res.status(200).json(result.rows[0]);
  });
};

//updates an existing post
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const { title, content, category, tags } = req.body;
  if (!title || !content || !category || !tags){
    return res.status(400).json({msg: "you must provide the following fields: title, content, category and tags"})
}
  pool.query(
    "UPDATE posts SET title=$1, content=$2, category=$3, tags=$4, updatedAt=DEFAULT  WHERE id = $5 RETURNING *",
    [title, content, category, tags, id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ msg: "Internal server error" });
      }
      console.log(result.rows.length);
      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ msg: `no post with an id of ${id} was found` });
      }
      res.status(200).json(result.rows[0]);
    }
  );
};

//creates a new post
export const createPost = (req, res, next) => {
    const { title, content, category, tags } = req.body;
    if (!title || !content || !category || !tags){
        return res.status(400).json({msg: "you must provide the following fields: title, content, category and tags"})
    }
    pool.query(
        'INSERT INTO posts (title, content, category, tags) VALUES ($1, $2, $3, $4) RETURNING *', [title, content, category, tags], 
        (error, result) => {
            if (error){
                return res.status(500).json({ msg: "Internal server error" });
            }
            res.status(201).json(result.rows)
        }
    )
}

//deletes an existing post
export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM posts WHERE id=$1 RETURNING *', [id], (error, result) =>{
        if (error){
            console.error('Error', error)
            return res.status(500).json({ msg: "Internal server error" });
        }
        if (result.rows.length === 0) {
            return res
              .status(404)
              .json({ msg: `no post with an id of ${id} was found` });
          }
        res.status(204).send('user deleted')
    })
}
