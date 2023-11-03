import PropTypes from 'prop-types';
import {ItemCard,Picture } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ url, tag, openModal, largeImageURL }) => {
  return (
    <ItemCard>
      <Picture
        src={url}
        alt={tag}
        onClick={() => openModal(largeImageURL, tag)}
      />
    </ItemCard>
  );
};

ImageGalleryItem.prototype = {
  url: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};