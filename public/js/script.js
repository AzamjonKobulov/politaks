var swiper = new Swiper(".swiper-clients", {
  slidesPerGroup: 1,
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  keyboard: true,
  loop: true,
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 2.4,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 3.5,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 3.8,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 4.5,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5, // Ensure 5 slides are shown on desktop
      spaceBetween: 20,
    },
  },
});
