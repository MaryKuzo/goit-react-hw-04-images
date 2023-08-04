import {ListItem, Image} from './ImageGalleryItem.styled'
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  smallUrl,
  alt,
  largeUrl,
  onGetLargeImageUrlAndTags,
}) => {
  return (
    <ListItem
      onClick={() =>
        onGetLargeImageUrlAndTags({
          largeUrl: largeUrl,
          alt: alt,
        })
      }
    >
      <Image src={smallUrl} alt={alt} width="300" />
    </ListItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  onGetLargeImageUrlAndTags: PropTypes.func.isRequired,
};
