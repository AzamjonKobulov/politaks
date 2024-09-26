import togglePassword from "./modules/utils.js";
import initCatalogHover from "./modules/navbar.js";

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

// General Function to toggle dropdowns
document.addEventListener("DOMContentLoaded", () => {
  function setupDropdown(
    dropdownSelector,
    contentSelector,
    chevronSelector = null
  ) {
    const dropdown = document.querySelector(dropdownSelector);
    const dropdownContent = document.querySelector(contentSelector);
    const dropdownChevron = chevronSelector
      ? document.querySelector(chevronSelector)
      : null;

    if (dropdown && dropdownContent) {
      dropdown.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdownContent.classList.toggle("hidden");
        if (dropdownChevron) {
          dropdownChevron.classList.toggle("rotate-180");
        }
      });

      dropdownContent.querySelectorAll("a button").forEach((item) => {
        item.addEventListener("click", () => {
          dropdownContent.classList.add("hidden");
          if (dropdownChevron) {
            dropdownChevron.classList.remove("rotate-180");
          }
        });
      });

      // Close When Clicking outside
      window.addEventListener("click", (e) => {
        if (!e.target.closest(dropdownSelector)) {
          if (!dropdownContent.classList.contains("hidden")) {
            dropdownContent.classList.add("hidden");
            if (dropdownChevron) {
              dropdownChevron.classList.remove("rotate-180");
            }
          }
        }
      });
    }
  }

  // Setup Navbar Dropdown
  setupDropdown(
    ".nav-dropdown",
    ".nav-dropdown-content",
    ".nav-dropdown-chevron"
  );
  // Setup User Dropdown
  setupDropdown(".user-dropdown", ".user-dropdown-content");
  // Setup Filter Dropdown On Search Results Page
  setupDropdown(
    ".filter-dropdown",
    ".filter-dropdown-content",
    ".filter-dropdown-chevron"
  );
  // Setup Filter Dropdown On Reviews Page
  setupDropdown(
    ".reviews-dropdown",
    ".reviews-dropdown-content",
    ".reviews-dropdown-chevron"
  );
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

// Common Product Slider
function initializeSlider(sliderContainer) {
  let currentSlide = 0; // Default to the first slide
  const sliderActive = sliderContainer.querySelector("#slider-active");
  const sliderThumbButtons = sliderContainer.querySelectorAll(
    ".slider-thumb-button"
  );
  const nextSlideButton = sliderContainer.querySelector("#next-slide");
  const prevSlideButton = sliderContainer.querySelector("#prev-slide");

  const slides = Array.from(sliderThumbButtons).map((button) => {
    const img = button.querySelector("img");
    const videoSrc = button.dataset.videoSrc;
    return videoSrc
      ? { type: "video", src: videoSrc }
      : { type: "image", src: img.src };
  });

  function updateSlide() {
    const activeImg = sliderActive.querySelector(".slider-image");
    const activeVideo = sliderActive.querySelector(".slider-video");

    const fadeOut = () => {
      if (activeImg && !activeImg.classList.contains("hidden")) {
        activeImg.classList.add("fade-out");
        setTimeout(() => {
          activeImg.classList.add("hidden");
          activeImg.classList.remove("fade-out");
        }, 200); // Match duration with CSS animation
      }

      if (activeVideo && !activeVideo.classList.contains("hidden")) {
        activeVideo.classList.add("fade-out");
        activeVideo.pause();
        setTimeout(() => {
          activeVideo.classList.add("hidden");
          activeVideo.classList.remove("fade-out");
        }, 200);
      }
    };

    const fadeIn = (slide) => {
      if (slide.type === "image") {
        activeImg.src = slide.src;
        activeImg.classList.remove("hidden");
        activeImg.classList.add("fade-in");
        setTimeout(() => {
          activeImg.classList.remove("fade-in");
        }, 200); // Match duration with CSS animation
      } else if (slide.type === "video") {
        const source = activeVideo.querySelector("source");
        source.src = slide.src;
        activeVideo.load();
        activeVideo.classList.remove("hidden");
        activeVideo.classList.add("fade-in");
        activeVideo.play();
        setTimeout(() => {
          activeVideo.classList.remove("fade-in");
        }, 200);
      }
    };

    fadeOut();
    const slide = slides[currentSlide];
    setTimeout(() => fadeIn(slide), 200); // Delay fade-in until fade-out is complete

    sliderThumbButtons.forEach((btn) => btn.classList.remove("active"));
    sliderThumbButtons[currentSlide].classList.add("active");
  }

  function goToNextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
  }

  function goToPrevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
  }

  if (nextSlideButton) {
    nextSlideButton.addEventListener("click", goToNextSlide);
  }
  if (prevSlideButton) {
    prevSlideButton.addEventListener("click", goToPrevSlide);
  }

  sliderThumbButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentSlide = index;
      updateSlide();
    });
  });

  updateSlide(); // Call to show the first slide
}

