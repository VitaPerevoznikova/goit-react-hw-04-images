import React from 'react';
import { Component } from 'react';

import { fetchImages, needValues } from './api/api';

import SearchBar from './SearchBar/SearchBar';

import { ImageGallery } from './ImageGallery/ImageGallery';

import Button from './Button/Button';

import Notiflix from 'notiflix';

import { Modal } from './Modal/Modal';

import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    searchName: '',
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    const prevSearchQuery = prevState.searchName;
    const nextSearchQuery = this.state.searchName;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== page) {
      this.renderGallery();
    }
  }

  renderGallery = async () => {
    const { searchName, page } = this.state;
    this.setState({ isLoading: true });

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

      this.setState(({ images }) => ({
        images: [...images, ...newImages],
        totalHits,
      }));
      
    } catch (error) {
      this.setState({ error });
      Notiflix.Notify.failure('Oops... Something went wrong');
    
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onFormSubmit = searchName => {
    this.setState({ searchName, images: [], page: 1 });
  };

  openModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({
      largeImageURL,
      tags,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, totalHits, largeImageURL, tags, showModal } =
      this.state;
    const allImages = images.length === totalHits;

    return (
      <>
        <SearchBar onSubmit={this.onFormSubmit} />

        <ImageGallery images={images} onOpenModal={this.openModal} />

        {isLoading && <Loader />}
        {images.length !== 0 && !isLoading && !allImages && (
          <Button onClick={this.onLoadMore} />
        )}

        {showModal && (
          <Modal
            onModalClick={this.toggleModal}
            largeImage={largeImageURL}
            alt={tags}
          />
        )}
      </>
    );
  }
}
export default App;
