// solicitud HTTP POST
// Función para subir la imagen a Imgur
const uploadToImgur = async (imageFile) => {
  const formData = new FormData();
  formData.append('image_url', imageFile);

  try {
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID cc5933407f174ac',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error uploading image to Imgur');
    }

    const data = await response.json();
    return data.data.link;  
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
};

// crear post

export const createPost = async (title, image_url) => {
  if (!title || !image_url) {
    throw new Error('Title and image are required');
}
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image_url', image_url);
  
    try {
      const response = await fetch("http://localhost:5173api/post/", {
        method: 'POST',
        body: formData,
        headers: {
      
        },
      });
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(`Error creating post: ${errorData.detail || 'Unknown error'}`);
        } else{
          throw new Error('Error creating post: Response is not JSON');
        }
        
    }
    return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
        throw error;   
    }
  
}