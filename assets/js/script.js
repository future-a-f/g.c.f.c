// Load reusable components and initialize the mobile menu after the header is inserted
const loadHtml = (selector, url) => {
  const container = document.querySelector(selector);
  if (!container) return Promise.resolve();
  return fetch(url)
    .then(r => r.ok ? r.text() : Promise.reject(new Error(`${url} not found`)))
    .then(html => container.innerHTML = html);
};

const initMobileMenu = () => {
  const menuBtn = document.querySelector(".menu-btn");
  const navbar = document.querySelector(".navbar");
  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      navbar.classList.toggle("open");
    });
    // Close menu when a link is clicked
    navbar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("open");
      });
    });
  }
};

const highlightActiveNav = () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
};

const initFormHandling = () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
      // Create a simple email-like notification
      const subject = `Prayer Request from ${data.name}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
      
      // Use a placeholder for actual backend integration (e.g., Formspree, Basin)
      // For now, show success and log the data
      console.log("Form submission:", data);
      
      // Show success message
      showFormSuccess(form);
      form.reset();
    } catch (error) {
      console.error("Form error:", error);
      showFormError(form);
    }
  });
};

const showFormSuccess = (form) => {
  const successMsg = document.createElement("div");
  successMsg.className = "form-success";
  successMsg.setAttribute("role", "status");
  successMsg.setAttribute("aria-live", "polite");
  successMsg.textContent = "✓ Thank you! Your message has been received. We'll be in touch soon.";
  form.parentNode.insertBefore(successMsg, form);
  
  setTimeout(() => successMsg.remove(), 5000);
};

const showFormError = (form) => {
  const errorMsg = document.createElement("div");
  errorMsg.className = "form-error";
  errorMsg.setAttribute("role", "alert");
  errorMsg.textContent = "⚠ There was an error submitting your message. Please try again or email office@gcfc.org directly.";
  form.parentNode.insertBefore(errorMsg, form);
  
  setTimeout(() => errorMsg.remove(), 5000);
};

const initBackToTop = () => {
  const btn = document.createElement("button");
  btn.id = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = "↑";
  btn.className = "back-to-top";
  document.body.appendChild(btn);
  
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  });
  
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

Promise.all([
  loadHtml("#header", "components/header.html"),
  loadHtml("#footer", "components/footer.html")
]).then(() => {
  initMobileMenu();
  highlightActiveNav();
  initFormHandling();
  initBackToTop();
}).catch(error => {
  console.warn("Component load failed:", error);
});
