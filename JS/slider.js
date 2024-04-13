document.addEventListener('DOMContentLoaded', function(){
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;
    let intervalId;

    function moveToIndex(index) {
        if (index < 0 || index >= totalItems) return;

        currentIndex = index;
        const offset = -currentIndex * 100; // Cambiar 100 al ancho deseado de cada sección
        carouselWrapper.style.transform = `translateX(${offset}%)`;
    }

    // Inicia el carrusel
    moveToIndex(0);

    // Avanza al siguiente elemento
    function next() {
        currentIndex = (currentIndex + 1) % totalItems;
        moveToIndex(currentIndex);
    }

    // Retrocede al elemento anterior
    function prev() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        moveToIndex(currentIndex);
    }

    // Inicia el intervalo para cambiar automáticamente cada 5 segundos
    function startInterval() {
        intervalId = setInterval(next, 5000);
    }

    // Detiene el intervalo
    function stopInterval() {
        clearInterval(intervalId);
    }

    // Inicia el intervalo al cargar la página
    startInterval();
});