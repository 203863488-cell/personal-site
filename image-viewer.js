const IMAGE_SELECTOR = ".project-gallery-image";
const VIEWER_ID = "project-image-viewer";
const COPY = {
  zh: {
    close: "关闭图片预览",
    dialog: "项目图片高清预览",
    image: "项目图片",
    loadError: "图片加载失败",
    loading: "正在加载高清原图…",
    next: "查看下一张图片",
    open: "查看高清原图",
    original: "查看原图",
    previous: "查看上一张图片",
  },
  en: {
    close: "Close image viewer",
    dialog: "Project image viewer",
    image: "Project image",
    loadError: "Image failed to load",
    loading: "Loading full-resolution image…",
    next: "View next image",
    open: "View full-resolution image",
    original: "Open original",
    previous: "View previous image",
  },
};

let viewer = null;
let activeIndex = -1;
let lastFocusedElement = null;
let touchStart = null;

function getCopy() {
  return document.documentElement.lang.toLowerCase().startsWith("en")
    ? COPY.en
    : COPY.zh;
}

function getGalleryImages() {
  return Array.from(document.querySelectorAll(IMAGE_SELECTOR));
}

function getFocusableElements() {
  if (!viewer) return [];

  return Array.from(
    viewer.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hidden);
}

function createViewer() {
  const copy = getCopy();
  const element = document.createElement("div");
  element.id = VIEWER_ID;
  element.className = "image-viewer";
  element.hidden = true;
  element.setAttribute("role", "dialog");
  element.setAttribute("aria-modal", "true");
  element.setAttribute("aria-label", copy.dialog);
  element.innerHTML = `
    <div class="image-viewer__toolbar">
      <span class="image-viewer__counter" aria-live="polite"></span>
      <div class="image-viewer__actions">
        <a
          class="image-viewer__original-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >${copy.original}</a>
        <button class="image-viewer__close" type="button" aria-label="${copy.close}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18"></path>
          </svg>
        </button>
      </div>
    </div>
    <button class="image-viewer__nav image-viewer__nav--previous" type="button" aria-label="${copy.previous}">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m15 18-6-6 6-6"></path>
      </svg>
    </button>
    <figure class="image-viewer__figure">
      <div class="image-viewer__stage">
        <div class="image-viewer__loading" role="status">${copy.loading}</div>
        <img class="image-viewer__image" alt="" draggable="false" />
      </div>
      <figcaption class="image-viewer__caption"></figcaption>
    </figure>
    <button class="image-viewer__nav image-viewer__nav--next" type="button" aria-label="${copy.next}">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </button>
  `;

  document.body.appendChild(element);

  element
    .querySelector(".image-viewer__close")
    .addEventListener("click", closeViewer);
  element
    .querySelector(".image-viewer__nav--previous")
    .addEventListener("click", () => showRelativeImage(-1));
  element
    .querySelector(".image-viewer__nav--next")
    .addEventListener("click", () => showRelativeImage(1));

  element.addEventListener("click", (event) => {
    if (event.target === element) {
      closeViewer();
    }
  });

  element.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) {
        touchStart = null;
        return;
      }

      const [touch] = event.touches;
      touchStart = { x: touch.clientX, y: touch.clientY };
    },
    { passive: true },
  );

  element.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart || event.changedTouches.length !== 1) return;

      const [touch] = event.changedTouches;
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      touchStart = null;

      // Only treat a clear horizontal gesture as navigation so vertical page
      // movement and pinch-to-zoom remain available on touch devices.
      if (Math.abs(deltaX) < 52 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) {
        return;
      }

      showRelativeImage(deltaX > 0 ? -1 : 1);
    },
    { passive: true },
  );

  return element;
}

function updateViewerCopy() {
  if (!viewer) return;

  const copy = getCopy();
  viewer.setAttribute("aria-label", copy.dialog);
  viewer.querySelector(".image-viewer__original-link").textContent =
    copy.original;
  viewer
    .querySelector(".image-viewer__close")
    .setAttribute("aria-label", copy.close);
  viewer
    .querySelector(".image-viewer__nav--previous")
    .setAttribute("aria-label", copy.previous);
  viewer
    .querySelector(".image-viewer__nav--next")
    .setAttribute("aria-label", copy.next);
  viewer.querySelector(".image-viewer__loading").textContent = copy.loading;
}

function setLoadingState(isLoading) {
  if (!viewer) return;

  viewer.classList.toggle("image-viewer--loading", isLoading);
}

