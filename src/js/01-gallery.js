import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//Select gallery Container class
const galleryContainerRef = document.querySelector('.gallery');
//Create markup for each gallery item.
const cardsMarkupRef = createGalleryList(galleryItems);
galleryContainerRef.insertAdjacentHTML('beforeend', cardsMarkupRef);
function createGalleryList(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
						<div class="gallery__item">
						<a class="gallery__link" href="${original}">
								<img
										class="gallery__image"
										src="${preview}"
										data-source="${original}"
										alt="${description}"
								/>
						</a>
				</div>
						`;
    })
    .join('');
}
// Initialize Simple Lightbox on gallery images
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
