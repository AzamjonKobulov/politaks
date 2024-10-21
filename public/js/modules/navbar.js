export default function initCatalogHover() {
  // Select all catalog items and content sections
  const catalogItems = document.querySelectorAll(".catalog-item");
  const catalogContentItems = document.querySelectorAll(".catalog-content");
  const catalogItemsDiv = document.querySelector(".catalog-items"); // Assume this is the container

  let activeItem = null; // To keep track of the currently hovered item 

  // Hide all content sections initially
  catalogContentItems.forEach((content, index) => {
    if (index === 0) {
      content.classList.remove("hidden"); // Show the first content section
    } else {
      content.classList.add("hidden"); // Hide the others
    }
  });

  // Function to handle hover over catalog items
  function handleItemHover() {
    // If there is an active item, remove the active class from it
    if (activeItem) {
      activeItem.classList.remove("active");
    }

    // Hide all content sections
    catalogContentItems.forEach((content) => content.classList.add("hidden"));

    // Get the target from the hovered item
    const targetId = this.getAttribute("data-target");

    // Show the corresponding content section
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.remove("hidden");
    }

    // Set the current item as active
    activeItem = this;
    activeItem.classList.add("active"); // Add an active class to keep the hover effect
  }

  // Function to handle leaving a catalog item
  function handleItemMouseLeave() {
    // Only hide the content if the mouse is not over the content
    if (!catalogContentItems.some((content) => content.matches(":hover"))) {
      catalogContentItems.forEach((content) => content.classList.add("hidden"));
      if (activeItem) {
        activeItem.classList.remove("active"); // Remove the active class
        activeItem = null; // Reset the active item
      }
    }
  }

  // Function to handle leaving the catalog items div
  function handleCatalogItemsMouseLeave() {
    // If an item is currently active, do not hide content when leaving the catalog-items div
    if (activeItem) {
      catalogContentItems.forEach((content) =>
        content.classList.remove("hidden")
      );
    }
  }

  // Add hover event listeners to catalog items
  catalogItems.forEach((item) => {
    item.addEventListener("mouseover", handleItemHover);
    item.addEventListener("mouseleave", handleItemMouseLeave);
  });

  // Add hover event listener to catalog items div
  if (catalogItemsDiv) {
    catalogItemsDiv.addEventListener("mouseover", handleCatalogItemsMouseLeave);
  }

  // Add hover event listeners to catalog content sections
  catalogContentItems.forEach((content) => {
    content.addEventListener("mouseover", () => {
      if (activeItem) {
        activeItem.classList.add("active"); // Keep the active class on the current item
      }
    });
    content.addEventListener("mouseleave", () => {
      if (!catalogItems.some((item) => item.matches(":hover"))) {
        content.classList.add("hidden"); // Hide content if not hovering over any catalog items
        if (activeItem) {
          activeItem.classList.remove("active"); // Remove the active class
          activeItem = null; // Reset the active item
        }
      }
    });
  });
}
