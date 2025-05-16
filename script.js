document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const navLinks = document.querySelector(".nav-links");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const chatboxBtn = document.getElementById("chatbox-button");
  const chatbox = document.getElementById("chatbox");
  const closeChatboxBtn = document.getElementById("close-chatbox");
  const messageForm = document.getElementById("message-form");
  const welcomeMessage = document.getElementById("welcome-message");
  const welcomeAudio = document.getElementById("welcome-audio");
  const loadingContainer = document.getElementById(
    "loading-animation-container"
  );
  const header = document.querySelector("header");
  const mainContent = document.querySelector("main");
  let chatboxOpen = false;
  let audioPlayed = false;

  window.addEventListener("load", () => {
    if (welcomeAudio && welcomeAudio.src) {
      welcomeAudio
        .play()
        .then(() => {
          audioPlayed = true;
          setTimeout(() => {
            loadingContainer.style.opacity = 0;
            setTimeout(() => {
              loadingContainer.style.display = "none";
              header.style.display = "flex";
              mainContent.style.display = "block";
              document.body.style.overflow = "auto";
            }, 1000);
          }, 1000);
        })
        .catch((error) => {
          console.error("Playback failed:", error);
          setTimeout(() => {
            loadingContainer.style.opacity = 0;
            setTimeout(() => {
              loadingContainer.style.display = "none";
              header.style.display = "flex";
              mainContent.style.display = "block";
              document.body.style.overflow = "auto";
            }, 1000);
          }, 1000);
        });
    } else {
      setTimeout(() => {
        loadingContainer.style.opacity = 0;
        setTimeout(() => {
          loadingContainer.style.display = "none";
          header.style.display = "flex";
          mainContent.style.display = "block";
          document.body.style.overflow = "auto";
        }, 1000);
      }, 1000);
    }
  });

  searchButton.addEventListener("click", searchContent);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") searchContent();
  });

  function searchContent() {
    const searchTerm = searchInput.value.toLowerCase();
    const sections = document.querySelectorAll("main section");
    let resultsFound = false;

    sections.forEach((section) => {
      const text = section.innerHTML;
      const regex = new RegExp(`\\b${searchTerm}\\b`, "gi");
      let highlightedText = text;
      if (searchTerm.trim() !== "") {
        highlightedText = text.replace(
          regex,
          (match) => `<span class="highlight">${match}</span>`
        );
      }
      section.innerHTML = highlightedText;
      if (highlightedText !== text) {
        resultsFound = true;
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    if (!resultsFound && searchTerm.trim() !== "") {
      alert(`No results found for "${searchTerm}"`);
    }
    searchInput.value = "";
    setTimeout(clearHighlights, 3000);
  }

  function clearHighlights() {
    document.querySelectorAll(".highlight").forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent), el);
      }
    });
  }

  const style = document.createElement("style");
  style.innerHTML = `
    .highlight {
      background-color: #fff263;
      padding: 0.2em;
      border-radius: 4px;
      box-shadow: 0 0 0 1px #fff263;
      animation: pulseHighlight 1.5s infinite alternate;
    }
    @keyframes pulseHighlight {
      from { box-shadow: 0 0 0 1px #fff263; }
      to { box-shadow: 0 0 8px 2px rgba(255, 242, 99, 0.7); }
    }
    header nav ul li a.active-link {
      background-color: rgba(255, 255, 255, 0.2);
      color: #fff;
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }
    section.active-section {
      background-color: rgba(255, 255, 0, 0.1);
      border: 1px solid yellow;
      box-shadow: 0 0 20px rgba(255, 255, 0, 0.7);
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  chatboxBtn.addEventListener("click", () => {
    chatbox.classList.toggle("show");
    chatboxOpen = true;
    welcomeMessage.textContent =
      "Welcome to my Portfolio! How can I assist you today?";
  });

  closeChatboxBtn.addEventListener("click", () => {
    chatbox.classList.remove("show");
    chatboxOpen = false;
    welcomeMessage.textContent = "";
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    messageForm.reset();
    chatbox.classList.remove("show");
    chatboxOpen = false;
    welcomeMessage.textContent = "";
  });

  setTimeout(() => {
    chatbox.classList.add("show");
    chatboxOpen = true;
    welcomeMessage.textContent =
      "Welcome to my Portfolio! How can I assist you today?";
  }, 2000);

  document.addEventListener("click", (e) => {
    if (
      chatboxOpen &&
      !chatbox.contains(e.target) &&
      !chatboxBtn.contains(e.target)
    ) {
      chatbox.classList.remove("show");
      chatboxOpen = false;
      welcomeMessage.textContent = "";
    }
  });
});

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav ul.nav-links li a");
const profilePic = document.getElementById("profile-pic");

window.addEventListener("scroll", () => {
  let currentSection = "hero";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });

  if (currentSection !== "hero") {
    profilePic.classList.add("minimized");
  } else {
    profilePic.classList.remove("minimized");
  }
});
