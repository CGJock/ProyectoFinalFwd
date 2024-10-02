export const createPost = async (title, image_url) => {
    const formData = new FormData();
    formData.append('text', title);
    formData.append('image', image_url);
  
    try {
      const response = await fetch('http://localhost:8000/api/post/post-responses/?format=api', {
        method: 'POST',
        body: formData,
        headers: {
      
        },
      });
  
      if (!response.ok) {
        throw new Error('Error creating post');
      }
  
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error('Error:', error);
      throw error;   
    }
  };