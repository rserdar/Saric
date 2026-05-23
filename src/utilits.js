export const wowJsAnimation = () => {
  if (typeof window === "undefined") return;

  const trigger = (el) => {
    const delay = el.getAttribute("data-animate-delay") || "0s";
    const duration = el.getAttribute("data-animate-duration") || "0.8s";
    el.style.setProperty("--anim-dur", duration);
    el.style.animationDelay = delay;
    el.classList.add("is-visible");
  };

  const animEls = document.querySelectorAll("[data-animate]");

  if (!("IntersectionObserver" in window)) {
    animEls.forEach(trigger);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trigger(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );

  animEls.forEach((el) => observer.observe(el));
};

export const customCursor = () => {
  var myCursor = document.querySelectorAll(".mouse-cursor"),
    hamburger = document.querySelector(".hamburger"),
    pointer = document.querySelector(".cursor-pointer"),
    e = document.querySelector(".cursor-inner"),
    t = document.querySelector(".cursor-outer");

  function mouseEvent(element) {
    element.addEventListener("mouseenter", function () {
      e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
    });
    element.addEventListener("mouseleave", function () {
      e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover");
    });
  }
  if (myCursor.length) {
    if (document.body) {
      let n,
        i = 0,
        o = !1;
      (window.onmousemove = function (s) {
        o ||
          (t.style.transform =
            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
          (e.style.transform =
            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
          (n = s.clientY),
          (i = s.clientX);
      }),
        document.body.addEventListener(
          "mouseenter",
          function () {
            let a = document.querySelectorAll("a");
            e.classList.add("cursor-inner"), t.classList.add("cursor-outer");

            for (let i = 0; i < a.length; i++) {
              const element = a[i];
              mouseEvent(element);
            }

            hamburger && mouseEvent(hamburger);
            pointer && mouseEvent(pointer);
          }
        ),
        (e.style.visibility = "visible"),
        (t.style.visibility = "visible");
    }
  }
};

export const preloader = () => {
  const preloaderEl = document.getElementById("preloader");
  if (!preloaderEl) return;

  const fadeOutAndRemove = () => {
    // Add preloaded class to trigger CSS transition fadeout
    preloaderEl.classList.add("preloaded");
    // After CSS transition completes (500ms), remove it from DOM
    setTimeout(() => {
      preloaderEl.remove();
      document.body.classList.add("opened");
    }, 600);
  };

  // If the window is already fully loaded (e.g. client navigation or instant render)
  if (document.readyState === "complete") {
    setTimeout(fadeOutAndRemove, 800);
  } else {
    // Otherwise wait for the window load event
    window.addEventListener("load", () => {
      setTimeout(fadeOutAndRemove, 800);
    });
    
    // Fallback: in case the load event is delayed or doesn't fire, auto-remove after 3 seconds
    setTimeout(fadeOutAndRemove, 3000);
  }
};

export const aTagClick = () => {
  const aTag = document.querySelectorAll("[href='#']");
  for (let i = 0; i < aTag.length; i++) {
    const a = aTag[i];
    a.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
};

export const dataImage = () => {
  let d = document.querySelectorAll("[data-img-url]");
  for (let i = 0; i < d.length; i++) {
    const element = d[i];
    element.style.backgroundImage = `url(${element.getAttribute(
      "data-img-url"
    )})`;
  }
};

export const portfolioHover = () => {
  const details = document.querySelectorAll(".portfolio_animation_wrap");
  const titleHolder = document.querySelector(".portfolio-titles-holder");
  
  if (details.length && titleHolder) {
    details.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        const title = element.getAttribute("data-title");
        const category = element.getAttribute("data-category");
        if (title && category) {
          titleHolder.innerHTML = `<h3>${title}</h3><span class="orangeText">${category}</span>`;
          titleHolder.classList.remove("opacity-0");
          titleHolder.classList.add("opacity-100");
        }
      });
      
      element.addEventListener("mouseleave", () => {
        titleHolder.classList.remove("opacity-100");
        titleHolder.classList.add("opacity-0");
      });
      
      element.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        titleHolder.style.left = mouseX + 20 + "px";
        titleHolder.style.top = mouseY + 20 + "px";
      });
    });
  }
};

export const scroll_ = () => {
  let sections = document.querySelectorAll(".dizme_tm_section");
  let navLinks = document.querySelectorAll(".anchor_nav li a");
  window.onscroll = () => {
    sections.forEach((section) => {
      let top = window.scrollY;
      let offset = section.offsetTop - 150;
      let height = section.offsetHeight;
      let id = section.getAttribute("id");
      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.parentElement.classList.remove("current");
          if (document.querySelector(".anchor_nav li a[href*=" + id + "]")) {
            document
              .querySelector(".anchor_nav li a[href*=" + id + "]")
              .parentElement.classList.add("current");
          }
        });
      }
    });
  };
};

export const stickyNav = () => {
  let offset = window.scrollY;
  let stickytop = document.querySelector(".dizme_tm_header");
  if (stickytop) {
    if (offset >= 100) {
      stickytop.classList.add("animate");
    } else {
      stickytop.classList.remove("animate");
    }
  }
};

export const scrollTop = () => {
  var bar = document.querySelector(".progressbar");
  var line = document.querySelector(".progressbar .line");
  var T = document.querySelector(".progressbar .totop");
  if (bar) {
    var white = document.querySelector(".white-section");
    if (white) {
      var top = white.offsetTop;
      var bottom = white.offsetTop + white.offsetHeight;
      if (window.scrollY >= top - 10 && window.scrollY <= bottom + 10) {
        bar.classList.add("white");
      } else {
        bar.classList.remove("white");
      }
    }
    window.addEventListener("scroll", function () {
      var scroll = window.scrollY;
      var docHeight = document.body.offsetHeight;
      var winHeight = window.innerHeight;
      var scrollPercent = scroll / (docHeight - winHeight);
      var scrollPercentRounded = Math.round(scrollPercent * 100);
      line.style.height = scrollPercentRounded + "%";
      if (scroll >= 100) {
        bar.classList.add("opened");
      } else {
        bar.classList.remove("opened");
      }
    });
    T.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
};

export const activeSkillProgress = () => {
  const progress_inner = document.querySelectorAll(".skillsInner___");
  progress_inner.forEach((e) => {
    const pV = e.getAttribute("data-value");
    const pC = e.getAttribute("data-color");
    const pB = e.querySelector(".bar_in");
    const pN = e.querySelector(".number");
    if (pV) {
      if (e.classList.contains("open")) {
        pB.style.width = pV + "%";
        pB.style.backgroundColor = pC;
        pN.style.right = 100 - pV + "%";
        pN.style.opacity = 1;
      }
    }
  });
};

export const fatchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
