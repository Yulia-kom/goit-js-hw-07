import { galleryItems } from './gallery-items.js';
// Change code below this line

//console.log(galleryItems);

const gallery = document.querySelector(".gallery");

const galleryMarkup = galleryItems.map(({ original, preview, description }) =>

    ` <a class="gallery__item" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
    />
</a>`).join("");


gallery.insertAdjacentHTML("beforeend", galleryMarkup);

let lightbox = new SimpleLightbox('.gallery a',
    {
        captionsData: "alt",
        captionDelay: 250
    }
);


