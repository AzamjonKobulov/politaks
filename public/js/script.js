// Common fucntions
// Function to handle click outside of specified elements
function handleClickOutside(elementButtonClass, elementClass) {
  window.addEventListener("click", (e) => {
    const button = e.target.closest(elementButtonClass);
    const element = document.querySelector(elementClass);

    if (!button) {
      if (!element.classList.contains("hidden")) {
        element.classList.add("hidden");
      }
    }
  });
}

// Header functions

const mobileMenu = document.querySelector("#mobile-menu");
const mobileMenuOverlay = document.querySelector("#mobile-menu-overlay");
const mobileMenuCloseBtn = document.querySelector("#mobile-menu-close-btn");
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");

// Remove page scroll
function togglePageScroll() {
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
  togglePageScroll();
});

mobileMenuBtn.addEventListener("click", () => {
  openMobMenu();
  openOverlay();
  togglePageScroll();
});

mobileMenuCloseBtn.addEventListener("click", () => {
  closeMobMenu();
  closeOverlay();
  togglePageScroll();
});

// Search Input Functions
const searchInput = document.querySelector("#search");
const searchX = document.querySelector("#searchX");
const searchHistory = document.querySelector("#search-history");
const searchSuggest = document.querySelector("#search-suggest");

searchInput.addEventListener("input", () => {
  if (searchInput.value.length !== 0) {
    searchX.classList.remove("hidden");
    searchSuggest.classList.remove("hidden");
    searchHistory.classList.add("hidden");
  } else {
    searchX.classList.add("hidden");
    searchSuggest.classList.add("hidden");
    searchHistory.classList.remove("hidden");
  }
});

searchInput.addEventListener("focus", () => {
  if (searchInput.value.length === 0) {
    searchHistory.classList.remove("hidden");
  } else {
    searchHistory.classList.add("hidden");
  }
});

searchInput.addEventListener("blur", () => {
  setTimeout(() => {
    if (!searchInput.matches(":focus")) {
      searchHistory.classList.add("hidden");
      searchSuggest.classList.add("hidden");
    }
  }, 100);
});

searchX.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  searchInput.value = "";
  searchX.classList.add("hidden");
  searchSuggest.classList.add("hidden");

  if (searchInput.value.length === 0) {
    searchHistory.classList.remove("hidden");
  }

  searchInput.focus();
});

// Hide search history and suggestions when clicking outside
window.addEventListener("click", (event) => {
  if (!event.target.closest("#search")) {
    searchHistory.classList.add("hidden");

    if (searchInput.value.length === 0) {
      searchSuggest.classList.add("hidden");
    } else {
      searchSuggest.classList.remove("hidden");
    }
  }
});

// Navbar Dropdown Funcs
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownChevron = document.querySelector(".dropdown-chevron");

  dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownContent.classList.toggle("hidden");
    dropdownChevron.classList.toggle("rotate-180");
  });

  handleClickOutside(".dropdown", ".dropdown-content");
});

// Login Dropdown
const userLoginBtn = document.querySelector(".login-button");
const userLoginDropdown = document.querySelector(".user-dropdown-content");

userLoginBtn.addEventListener("click", function () {
  userLoginDropdown.classList.toggle("hidden");
});

window.addEventListener("click", (e) => {
  if (!e.target.closest(".login-button")) {
    if (!userLoginDropdown.classList.contains("hidden")) {
      userLoginDropdown.classList.add("hidden");
    }
  }
});

// Catalog Functions
const catalog = document.querySelector(".catalog");
const catalogItem = document.querySelector(".catalog-item");
const catalogButton = document.querySelector(".catalog-button");
const catalogMenuIcon = document.querySelector(".catalog-button-menu-icon");
const catalogXIcon = document.querySelector(".catalog-button-x-icon");

function toggleCatalog() {
  catalog.classList.toggle("hidden");
  catalogButton.classList.toggle("bg-brand-red");
  catalogButton.classList.toggle("text-white");
  catalogButton.classList.toggle("bg-white");
  catalogButton.classList.toggle("text-brand-red");
  catalogMenuIcon.classList.toggle("hidden");
  catalogXIcon.classList.toggle("hidden");
}

catalogButton.addEventListener("click", toggleCatalog);