document.querySelectorAll(".slider-container").forEach((container) => {
  initializeSlider(container);
});

// Comparing Products
var swiper = new Swiper(".compare-swiper", {
  navigation: {
    nextEl: ".swiper-compare-next",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// Accordion Function for the Accordion on Price List Page
document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(
    "#accordion .accordion-item"
  );
  const openAllButton = document.querySelector(".flex .open-all-price");
  const closeAllButton = document.querySelector(".flex .close-all-price");

  // Function to open a specific accordion item
  function openAccordion(item) {
    const body = item.querySelector(".accordion-body");
    const plusIcon = item.querySelector(".plus-on");
    const firstTh = document.querySelector(".first-th");

    item.classList.add("open");
    body.classList.remove("hidden");
    plusIcon.classList.add("rotate-45");
    plusIcon.classList.add("hidden"); // Hide plus-on icon
    item
      .querySelectorAll(".hidden-td")
      .forEach((td) => td.classList.remove("hidden"));

    // Add the 'border-b' class to the 'first-th' element
    if (firstTh) firstTh.classList.add("border-b");
  }

  // Function to close a specific accordion item
  function closeAccordion(item) {
    const body = item.querySelector(".accordion-body");
    const plusIcon = item.querySelector(".plus-on");
    const firstTh = document.querySelector(".first-th");

    item.classList.remove("open");
    body.classList.add("hidden");
    plusIcon.classList.remove("rotate-45");
    plusIcon.classList.remove("hidden"); // Show plus-on icon
    item
      .querySelectorAll(".hidden-td")
      .forEach((td) => td.classList.add("hidden"));

    // Remove the 'border-b' class from the 'first-th' element
    if (firstTh) firstTh.classList.remove("border-b");

    // Remove the 'border-4' class when the accordion is closed
    item.classList.remove("border-4");
  }

  // Add click event to each accordion header
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", function () {
      if (item.classList.contains("open")) {
        closeAccordion(item);
      } else {
        openAccordion(item);
        item.classList.add("border-4"); // Add the 'border-4' class when the accordion is opened
      }
    });
  });

  // Add click event to open all accordions
  openAllButton.addEventListener("click", function () {
    accordionItems.forEach((item) => {
      if (!item.classList.contains("open")) {
        openAccordion(item);
        item.classList.add("border-4"); // Add the 'border-4' class when all accordions are opened
      }
    });
  });

  // Add click event to close all accordions
  closeAllButton.addEventListener("click", function () {
    accordionItems.forEach((item) => {
      if (item.classList.contains("open")) {
        closeAccordion(item);
      }
    });
  });
});

