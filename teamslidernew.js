
document.addEventListener("DOMContentLoaded", function () {
  // Initialize image swiper with custom settings
  const imgSwiper = new Swiper(".team_slider.swiper", {
    touchRatio: 0.5,
    speed: 1000,
    spaceBetween: 16,
    slidesPerView: "auto",
    centeredSlides: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '[swiper-arrow="next"]',
      prevEl: '[swiper-arrow="previous"]',
    },
  });

  // Initialize text swiper with vertical direction and no touch interaction
  const textSwiper = new Swiper(".team_text_slider.swiper", {
    allowTouchMove: false,
    direction: "vertical",
    speed: 1000,
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
  });

  // Initialize bio swiper with vertical direction and auto height adjustment
  const bioSwiper = new Swiper(".team_bio_slider.swiper", {
    allowTouchMove: false,
    direction: "vertical",
    speed: 1000,
    spaceBetween: 16,
    slidesPerView: 1,
    centeredSlides: true,
  });

  // Sync the swipers for coordinated sliding
  imgSwiper.controller.control = textSwiper;
  textSwiper.controller.control = bioSwiper;

  // Hide slides initially
  const slides = document.querySelectorAll(".team_slider .swiper-slide");
  slides.forEach(slide => {
    slide.style.opacity = 0;
    slide.style.transform = "translateY(50px)";
  });

  // Hide .team_bio_slider initially
  const bioSlider = document.querySelector(".team_bio_slider");
  if (bioSlider) {
    bioSlider.style.opacity = 0;
  }

  // Function to move in slides one by one
  function moveInSlides() {
    slides.forEach((slide, index) => {
      setTimeout(() => {
        slide.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
        slide.style.opacity = 1;
        slide.style.transform = "translateY(0)";
      }, index * 300); // Delay each slide's move-in effect
    });

    // Fade in .team_bio_slider after 2 seconds
    setTimeout(() => {
      if (bioSlider) {
        bioSlider.style.transition = "opacity 1s ease-in-out";
        bioSlider.style.opacity = 1;
      }
    }, 2000);
  }

  // Function to check if section is fully in viewport
  function isFullyInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  // Start animation when section is fully in viewport
  function onScroll() {
    const section = document.querySelector(".team_slider");
    if (isFullyInViewport(section)) {
      moveInSlides();
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);
});
