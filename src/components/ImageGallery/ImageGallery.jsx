import React from 'react';
import PropTypes from 'prop-types';

import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';


export const ImageGallery = ({ images, onOpenModal }) => (
  <GalleryList>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        url={webformatURL}
        largeImageURL={largeImageURL}
        tag={tags}
        openModal={onOpenModal}
      />
    ))}
  </GalleryList>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};