// Table Hovering func
document.querySelectorAll(".hover-table td").forEach((td) => {
  td.addEventListener("mouseenter", function () {
    // Get the index of the hovered td
    const index = Array.from(td.parentNode.children).indexOf(td);

    // Get the corresponding th and the first td
    const table = td.closest(".hover-table");
    const th = table.querySelector(`th:nth-child(${index + 1})`);
    const firstTd = td.parentNode.querySelector("td:first-child");

    // Add the text-brand-red class to them
    td.classList.add("text-brand-red");
    if (th) th.classList.add("text-brand-red");
    firstTd.classList.add("text-brand-red");
  });

  td.addEventListener("mouseleave", function () {
    // Get the index of the hovered td
    const index = Array.from(td.parentNode.children).indexOf(td);

    // Get the corresponding th and the first td
    const table = td.closest(".hover-table");
    const th = table.querySelector(`th:nth-child(${index + 1})`);
    const firstTd = td.parentNode.querySelector("td:first-child");

    // Remove the text-brand-red class from them
    td.classList.remove("text-brand-red");
    if (th) th.classList.remove("text-brand-red");
    firstTd.classList.remove("text-brand-red");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const faqHeaders = document.querySelectorAll(".faq-header");
  const faqItems = document.querySelectorAll(".faq-item"); // Select all faq items

  // Function to close all accordions
  function closeAllAccordions() {
    faqItems.forEach((faqItem) => {
      const faqBody = faqItem.querySelector(".faq-body");
      const plusLine = faqItem.querySelector(".article-accordion-plus");

      if (faqBody && !faqBody.classList.contains("hidden")) {
        faqBody.style.maxHeight = "0"; // Smooth closing
        faqBody.classList.add("hidden");

        if (plusLine) {
          plusLine.style.opacity = "1"; // Show the vertical line (back to plus)
        }
      }
    });
  }

  // Initialize first accordion to be open
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstBody = firstItem.querySelector(".faq-body");
    const firstPlusLine = firstItem.querySelector(".article-accordion-plus");

    if (firstBody) {
      firstBody.classList.remove("hidden");
      firstBody.style.maxHeight = firstBody.scrollHeight + "px"; // Smooth opening

      if (firstPlusLine) {
        firstPlusLine.style.opacity = "0"; // Hide the vertical line (turn into minus)
      }
    }
  }

  // Handle FAQ header click
  faqHeaders.forEach((header) => {
    header.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click from propagating to document

      const faqItem = this.closest(".faq-item");
      const faqBody = this.nextElementSibling;
      const plusLine = this.querySelector(".article-accordion-plus");

      if (faqBody.classList.contains("hidden")) {
        faqBody.classList.remove("hidden");
        faqBody.style.maxHeight = faqBody.scrollHeight + "px"; // Smooth opening

        if (plusLine) {
          plusLine.style.opacity = "0"; // Hide the vertical line (turn into minus)
        }
      } else {
        faqBody.style.maxHeight = "0"; // Smooth closing
        faqBody.addEventListener(
          "transitionend",
          () => {
            faqBody.classList.add("hidden");
          },
          { once: true }
        );

        if (plusLine) {
          plusLine.style.opacity = "1"; // Show the vertical line (back to plus)
        }
      }
    });
  });

  // Close accordion if clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideAccordion = Array.from(faqHeaders).some(
      (header) =>
        header.contains(event.target) ||
        header.nextElementSibling.contains(event.target)
    );

    if (!isClickInsideAccordion) {
      closeAllAccordions(); // Close all open accordions if clicking outside
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".btn-scroll-next")
    .addEventListener("click", function () {
      const scrollContainer = document.querySelector(".scroll-btns"); // Target your scrollable container

      // Scroll right by 300px (adjust this value as needed)
      scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
    });
});

// Navbar Funcs

///////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  initCatalogHover();
});

// Utils

///////////////////////////

// Toggling Password

// Add event listeners to toggle buttons when DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-password");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const passwordFieldId = button.getAttribute("data-input");
      const hiddenIconId = button.getAttribute("data-hidden-icon");
      const shownIconId = button.getAttribute("data-shown-icon");

      togglePassword(passwordFieldId, hiddenIconId, shownIconId);
    });
  });
});

// Range Slider
function initializeRangeSlider(
  minSliderId,
  maxSliderId,
  minCostInputId,
  maxCostInputId,
  sliderTrackId
) {
  const minSlider = document.getElementById(minSliderId);
  const maxSlider = document.getElementById(maxSliderId);
  const minCostInput = document.getElementById(minCostInputId);
  const maxCostInput = document.getElementById(maxCostInputId);
  const sliderTrack = document.getElementById(sliderTrackId);

  if (
    !minSlider ||
    !maxSlider ||
    !minCostInput ||
    !maxCostInput ||
    !sliderTrack
  ) {
    console.error(
      "One or more elements not found:",
      minSliderId,
      maxSliderId,
      minCostInputId,
      maxCostInputId,
      sliderTrackId
    );
    return;
  }

  function updateSlider() {
    let minValue = parseInt(minSlider.value);
    let maxValue = parseInt(maxSlider.value);

    if (this === minSlider && minValue >= maxValue) {
      minSlider.value = maxValue - 10;
      minValue = maxSlider.value - 10;
    }

    if (this === maxSlider && maxValue <= minValue) {
      maxSlider.value = minValue + 10;
      maxValue = minSlider.value + 10;
    }

    minCostInput.value = minValue;
    maxCostInput.value = maxValue;

    fillSlider();
  }

  function updateInput() {
    let minValue = parseInt(minCostInput.value);
    let maxValue = parseInt(maxCostInput.value);

    if (minValue >= maxValue) {
      minCostInput.value = maxValue - 10;
    }

    if (maxValue <= minValue) {
      maxCostInput.value = minValue + 10;
    }

    minSlider.value = minCostInput.value;
    maxSlider.value = maxCostInput.value;

    fillSlider();
  }

  function fillSlider() {
    const percent1 = (minSlider.value / minSlider.max) * 100;
    const percent2 = (maxSlider.value / maxSlider.max) * 100;
    sliderTrack.style.left = percent1 + "%";
    sliderTrack.style.width = percent2 - percent1 + "%";

    // Adjust z-index so the sliders work properly
    if (minSlider.value > maxSlider.value - 10) {
      minSlider.style.zIndex = 1;
      maxSlider.style.zIndex = 0;
    } else {
      minSlider.style.zIndex = 0;
      maxSlider.style.zIndex = 1;
    }
  }

  minSlider.addEventListener("input", updateSlider);
  maxSlider.addEventListener("input", updateSlider);
  minCostInput.addEventListener("input", updateInput);
  maxCostInput.addEventListener("input", updateInput);

  fillSlider();
}

