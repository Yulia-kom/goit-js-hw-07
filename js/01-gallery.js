import { galleryItems } from './gallery-items.js';
// Change code below this line


const gallery = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
    const markup = galleryItems.map(({ preview, original, description }, index) =>

        ` <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    data-index="${index}"
                    alt="${description}"
                />
            </a>
        </div>`).join("");

    return markup;
};

let currentIndex = 0;

gallery.insertAdjacentHTML("beforeend", galleryMarkup);


const instance = basicLightbox.create(`<img src="" alt=""/>`,
    {
        onShow: (instance) => { window.addEventListener("keydown", onEscClose) },
        onClose: (instance) => { window.removeEventListener("keydown", onEscClose) }
    });

function setModalSrc(url) {
    instance.element().querySelector("img").src = url;
}

const originalOpen = (event) => {
    event.preventDefault();

    currentIndex = Number(event.target.dataset.index);

    setModalSrc(event.target.dataset.source);
    instance.show();

    if (!event.target.dataset.source) {
        return;
    }
    setModalSrc(galleryItems[currentIndex].original);
};
gallery.addEventListener("click", originalOpen);

const onEscClose = (event) => {
    if (event.code === "Escape") {
        instance.close();
    };

    if (event.code === "ArrowLeft") {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = galleryItems.length - 1;
        };
    };

    if (event.code === "ArrowRight") {
        currentIndex += 1;
        if (currentIndex > galleryItems.length - 1) {
            currentIndex = 0;
        }
    };

    setModalSrc(galleryItems[currentIndex].original);
};