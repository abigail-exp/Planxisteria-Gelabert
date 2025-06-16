//Codi carrussel (Eliminat el automoviment, per tornar-ho a ficar, només ficar un setInterval)
const images = [
    {title: "Galeria1", src: "./assets/img/galeria1.png"},
    {title: "Galeria2", src: "./assets/img/galeria2.png"},
    {title: "Galeria3", src: "./assets/img/galeria3.png"},
    {title: "Galeria4", src: "./assets/img/galeria4.png"},
    {title: "Galeria5", src: "./assets/img/galeria5.png"},
    {title: "Galeria6", src: "./assets/img/galeria6.png"},
    {title: "Galeria7", src: "./assets/img/galeria7.png"},
    {title: "Galeria8", src: "./assets/img/galeria8.png"}
];

let current = 0;
const carousel = document.getElementById('carousel');

function renderCarousel() {
    carousel.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const idx = (current + i) % images.length;
        const div = document.createElement('div');
        div.className = "bg-white flex flex-col w-1/4 h-64 rounded shadow-lg overflow-hidden cursor-pointer";
        div.onclick = function() {
            openModal(images[idx].title, images[idx].src.split('/').pop().split('.')[0]);
        };
        const img = document.createElement('img');
        img.src = images[idx].src;
        img.alt = images[idx].title;
        img.className = "w-full h-full object-cover";
        div.appendChild(img);
        carousel.appendChild(div);
    }
}
renderCarousel();
document.getElementById('prevBtn').onclick = function() {
    current = (current - 1 + images.length) % images.length;
    renderCarousel();
};
document.getElementById('nextBtn').onclick = function() {
    current = (current + 1) % images.length;
    renderCarousel();
};

                
// funcions modal
function openModal(title, imageSrc) {
    const modal = document.getElementById('modal');
    const beforeImg = document.getElementById('beforeImg');
    const afterImg = document.getElementById('afterImg');
    beforeImg.src =  `assets/img/${imageSrc}.png`;
    afterImg.src = `assets/img/${imageSrc}_1.png`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = title;
    modal.style.zIndex = 50;
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    modal.style.zIndex = 0;
}