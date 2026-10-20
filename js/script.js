(() => {
  const nav = document.querySelector("#spl-nav");
  const toggle = document.querySelector(".spl-mobile-toggle");
  const root = document.querySelector("#spl-mega-root");
  const triggers = [...document.querySelectorAll(".spl-menu-trigger")];
  const isHoverDevice = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let closeTimer = null;
  let removeTimer = null;

  const menus = {
    servicos: {
      title: "Nossos serviços",
      description: "Soluções em infraestrutura, segurança eletrônica e conectividade para empresas e condomínios.",
      allText: "Ver todos os serviços",
      href: "#servicos",
      cards: [
        ["Redes e cabeamento", "Cabeamento estruturado, organização e configuração de redes.", "assets/menu/servico-redes.jpg", "#servicos"],
        ["CFTV IP e analógico", "Instalação, configuração e manutenção de videomonitoramento.", "assets/menu/servico-cftv.jpg", "#servicos"],
        ["Configuração de redes", "Arquitetura, validação e ajustes de conectividade.", "assets/menu/servico-wifi.jpg", "#servicos"],
        ["Controle de acesso", "Gerenciamento e controle de entrada em ambientes.", "assets/menu/servico-acesso.jpg", "#servicos"],
        ["Interfonia e alarmes", "Comunicação e segurança para empresas e condomínios.", "assets/menu/servico-interfonia.jpg", "#servicos"],
        ["Soluções para condomínios", "Manutenção de tecnologia e equipamentos conectados.", "assets/menu/servico-condominios.jpg", "#servicos"]
      ]
    },
    projetos: {
      title: "Projetos e instalações",
      description: "Veja as categorias de trabalho e explore as galerias de instalações.",
      allText: "Ver todos os projetos",
      href: "#projetos",
      cards: [
        ["Monitoramento e segurança", "Instalações e soluções de videomonitoramento.", "assets/menu/projeto-cftv-real.jpg", "#projetos"],
        ["Redes e cabeamento", "Infraestrutura para conectividade e comunicação.", "assets/menu/projeto-redes-real.jpg", "#projetos"],
        ["Infraestrutura tecnológica", "Projetos de infraestrutura e conectividade.", "assets/menu/projeto-infra-real.jpg", "#projetos"]
      ]
    },
    tecnologias: {
      title: "Tecnologias",
      description: "Experiência com diferentes fabricantes e soluções, conforme a necessidade de cada projeto.",
      allText: "Ver todas as tecnologias",
      href: "#tecnologias",
      cards: [
        ["UniFi", "Equipamentos e infraestrutura de conectividade.", "assets/menu/tech-unifi.jpg", "#tecnologias"],
        ["MikroTik", "Configuração de redes e equipamentos de conectividade.", "assets/menu/tech-mikrotik.jpg", "#tecnologias"],
        ["Fortinet / FortiGate", "Equipamentos de segurança de rede.", "assets/menu/tech-fortinet.jpg", "#tecnologias"],
        ["Intelbras", "CFTV, interfonia, alarmes e controle de acesso.", "assets/menu/tech-intelbras.jpg", "#tecnologias"],
        ["Hikvision", "Videomonitoramento e segurança eletrônica.", "assets/menu/tech-hikvision.jpg", "#tecnologias"],
        ["Outras tecnologias", "Integração e suporte a diferentes fabricantes.", "assets/menu/tech-outras.jpg", "#tecnologias"]
      ]
    }
  };

  function clearPanel() {
    clearTimeout(removeTimer);
    root.innerHTML = "";
    triggers.forEach(b => b.setAttribute("aria-expanded", "false"));
  }

  function closePanel() {
    clearTimeout(removeTimer);
    const panel = root.querySelector(".spl-mega");
    triggers.forEach(b => b.setAttribute("aria-expanded", "false"));
    if (!panel) return;
    panel.classList.remove("is-visible");
    removeTimer = setTimeout(() => {
      if (!panel.classList.contains("is-visible")) root.innerHTML = "";
    }, 3250);
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (!root.matches(":hover") && !nav.matches(":hover")) closePanel();
    }, 260);
  }

  function openPanel(trigger) {
    clearTimeout(closeTimer);
    clearTimeout(removeTimer);
    const key = trigger.dataset.menu;
    const existing = root.querySelector(".spl-mega");
    if (trigger.getAttribute("aria-expanded") === "true" && existing?.classList.contains("is-visible")) return;
    clearPanel();
    trigger.setAttribute("aria-expanded", "true");
    const data = menus[key];
    const panel = document.createElement("section");
    panel.className = "spl-mega";
    panel.dataset.menu = key;
    panel.setAttribute("aria-label", data.title);

    const intro = document.createElement("div");
    intro.className = "spl-mega-intro";
    intro.innerHTML = `<span class="spl-mega-eyebrow">SPL TECH</span><h2>${data.title}</h2><p>${data.description}</p><a href="${data.href}">${data.allText}</a>`;
    const cards = document.createElement("div");
    cards.className = "spl-mega-cards";

    data.cards.forEach((item, index) => {
      const [title, description, image, href] = item;
      const card = document.createElement("a");
      card.className = "spl-mega-card";
      card.href = href;
      const thumb = document.createElement("div");
      thumb.className = "spl-mega-thumb";
      if (image) {
        const img = document.createElement("img");
        img.src = image;
        img.alt = "";
        img.onerror = () => {
          thumb.innerHTML = `<div class="spl-thumb-placeholder"><span>ÁREA SPL TECH</span><strong>${title}</strong></div>`;
        };
        thumb.appendChild(img);
      } else {
        thumb.innerHTML = `<div class="spl-thumb-placeholder"><span>ÁREA SPL TECH</span><strong>${title}</strong></div>`;
      }
      const copy = document.createElement("div");
      copy.className = "spl-mega-copy";
      const h3 = document.createElement("h3");
      h3.textContent = title;
      const p = document.createElement("p");
      p.textContent = description;
      const link = document.createElement("span");
      link.textContent = "Acessar";
      copy.append(h3, p, link);
      card.append(thumb, copy);
      cards.appendChild(card);
    });

    panel.append(intro, cards);
    root.appendChild(panel);
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add("is-visible")));
    panel.addEventListener("mouseenter", () => clearTimeout(closeTimer));
    panel.addEventListener("mouseleave", scheduleClose);
    panel.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      closePanel();
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  triggers.forEach(trigger => {
    trigger.addEventListener("mouseenter", () => { if (isHoverDevice()) openPanel(trigger); });
    trigger.addEventListener("focus", () => { if (isHoverDevice()) openPanel(trigger); });
    trigger.addEventListener("mouseleave", scheduleClose);
    trigger.addEventListener("click", () => {
      if (isHoverDevice()) openPanel(trigger);
      else if (trigger.getAttribute("aria-expanded") === "true") closePanel();
      else openPanel(trigger);
    });
  });
  nav.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  nav.addEventListener("mouseleave", scheduleClose);
  toggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(opened));
    toggle.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".spl-header") && !event.target.closest(".spl-mega")) closePanel();
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closePanel(); });
  nav.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    closePanel();
  }));


  // Entrada progressiva de conteúdo ao entrar na área visível durante a rolagem.
  // Ativa somente quando IntersectionObserver está disponível.
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealTargets = [];
    const addTargets = (selector, stagger = false) => {
      document.querySelectorAll(selector).forEach((el, index) => {
        if (el.closest("#inicio")) return;
        if (!el.classList.contains("scroll-reveal")) el.classList.add("scroll-reveal");
        if (stagger) el.style.setProperty("--reveal-delay", `${Math.min(index * 100, 400)}ms`);
        revealTargets.push(el);
      });
    };

    // Soluções, projetos e equipamentos: títulos primeiro, cartões em sequência.
    addTargets("#servicos .section-heading, #projetos .section-heading, #tecnologias .section-heading");
    addTargets("#servicos .service-card, #projetos .project-card, #tecnologias .technology-card", true);

    // Contato: conteúdo aparece em uma sequência curta e natural.
    addTargets("#contato .contact-content > *", true);

    if (revealTargets.length) {
      document.body.classList.add("has-scroll-reveal");
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            currentObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      });
      revealTargets.forEach(el => observer.observe(el));
    }
  }

})();

