import React, { useState, useEffect } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch para obtener las publicaciones
    fetch("http://localhost:8000/api/post/posts/")
      .then(response => response.json())
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <h1>Publicaciones</h1>
      {/*  */}
      {posts.map(post => (
        <div key={post.post_id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {post.image_url && <img src={post.image_url} alt="Post" />}
          <p>Comentarios: {post.comment_count}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
