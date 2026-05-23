let searchTheme = determineComputedTheme();
const ninjaKeys = document.querySelector("ninja-keys");

const squareSearchModal = () => {
  if (!ninjaKeys?.shadowRoot || ninjaKeys.shadowRoot.getElementById("square-search-modal")) return;

  const style = document.createElement("style");
  style.id = "square-search-modal";
  style.textContent = `
    .modal-content {
      border-radius: 0 !important;
    }
  `;
  ninjaKeys.shadowRoot.appendChild(style);
};

customElements.whenDefined("ninja-keys").then(() => {
  if (ninjaKeys.updateComplete) {
    ninjaKeys.updateComplete.then(squareSearchModal);
  } else {
    squareSearchModal();
  }
});

if (searchTheme === "dark") {
  ninjaKeys.classList.add("dark");
} else {
  ninjaKeys.classList.remove("dark");
}

const openSearchModal = () => {
  // collapse navbarNav if expanded on mobile
  const $navbarNav = $("#navbarNav");
  if ($navbarNav.hasClass("show")) {
    $navbarNav.collapse("hide");
  }
  squareSearchModal();
  ninjaKeys.open();
};
