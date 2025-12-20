// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");

  // Toggle mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target) && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update URL after scrolling
        history.pushState(null, null, targetId);
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Poruka je uspešno poslata 💌");
          contactForm.reset();
        } else {
          alert("Greška. Pokušajte ponovo.");
        }
      } catch (error) {
        alert("Greška pri slanju.");
      }
    });
  }

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".class-card, .trainer-card, .testimonial-card, .feature-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Video modal functionality (for the "Watch Video" button)
  const videoButton = document.querySelector(".btn-secondary");
  if (videoButton) {
    videoButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Create modal (you can replace this with your actual video)
      const modal = document.createElement("div");
      modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;

      const content = document.createElement("div");
      content.style.cssText = `
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                margin: 20px;
            `;

      content.innerHTML = `
                <h3 style="margin-bottom: 20px; font-family: 'Playfair Display', serif;">Coming Soon!</h3>
                <p style="margin-bottom: 30px; color: #666;">Our studio tour video is coming soon. In the meantime, feel free to book a visit to see our beautiful studio in person.</p>
                <button style="background: #2c5530; color: white; padding: 12px 24px; border: none; border-radius: 12px; cursor: pointer;">Close</button>
            `;

      const closeBtn = content.querySelector("button");
      closeBtn.addEventListener("click", function () {
        document.body.removeChild(modal);
      });

      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });

      modal.appendChild(content);
      document.body.appendChild(modal);
    });
  }

  // Counter animation for stats
  const statsNumbers = document.querySelectorAll(".stat-number");

  function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + "+";
      }
    }

    updateCounter();
  }

  // Observe stats section for counter animation
  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statsItems = entry.target.querySelectorAll(".stat-number");
        statsItems.forEach((stat) => {
          const target = parseInt(stat.textContent.replace("+", ""));
          animateCounter(stat, target, 2000);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  });

  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    statsObserver.observe(heroStats);
  }

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.style.opacity = "1";
    document.body.style.transition = "opacity 0.5s ease";
  });

  // Initialize body opacity
  document.body.style.opacity = "0";
});
