"use strict";
const slider = function (vp) {
	const slides = document.querySelectorAll(".slider__slide");
	const dotsContainer = document.querySelector(".slider__dots");
	const maxSlide = slides.length;
	let currSlide = 0;

	//Functions
	const createDots = function () {
		dotsContainer.innerHTML = "";
		slides.forEach((slide, i) => {
			dotsContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="slider__dot" data-slide="${i}"></button>`
			);
		});
	};

	const activateDot = function (slide) {
		document
			.querySelectorAll(".slider__dot")
			.forEach((dot) => dot.classList.remove("slider__dot--active"));

		document
			.querySelector(`.slider__dot[data-slide="${slide}"]`)
			.classList.add("slider__dot--active");
	};

	const goToSlide = function (slide) {
		slides.forEach((s, i) => {
			s.style.transform = `translate${vp >= 557 ? "Y" : "X"}(${
				100 * (i - slide)
			}%)`;
			if (i === currSlide) s.style.opacity = "1";
		});
	};

	const nextSlide = function () {
		if (currSlide === maxSlide - 1) {
			return;
		} else {
			currSlide++;
		}

		goToSlide(currSlide);
		activateDot(currSlide);
	};

	const prevSlide = function () {
		if (currSlide === 0) {
			return;
		} else {
			currSlide--;
		}
		goToSlide(currSlide);
		activateDot(currSlide);
	};

	const init = function () {
		goToSlide(0);
		createDots();

		activateDot(0);
	};
	init();

	// Event handlers
	dotsContainer.addEventListener("click", function (e) {
		if (e.target.classList.contains("slider__dot")) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activateDot(slide);
		}
	});

	document.addEventListener(
		"wheel",
		function (e) {
			e.preventDefault();
			if (e.deltaY > 0) {
				nextSlide();
			}
			if (e.deltaY < 0) {
				prevSlide();
			}
		},
		{ passive: false }
	);
};
slider(window.innerWidth);
const sliderElement = document.querySelector(".slider");
const viewportResizeObserver = new ResizeObserver(function () {
	slider(window.innerWidth);
});

viewportResizeObserver.observe(sliderElement);
