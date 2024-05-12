function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

init()

gsap.from(".page1 h1,.page1 h2,.page1 h5", {
    y: 100,
    opacity: 0,
    delay: 0.3,
    duration: 0.8,
    stagger: 0.25,
})

var tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".page1 h1",
        scroller: ".main",
        markers: true,
        start: "top 42%",
        end:"top 18%",
        scrub:4
    }
})
// Function to calculate the center position of the viewport along the x-axis
function calculateViewportCenterX() {
    var viewportWidth = window.innerWidth;
    return viewportWidth / 2;
}

// Get the center position of the viewport along the x-axis
var viewportCenterX = calculateViewportCenterX();

// Function to calculate the adjustment needed for the elements to center along x-axis
function calculateXOffset(element) {
    var elementWidth = element.offsetWidth;
    return (viewportCenterX - (elementWidth / 2));
}

// Get references to the elements you want to center
var h1Element = document.querySelector(".page1 h1");
var h2Element = document.querySelector(".page1 h2");
var h5Element = document.querySelector(".page1 h5");

// Calculate the x-offset for each element
var h1Offset = calculateXOffset(h1Element);
var h2Offset = calculateXOffset(h2Element);
var h5Offset = calculateXOffset(h5Element);

// Animation to move the center of the elements to the center of the viewport along x-axis
tl.to(".page1 h1", {
    x: h1Offset/1.83,
    ease: "power2.out"
}, "anim");

tl.to(".page1 h2", {
    x: h2Offset/2.1,
    ease: "power2.out"
}, "anim");

tl.to(".page1 h5", {
    x: h5Offset/1.61,
    ease: "power2.out"
}, "anim");



document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.page2-container');
    const video = videoContainer.querySelector('.video');

    videoContainer.addEventListener('mouseenter', function() {
        timer = setTimeout(function() {
            video.play(); // Play the video with a delay
        }, 100); // Delay in milliseconds (300ms in this example)
    });

    videoContainer.addEventListener('mouseleave', function() {
        timer = setTimeout(function() {
            video.pause(); // Play the video with a delay
        }, 100); // Delay in milliseconds (300ms in this example)
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.page3-container');
    const video = videoContainer.querySelector('.video');

    videoContainer.addEventListener('mouseenter', function() {
        timer = setTimeout(function() {
            video.play(); // Play the video with a delay
        }, 100); // Delay in milliseconds (300ms in this example)
    });

    videoContainer.addEventListener('mouseleave', function() {
        timer = setTimeout(function() {
            video.pause(); // Play the video with a delay
        }, 100); // Delay in milliseconds (300ms in this example)
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.page4-container');
    const video = videoContainer.querySelector('.video');

    videoContainer.addEventListener('mouseenter', function() {
        timer = setTimeout(function() {
            video.play(); // Play the video with a delay
        }, 100); // Delay in milliseconds (300ms in this example)
    });

    videoContainer.addEventListener('mouseleave', function() {
        timer = setTimeout(function() {
            video.pause(); // Play the video with a delay
        }, 100); // Delay in milliseconds (300ms in this example)
    });
});


const workSection = document.querySelector(".section-work-data");
const workObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    // console.log(entry);

    // if (entry.isIntersecting == false)
    if (!entry.isIntersecting) return;

    // animate number counter

    const counterNum = document.querySelectorAll(".counter-numbers");

    const speed = 200;

    counterNum.forEach((curElem) => {
      const updateNumber = () => {
        const targetNumber = parseInt(curElem.dataset.number);
        // console.log(targetNumber);
        const initialNum = parseInt(curElem.innerText);
        // console.log(initialNum);

        const incrementNumber = Math.trunc(targetNumber / speed);
        // console.log(incrementNumber);

        if (initialNum < targetNumber) {
          curElem.innerText = `${initialNum + incrementNumber}+`;
          setTimeout(updateNumber, 10);
        }
      };

      updateNumber();
    });

    observer.unobserve(workSection);
  },
  {
    root: null,
    threshold: 0,
  }
);

workObserver.observe(workSection);