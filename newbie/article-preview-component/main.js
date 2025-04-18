// Cache DOM elements
const button = document.getElementById("share-button");
const article = document.getElementById("article-info");
const writerBlock = document.getElementById("writer-info");

// Create DOM elements once
const createShareElements = () => {
  const fragment = new DocumentFragment();

  const shareDiv = document.createElement("div");
  shareDiv.className = "share-info";
  shareDiv.setAttribute("aria-live", "polite");

  const p = document.createElement("p");
  p.className = "share-text";
  p.textContent = "Share";

  const imgContainer = document.createElement("div");
  imgContainer.className = "logos";

  ["facebook", "twitter", "pinterest"].forEach((platform) => {
    const img = document.createElement("img");
    img.src = `images/icon-${platform}.svg`;
    img.alt = `Share on ${platform}`;
    imgContainer.appendChild(img);
  });

  shareDiv.append(p, imgContainer);
  fragment.appendChild(shareDiv);

  return { shareDiv, fragment };
};

const { shareDiv } = createShareElements();
let isShareVisible = false;

const isMobile = window.innerWidth < 768;

// Single source of truth for positioning
const positionShareDiv = () => {
  if (isMobile) {
    writerBlock.classList.toggle("active-mobile", isShareVisible);
    writerBlock.prepend(shareDiv);
  } else {
    article.classList.toggle("active-tablet", isShareVisible);
    article.prepend(shareDiv);
  }
};

button.addEventListener("click", (e) => {
  isShareVisible = !isShareVisible;

  // Update button state for accessibility
  button.setAttribute("aria-expanded", isShareVisible);

  if (isShareVisible) {
    positionShareDiv();
  } else {
    shareDiv.remove();
    writerBlock.classList.remove("active-mobile");
    article.classList.remove("artive-tablet");
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  if (isShareVisible) {
    positionShareDiv();
  }
});
