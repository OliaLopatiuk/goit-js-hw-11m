import PixabayAPIService from "./pixabay-api";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');
const div = document.querySelector('.js-guard');

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

const pixabayService = new PixabayAPIService();
const lightbox = new SimpleLightbox('.gallery a', {captionsData: "alt",  captionPosition: 'bottom', captionDelay: 250,});

// function onSearch(e) {
//     e.preventDefault();


//     clearGallery()
//     pixabayService.resetPage();
//     loader.classList.toggle('is-hidden');

//     pixabayService.query = e.currentTarget.elements.searchQuery.value;

//     pixabayService.fetchPhotos().then(photos => { 
//         if (photos.total === 0) { 
//             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         }
//         loader.classList.toggle('is-hidden');
//         Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
//         const photosArr = photos.hits;
//         createGallery(photosArr) 
//         loadMoreBtn.classList.remove('is-hidden');
//     }
//     )}

// function onLoadMore() {

//     if(pixabayService.page === pixabayService.maxPage) {
//         console.log('wearehere');
//         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//         loadMoreBtn.classList.add('is-hidden');
//         return;
//     }
//     loadMoreBtn.textContent ="Loading...";
//     pixabayService.fetchPhotos().then(photos => { 
//         loadMoreBtn.textContent ="Load more";
//     const photosArr = photos.hits;
//         createGallery(photosArr) 
//     })
// }

function createGallery(arr) {
    const markup = arr.map(photo => `<a href='${photo.largeImageURL}'><div class="photo-card">
    <div class="img-container"><img class="card-img" src=${photo.webformatURL} alt="${photo.tags}" loading="lazy"/></div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${photo.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${photo.likes}
      </p>
      <p class="info-item">
        <b>Comments</b> ${photo.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${photo.downloads}
      </p>
    </div>
  </div></a>`).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
 
function clearGallery() {
    gallery.innerHTML='';
}

async function onSearch(e) {
    e.preventDefault();

    clearGallery()
    pixabayService.resetPage();
    loader.classList.toggle('is-hidden');

    pixabayService.query = e.currentTarget.elements.searchQuery.value;
    
    try {

      const photos = await pixabayService.fetchPhotos();
    
      if (photos.total === 0) { 
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            };

        loader.classList.toggle('is-hidden');
        Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`);
        const photosArr = photos.hits;
        createGallery(photosArr) 
        lightbox.refresh();
observer.observe(div);
        loadMoreBtn.classList.remove('is-hidden');
        pixabayService.incrementPage()
        pixabayService.maxPage = Math.ceil(photos.totalHits/20) + 1;
    }
    catch (error) {
        console.log(error.message);
      }
    };

async function onLoadMore() {

    if(pixabayService.page === pixabayService.maxPage) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.classList.add('is-hidden');
        return;
    }

    loadMoreBtn.textContent ="Loading...";
    lightbox.refresh();
    try {
        const photos = await pixabayService.fetchPhotos();
        loadMoreBtn.textContent ="Load more";
        const photosArr = photos.hits;
        createGallery(photosArr);
        lightbox.refresh(); 
        pixabayService.incrementPage()

    } catch (error) {
        console.log(error.message);
      }

}

let options = {
    root: null,
    rootMargin: "200px",
    threshold: 1.0,
  };
 
  let observer = new IntersectionObserver(onLoadMore, options);

  function newFunction(e) {
    console.log(e);
  }