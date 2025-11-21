import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await api.get('/gallery');
      setImages(response.data.data || []);
    } catch (error) {
      console.error('Failed to load gallery');
      setImages([]);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-brown-500 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-serif font-bold mb-4">Gallery</h1>
          <p className="text-xl">Moments captured at Lumière</p>
        </div>
      </div>
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image._id}
              onClick={() => setSelectedImage(image)}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition"
            >
              <img
                src={image.image || 'https://via.placeholder.com/400'}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.image}
            alt={selectedImage.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
