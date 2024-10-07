import React, { useState } from 'react';
import { createPost } from '../../../services/fetchPost.js';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = await createPost(text, image);  
      setSuccess('Post created successfully!');
      setError('');
      console.log(postData);  
    } catch (err) {
      setError('Error creating post');
      setSuccess('');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Text:</label>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Write something..."
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        <button type="submit">Post</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreatePost;