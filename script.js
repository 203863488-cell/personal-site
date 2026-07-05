(function () {
  const config = window.LOVE_STORY || {};
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerFineQuery = window.matchMedia("(pointer: fine)");
  const compactQuery = window.matchMedia("(max-width: 640px)");
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
    name: "Hello Kitty", color: "#ff3b6e", accent: "#ffffff",
    glow: "#ff85a2", symbol: "❀", particles: ["❀", "♥", "✿", "♡", "✧"],
  };
  const charConfig = config.characters && typeof config.characters === "object" ? config.characters : {};
  const characterKeys = Object.keys(charConfig);
  const initialCharacter = charConfig[config.defaultCharacter]
    ? config.defaultCharacter : characterKeys[0] || "kitty";

  let activeChar = initialCharacter;
  let orbitPaused = false;
  let orbitFrozenElapsed = 0;
  let orbitRealElapsed = 0;
  let charParticleCleanups = [];
  let mouseX = -999, mouseY = -999;
  let targetMouseX = -999, targetMouseY = -999;
  let cursorDot, cursorRing, cursorGlow;
  const cleanups = [];

  // ========== UTILS ==========
  function isCompact() { return compactQuery.matches; }
  function allowPointer() { return !reducedMotion && pointerFineQuery.matches; }
  function addCleanup(fn) { cleanups.push(fn); return fn; }
  function safeText(v, fb) { return typeof v === "string" && v.trim() ? v : fb; }
  function cel(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  }
  function createImage(src, alt) {
    if (!src) return null;
    const img = document.createElement("img");
    img.src = src; img.alt = alt || ""; img.loading = "lazy"; img.decoding = "async";
    return img;
  }
  function photoLabel(i, t) { return safeText(t, "照片 " + String(i + 1).padStart(2, "0")) + " 待添加"; }

  function normalizeCaptions(v) {
    if (!Array.isArray(v)) return fallbackCaptions;
    const n = v.filter(i => Array.isArray(i) && i.length >= 2)
      .map(i => [safeText(i[0], ""), safeText(i[1], "")])
      .filter(i => i[0] || i[1]);
    return n.length ? n : fallbackCaptions;
  }

  function setCaptionText(container, pair) {
    if (!container) return;
    container.replaceChildren(cel("span", "", safeText(pair && pair[0], "")), cel("strong", "", safeText(pair && pair[1], "")));
  }

  function hexToRgba(hex, a) {
    if (typeof hex !== "string" || !/^#[\da-f]{6}$/i.test(hex)) return `rgba(255,255,255,${a})`;
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function getActiveChar() {
    const c = charConfig[activeChar] || {};
    return { ...fallbackCharacter, ...c, particles: Array.isArray(c.particles) && c.particles.length ? c.particles : fallbackCharacter.particles };
  }

  // ========== CUSTOM CURSOR ==========
  function setupCursor() {
    if (!allowPointer()) return;
    cursorDot = document.querySelector(".cursor-dot");
    cursorRing = document.querySelector(".cursor-ring");
    cursorGlow = document.querySelector(".cursor-glow");
    if (!cursorDot || !cursorRing || !cursorGlow) return;

    function onMove(e) {
      targetMouseX = e.clientX; targetMouseY = e.clientY;
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
    function animate() {
      const dx = targetMouseX - parseFloat(cursorRing.style.left || targetMouseX);
      const dy = targetMouseY - parseFloat(cursorRing.style.top || targetMouseY);
      const cx = (parseFloat(cursorRing.style.left || targetMouseX) || targetMouseX) + dx * 0.15;
      const cy = (parseFloat(cursorRing.style.top || targetMouseY) || targetMouseY) + dy * 0.15;
      cursorRing.style.left = cx + "px";
      cursorRing.style.top = cy + "px";
      cursorRing.style.transform = "translate(-50%, -50%)";
      requestAnimationFrame(animate);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    requestAnimationFrame(animate);

    // Hover states
    const hoverTargets = document.querySelectorAll("a, button, .mosaic-item, .orbit-card, .stack-card, .char-btn, .memory-card");
    function onEnter() {
      cursorDot.classList.add("is-hovering");
      cursorRing.classList.add("is-hovering");
    }
    function onLeave() {
      cursorDot.classList.remove("is-hovering");
      cursorRing.classList.remove("is-hovering");
    }
    hoverTargets.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    addCleanup(() => hoverTargets.forEach(el => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    }));
  }

  // ========== GRAIN CANVAS ==========
  function setupGrain() {
    const canvas = document.getElementById("grainCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    let frame;
    function draw() {
      frame = requestAnimationFrame(draw);
      if (document.hidden) return;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v; data[i + 1] = v; data[i + 2] = v; data[i + 3] = 30;
      }
      ctx.putImageData(imageData, 0, 0);
    }
    if (!reducedMotion) draw();
    addCleanup(() => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); });
  }

  // ========== 3D TILT ==========
  function setup3DTilt() {
    if (!allowPointer()) return;
    const cards = document.querySelectorAll(".stack-card, .memory-card, .mosaic-item");
    cards.forEach(card => {
      function onMove(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -12;
        const rotateY = ((x - cx) / cx) * 12;
        card.style.transform = card.style.transform.replace(/rotateX\([^)]*\)/, "").replace(/rotateY\([^)]*\)/, "") + ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      function onLeave() {
        card.style.transform = card.style.transform.replace(/rotateX\([^)]*\)/, "").replace(/rotateY\([^)]*\)/, "") + " rotateX(0deg) rotateY(0deg)";
      }
      card.addEventListener("mousemove", onMove, { passive: true });
      card.addEventListener("mouseleave", onLeave);
    });
  }

  // ========== PARALLAX SCROLL ==========
  function setupParallax() {
    if (reducedMotion) return;
    const heroVisual = document.querySelector(".hero-visual");
    const orbs = document.querySelectorAll(".hero-bg-orb");
    let ticking = false;
    function update() {
      const scrollY = window.scrollY;
      if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
      orbs.forEach((orb, i) => {
        const speed = 0.03 + i * 0.015;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    addCleanup(() => window.removeEventListener("scroll", onScroll));
  }

  // ========== SMOOTH SCROLL (CUSTOM) ==========
  function setupSmoothScroll() {
    if (reducedMotion) return;
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + window.scrollY - 80;
        const duration = 1200;
        const startTime = performance.now();
        function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          window.scrollTo(0, start + (end - start) * ease(progress));
          if (progress < 1) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
      });
    });
  }

  // ========== PHOTO APPLICATION ==========
  function applyPhoto(container, item, label) {
    const fb = safeText(label, "照片待添加");
    container.dataset.label = fb;
    container.classList.add("is-empty");
    const img = createImage(item && item.src, item && item.title);
    if (!img) return;
    if (container.classList.contains("memory-image")) {
      container.style.setProperty("--memory-photo", `url("${item.src}")`);
    }
    img.addEventListener("load", () => container.classList.remove("is-empty"));
    img.addEventListener("error", () => { img.remove(); container.style.removeProperty("--memory-photo"); container.dataset.label = fb; container.classList.add("is-empty"); });
    container.appendChild(img);
  }

  // ========== BUILD HERO STACK ==========
  function buildHeroStack() {
    const stack = document.getElementById("heroStack");
    if (!stack) return;
    [photoItems[0], photoItems[1], photoItems[2]].forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "stack-card is-empty";
      applyPhoto(card, item, photoLabel(i, item && item.title));
      stack.appendChild(card);
    });
  }

  // ========== BUILD TIMELINE ==========
  function buildTimeline() {
    const list = document.getElementById("timelineList");
    if (!list) return;
    if (!timelineItems.length) {
      const empty = cel("article", "memory-card memory-empty reveal");
      const body = cel("div", "memory-body");
      body.append(cel("span", "memory-index", "00"), cel("p", "memory-date", "等待记录"), cel("h3", "", "这里还没有时间线"), cel("p", "", "在 content.js 里添加你们的故事后，这里会自动生成纪念卡片。"));
      empty.appendChild(body); list.appendChild(empty); return;
    }
    timelineItems.forEach((item, i) => {
      const article = cel("article", "memory-card reveal");
      const imgWrap = cel("div", "memory-image is-empty");
      const photo = item.photo || photoItems[i];
      applyPhoto(imgWrap, photo, photoLabel(i, photo && photo.title));
      const body = cel("div", "memory-body");
      body.append(
        cel("span", "memory-index", String(i + 1).padStart(2, "0")),
        cel("p", "memory-date", safeText(item.date, "某个值得记住的日子")),
        cel("h3", "", safeText(item.title, "关于你的一个瞬间")),
        cel("p", "", safeText(item.text, "这里留给你们真实的故事。"))
      );
      article.append(imgWrap, body); list.appendChild(article);
    });
    // Re-trigger tilt on memory cards
    setTimeout(setup3DTilt, 100);
  }

  // ========== BUILD MOSAIC ==========
  function buildMosaic() {
    const grid = document.getElementById("mosaicGrid");
    if (!grid || !photoItems.length) return;
    const items = photoItems.slice(0, 12);
    const classes = ["featured", "tall", "", "wide", "", "", "tall", "", "wide", "", "", ""];
    items.forEach((item, i) => {
      const div = cel("div", "mosaic-item is-empty" + (classes[i] ? " " + classes[i] : ""));
      applyPhoto(div, item, photoLabel(i, item && item.title));
      const label = cel("span", "mosaic-label", safeText(item && item.title, "记忆 " + String(i + 1).padStart(2, "0")));
      div.appendChild(label);
      grid.appendChild(div);
    });
    setTimeout(setup3DTilt, 100);
  }

  // ========== REVEAL ON SCROLL ==========
  function revealOnScroll() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reducedMotion) {
      items.forEach(i => i.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); } });
    }, { threshold: 0.14 });
    items.forEach(i => observer.observe(i));
    addCleanup(() => observer.disconnect());
  }

  // ========== PARTICLE CANVAS ==========
  function setupParticleCanvas(canvas, options) {
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const particles = [];
    const symbols = ["·", "✦", "♡", "♥", "✧", "·", "♡", "✦", "·", "♥"];
    const colors = options.colors || ["rgba(255,255,255,0.7)"];
    const maxDist = options.maxDist || 130;
    let width = 0, height = 0, animFrame = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;
      const density = isCompact() ? (options.density || 16000) * 1.8 : options.density || 16000;
      const maxP = isCompact() ? 42 : options.maxParticles || 90;
      const count = reducedMotion ? Math.min(18, maxP) : Math.min(maxP, Math.max(22, Math.floor((width * height) / density)));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width, y: Math.random() * height,
          size: 0.8 + Math.random() * 2.8, speed: 0.12 + Math.random() * 0.42,
          drift: -0.18 + Math.random() * 0.36, alpha: 0.22 + Math.random() * 0.74,
          symbol: symbols[i % symbols.length], color: colors[i % colors.length],
        });
      }
    }

    function render(advance) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.globalAlpha = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = particles[i].color; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
        if (p.symbol === "·") { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.font = `${p.size * 6}px sans-serif`; ctx.fillText(p.symbol, p.x, p.y); }
        if (advance && mouseX > -100) {
          const gx = mouseX - p.x, gy = mouseY - p.y, gdist = Math.sqrt(gx * gx + gy * gy);
          if (gdist < 160 && gdist > 1) {
            const force = 0.03;
            p.x += ((gx / gdist) * force * (160 - gdist)) / 160;
            p.y += ((gy / gdist) * force * (160 - gdist)) / 160;
          }
        }
        if (advance) {
          p.y -= p.speed; p.x += p.drift;
          if (p.y < -24) { p.y = height + 24; p.x = Math.random() * width; }
          if (p.x < -24) p.x = width + 24; else if (p.x > width + 24) p.x = -24;
        }
      });
      ctx.globalAlpha = 1;
    }

    function start() { if (!animFrame && !reducedMotion) animFrame = requestAnimationFrame(draw); }
    function stop() { if (animFrame) { cancelAnimationFrame(animFrame); animFrame = 0; } }
    function draw() { animFrame = 0; if (!document.hidden) render(true); start(); }
    function onVis() { if (document.hidden) stop(); else start(); }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    resize(); render(false); start();
    return () => { stop(); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", onVis); };
  }


  // ========== BUILD LOVE LETTER ==========
  function buildLoveLetter() {
    const letterBody = document.getElementById("letterBody");
    const letterSign = document.getElementById("letterSign");
    const letterTitle = document.getElementById("letterTitle");
    if (!letterBody || !letterSign) return;
    const msg = config.letterMessage || {};
    const greeting = safeText(msg.greeting, "亲爱的：");
    const bodyTexts = Array.isArray(msg.body) && msg.body.length ? msg.body : ["从我们认识的那天起，我的世界就变得不一样了。", "生日快乐，我的女孩。"];
    const sign = safeText(msg.sign, "—— 永远爱你的我");
    
    const frag = document.createDocumentFragment();
    frag.appendChild(cel("p", "", greeting));
    bodyTexts.forEach(t => { frag.appendChild(cel("p", "", t)); });
    letterBody.appendChild(frag);
    letterSign.textContent = sign;
    if (letterTitle && msg.title) letterTitle.textContent = msg.title;
  }

  // ========== ORBIT SCENE ==========
  function buildOrbitScene() {
    const scene = document.getElementById("orbitScene");
    const stage = document.getElementById("orbitStage");
    const caption = document.getElementById("orbitCaption");
    if (!scene || !stage) return;
    const count = isCompact() ? Math.max(12, photoItems.length || 12) : Math.max(18, photoItems.length * 2 || 18);
    const cards = [];
    for (let i = 0; i < count; i++) {
      const item = photoItems[i % Math.max(photoItems.length, 1)];
      const card = cel("figure", "orbit-card is-empty");
      applyPhoto(card, item, photoLabel(i, item && item.title));
      card.appendChild(cel("figcaption", "orbit-card-label", safeText(item && item.title, "记忆 " + String(i + 1).padStart(2, "0"))));
      scene.appendChild(card); cards.push(card);
    }
    let captionIndex = 0, animFrame = 0;
    setCaptionText(caption, captions[0]);

    function updateCaption(time) {
      if (!caption) return;
      const next = Math.floor(time / 4200) % captions.length;
      if (next !== captionIndex) { captionIndex = next; setCaptionText(caption, captions[next]); }
    }

    function positionCards(elapsed) {
      const rect = stage.getBoundingClientRect();
      const radiusX = Math.min(rect.width * 0.42, 450);
      const radiusY = Math.min(rect.height * 0.2, 150);
      const centerLift = rect.width < 560 ? 12 : 0;
      cards.forEach((card, i) => {
        const turn = (i / cards.length) * Math.PI * 2 + elapsed * 0.26;
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
        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${depth * 180}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      });
    }

    function start() { if (!animFrame && !reducedMotion) animFrame = requestAnimationFrame(animate); }
    function stop() { if (animFrame) { cancelAnimationFrame(animFrame); animFrame = 0; } }
    function animate(time) {
      animFrame = 0;
      if (!document.hidden) {
        orbitRealElapsed = time / 1000;
        const ae = orbitPaused ? orbitFrozenElapsed : orbitRealElapsed;
        if (!orbitPaused) orbitFrozenElapsed = orbitRealElapsed;
        positionCards(ae); updateCaption(ae * 1000);
      }
      start();
    }
    function onVis() { if (document.hidden) stop(); else start(); }
    function onResize() { positionCards(orbitFrozenElapsed); }

    positionCards(0);
    window.addEventListener("resize", onResize);
    if (!reducedMotion) { start(); document.addEventListener("visibilitychange", onVis); addCleanup(() => { stop(); window.removeEventListener("resize", onResize); document.removeEventListener("visibilitychange", onVis); }); }
    else addCleanup(() => window.removeEventListener("resize", onResize));
  }

  // ========== HEART TRAIL ==========
  function setupHeartTrail() {
    if (!allowPointer()) return;
    const hearts = ["♥", "♡", "❤", "✦", "♡"];
    let last = 0;
    document.addEventListener("mousemove", e => {
      const now = Date.now();
      if (now - last < (isCompact() ? 140 : 85) || document.hidden) return;
      last = now;
      const el = cel("span", "heart-trail", hearts[Math.floor(Math.random() * hearts.length)]);
      el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px";
      el.style.color = ["#ff6f91", "#f1c66b", "#63d7cc", "#ff9eb5"][Math.floor(Math.random() * 4)];
      el.style.setProperty("--dx", (Math.random() - 0.5) * 60 + "px");
      el.style.setProperty("--dy", -(20 + Math.random() * 50) + "px");
      el.style.setProperty("--rot", (Math.random() - 0.5) * 80 + "deg");
      el.style.fontSize = (12 + Math.random() * 14) + "px";
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }, { passive: true });
  }

  // ========== CLICK BURST ==========
  function setupClickBurst() {
    if (reducedMotion) return;
    const hearts = ["♥", "❤", "♡", "✦", "✧", "♡"];
    document.addEventListener("click", e => {
      if (document.hidden || e.target.closest(".char-switcher") || e.target.closest(".secret-overlay") || e.target.closest(".brand")) return;
      const count = isCompact() ? 6 : 8 + Math.floor(Math.random() * 8);
      for (let i = 0; i < count; i++) {
        const el = cel("span", "heart-burst", hearts[Math.floor(Math.random() * hearts.length)]);
        el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px";
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

  // ========== DAY COUNTER ==========
  function setupDayCounter() {
    const stats = document.querySelector(".hero-stats");
    if (!stats) return;
    const days = Number(config.togetherDays);
    if (!Number.isInteger(days) || days < 0) return;
    const span = cel("span", "day-counter");
    span.append("在一起 ", cel("span", "day-num", String(days)), " 天");
    stats.appendChild(span);
    // Footer counter
    const footerCtr = document.getElementById("footerCounter");
    if (footerCtr) footerCtr.textContent = "在一起 " + days + " 天";
  }

  // ========== SECRET MESSAGE ==========
  function setupSecretMessage() {
    const brand = document.querySelector(".brand");
    if (!brand) return;
    let clicks = 0, timer = null;
    brand.addEventListener("click", e => {
      clicks++;
      if (timer) clearTimeout(timer);
      if (clicks >= 5) { e.preventDefault(); clicks = 0; showSecret(); return; }
      if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey) {
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));
      }
      timer = setTimeout(() => { clicks = 0; }, 30000);
    });

    function showSecret() {
      const existing = document.querySelector(".secret-overlay");
      if (existing) { existing.classList.add("is-open"); existing.querySelector(".secret-close")?.focus(); return; }
      const msg = config.secretMessage || {};
      const overlay = cel("div", "secret-overlay");
      overlay.setAttribute("role", "dialog"); overlay.setAttribute("aria-modal", "true");
      const modal = cel("div", "secret-modal");
      modal.append(
        cel("h3", "", safeText(msg.title, "✨")),
        cel("p", "", safeText(msg.body, "你是我最美好的意外。")),
        cel("button", "secret-close", safeText(msg.closeLabel, "藏进心里"))
      );
      modal.querySelector(".secret-close").type = "button";
      overlay.appendChild(modal);
      function close() { overlay.classList.remove("is-open"); document.removeEventListener("keydown", onKey); setTimeout(() => overlay.remove(), 500); }
      function onKey(e) { if (e.key === "Escape") close(); }
      overlay.addEventListener("click", e => { if (e.target === overlay || e.target.classList.contains("secret-close")) close(); });
      document.addEventListener("keydown", onKey);
      document.body.appendChild(overlay);
      requestAnimationFrame(() => { overlay.classList.add("is-open"); modal.querySelector(".secret-close").focus(); });
    }
  }

  // ========== PAGE LOADER ==========
  function setupPageLoader() {
    const loader = document.querySelector(".page-loader");
    if (!loader) return;
    const heart = loader.querySelector(".loader-heart");
    if (heart) { heart.className = "loader-heart theme-" + activeChar; }
    let hidden = false;
    const hide = () => { if (hidden) return; hidden = true; loader.classList.add("is-hidden"); setTimeout(() => loader.remove(), 700); };
    if (document.readyState === "complete") setTimeout(hide, 300);
    else window.addEventListener("load", () => setTimeout(hide, 300), { once: true });
    setTimeout(hide, 2200);
  }

  // ========== ORBIT HOVER PAUSE ==========
  function setupOrbitHoverPause() {
    const stage = document.getElementById("orbitStage");
    if (!stage) return;
    stage.addEventListener("mouseenter", () => { orbitPaused = true; });
    stage.addEventListener("mouseleave", () => { orbitPaused = false; });
  }

  // ========== CHARACTER SYSTEM ==========
  function setupCharSwitcher() {
    if (!characterKeys.length) return;
    const bar = cel("nav", "char-switcher");
    bar.setAttribute("aria-label", "角色主题切换");
    characterKeys.forEach(key => {
      const ch = { ...fallbackCharacter, ...charConfig[key] };
      const btn = cel("button", "char-btn" + (key === activeChar ? " is-active" : ""), ch.symbol);
      btn.type = "button"; btn.setAttribute("data-char", key); btn.setAttribute("data-name", ch.name);
      btn.setAttribute("aria-label", ch.name); btn.setAttribute("aria-pressed", String(key === activeChar));
      btn.addEventListener("click", () => switchTheme(key));
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
  }

  function switchTheme(key) {
    if (!charConfig[key] || activeChar === key) return;
    activeChar = key;
    const ch = getActiveChar();
    document.querySelectorAll(".char-btn").forEach(b => {
      const isActive = b.getAttribute("data-char") === key;
      b.classList.toggle("is-active", isActive); b.setAttribute("aria-pressed", String(isActive));
    });
    characterKeys.forEach(k => document.body.classList.remove("theme-" + k));
    document.body.classList.add("theme-" + key);
    updateCharCorner();
    rebuildCharParticles();
    spawnCharSticker(ch.symbol + ch.symbol);
  }

  function updateCharCorner() {
    const corner = document.querySelector(".char-corner");
    if (!corner) return;
    const ch = getActiveChar();
    const icon = corner.querySelector(".char-icon");
    const name = corner.querySelector(".char-name");
    if (icon) icon.textContent = ch.symbol;
    if (name) name.textContent = ch.name + " 陪伴中";
  }

  function setupCharCorner() {
    const ch = getActiveChar();
    const corner = cel("div", "char-corner");
    corner.append(cel("span", "char-icon", ch.symbol), cel("span", "char-name", ch.name + " 陪伴中"));
    document.body.appendChild(corner);
  }

  function rebuildCharParticles() {
    charParticleCleanups.forEach(c => { try { c(); } catch (_) {} });
    charParticleCleanups = [];
    const ch = getActiveChar();
    const heroColors = [hexToRgba(ch.color, 0.66), hexToRgba(ch.glow, 0.56), hexToRgba(ch.accent, 0.55), "rgba(255,255,255,0.6)"];
    const orbitColors = [hexToRgba(ch.color, 0.72), hexToRgba(ch.glow, 0.62), hexToRgba(ch.accent, 0.64), "rgba(255,255,255,0.64)"];
    const heroCanvas = document.getElementById("heroCanvas");
    const orbitCanvas = document.getElementById("orbitCanvas");
    if (heroCanvas) { const c = setupParticleCanvas(heroCanvas, { density: 14500, colors: heroColors, maxParticles: 78 }); if (c) charParticleCleanups.push(c); }
    if (orbitCanvas) { const c = setupParticleCanvas(orbitCanvas, { density: 9000, colors: orbitColors, maxParticles: 86 }); if (c) charParticleCleanups.push(c); }
  }

  function setupCharFloats() {
    if (reducedMotion) return;
    function spawn() {
      if (document.hidden) return;
      const ch = getActiveChar();
      const el = cel("span", "char-float", ch.particles[Math.floor(Math.random() * ch.particles.length)]);
      el.style.left = (8 + Math.random() * 84) + "%"; el.style.bottom = "-40px"; el.style.color = ch.color;
      el.style.setProperty("--drift", ((Math.random() - 0.5) * 80) + "px");
      el.style.setProperty("--spin", ((Math.random() - 0.5) * 120) + "deg");
      el.style.animationDuration = (4 + Math.random() * 5) + "s";
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }
    const interval = setInterval(spawn, isCompact() ? 3200 : 2400);
    addCleanup(() => clearInterval(interval));
    spawn();
  }

  function spawnCharSticker(text) {
    if (reducedMotion || document.hidden) return;
    const el = cel("span", "char-sticker", text || getActiveChar().symbol);
    el.style.left = (30 + Math.random() * 40) + "%"; el.style.top = (20 + Math.random() * 50) + "%";
    el.style.color = getActiveChar().color;
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }

  function setupCharDoubleClick() {
    if (reducedMotion) return;
    document.addEventListener("dblclick", e => {
      if (document.hidden || e.target.closest(".brand")) return;
      const ch = getActiveChar();
      const count = isCompact() ? 3 : 5;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const el = cel("span", "char-sticker", ch.particles[Math.floor(Math.random() * ch.particles.length)]);
          el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px";
          el.style.color = ch.color; el.style.fontSize = (20 + Math.random() * 30) + "px";
          document.body.appendChild(el);
          el.addEventListener("animationend", () => el.remove());
        }, i * 80);
      }
    });
  }

  // ========== EFFECTS ==========
  function setupShootingStars() {
    if (reducedMotion) return;
    let timeout;
    function spawn() {
      if (document.hidden) return;
      const star = cel("div", "shooting-star");
      star.style.left = (10 + Math.random() * 80) + "%"; star.style.top = -(Math.random() * 30) + "%";
      document.body.appendChild(star);
      star.addEventListener("animationend", () => star.remove());
    }
    function schedule() { timeout = setTimeout(() => { spawn(); schedule(); }, 5000 + Math.random() * 10000); }
    timeout = setTimeout(schedule, 2200 + Math.random() * 4500);
    addCleanup(() => { if (timeout) clearTimeout(timeout); });
  }

  function setupScrollProgress() {
    const bar = cel("div", "scroll-progress");
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    let ticking = false;
    function update() {
      const st = window.scrollY || document.documentElement.scrollTop;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      const pct = dh > 0 ? Math.min((st / dh) * 100, 100) : 0;
      bar.style.transform = `scaleX(${pct / 100})`;
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", onScroll, { passive: true });
    addCleanup(() => window.removeEventListener("scroll", onScroll));
    update();
  }

  function setupClickRipple() {
    if (reducedMotion) return;
    document.addEventListener("click", e => {
      if (document.hidden || e.target.closest(".char-switcher") || e.target.closest(".secret-overlay") || e.target.closest(".brand")) return;
      const ripple = cel("div", "click-ripple");
      ripple.style.left = e.clientX + "px"; ripple.style.top = e.clientY + "px";
      ripple.style.color = getActiveChar().color;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  }

  function setupSparkles() {
    if (reducedMotion) return;
    function spawn() {
      if (document.hidden) return;
      const dot = cel("div", "sparkle-dot");
      dot.style.left = (5 + Math.random() * 90) + "%"; dot.style.top = (5 + Math.random() * 90) + "%";
      dot.style.color = ["#ff6f91", "#f1c66b", "#63d7cc", "#ffffff", "#ffb3c6"][Math.floor(Math.random() * 5)];
      dot.style.animationDuration = (1.2 + Math.random() * 2.2) + "s";
      document.body.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove());
    }
    const interval = setInterval(spawn, isCompact() ? 1500 : 950);
    addCleanup(() => clearInterval(interval));
    spawn();
  }

  function setupRainbowTrail() {
    if (!allowPointer()) return;
    const colors = ["#ff6b6b", "#ff9f43", "#feca57", "#54a0ff", "#5f27cd", "#ff6f91", "#00d2d3", "#f368e0"];
    let last = 0;
    document.addEventListener("mousemove", e => {
      const now = Date.now();
      if (now - last < 95 || document.hidden) return;
      last = now;
      const dot = cel("div", "rainbow-trail");
      dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px";
      dot.style.color = colors[Math.floor(Math.random() * colors.length)];
      dot.style.setProperty("--rdx", ((Math.random() - 0.5) * 40) + "px");
      dot.style.setProperty("--rdy", ((Math.random() - 0.5) * 40) + "px");
      dot.style.animationDuration = (0.6 + Math.random() * 0.8) + "s";
      document.body.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove());
    }, { passive: true });
  }

  function setupMeteorShower() {
    const brand = document.querySelector(".brand");
    if (!brand || reducedMotion) return;
    let interval = null;
    brand.addEventListener("dblclick", e => {
      e.preventDefault();
      if (interval) { clearInterval(interval); interval = null; return; }
      function fire() {
        if (document.hidden) return;
        const star = cel("div", "shooting-star");
        star.style.left = (10 + Math.random() * 80) + "%"; star.style.top = -(Math.random() * 20) + "%";
        star.style.animationDuration = (0.8 + Math.random() * 0.8) + "s";
        document.body.appendChild(star);
        star.addEventListener("animationend", () => star.remove());
      }
      for (let i = 0; i < 6; i++) setTimeout(fire, i * 150);
      interval = setInterval(fire, 600);
      setTimeout(() => { if (interval) { clearInterval(interval); interval = null; } }, 8000);
    });
    addCleanup(() => { if (interval) clearInterval(interval); });
  }

  // ========== INIT ==========
  function init() {
    document.body.classList.add("theme-" + activeChar);
    setupPageLoader();
    setupCursor();
    setupGrain();
    setupSmoothScroll();
    setupParallax();
    buildHeroStack();
    buildTimeline();
    buildMosaic();
    buildLoveLetter();
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
    setupShootingStars();
    setupScrollProgress();
    setupClickRipple();
    setupSparkles();
    setupRainbowTrail();
    setupMeteorShower();
    setup3DTilt();
  }

  function cleanupAll() {
    charParticleCleanups.forEach(c => { try { c(); } catch (_) {} });
    charParticleCleanups = [];
    while (cleanups.length) { try { cleanups.pop()(); } catch (_) {} }
  }

  window.addEventListener("pagehide", cleanupAll, { once: true });
  document.addEventListener("DOMContentLoaded", init);
})();