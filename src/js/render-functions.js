export function createGalleryItemMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
              <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="small-info">
             <small class="text-body-likes">Likes: ${likes}</small>
             <small class="text-body-views">Views: ${views}</small>
             <small class="text-body-comments">Comments: ${comments}</small>
             <small class="text-body-downloads">Downloads: ${downloads}</small>
            </div>
          </li>`;
      }
    )
    .join('');
}
