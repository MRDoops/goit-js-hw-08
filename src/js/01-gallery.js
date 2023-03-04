// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

// console.log(galleryItems);

const galleryContainerRef = document.querySelector('.gallery');
const cardsMarkupRef = createGalleryList(galleryItems);
galleryContainerRef.insertAdjacentHTML('beforeend', cardsMarkupRef);
galleryContainerRef.addEventListener('click', onImgClick);

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

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionsDelay: 250,
});
function onImgClick(e) {
  e.preventDefault();
  const imgSrc = e.target.dataset.source;
  if (!imgSrc) return;

  lightbox.element().querySelector('img').src = imgSrc;
  lightbox.show();
}

function onEscKeyPress(e) {
  if (e.code !== 'Escape') return;
  lightbox.close();
}