// Example usage for both sliders
initializeRangeSlider(
  "min-slider",
  "max-slider",
  "min-cost",
  "max-cost",
  "slider-track"
);

initializeRangeSlider(
  "min-slider-2",
  "max-slider-2",
  "min-cost-2",
  "max-cost-2",
  "slider-track-2"
);

initializeRangeSlider(
  "min-slider-3",
  "max-slider-3",
  "min-cost-3",
  "max-cost-3",
  "slider-track-3"
);

initializeRangeSlider(
  "min-slider-4",
  "max-slider-4",
  "min-cost-4",
  "max-cost-4",
  "slider-track-4"
);

// Cabinet Calculator Search
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("calculator-search-input");
  const searchSuggestList = document.getElementById(
    "calculator-search-suggest"
  );
  const searchClear = document.getElementById("cabinet-search-clear");

  searchClear.addEventListener("click", function () {
    searchInput.value = "";
    searchSuggestList.classList.add("hidden");
    searchClear.classList.add("hidden");
  });

  searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() !== "") {
      searchSuggestList.classList.remove("hidden");
      searchClear.classList.remove("hidden");
    } else {
      searchSuggestList.classList.add("hidden");
      searchClear.classList.add("hidden");
    }
  });
});

// Buttons Slides
document.addEventListener("DOMContentLoaded", () => {
  // Select all button containers
  const buttonContainers = document.querySelectorAll(
    ".buttons-slide-container"
  );

  buttonContainers.forEach((container) => {
    // Find the scrollable container and the next button within the current container
    const scrollableContainer = container.querySelector(
      ".buttons-slide-srollable-container"
    );
    const nextButton = container.querySelector(".buttons-slide-next-button");

    // Add event listener to the next button
    nextButton.addEventListener("click", () => {
      // Scroll the container by a specific amount (e.g., 200px)
      scrollableContainer.scrollBy({
        left: 200, // Amount to scroll (can be adjusted)
        behavior: "smooth", // Smooth scrolling
      });
    });
  });
});

// Solution Details
document.addEventListener("DOMContentLoaded", function () {
  const solutionContainers = document.querySelectorAll(".solution-container");

  solutionContainers.forEach((container) => {
    const detailsButtons = container.querySelectorAll(
      ".solution-details-button"
    );
    const detailsDesktop = container.querySelector(".solution-details-desktop");
    const detailsMobile = container.querySelector(".solution-details-mobile");

    // Initially hide both details sections
    if (detailsDesktop) detailsDesktop.classList.add("hidden");
    if (detailsMobile) detailsMobile.classList.add("hidden");

    detailsButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Determine the correct details section to toggle
        const isDesktop = window.innerWidth >= 768;
        const detailsSection = isDesktop ? detailsDesktop : detailsMobile;

        if (detailsSection) {
          toggleDetails(button, detailsSection);
        }
      });
    });

    function toggleDetails(button, detailsSection) {
      detailsSection.classList.toggle("hidden");

      // Toggle button text and angle rotation
      const span = button.querySelector("span");
      const angleIcon = button.querySelector("svg");
      if (detailsSection.classList.contains("hidden")) {
        span.textContent = "Показать детали";
        angleIcon.classList.remove("rotate-180");
        angleIcon.classList.add("rotate-0");
      } else {
        span.textContent = "Скрыть детали";
        angleIcon.classList.remove("rotate-0");
        angleIcon.classList.add("rotate-180");
      }
    }
  });
});

// Filter Toggling
function toggleFilters() {
  const toggleButtons = document.querySelectorAll(".toggle-filter-btn");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filtersContainer = button.closest(".filter-container");
      const filters = filtersContainer.querySelector(".filter");

      filters.classList.toggle("hidden");
      document.body.classList.toggle("overflow-hidden");
    });
  });
}

// Call the function to apply the behavior
toggleFilters();
