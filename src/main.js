import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryItemMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery-list');
const loaderEl = document.querySelector('.loader');
let lightbox;
function onSearchFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.target.querySelector('.form-input').value.trim();
  galleryEl.innerHTML = '';
  if (searchQuery === '') {
    event.target.reset();
    iziToast.show({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  loaderEl.classList.remove('is-hidden');

  fetchPhotosByQuery(searchQuery)
    .then(imagesData => {
      if (imagesData.hits.length === 0) {
        iziToast.show({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        const markup = createGalleryItemMarkup(imagesData.hits);
        galleryEl.insertAdjacentHTML('beforeend', markup);

        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.gallery-list a', {
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250,
            className: 'my-custom-lightbox',
          });
        }
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      event.target.reset();
      loaderEl.classList.add('is-hidden');
    });
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
