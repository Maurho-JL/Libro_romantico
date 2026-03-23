const pages = [
  { title: "Mi detalle para ti", text: "Cada momento contigo se vuelve un recuerdo bonito.", image: "https://i.pinimg.com/1200x/57/88/69/578869c616921b6a8d008d66647d25ab.jpg" },
  { title: "Tu sonrisa", text: "Hay sonrisas que alegran el día, y luego está la tuya.", image: "https://i.pinimg.com/1200x/7b/48/e9/7b48e9ef729be92f48d83b57f5f4eb14.jpg" },
  { title: "Un recuerdo lindo", text: "Tus fotos guardan pedacitos de momentos que quiero repetir contigo.", image: "https://i.pinimg.com/1200x/88/71/d4/8871d440024dc127978e80e01ee0a052.jpg" },
  { title: "Lo bonito de ti", text: "No es solo cómo te ves, sino todo lo bonito que haces sentir.", image: "https://i.pinimg.com/736x/58/ad/05/58ad05478232b64460b591d726a58805.jpg" },
  { title: "Contigo", text: "Hasta los días simples se sienten especiales cuando pienso en ti.", image: "https://i.pinimg.com/1200x/3e/ea/6f/3eea6f2f8582ec4803d8569688ec7512.jpg" },
  { title: "Gracias", text: "Gracias por existir y por regalarle luz a mis pensamientos.", image: "https://i.pinimg.com/736x/23/83/93/238393cbdf6e975630ef679a4a423513.jpg" },
  { title: "Pequeños momentos", text: "A veces un momento pequeño contigo vale más que mil planes grandes.", image: "https://i.pinimg.com/736x/6b/7e/ee/6b7eeea22982a0f2d59134fb203b6631.jpg" },
  { title: "Mi persona favorita", text: "Entre tantas personas, siempre logras destacar en mi corazón.", image: "https://i.pinimg.com/736x/7d/1b/8e/7d1b8e3d5e41308833e67d8d3d50d734.jpg" },
  { title: "Lo que provocas en mí", text: "Me haces sonreír incluso cuando solo apareces en mi mente.", image: "https://i.pinimg.com/736x/1a/e2/52/1ae2521b3400a07ae6b30b27cc50151e.jpg" },
  { title: "Para terminar", text: "Este detalle no alcanza a decir todo, pero sí intenta recordarte lo especial que eres.", image: "https://i.pinimg.com/736x/a2/30/a3/a230a3fd68c83f38a326540daa962830.jpg" },
];

let currentPage = 0;
let isAnimating = false;
let lastTap = 0;

const page = document.getElementById("page");
const pageImage = document.getElementById("pageImage");
const pageTitle = document.getElementById("pageTitle");
const pageText = document.getElementById("pageText");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const controls = document.querySelector(".controls");

function updateButtons() {
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;
}

function renderPage(index) {
  const data = pages[index];
  pageImage.src = data.image;
  pageImage.alt = data.title;
  pageTitle.textContent = data.title;
  pageText.textContent = data.text;
  pageNumber.textContent = `${index + 1} / ${pages.length}`;
  updateButtons();
}

function animatePage(outClass, inClass, newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  page.classList.remove("go-next-out", "go-next-in", "go-prev-out", "go-prev-in");
  page.classList.add(outClass);

  page.addEventListener("animationend", function handleOut(e) {
    if (e.target !== page) return;
    page.removeEventListener("animationend", handleOut);

    currentPage = newIndex;
    renderPage(currentPage);

    page.classList.remove(outClass);
    page.classList.add(inClass);

    page.addEventListener("animationend", function handleIn(ev) {
      if (ev.target !== page) return;
      page.removeEventListener("animationend", handleIn);
      page.classList.remove(inClass);
      isAnimating = false;
    });
  });
}

function changePage(direction) {
  if (direction === "next" && currentPage < pages.length - 1) {
    animatePage("go-next-out", "go-next-in", currentPage + 1);
  }

  if (direction === "prev" && currentPage > 0) {
    animatePage("go-prev-out", "go-prev-in", currentPage - 1);
  }
}

/* CONTROLES */
["click", "touchstart", "touchend"].forEach((eventName) => {
  controls.addEventListener(
    eventName,
    (e) => {
      e.stopPropagation();
    },
    { passive: true }
  );
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  changePage("prev");
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  changePage("next");
});

/* TECLADO */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") changePage("next");
  if (e.key === "ArrowLeft") changePage("prev");
});

renderPage(currentPage);

/* EFECTOS */
const messages = [
  "Te quiero",
  "Lisa",
  "Te amo",
  "Me encantas",
  "Encantadora",
  "Me haces sonreír",
  "Divina!",
  "Una lindura",
  "❤️",
  "🤗",
  "✨",
];

function createParticles(x, y) {
  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");
    particle.textContent = "♥︎𖹭";

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120;

    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
    particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }
}

function showMessage(x, y) {
  const message = document.createElement("span");
  message.classList.add("message");
  message.textContent = messages[Math.floor(Math.random() * messages.length)];
  message.style.left = x + "px";
  message.style.top = y + "px";

  document.body.appendChild(message);
  setTimeout(() => message.remove(), 1500);
}

function handleClick(x, y) {
  createParticles(x, y);
  showMessage(x, y);
}

function createChristmasLights(x, y) {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff"];

  for (let i = 0; i < 80; i++) {
    const particle = document.createElement("div");
    particle.classList.add("lightParticle");

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 300;

    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
    particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
  }
}

/* EVENTOS GLOBALES */
document.addEventListener("click", (e) => {
  if (e.target.closest(".controls")) return;
  handleClick(e.clientX, e.clientY);
});

document.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.closest(".controls")) return;
    const touch = e.touches[0];
    handleClick(touch.clientX, touch.clientY);
  },
  { passive: true }
);

document.addEventListener("dblclick", (e) => {
  if (e.target.closest(".controls")) return;
  createChristmasLights(e.clientX, e.clientY);
  if (navigator.vibrate) navigator.vibrate(200);
});

document.addEventListener(
  "touchend",
  (e) => {
    if (e.target.closest(".controls")) return;

    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      const touch = e.changedTouches[0];
      createChristmasLights(touch.clientX, touch.clientY);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }

    lastTap = currentTime;
  },
  { passive: true }
);

function createHeart() {
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.textContent = "♡︎";

  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = window.innerHeight + "px";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

setInterval(createHeart, 800);