// Dark mode toggle
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
};

// Creează butonul de dark mode dinamic/const darkBtn = document.createElement('button');
const darkBtn = document.createElement('button');
darkBtn.innerText = "🌙 Dark Mode";
darkBtn.style.position = "fixed";
darkBtn.style.top = "20px";
darkBtn.style.right = "20px";
darkBtn.style.padding = "10px 15px";
darkBtn.style.border = "none";
darkBtn.style.borderRadius = "10px";
darkBtn.style.background = "#333";
darkBtn.style.color = "white";
darkBtn.style.cursor = "pointer";
darkBtn.style.zIndex = "999";

darkBtn.addEventListener("click", toggleDarkMode);
document.body.appendChild(darkBtn);

// Validare formular
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = this.querySelectorAll("input, textarea");
  let valid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.border = "2px solid red";
      valid = false;
    } else {
      input.style.border = "1px solid #ccc";
    }
  });

  if (valid) {
    alert("Mesajul a fost trimis cu succes! ✉️");
    this.reset();
  } else {
    alert("Te rugăm să completezi toate câmpurile.");
  }
});

const testimonials = document.querySelectorAll('.testimonial');
const testimonialPrevBtn = document.getElementById('prev');
const testimonialNextBtn = document.getElementById('next');
let testimonialIndex = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

testimonialPrevBtn.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
});

testimonialNextBtn.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
});

// Opțional: auto-slide la fiecare 5 secunde
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}, 5000);

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const emailInput = this.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  if (email) {
    alert(`Mulțumim pentru abonare, ${email}!`);
    this.reset();
  } else {
    alert('Te rugăm să introduci un email valid.');
  }
});

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;

    if (answer.style.maxHeight) {
      // Inchide daca e deschis
      answer.style.maxHeight = null;
      question.classList.remove('active');
    } else {
      // Inchide toate celelalte raspunsuri
      document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = null);
      document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

      // Deschide raspunsul curent
      answer.style.maxHeight = answer.scrollHeight + "px";
      question.classList.add('active');
    }
  });
});

document.querySelectorAll('.comment-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const username = form.username.value.trim();
    const comment = form.comment.value.trim();
    const commentsList = form.previousElementSibling;

    if(username && comment) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${username}</strong><p>${comment}</p>`;

      commentsList.appendChild(li);

      form.reset();
    }
  });
});

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');
let slideIndex = 0;

// Creăm punctele automat, câte unul pentru fiecare slide
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if(i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);

  // La click pe punct schimbăm slide-ul
  dot.addEventListener('click', () => {
    slideIndex = i;
    showSlide(slideIndex);
  });
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  // Activăm punctul corespunzător
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
});

nextBtn.addEventListener('click', () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
});

// Arătăm primul slide la început
showSlide(slideIndex);

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
