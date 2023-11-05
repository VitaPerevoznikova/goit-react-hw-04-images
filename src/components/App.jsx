import React from 'react';
import { useState,useEffect } from 'react';

import { fetchImages, needValues } from './api/api';

import SearchBar from './SearchBar/SearchBar';

import { ImageGallery } from './ImageGallery/ImageGallery';

import Button from './Button/Button';

import Notiflix from 'notiflix';

import { Modal } from './Modal/Modal';

import Loader from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    renderGallery(searchName, page);
  }, [searchName, page]);

  const renderGallery = async () => {
    setIsLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(searchName, page);

      if (totalHits === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (page === 1) {
        Notiflix.Notify.success(
          `Successfully found ${totalHits} images matching your search query.`
        );
      }
      const newImages = needValues(hits);

      setImages([...images, ...newImages]);
      setTotalHits(totalHits);
    } catch (error) {
      setError(Error);
      Notiflix.Notify.failure('Oops... Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  // renderGallery();

  const onFormSubmit = searchName => {
    setSearchName(searchName);
    setImages([]);
    setPage(1);
  };

  const openModal = (largeImageURL, tags) => {
    toggleModal();
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const allImages = images.length === totalHits;

  return (
    <>
      <SearchBar onSubmit={onFormSubmit} />

      <ImageGallery images={images} onOpenModal={openModal} />

      {isLoading && <Loader />}
      {images.length !== 0 && !isLoading && !allImages && (
        <Button onClick={onLoadMore} />
      )}

      {showModal && (
        <Modal
          onModalClick={toggleModal}
          largeImage={largeImageURL}
          alt={tags}
        />
      )}
    </>
  );
};

export default App;