window.addEventListener("click", (e) => {
  if (!e.target.closest(".catalog-button")) {
    if (!catalog.classList.contains("hidden")) {
      toggleCatalog();
    }
  }
});

// Search Mobile Functions
const searchMobile = document.querySelector("#search-mobile");
const saerchBtnMobile = document.querySelector("#search-button-mobile");
const searchCloseBtnMobile = document.querySelector("#search-close-mobile");

saerchBtnMobile.addEventListener("click", () => {
  searchMobile.classList.remove("-translate-x-full");
  togglePageScroll();
});

searchCloseBtnMobile.addEventListener("click", () => {
  searchMobile.classList.add("-translate-x-full");
  togglePageScroll();
});

// Accordion Func for the Orders Page of Admin
document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".order-accordion-header");

  // Function to close all open accordions
  function closeAllAccordions() {
    document.querySelectorAll(".order-accordion-item.open").forEach((item) => {
      item.classList.remove("open");
      item.classList.add("max-h-28", "xs:max-h-[68px]", "lg:max-h-[89px]"); // Add class to accordion item when closing
      const accordionContent = item.querySelector(".order-accordion-content");
      accordionContent.style.maxHeight = null;
    });
  }

  // Accordion click event handler
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function (event) {
      const accordionItem = this.parentElement;
      const accordionContent = accordionItem.querySelector(
        ".order-accordion-content"
      );

      if (accordionItem.classList.contains("open")) {
        // Close the accordion
        accordionItem.classList.remove("open");
        accordionItem.classList.add(
          "max-h-28",
          "xs:max-h-[68px]",
          "lg:max-h-[89px]"
        ); // Add class to accordion item when closing
        accordionContent.style.maxHeight = null;
      } else {
        // Close all other open accordions
        closeAllAccordions();

        // Open the clicked accordion
        accordionItem.classList.add("open");
        accordionItem.classList.remove(
          "max-h-28",
          "xs:max-h-[68px]",
          "lg:max-h-[89px]"
        ); // Remove class from accordion item when opening
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      }

      // Prevent the event from bubbling up to the document
      event.stopPropagation();
    });
  });

  // Use handleClickOutside function to close accordions when clicking outside
  handleClickOutside(".order-accordion-header", ".order-accordion-item.open");

  function handleClickOutside(elementButtonClass, elementClass) {
    window.addEventListener("click", (e) => {
      const button = e.target.closest(elementButtonClass);
      const elements = document.querySelectorAll(elementClass);

      if (!button) {
        elements.forEach((element) => {
          if (element.classList.contains("open")) {
            element.classList.remove("open");
            element.classList.add(
              "max-h-28",
              "xs:max-h-[68px]",
              "lg:max-h-[89px]"
            ); // Add class to accordion item when closing
            const accordionContent = element.querySelector(
              ".order-accordion-content"
            );
            accordionContent.style.maxHeight = null;
          }
        });
      }
    });
  }
});

// Footer Functions
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

// Sliders

// Home page slider function
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

// About Swiper
var swiper = new Swiper(".about-swiper", {
  navigation: {
    nextEl: ".swiper-about-next",
    prevEl: ".swiper-about-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  keyboard: true,
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1.4,
      spaceBetween: 20,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

// Accordion Function for the Accordion on Price List Page
document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(
    "#accordion .accordion-item"
  );

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const body = item.querySelector(".accordion-body");
    const plusIcon = item.querySelector(".plus-on");

    header.addEventListener("click", function () {
      // Toggle the "open" class on the accordion item
      if (item.classList.contains("open")) {
        // If open, close it
        item.classList.remove("open");
        body.classList.add("hidden");
        plusIcon.classList.remove("rotate-45");
        plusIcon.classList.remove("hidden"); // Show plus-on icon
        item
          .querySelectorAll(".hidden-td")
          .forEach((td) => td.classList.add("hidden"));
      } else {
        // If closed, open it
        item.classList.add("open");
        body.classList.remove("hidden");
        plusIcon.classList.add("rotate-45");
        plusIcon.classList.add("hidden"); // Hide plus-on icon
        item
          .querySelectorAll(".hidden-td")
          .forEach((td) => td.classList.remove("hidden"));
      }
    });
  });
});
