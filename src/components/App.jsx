import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from './API/pixabay-api';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import  ImageGallery  from './ImageGallery/ImageGallery';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageUrlAndTags, setLargeImageUrlAndTags] = useState(null);
  const [totalImages, setTotalImages] = useState(null);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setIsLoading(true);
    fetchImages(imageName, page)
      .then((dataImages) => {
        if (dataImages.hits.length === 0) {
          toast.error(`No such image ${imageName}`);
        } else {
          setImages((prevImages) => [...prevImages, ...dataImages.hits]);
          setTotalImages(dataImages.totalHits);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`Error fetching images: ${error.message}`);
        setIsLoading(false);
      });
  }, [imageName, page]);

  const handleFormSubmit = (newImageName) => {
    if (imageName === newImageName) {
      return;
    }
    setImageName(newImageName);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLargeImageUrlAndTags = (newImageUrlAndTags) => {
    setLargeImageUrlAndTags(newImageUrlAndTags);
  };

  const toggleModal = () => {
    setLargeImageUrlAndTags(null);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {imageName === '' && <h2>Please, enter text in the search field</h2>}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGallery
            images={images}
            onGetLargeImageUrlAndTags={handleLargeImageUrlAndTags} />
          {images.length < totalImages ? (
            <Button onClick={loadMoreImages} />
          ) : (
            toast.warning(`The end`)
          )}
        </>
      )}
      {largeImageUrlAndTags && (
        <Modal
          onClose={toggleModal}
          largeImage={largeImageUrlAndTags} />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

