import React from "react";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoCarousel = () => {
  const videoUrls = [
    "https://v1.pinimg.com/videos/mc/720p/b0/d5/c2/b0d5c2ddf0050006a253edd9a746c837.mp4",  // Video 1
    "https://v1.pinimg.com/videos/mc/720p/21/9e/98/219e98483c2209881003753015914fdc.mp4",  // Video 2
    "https://v1.pinimg.com/videos/mc/720p/e8/58/db/e858db98a4ad53c7a8d6ca114ba17b85.mp4"   // Video 3
  ];

  return (
    <Carousel>
      {videoUrls.map((url, index) => (
        <Carousel.Item key={index}>
          {/* este div es el que engloba al video */}
          <div className="video-container" style={{ position: "relative",width: "100vw",
              height: "100vh", paddingBottom: "40%", height: 10, overflow: "hidden", maxWidth: "100%", background: "#000"}}>
            {/* lo que esta dentro de la etiqueta video son los parametros que le video como tal van a cumplir */}
            <video
              src={url}
              title={`video-${index}`} 
              autoPlay
              loop 
              muted
        
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover"}}>
            </video>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default VideoCarousel;