/* Galeria de projetos SPL Tech: cards horizontais com arraste, toque e setas */
(() => {
  const root = document.querySelector('#project-showcase');
  if (!root) return;
  const track = root.querySelector('#project-carousel-track');
  const viewport = root.querySelector('.project-carousel-viewport');
  const tabs = [...root.querySelectorAll('[data-project-category]')];
  const prev = root.querySelector('.project-carousel-prev');
  const next = root.querySelector('.project-carousel-next');
  const title = root.querySelector('#project-carousel-title');
  const description = root.querySelector('#project-carousel-description');
  const dots = root.querySelector('#project-carousel-dots');
  let autoplayTimer = null;
  let userInteracted = false;
  const AUTOPLAY_DELAY = 4500;
  const categories = {
    cftv: {
      description: 'Registros reais de instalações, câmeras, gravadores e infraestrutura de segurança. Arraste as fotos para os lados para explorar o projeto.',
      slides: [
        ['assets/projetos-reais/cftv-instalacao-09.webp','Instalação de câmera em área externa'],
        ['assets/projetos-reais/cftv-instalacao-08.webp','Armário de telecomunicações instalado'],
        ['assets/projetos-reais/cftv-instalacao-07.webp','Instalação de ponto de monitoramento'],
        ['assets/projetos-reais/cftv-instalacao-06.webp','Infraestrutura de rede em galpão'],
        ['assets/projetos-reais/cftv-instalacao-05.webp','Preparação e identificação de cabos RJ45'],
        ['assets/projetos-reais/cftv-instalacao-10.webp','Teste de continuidade e validação dos cabos de rede'],
        ['assets/projetos-reais/cftv-instalacao-04.webp','Unidade de armazenamento para CFTV'],
        ['assets/projetos-reais/cftv-instalacao-03.webp','Conexões de gravador e cabeamento'],
        ['assets/projetos-reais/cftv-instalacao-02.webp','Materiais para instalação da infraestrutura'],
        ['assets/projetos-reais/cftv-instalacao-01.webp','Armário de rede fixado e finalizado']
      ]
    },
    redes: {
      description: 'Registros reais de redes, cabeamento estruturado, organização de racks, equipamentos e topologia de rede.',
      slides: [
        ['assets/projetos-reais/rede-cabeamento-01.webp','Montagem de rack'],
        ['assets/projetos-reais/rede-cabeamento-02.webp','Rack fixado conforme padrão'],
        ['assets/projetos-reais/rede-cabeamento-03.webp','Cabeamento semi organizado'],
        ['assets/projetos-reais/rede-cabeamento-04.webp','Rack organizado conforme padrão'],
        ['assets/projetos-reais/rede-cabeamento-05.webp','Roteador com PPPoE ativo'],
        ['assets/projetos-reais/rede-cabeamento-06.webp','Roteador organizado conforme padrão'],
        ['assets/projetos-reais/rede-cabeamento-07.webp','Equipamentos de telecomunicações energizados'],
        ['assets/projetos-reais/rede-cabeamento-08.webp','Equipamentos de telecomunicações reorganizados'],
        ['assets/projetos-reais/rede-cabeamento-09.webp','Passagem de cabos de rede pela eletrocalha'],
        ['assets/projetos-reais/rede-cabeamento-10.webp','Eletrocalha com tampa instalada para organizar os cabos'],
        ['assets/projetos-reais/rede-cabeamento-11.webp','Ponto de acesso instalado no ambiente'],
        ['assets/projetos-reais/rede-cabeamento-12.webp','Mapa de topologia e dispositivos da rede'],
      ]
    },
    infra: {
      description: 'Registros de montagem, instalação, alinhamento e finalização de videowall e estruturas de exibição.',
      slides: [
        ['assets/projetos-reais/infraestrutura-videowall-01.webp','Preparação e fixação da estrutura do videowall'],
        ['assets/projetos-reais/infraestrutura-videowall-02.webp','Instalação e alinhamento dos painéis'],
        ['assets/projetos-reais/infraestrutura-videowall-03.webp','Videowall instalado com identidade visual SPL Tech'],
        ['assets/projetos-reais/infraestrutura-videowall-04.webp','Finalização e alinhamento do videowall']
      ]
    }
  };
  let category = 'redes';
  let index = 0;
  let dragging = false, startX = 0, startScroll = 0, moved = false;
  function cardStep() {
    const card = track.querySelector('.project-carousel-slide');
    if (!card) return 1;
    const style = getComputedStyle(track);
    return card.getBoundingClientRect().width + (parseFloat(style.columnGap || style.gap) || 0);
  }
  function render() {
    const data = categories[category];
    track.innerHTML = '';
    if (dots) dots.innerHTML = '';
    data.slides.forEach(([src, label], i) => {
      const slide = document.createElement('article');
      slide.className = 'project-carousel-slide';
      const imgWrap = document.createElement('div');
      imgWrap.className = 'project-slide-image';
      const img = document.createElement('img');
      img.src = src;
      img.alt = label;
      img.loading = i < 3 ? 'eager' : 'lazy';
      imgWrap.appendChild(img);
      const labelEl = document.createElement('div');
      labelEl.className = 'project-slide-label';
      labelEl.textContent = label;
      slide.append(imgWrap, labelEl);
      track.appendChild(slide);
      if (dots) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'project-carousel-dot' + (i === index ? ' is-active' : '');
        dot.setAttribute('aria-label', `Ver imagem ${i + 1}: ${label}`);
        dot.addEventListener('click', () => { userInteracted = true; go(i); restartAutoplay(); });
        dots.appendChild(dot);
      }
    });
    viewport.scrollLeft = 0;
    update();
  }
  function update() {
    const data = categories[category];
    const slides = [...track.children];
    const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    // Setas sempre disponíveis: ao chegar ao fim, o carrossel volta ao início.
    prev.disabled = false;
    next.disabled = false;
    title.textContent = data.slides[index]?.[1] || 'Projetos e instalações';
    description.textContent = data.description;
    if (dots) [...dots.children].forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    slides.forEach((slide, i) => slide.classList.toggle('is-current', i === index));
  }
  function go(nextIndex) {
    const len = categories[category].slides.length;
    index = Math.max(0, Math.min(len - 1, nextIndex));
    viewport.scrollTo({ left: index * cardStep(), behavior: 'smooth' });
    update();
  }
  function advanceAutomatically() {
    const len = categories[category].slides.length;
    const step = cardStep();
    const visible = Math.max(1, Math.round((viewport.clientWidth + (parseFloat(getComputedStyle(track).gap) || 0)) / step));
    const maxStart = Math.max(0, len - visible);
    // Move one card at a time; when the end is reached, return smoothly to the beginning.
    if (index >= maxStart) {
      index = 0;
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
      update();
    } else {
      go(Math.min(maxStart, index + 1));
    }
  }
  function restartAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(advanceAutomatically, AUTOPLAY_DELAY);
  }
  // As setas avançam por páginas: 4 cartões no desktop, 2 no tablet e 1 no celular.
  // Na última página, o deslocamento é limitado ao fim real da faixa para não deixar espaços vazios.
  function pageStops() {
    const len = categories[category].slides.length;
    const step = cardStep();
    const gap = Math.max(0, parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0);
    const visible = Math.max(1, Math.round((viewport.clientWidth + gap) / step));
    const maxStart = Math.max(0, len - visible);
    const stops = [0];
    for (let start = visible; start < maxStart; start += visible) stops.push(start);
    if (maxStart > 0 && stops[stops.length - 1] !== maxStart) stops.push(maxStart);
    return stops;
  }
  function movePage(direction) {
    const stops = pageStops();
    const current = Math.max(0, Math.min(categories[category].slides.length - 1, Math.round(viewport.scrollLeft / cardStep())));
    let position = 0;
    for (let i = 0; i < stops.length; i++) {
      if (stops[i] <= current + 0.5) position = i;
    }
    let targetPosition = position + direction;
    // Navegação circular: avançar após a última página retorna à primeira;
    // voltar antes da primeira leva à última página.
    if (targetPosition >= stops.length) targetPosition = 0;
    if (targetPosition < 0) targetPosition = stops.length - 1;
    go(stops[targetPosition]);
  }
  prev.addEventListener('click', () => { userInteracted = true; movePage(-1); restartAutoplay(); });
  next.addEventListener('click', () => { userInteracted = true; movePage(1); restartAutoplay(); });
  viewport.addEventListener('scroll', () => {
    const step = cardStep();
    if (step > 1) index = Math.max(0, Math.min(categories[category].slides.length - 1, Math.round(viewport.scrollLeft / step)));
    update();
  }, { passive: true });
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    userInteracted = true; restartAutoplay();
    dragging = true; moved = false; startX = event.clientX; startScroll = viewport.scrollLeft;
    viewport.classList.add('is-dragging');
    if (event.pointerType === 'mouse') viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', event => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 4) moved = true;
    if (moved) viewport.scrollLeft = startScroll - delta;
  });
  const stopDrag = () => {
    if (!dragging) return;
    dragging = false; viewport.classList.remove('is-dragging');
    if (moved) { const step = cardStep(); index = Math.max(0, Math.min(categories[category].slides.length - 1, Math.round(viewport.scrollLeft / step))); go(index); }
  };
  viewport.addEventListener('pointerup', stopDrag);
  viewport.addEventListener('pointercancel', stopDrag);
  tabs.forEach(tab => tab.addEventListener('click', () => {
    userInteracted = true;
    category = tab.dataset.projectCategory;
    index = 0;
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    render();
    restartAutoplay();
  }));
  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') movePage(1);
    if (event.key === 'ArrowLeft') movePage(-1);
  });
  render();
  restartAutoplay();
  // Pause while the visitor is interacting with or hovering over the gallery; resume afterward.
  root.addEventListener('mouseenter', () => { if (autoplayTimer) clearInterval(autoplayTimer); });
  root.addEventListener('mouseleave', restartAutoplay);
  root.addEventListener('focusin', () => { if (autoplayTimer) clearInterval(autoplayTimer); });
  root.addEventListener('focusout', restartAutoplay);
})();