(function () {
  const config = window.LOVE_STORY || {};
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerFineQuery = window.matchMedia("(pointer: fine)");
  const compactQuery = window.matchMedia("(max-width: 560px)");
  const reducedMotion = reduceMotionQuery.matches;

  const photoItems = Array.isArray(config.photos) ? config.photos : [];
  const timelineItems = Array.isArray(config.timeline) ? config.timeline : [];
  const fallbackCaptions = [
    ["所有偶然", "都是命中注定的必然"],
    ["每一次靠近", "都把世界变得更温柔"],
    ["把时间绕成环", "最后还是回到你身边"],
  ];
  const captions = normalizeCaptions(config.captions);

  const fallbackCharacter = {
    name: "Hello Kitty",
    color: "#ff3b6e",
    accent: "#ffffff",
    glow: "#ff85a2",
    symbol: "❀",
    particles: ["❀", "♥", "✿", "♡", "✧"],
  };
  const charConfig = config.characters && typeof config.characters === "object" ? config.characters : {};
  const characterKeys = Object.keys(charConfig);
  const initialCharacter = charConfig[config.defaultCharacter]
    ? config.defaultCharacter
    : characterKeys[0] || "kitty";

  let activeChar = initialCharacter;
  let orbitPaused = false;
  let orbitFrozenElapsed = 0;
  let orbitRealElapsed = 0;
  let charParticleCleanups = [];

  const cleanups = [];

  function isCompactViewport() {
    return compactQuery.matches;
  }

  function allowPointerEffects() {
    return !reducedMotion && pointerFineQuery.matches;
  }

  function addCleanup(fn) {
    cleanups.push(fn);
    return fn;
  }

  function cleanupAll() {
    charParticleCleanups.forEach((cleanup) => {
      try {
        cleanup();
      } catch (_) {}
    });
    charParticleCleanups = [];

    while (cleanups.length) {
      const cleanup = cleanups.pop();
      try {
        cleanup();
      } catch (_) {}
    }
  }

  function safeText(value, fallback) {
    return typeof value === "string" && value.trim() ? value : fallback;
  }

  function normalizeCaptions(value) {
    if (!Array.isArray(value)) {
      return fallbackCaptions;
    }

    const normalized = value
      .filter((item) => Array.isArray(item) && item.length >= 2)
      .map((item) => [safeText(item[0], ""), safeText(item[1], "")])
      .filter((item) => item[0] || item[1]);

    return normalized.length ? normalized : fallbackCaptions;
  }

  function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text !== undefined && text !== null) {
      element.textContent = text;
    }
    return element;
  }

  function setCaptionText(container, captionPair) {
    if (!container) {
      return;
    }

    const firstLine = safeText(captionPair && captionPair[0], "");
    const secondLine = safeText(captionPair && captionPair[1], "");
    container.replaceChildren(
      createTextElement("span", "", firstLine),
      createTextElement("strong", "", secondLine)
    );
  }

  function createImage(src, alt) {
    if (!src) {
      return null;
    }

    const image = document.createElement("img");
    image.src = src;
    image.alt = alt || "";
    image.loading = "lazy";
    image.decoding = "async";
    return image;
  }

  function photoLabel(index, title) {
    const number = String(index + 1).padStart(2, "0");
    return safeText(title, `照片 ${number}`) + " 待添加";
  }

  function applyPhoto(container, item, label) {
    const fallbackLabel = safeText(label, "照片待添加");
    container.dataset.label = fallbackLabel;
    container.classList.add("is-empty");

    const image = createImage(item && item.src, item && item.title);
    if (!image) {
      return;
    }

    if (container.classList.contains("memory-image")) {
      container.style.setProperty("--memory-photo", `url("${item.src}")`);
    }

    image.addEventListener("load", () => {
      container.classList.remove("is-empty");
    });
    image.addEventListener("error", () => {
      image.remove();
      container.style.removeProperty("--memory-photo");
      container.dataset.label = fallbackLabel;
      container.classList.add("is-empty");
    });

    container.appendChild(image);
  }

  function buildHeroStack() {
    const stack = document.getElementById("heroStack");
    if (!stack) {
      return;
    }

    [photoItems[0], photoItems[1], photoItems[2]].forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "stack-card is-empty";
      applyPhoto(card, item, photoLabel(index, item && item.title));
      stack.appendChild(card);
    });
  }

  function buildTimeline() {
    const list = document.getElementById("timelineList");
    if (!list) {
      return;
    }

    if (!timelineItems.length) {
      const empty = document.createElement("article");
      empty.className = "memory-card memory-empty reveal";
      const body = createTextElement("div", "memory-body");
      body.append(
        createTextElement("span", "memory-index", "00"),
        createTextElement("p", "memory-date", "等待记录"),
        createTextElement("h3", "", "这里还没有时间线"),
        createTextElement("p", "", "在 content.js 里添加你们的故事后，这里会自动生成纪念卡片。")
      );
      empty.appendChild(body);
      list.appendChild(empty);
      return;
    }

    timelineItems.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "memory-card reveal";

      const imageWrap = document.createElement("div");
      imageWrap.className = "memory-image is-empty";
      const photo = item.photo || photoItems[index];
      applyPhoto(imageWrap, photo, photoLabel(index, photo && photo.title));

      const body = createTextElement("div", "memory-body");
      body.append(
        createTextElement("span", "memory-index", String(index + 1).padStart(2, "0")),
        createTextElement("p", "memory-date", safeText(item.date, "某个值得记住的日子")),
        createTextElement("h3", "", safeText(item.title, "关于你的一个瞬间")),
        createTextElement("p", "", safeText(item.text, "这里留给你们真实的故事。"))
      );

      article.append(imageWrap, body);
      list.appendChild(article);
    });
  }

  function revealOnScroll() {
    const items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window) || reducedMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));
    addCleanup(() => observer.disconnect());
  }

  function setupParticleCanvas(canvas, options) {
    if (!canvas) {
      return null;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    const particles = [];
    const symbols = ["·", "✦", "♡", "♥", "✧", "·", "♡", "✦", "·", "♥"];
    const colors = options.colors || ["rgba(255,255,255,0.72)"];
    const maxDist = options.maxDist || 130;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let mouseX = -999;
    let mouseY = -999;

    function handleMouseMove(event) {
      if (!allowPointerEffects()) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    }

    function resetMouse() {
      mouseX = -999;
      mouseY = -999;
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;

      const density = isCompactViewport() ? (options.density || 16000) * 1.8 : options.density || 16000;
      const maxParticles = isCompactViewport() ? 42 : options.maxParticles || 90;
      const count = reducedMotion
        ? Math.min(18, maxParticles)
        : Math.min(maxParticles, Math.max(22, Math.floor((width * height) / density)));

      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.8 + Math.random() * 2.8,
          speed: 0.12 + Math.random() * 0.42,
          drift: -0.18 + Math.random() * 0.36,
          alpha: 0.22 + Math.random() * 0.74,
          symbol: symbols[index % symbols.length],
          color: colors[index % colors.length],
        });
      }
    }

    function renderFrame(advance) {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            context.globalAlpha = (1 - dist / maxDist) * 0.22;
            context.strokeStyle = particles[i].color;
            context.lineWidth = 0.5;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;

        if (particle.symbol === "·") {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fill();
        } else {
          context.font = `${particle.size * 6}px Microsoft YaHei, Arial`;
          context.fillText(particle.symbol, particle.x, particle.y);
        }

        if (advance) {
          if (mouseX > -100 && mouseY > -100) {
            const gx = mouseX - particle.x;
            const gy = mouseY - particle.y;
            const gdist = Math.sqrt(gx * gx + gy * gy);
            if (gdist < 160 && gdist > 1) {
              const force = 0.03;
              particle.x += (((gx / gdist) * force * (160 - gdist)) / 160);
              particle.y += (((gy / gdist) * force * (160 - gdist)) / 160);
            }
          }

          particle.y -= particle.speed;
          particle.x += particle.drift;
          if (particle.y < -24) {
            particle.y = height + 24;
            particle.x = Math.random() * width;
          }
          if (particle.x < -24) {
            particle.x = width + 24;
          } else if (particle.x > width + 24) {
            particle.x = -24;
          }
        }
      });

      context.globalAlpha = 1;
    }

    function start() {
      if (animationFrame || reducedMotion) {
        return;
      }
      animationFrame = window.requestAnimationFrame(draw);
    }

    function stop() {
      if (!animationFrame) {
        return;
      }
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function draw() {
      animationFrame = 0;
      if (!document.hidden) {
        renderFrame(true);
      }
      start();
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", resetMouse);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resize();
    renderFrame(false);
    start();

    return () => {
      stop();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", resetMouse);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }

  function buildOrbitScene() {
    const scene = document.getElementById("orbitScene");
    const stage = document.getElementById("orbitStage");
    const caption = document.getElementById("orbitCaption");
    if (!scene || !stage) {
      return;
    }

    const count = isCompactViewport()
      ? Math.max(12, photoItems.length || 12)
      : Math.max(18, photoItems.length * 2 || 18);
    const cards = [];

    for (let index = 0; index < count; index += 1) {
      const item = photoItems[index % Math.max(photoItems.length, 1)];
      const card = document.createElement("figure");
      card.className = "orbit-card is-empty";
      applyPhoto(card, item, photoLabel(index, item && item.title));

      const label = createTextElement(
        "figcaption",
        "orbit-card-label",
        safeText(item && item.title, `记忆 ${String(index + 1).padStart(2, "0")}`)
      );
      card.appendChild(label);

      scene.appendChild(card);
      cards.push(card);
    }

    let captionIndex = 0;
    let animationFrame = 0;
    setCaptionText(caption, captions[0]);

    function updateCaption(time) {
      if (!caption) {
        return;
      }

      const next = Math.floor(time / 4200) % captions.length;
      if (next !== captionIndex) {
        captionIndex = next;
        setCaptionText(caption, captions[next]);
      }
    }

    function positionCards(elapsed) {
      const rect = stage.getBoundingClientRect();
      const radiusX = Math.min(rect.width * 0.42, 450);
      const radiusY = Math.min(rect.height * 0.2, 150);
      const centerLift = rect.width < 560 ? 12 : 0;

      cards.forEach((card, index) => {
        const turn = (index / cards.length) * Math.PI * 2 + elapsed * 0.26;
        const x = Math.sin(turn) * radiusX;
        const y = Math.sin(turn * 2) * radiusY + centerLift;
        const depth = Math.cos(turn);
        const scale = 0.7 + (depth + 1) * 0.17;
        const rotateY = -Math.sin(turn) * 42;
        const rotateZ = Math.sin(turn * 2) * 6;
        const opacity = 0.28 + (depth + 1) * 0.32;
        const blur = depth < -0.55 ? 1.8 : 0;

        card.style.zIndex = String(Math.round((depth + 1) * 100));
        card.style.opacity = String(opacity);
        card.style.filter = `saturate(${0.82 + (depth + 1) * 0.16}) blur(${blur}px)`;
        card.style.transform = `
          translate(-50%, -50%)
          translate3d(${x}px, ${y}px, ${depth * 180}px)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
          scale(${scale})
        `;
      });
    }

    function start() {
      if (animationFrame || reducedMotion) {
        return;
      }
      animationFrame = window.requestAnimationFrame(animate);
    }

    function stop() {
      if (!animationFrame) {
        return;
      }
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function animate(time) {
      animationFrame = 0;
      if (!document.hidden) {
        orbitRealElapsed = time / 1000;
        const animElapsed = orbitPaused ? orbitFrozenElapsed : orbitRealElapsed;
        if (!orbitPaused) {
          orbitFrozenElapsed = orbitRealElapsed;
        }
        positionCards(animElapsed);
        updateCaption(animElapsed * 1000);
      }
      start();
    }

    function handleResize() {
      positionCards(orbitFrozenElapsed);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    }

    positionCards(0);
    window.addEventListener("resize", handleResize);

    if (!reducedMotion) {
      start();
      document.addEventListener("visibilitychange", handleVisibilityChange);
      addCleanup(() => {
        stop();
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      });
    } else {
      addCleanup(() => window.removeEventListener("resize", handleResize));
    }
  }

  function setupHeartTrail() {
    if (!allowPointerEffects()) {
      return;
    }

    const hearts = ["♥", "♡", "❤", "✦", "♡"];
    let lastTrail = 0;
    const throttle = isCompactViewport() ? 140 : 85;

    document.addEventListener("mousemove", (event) => {
      const now = Date.now();
      if (now - lastTrail < throttle || document.hidden) {
        return;
      }
      lastTrail = now;
      const el = createTextElement("span", "heart-trail", hearts[Math.floor(Math.random() * hearts.length)]);
      el.style.left = event.clientX + "px";
      el.style.top = event.clientY + "px";
      el.style.color = ["#ff6f91", "#f1c66b", "#63d7cc", "#ff9eb5"][Math.floor(Math.random() * 4)];
      el.style.setProperty("--dx", (Math.random() - 0.5) * 60 + "px");
      el.style.setProperty("--dy", -(20 + Math.random() * 50) + "px");
      el.style.setProperty("--rot", (Math.random() - 0.5) * 80 + "deg");
      el.style.fontSize = (12 + Math.random() * 14) + "px";
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }, { passive: true });
  }

  function setupClickBurst() {
    if (reducedMotion) {
      return;
    }

    const hearts = ["♥", "❤", "♡", "✦", "✧", "♡"];
    document.addEventListener("click", (event) => {
      if (
        document.hidden ||
        event.target.closest(".char-switcher") ||
        event.target.closest(".secret-overlay") ||
        event.target.closest(".brand")
      ) {
        return;
      }

      const count = isCompactViewport() ? 6 : 8 + Math.floor(Math.random() * 8);
      for (let i = 0; i < count; i += 1) {
        const el = createTextElement("span", "heart-burst", hearts[Math.floor(Math.random() * hearts.length)]);
        el.style.left = event.clientX + "px";
        el.style.top = event.clientY + "px";
        el.style.color = ["#ff6f91", "#f1c66b", "#63d7cc", "#ff6f91"][Math.floor(Math.random() * 4)];
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const dist = 40 + Math.random() * 70;
        el.style.setProperty("--bx", Math.cos(angle) * dist + "px");
        el.style.setProperty("--by", Math.sin(angle) * dist + "px");
        el.style.fontSize = (14 + Math.random() * 16) + "px";
        document.body.appendChild(el);
        el.addEventListener("animationend", () => el.remove());
      }
    });
  }

  function setupDayCounter() {
    const stats = document.querySelector(".hero-stats");
    if (!stats) {
      return;
    }

    const days = Number(config.togetherDays);
    if (!Number.isInteger(days) || days < 0) {
      return;
    }

    const span = createTextElement("span", "day-counter");
    const number = createTextElement("span", "day-num", String(days));
    span.append("在一起 ", number, " 天");
    stats.appendChild(span);
  }

  function setupSecretMessage() {
    const brand = document.querySelector(".brand");
    if (!brand) {
      return;
    }

    let clicks = 0;
    let timer = null;
    const secretClickWindow = 30000;
    brand.style.cursor = "pointer";
    addCleanup(() => {
      if (timer) {
        clearTimeout(timer);
      }
    });

    brand.addEventListener("click", (event) => {
      clicks += 1;
      if (timer) {
        clearTimeout(timer);
      }

      if (clicks >= 5) {
        event.preventDefault();
        clicks = 0;
        showSecretModal();
        return;
      }

      if (!event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth",
          });
        });
      }

      timer = setTimeout(() => {
        clicks = 0;
      }, secretClickWindow);
    });

    function showSecretModal() {
      const existing = document.querySelector(".secret-overlay");
      if (existing) {
        existing.classList.add("is-open");
        const closeButton = existing.querySelector(".secret-close");
        if (closeButton) {
          closeButton.focus();
        }
        return;
      }

      const msg = config.secretMessage || {};
      const overlay = document.createElement("div");
      overlay.className = "secret-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");

      const modal = document.createElement("div");
      modal.className = "secret-modal";
      const title = createTextElement("h3", "", safeText(msg.title, "✨"));
      const body = createTextElement("p", "", safeText(msg.body, "你是我最美好的意外。"));
      const closeButton = createTextElement("button", "secret-close", safeText(msg.closeLabel, "藏进心里"));
      closeButton.type = "button";
      modal.append(title, body, closeButton);
      overlay.appendChild(modal);

      function close() {
        overlay.classList.remove("is-open");
        document.removeEventListener("keydown", handleKeyDown);
        setTimeout(() => overlay.remove(), 500);
      }

      function handleKeyDown(event) {
        if (event.key === "Escape") {
          close();
        }
      }

      overlay.addEventListener("click", (event) => {
        if (event.target === overlay || event.target.classList.contains("secret-close")) {
          close();
        }
      });
      document.addEventListener("keydown", handleKeyDown);

      document.body.appendChild(overlay);
      requestAnimationFrame(() => {
        overlay.classList.add("is-open");
        closeButton.focus();
      });
    }
  }

  function setupPageLoader() {
    const loader = document.createElement("div");
    loader.className = "page-loader";
    const heart = document.createElement("div");
    heart.className = `loader-heart theme-${activeChar}`;
    loader.appendChild(heart);
    document.body.insertBefore(loader, document.body.firstChild);

    let hidden = false;
    const hide = () => {
      if (hidden) {
        return;
      }
      hidden = true;
      loader.classList.add("is-hidden");
      setTimeout(() => loader.remove(), 600);
    };

    if (document.readyState === "complete") {
      setTimeout(hide, 300);
    } else {
      window.addEventListener("load", () => setTimeout(hide, 300), { once: true });
    }
    setTimeout(hide, 2200);
  }

  function setupOrbitHoverPause() {
    const stage = document.getElementById("orbitStage");
    if (!stage) {
      return;
    }

    stage.addEventListener("mouseenter", () => {
      orbitPaused = true;
    });
    stage.addEventListener("mouseleave", () => {
      orbitPaused = false;
    });
  }

  function getActiveChar() {
    const current = charConfig[activeChar] || {};
    const particles = Array.isArray(current.particles) && current.particles.length
      ? current.particles
      : fallbackCharacter.particles;

    return {
      ...fallbackCharacter,
      ...current,
      particles,
    };
  }

  function setupCharSwitcher() {
    if (!characterKeys.length) {
      return;
    }

    const bar = document.createElement("nav");
    bar.className = "char-switcher";
    bar.setAttribute("aria-label", "角色主题切换");

    characterKeys.forEach((key) => {
      const ch = { ...fallbackCharacter, ...charConfig[key] };
      const btn = createTextElement("button", "char-btn" + (key === activeChar ? " is-active" : ""), ch.symbol);
      btn.type = "button";
      btn.setAttribute("data-char", key);
      btn.setAttribute("data-name", ch.name);
      btn.setAttribute("aria-label", ch.name);
      btn.setAttribute("aria-pressed", String(key === activeChar));
      btn.setAttribute("title", ch.name);
      btn.addEventListener("click", () => switchTheme(key));
      bar.appendChild(btn);
    });

    document.body.appendChild(bar);
  }

  function switchTheme(key) {
    if (!charConfig[key] || activeChar === key) {
      return;
    }

    activeChar = key;
    const ch = getActiveChar();

    document.querySelectorAll(".char-btn").forEach((button) => {
      const isActive = button.getAttribute("data-char") === key;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    characterKeys.forEach((characterKey) => {
      document.body.classList.remove("theme-" + characterKey);
    });
    document.body.classList.add("theme-" + key);
    updateCharCorner();
    rebuildCharParticles();
    spawnCharSticker(ch.symbol + ch.symbol);
  }

  function updateCharCorner() {
    const corner = document.querySelector(".char-corner");
    if (!corner) {
      return;
    }

    const ch = getActiveChar();
    const icon = corner.querySelector(".char-icon");
    const name = corner.querySelector(".char-name");
    if (icon) {
      icon.textContent = ch.symbol;
    }
    if (name) {
      name.textContent = ch.name + " 陪伴中";
    }
  }

  function setupCharCorner() {
    const ch = getActiveChar();
    const corner = document.createElement("div");
    corner.className = "char-corner";
    corner.append(
      createTextElement("span", "char-icon", ch.symbol),
      createTextElement("span", "char-name", ch.name + " 陪伴中")
    );
    document.body.appendChild(corner);
  }

  function rebuildCharParticles() {
    charParticleCleanups.forEach((cleanup) => {
      try {
        cleanup();
      } catch (_) {}
    });
    charParticleCleanups = [];

    const ch = getActiveChar();
    const heroColors = [
      hexToRgba(ch.color, 0.66),
      hexToRgba(ch.glow, 0.56),
      hexToRgba(ch.accent, 0.55),
      "rgba(255,255,255,0.6)",
    ];
    const orbitColors = [
      hexToRgba(ch.color, 0.72),
      hexToRgba(ch.glow, 0.62),
      hexToRgba(ch.accent, 0.64),
      "rgba(255,255,255,0.64)",
    ];

    const heroCanvas = document.getElementById("heroCanvas");
    const orbitCanvas = document.getElementById("orbitCanvas");
    if (heroCanvas) {
      const cleanup = setupParticleCanvas(heroCanvas, { density: 14500, colors: heroColors, maxParticles: 78 });
      if (cleanup) {
        charParticleCleanups.push(cleanup);
      }
    }
    if (orbitCanvas) {
      const cleanup = setupParticleCanvas(orbitCanvas, { density: 9000, colors: orbitColors, maxParticles: 86 });
      if (cleanup) {
        charParticleCleanups.push(cleanup);
      }
    }
  }

  function hexToRgba(hex, alpha) {
    if (typeof hex !== "string" || !/^#[\da-f]{6}$/i.test(hex)) {
      return `rgba(255,255,255,${alpha})`;
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function setupCharFloats() {
    if (reducedMotion) {
      return;
    }

    function spawnFloat() {
      if (document.hidden) {
        return;
      }

      const ch = getActiveChar();
      const symbols = ch.particles;
      const el = createTextElement("span", "char-float", symbols[Math.floor(Math.random() * symbols.length)]);
      el.style.left = (8 + Math.random() * 84) + "%";
      el.style.bottom = "-40px";
      el.style.color = ch.color;
      el.style.setProperty("--drift", ((Math.random() - 0.5) * 80) + "px");
      el.style.setProperty("--spin", ((Math.random() - 0.5) * 120) + "deg");
      el.style.animationDuration = (4 + Math.random() * 5) + "s";
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }

    const interval = setInterval(spawnFloat, isCompactViewport() ? 3200 : 2400);
    addCleanup(() => clearInterval(interval));
    spawnFloat();
  }

  function spawnCharSticker(text) {
    if (reducedMotion || document.hidden) {
      return;
    }

    const el = createTextElement("span", "char-sticker", text || getActiveChar().symbol);
    el.style.left = (30 + Math.random() * 40) + "%";
    el.style.top = (20 + Math.random() * 50) + "%";
    el.style.color = getActiveChar().color;
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }

  function setupCharDoubleClick() {
    if (reducedMotion) {
      return;
    }

    document.addEventListener("dblclick", (event) => {
      if (document.hidden || event.target.closest(".brand")) {
        return;
      }

      const ch = getActiveChar();
      const symbols = ch.particles;
      const count = isCompactViewport() ? 3 : 5;
      for (let i = 0; i < count; i += 1) {
        setTimeout(() => {
          const el = createTextElement("span", "char-sticker", symbols[Math.floor(Math.random() * symbols.length)]);
          el.style.left = event.clientX + "px";
          el.style.top = event.clientY + "px";
          el.style.color = ch.color;
          el.style.fontSize = (20 + Math.random() * 30) + "px";
          document.body.appendChild(el);
          el.addEventListener("animationend", () => el.remove());
        }, i * 80);
      }
    });
  }

  function setupAurora() {
    if (reducedMotion) {
      return;
    }

    const layer = document.createElement("div");
    layer.className = "aurora-layer";
    layer.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 4; i += 1) {
      const blob = document.createElement("div");
      blob.className = "aurora-blob";
      layer.appendChild(blob);
    }
    document.body.appendChild(layer);
  }

  function setupShootingStars() {
    if (reducedMotion) {
      return;
    }

    let timeout = null;

    function spawnMeteor() {
      if (document.hidden) {
        return;
      }

      const star = document.createElement("div");
      star.className = "shooting-star";
      star.style.left = (10 + Math.random() * 80) + "%";
      star.style.top = -(Math.random() * 30) + "%";
      document.body.appendChild(star);
      star.addEventListener("animationend", () => star.remove());
    }

    function scheduleNext() {
      timeout = setTimeout(() => {
        spawnMeteor();
        scheduleNext();
      }, 5000 + Math.random() * 10000);
    }

    timeout = setTimeout(scheduleNext, 2200 + Math.random() * 4500);
    addCleanup(() => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
  }

  function setupScrollProgress() {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    let ticking = false;
    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      bar.style.width = pct + "%";
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    addCleanup(() => window.removeEventListener("scroll", onScroll));
    update();
  }

  function setupClickRipple() {
    if (reducedMotion) {
      return;
    }

    document.addEventListener("click", (event) => {
      if (
        document.hidden ||
        event.target.closest(".char-switcher") ||
        event.target.closest(".secret-overlay") ||
        event.target.closest(".brand")
      ) {
        return;
      }

      const ripple = document.createElement("div");
      ripple.className = "click-ripple";
      ripple.style.left = event.clientX + "px";
      ripple.style.top = event.clientY + "px";
      ripple.style.color = getActiveChar().color;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  }

  function setupSparkles() {
    if (reducedMotion) {
      return;
    }

    function spawnSparkle() {
      if (document.hidden) {
        return;
      }

      const dot = document.createElement("div");
      dot.className = "sparkle-dot";
      dot.style.left = (5 + Math.random() * 90) + "%";
      dot.style.top = (5 + Math.random() * 90) + "%";
      dot.style.color = ["#ff6f91", "#f1c66b", "#63d7cc", "#ffffff", "#ffb3c6"][Math.floor(Math.random() * 5)];
      dot.style.animationDuration = (1.2 + Math.random() * 2.2) + "s";
      document.body.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove());
    }

    const interval = setInterval(spawnSparkle, isCompactViewport() ? 1500 : 950);
    addCleanup(() => clearInterval(interval));
    spawnSparkle();
  }

  function setupRainbowTrail() {
    if (!allowPointerEffects()) {
      return;
    }

    const rainbowColors = ["#ff6b6b", "#ff9f43", "#feca57", "#54a0ff", "#5f27cd", "#ff6f91", "#00d2d3", "#f368e0"];
    let lastDot = 0;
    document.addEventListener("mousemove", (event) => {
      const now = Date.now();
      if (now - lastDot < 95 || document.hidden) {
        return;
      }
      lastDot = now;
      const dot = document.createElement("div");
      dot.className = "rainbow-trail";
      dot.style.left = event.clientX + "px";
      dot.style.top = event.clientY + "px";
      dot.style.color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
      dot.style.setProperty("--rdx", ((Math.random() - 0.5) * 40) + "px");
      dot.style.setProperty("--rdy", ((Math.random() - 0.5) * 40) + "px");
      dot.style.animationDuration = (0.6 + Math.random() * 0.8) + "s";
      document.body.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove());
    }, { passive: true });
  }

  function setupMeteorShower() {
    const brand = document.querySelector(".brand");
    if (!brand || reducedMotion) {
      return;
    }

    let meteorInterval = null;
    brand.addEventListener("dblclick", (event) => {
      event.preventDefault();

      if (meteorInterval) {
        clearInterval(meteorInterval);
        meteorInterval = null;
        return;
      }

      function fireMeteor() {
        if (document.hidden) {
          return;
        }

        const star = document.createElement("div");
        star.className = "shooting-star";
        star.style.left = (10 + Math.random() * 80) + "%";
        star.style.top = -(Math.random() * 20) + "%";
        star.style.animationDuration = (0.8 + Math.random() * 0.8) + "s";
        document.body.appendChild(star);
        star.addEventListener("animationend", () => star.remove());
      }

      for (let i = 0; i < 6; i += 1) {
        setTimeout(fireMeteor, i * 150);
      }
      meteorInterval = setInterval(fireMeteor, 600);
      setTimeout(() => {
        if (meteorInterval) {
          clearInterval(meteorInterval);
          meteorInterval = null;
        }
      }, 8000);
    });

    addCleanup(() => {
      if (meteorInterval) {
        clearInterval(meteorInterval);
      }
    });
  }

  function init() {
    document.body.classList.add("theme-" + activeChar);
    setupPageLoader();
    buildHeroStack();
    buildTimeline();
    revealOnScroll();
    rebuildCharParticles();
    buildOrbitScene();
    setupHeartTrail();
    setupClickBurst();
    setupDayCounter();
    setupSecretMessage();
    setupOrbitHoverPause();
    setupCharSwitcher();
    setupCharCorner();
    setupCharFloats();
    setupCharDoubleClick();
    setupAurora();
    setupShootingStars();
    setupScrollProgress();
    setupClickRipple();
    setupSparkles();
    setupRainbowTrail();
    setupMeteorShower();
  }

  window.addEventListener("pagehide", cleanupAll, { once: true });
  document.addEventListener("DOMContentLoaded", init);
})();
