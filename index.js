function toggleMenu() {
  const navItems = document.getElementById("nav-items");

  if (navItems.classList.contains("hide-mobile")) {
    navItems.classList.remove("hide-mobile");
  } else {
    navItems.classList.add("hide-mobile");
  }
}

//******Acocordian******//
var acc = document.getElementsByClassName("accordion");
var i;

// Open the first panel by default
acc[0].classList.add("active");
var panel = acc[0].nextElementSibling;
panel.style.maxHeight = panel.scrollHeight + "px";

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    var isActive = this.classList.contains("active");
    var numActivePanels = document.querySelectorAll(".accordion.active").length;

    // Check if there is only one panel open and it's being closed
    if (isActive && numActivePanels) {
      return; // Prevent closing the last open panel
    }

    // Close all panels except the one being clicked
    for (var j = 0; j < acc.length; j++) {
      if (acc[j] !== this) {
        acc[j].classList.remove("active");
        acc[j].nextElementSibling.style.maxHeight = null;
      }
    }

    // Toggle the active class and open/close the clicked panel
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//******Testimonial slider*********//
const swiper = new Swiper(".swiperCarousel", {
  slidesPerView: 2,
  centeredSlides: true,
  spaceBetween: 10,
  keyboard: {
    enabled: true,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  lazy: {
    loadPrevNext: true,
  },
  parallax: true,
  breakpoints: {
    500: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
});

const slides = document.getElementsByClassName("swiper-slide");
for (const slide of slides) {
  slide.addEventListener("click", () => {
    const { className } = slide;
    if (className.includes("swiper-slide-next")) {
      swiper.slideNext();
    } else if (className.includes("swiper-slide-prev")) {
      swiper.slidePrev();
    }
  });
}

function resizeTextToFit() {
  const quoteEls = document.getElementsByClassName("quote");
  for (const el of quoteEls) {
    el.style.width = el.offsetWidth;
    el.style.height = el.offsetHeight;
  }
  textFit(quoteEls, { maxFontSize: 14 });
}
resizeTextToFit();
addEventListener("resize", (event) => {
  resizeTextToFit();
});

//*********GSAP ANIMATIONS************//
gsap.registerPlugin(ScrollTrigger);

function homeAnimations() {
  let tl = gsap.timeline();

  tl.from("#home__main__left__heading h1", {
    y: 120,
    opacity: 0,
    duration: 1,
    ease: "expo.out",
  })
    .from(
      "#home__main__left__para p",
      {
        y: 120,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      },
      "-=0.8" // Delay relative to the previous animation
    )
    .from(
      "#home__main__left__btn button",
      {
        y: 120,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      },
      "-=0.8" // Delay relative to the previous animation
    )
    .from(
      "#home__main__right",
      {
        // scale: 0.5,
        opacity: 0,
        height: 0,
        duration: 1.5,
        ease: "expo.out",
      },
      "-=0.8"
    );

  const boxes = document.querySelectorAll(".hiw__box");

  boxes.forEach((box, index) => {
    gsap.from(box, {
      opacity: 0,
      y: 150,
      duration: 1.5,
      delay: index * 0.1,
      stagger: 1,
      scrollTrigger: {
        trigger: box,
        start: "top 80%",
        end: "bottom 100%",
        toggleActions: "play play none reverse",
      },
      ease: "power3.out",
    });
  });

  //*******Our Numbers counter animation*******/
  function animateCounter(selector, maxCount, interval) {
    let counter = document.querySelector(selector);
    let count = 0;
    let increment = Math.ceil(maxCount / (1000 / interval));
    let intervalId;

    return function () {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        count += increment;
        if (count >= maxCount) {
          count = maxCount;
          clearInterval(intervalId);
        }
        counter.innerHTML = count;
      }, interval);
    };
  }

  // Initialize the ScrollTriggers for each counter
  gsap.from("#award__numbers", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#award__numbers",
      start: "top 98%",
      onEnter: animateCounter("#award__numbers", 1024, 10),
    },
  });

  gsap.from("#project__numbers", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#project__numbers",
      start: "top 98%",
      onEnter: animateCounter("#project__numbers", 24, 33),
    },
  });

  gsap.from("#happy__clients__numbers", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#happy__clients__numbers",
      start: "top 98%",
      onEnter: animateCounter("#happy__clients__numbers", 1024, 10),
    },
  });

  gsap.from("#uptime__numbers", {
    opacity: 0,
    scrollTrigger: {
      trigger: "#uptime__numbers",
      start: "top 98%",
      onEnter: animateCounter("#uptime__numbers", 99, 100),
    },
  });
}

homeAnimations();
