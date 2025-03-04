
async function handleSlider() {
    const slider = document.querySelector('#slider');
    //Wait for all contents to be loaded before setting max width
    const imageList = document.querySelectorAll("img");
    const onLoadPromiseList = [];
    for (const image of imageList) {
        if (image.complete) continue;

        const onLoadPromise = new Promise((resolve, reject) => {
            if (image.complete) return resolve();
            image.onload = resolve;
            image.onerror = reject;
        });
        onLoadPromiseList.push(onLoadPromise);
    }
    await Promise.all(onLoadPromiseList);
    console.log('Slider loaded', onLoadPromiseList);

    // Set max width and height to prevent slider from scrolling
    slider.maxWidth = getComputedStyle(slider).width;
    slider.maxHeight = getComputedStyle(slider).height;

    const sliderParent = slider.parentElement;
    const sliderTract = document.querySelector("#slider > .swiper-wrapper");
    const slides = document.querySelector("#slider > .swiper-wrapper > .slider__item-swiper-slide");
    console.log('sliderTract', sliderTract);
    console.log('slides', slides.children.length);
    //Clone slides for Infinite loop
    const slidesToShow = 1;
    const slidesRequired = 2;
    for (let i = 0; slides.children.length <= slidesToShow && i <= slidesRequired - 1; i++) {
        const index = i % slidesToShow;
        const clonedSlide = slides[index]?.cloneNode(true);
        clonedSlide?.setAtribute("cloned", "");
        sliderTract.appendChild(clonedSlide);
        console.log('clonedSlide', clonedSlide);
    }

    console.log('sliderTract', sliderTract);
    const swiper = new Swiper("#slider", {
        grabCursor: true,
        loop: true,
        slidesOffsetAfter: 0,
        slidesOffsetBefore: 0,
        slidesPerView: 1,
        navigation: {
            prevEl: '#slider-control-prev',
            nextEl: '#slider-control-next',
        },
        pagination: {
            el: '#slider-pagination',
            clickable: true,
            bulletElement: "div"
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            551: {
                slidesPerView: 1,
            },
            1441: {
                slidesPerView: 1,
            },
        }
    });
}

/** Handle Slider Load */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await handleSlider();
    } catch (error) {
        console.error(error);
    }
});