function showImage(index) {
  const images = getGalleryImages();
  if (!images.length) {
    closeViewer();
    return;
  }

  activeIndex = (index + images.length) % images.length;
  const copy = getCopy();
  const sourceImage = images[activeIndex];
  const source = sourceImage.currentSrc || sourceImage.src;
  const title = sourceImage.alt || copy.image;
  const previewImage = viewer.querySelector(".image-viewer__image");
  const counter = viewer.querySelector(".image-viewer__counter");
  const caption = viewer.querySelector(".image-viewer__caption");
  const originalLink = viewer.querySelector(".image-viewer__original-link");
  const navigationButtons = viewer.querySelectorAll(".image-viewer__nav");

  setLoadingState(true);
  previewImage.alt = title;
  previewImage.removeAttribute("src");
  previewImage.onload = () => {
    setLoadingState(false);
    const dimensions =
      previewImage.naturalWidth && previewImage.naturalHeight
        ? ` · ${previewImage.naturalWidth} × ${previewImage.naturalHeight}`
        : "";
    caption.textContent = `${title}${dimensions}`;
  };
  previewImage.onerror = () => {
    setLoadingState(false);
    caption.textContent = `${title} · ${copy.loadError}`;
  };
  previewImage.src = source;

  counter.textContent = `${activeIndex + 1} / ${images.length}`;
  caption.textContent = title;
  originalLink.href = source;
  navigationButtons.forEach((button) => {
    button.hidden = images.length < 2;
  });
}

function openViewer(sourceImage) {
  const images = getGalleryImages();
  const index = images.indexOf(sourceImage);
  if (index < 0) return;

  viewer ??= createViewer();
  updateViewerCopy();
  lastFocusedElement = document.activeElement;
  viewer.hidden = false;
  document.body.classList.add("image-viewer-open");
  showImage(index);
  viewer.querySelector(".image-viewer__close").focus({ preventScroll: true });
}

function closeViewer() {
  if (!viewer || viewer.hidden) return;

  viewer.hidden = true;
  document.body.classList.remove("image-viewer-open");
  activeIndex = -1;

  if (lastFocusedElement instanceof HTMLElement && lastFocusedElement.isConnected) {
    lastFocusedElement.focus({ preventScroll: true });
  }
  lastFocusedElement = null;
}

function showRelativeImage(offset) {
  if (!viewer || viewer.hidden || activeIndex < 0) return;
  showImage(activeIndex + offset);
}

function enhanceImage(image) {
  if (!(image instanceof HTMLImageElement) || !image.matches(IMAGE_SELECTOR)) {
    return;
  }

  const trigger = image.parentElement;
  if (!trigger) return;

  trigger.classList.add("project-gallery-trigger");
  trigger.setAttribute("role", "button");
  trigger.setAttribute("tabindex", "0");
  const copy = getCopy();
  trigger.setAttribute(
    "aria-label",
    `${copy.open}: ${image.alt || copy.image}`,
  );
}

function enhanceGallery(root = document) {
  if (root instanceof Element && root.matches(IMAGE_SELECTOR)) {
    enhanceImage(root);
  }

  root.querySelectorAll?.(IMAGE_SELECTOR).forEach(enhanceImage);
}

document.addEventListener("click", (event) => {
  const image = event.target.closest?.(IMAGE_SELECTOR);
  if (image) {
    openViewer(image);
  }
});

document.addEventListener("keydown", (event) => {
  const trigger = event.target.closest?.(".project-gallery-trigger");
  if (trigger && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    const image = trigger.querySelector(IMAGE_SELECTOR);
    if (image) openViewer(image);
    return;
  }

  if (!viewer || viewer.hidden) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeViewer();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    showRelativeImage(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    showRelativeImage(1);
  } else if (event.key === "Tab") {
    const focusableElements = getFocusableElements();
    if (!focusableElements.length) return;

    const first = focusableElements[0];
    const last = focusableElements.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

window.addEventListener("hashchange", closeViewer);

enhanceGallery();

new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes") {
      enhanceImage(mutation.target);
      continue;
    }

    mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) enhanceGallery(node);
    });
  }
}).observe(document.body, {
  attributes: true,
  attributeFilter: ["alt", "src"],
  childList: true,
  subtree: true,
});

new MutationObserver(() => {
  updateViewerCopy();
  enhanceGallery();
}).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"],
});
