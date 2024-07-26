const mobileMenu = document.querySelector("#mobile-menu");
const mobileMenuOverlay = document.querySelector("#mobile-menu-overlay");
const mobileMenuCloseBtn = document.querySelector("#mobile-menu-close-btn");
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");

// Remove page scroll
function removeScroll() {
  document.body.classList.toggle("overflow-hidden");
}

// Open Mobile Menu
function openMobMenu() {
  mobileMenu.classList.remove("-translate-x-full");
}

// Close Mobile Menu
function closeMobMenu() {
  mobileMenu.classList.add("-translate-x-full");
}

// Open Mob Menu Overlay
function openOverlay() {
  mobileMenuOverlay.classList.remove("hidden");
}

// Close Mob Menu Overlay
function closeOverlay() {
  mobileMenuOverlay.classList.add("hidden");
}

mobileMenuOverlay.addEventListener("click", () => {
  closeMobMenu();
  closeOverlay();
  removeScroll();
});

mobileMenuBtn.addEventListener("click", () => {
  openMobMenu();
  openOverlay();
  removeScroll();
});

mobileMenuCloseBtn.addEventListener("click", () => {
  closeMobMenu();
  closeOverlay();
  removeScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetContent = document.getElementById(
        button.getAttribute("data-accordion-target")
      );
      const icon = button.nextElementSibling;

      // If the target content is currently hidden
      if (targetContent.classList.contains("hidden")) {
        // Set max-height to the scroll height to allow transition
        targetContent.classList.remove("hidden");
        requestAnimationFrame(() => {
          targetContent.style.maxHeight = targetContent.scrollHeight + "px";
        });
        icon.classList.add("rotate-180");
      } else {
        // If the target content is currently visible
        targetContent.style.maxHeight = targetContent.scrollHeight + "px";
        requestAnimationFrame(() => {
          targetContent.style.maxHeight = "0";
        });
        icon.classList.remove("rotate-180");
        setTimeout(() => {
          targetContent.classList.add("hidden");
        }, 500); // Ensure this matches the transition duration
      }

      // Close other open accordion items
      document.querySelectorAll(".accordion-content").forEach((content) => {
        if (
          content !== targetContent &&
          !content.classList.contains("hidden")
        ) {
          content.style.maxHeight = content.scrollHeight + "px";
          requestAnimationFrame(() => {
            content.style.maxHeight = "0";
          });
          const otherIcon =
            content.previousElementSibling.querySelector(".accordion-icon");
          if (otherIcon) {
            otherIcon.classList.remove("rotate-180");
          }
          setTimeout(() => {
            content.classList.add("hidden");
          }, 500); // Ensure this matches the transition duration
        }
      });
    });
  });
});

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
