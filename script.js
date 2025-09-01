// Mobile Navigation functionality
function toggleMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");

  mobileMenuBtn.classList.toggle("active");
  mobileNavOverlay.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (mobileNavOverlay.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

function closeMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");

  mobileMenuBtn.classList.remove("active");
  mobileNavOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Navigation active state on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed header

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// Header background opacity on scroll
function updateHeaderOnScroll() {
  const header = document.querySelector(".header");
  const scrolled = window.scrollY > 50;

  if (scrolled) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
}

// Add scroll event listeners
window.addEventListener("scroll", () => {
  updateActiveNavLink();
  updateHeaderOnScroll();
});

// Animated text for position
const positions = ["Web Developer"];

let currentPosition = 0;
let currentChar = 0;
let isDeleting = false;

function typeAnimation() {
  const animatedTextElement = document.getElementById("animatedText");
  const currentText = positions[currentPosition];

  if (isDeleting) {
    // Remove characters
    animatedTextElement.textContent = currentText.substring(0, currentChar - 1);
    currentChar--;

    if (currentChar === 0) {
      isDeleting = false;
      currentPosition = (currentPosition + 1) % positions.length;
      setTimeout(typeAnimation, 500); // Pause before typing next word
      return;
    }
  } else {
    // Add characters
    animatedTextElement.textContent = currentText.substring(0, currentChar + 1);
    currentChar++;

    if (currentChar === currentText.length) {
      isDeleting = true;
      setTimeout(typeAnimation, 2000); // Pause when word is complete
      return;
    }
  }

  setTimeout(typeAnimation, isDeleting ? 100 : 150);
}

// Start animation when page loads
document.addEventListener("DOMContentLoaded", function () {
  typeAnimation();
  initSmoothScrolling();
  updateActiveNavLink();
  animateOnScroll();
});

// Add some scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".skill-container, .project-card, .certificate-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}

// CV Download function
function downloadCV() {
  // Replace with your actual CV file path
  const cvUrl = "path-to-your-cv.pdf";
  const link = document.createElement("a");
  link.href = cvUrl;
  link.download = "YourName_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // For demo purposes, show an alert
  alert(
    "CV download would start here. Please replace the cvUrl variable with your actual CV file path."
  );
}

// Project modal functionality
const projectData = {
  project1: {
    title: "Codeventia",
    description: `
            <h3>Codeventia</h3>
            <p>A simple event management system using python flask and mysql. </p>
            <ul>
                <li>Technologies used: Python, Flask, MySQL</li>
                <li>Key features implemented: Event Creation and Management as well as a Coupon Allocation Feature.</li>
            </ul>
        `,
  },
  project2: {
    title: "Pettio",
    description: `
            <h3>Pettio</h3>
            <p>A Pet Adoption Application built using React Native.</p>
            <ul>
                <li>Technologies used: React Native, Node js and MySQL</li>
                <li>Key features implemented: Adoption System and QR Scanning for finding pets</li>
            </ul>
        `,
  },
  project3: {
    title: "KennectPlay",
    description: `
            <h3>KennectPlay</h3>
            <p>Platform for viewing, posting and sharing contents about your
                favorite online/offline games.</p>
            <ul>
                <li>Technologies used: PHP and MySQL</li>
                <li>Key features implemented: Liking, Commenting, Sharing and Posting of Contents.</li>
            </ul>
        `,
  },
};

function openModal(projectId) {
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");

  if (projectData[projectId]) {
    modalBody.innerHTML = projectData[projectId].description;
    modal.style.display = "block";
  }
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Close modal with escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
