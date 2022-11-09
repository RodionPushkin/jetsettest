particlesJS("particles", {
    "particles": {
        "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
        "color": {"value": "#ffffff"},
        "shape": {
            "type": "circle",
            "stroke": {"width": 0, "color": "#000000"},
            "polygon": {"nb_sides": 5},
            "image": {"src": "img/github.svg", "width": 100, "height": 100}
        },
        "opacity": {
            "value": 0.14993805191013182,
            "random": false,
            "anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false}
        },
        "size": {"value": 3, "random": true, "anim": {"enable": false, "speed": 40, "size_min": 0.1, "sync": false}},
        "line_linked": {"enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1},
        "move": {
            "enable": true,
            "speed": 3.1565905665290903,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {"enable": true, "mode": "bubble"},
            "onclick": {"enable": false, "mode": "push"},
            "resize": true
        },
        "modes": {
            "grab": {"distance": 400, "line_linked": {"opacity": 1}},
            "bubble": {"distance": 400, "size": 7.992007992007992, "duration": 2, "opacity": 8, "speed": 3},
            "repulse": {"distance": 200, "duration": 0.4},
            "push": {"particles_nb": 4},
            "remove": {"particles_nb": 2}
        }
    },
    "retina_detect": true
});

const showAnim = gsap.from('.header', {
    yPercent: -100,
    paused: true,
    duration: 0.2
}).progress(1);

ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
    },
    toggleClass: {className: 'header--scrolled', targets: '.header'}
});

let ctrl = new ScrollMagic.Controller();

document.querySelectorAll('section').forEach(item => {
    let inner = item.querySelectorAll('.animate');
    if (inner.length != 0) {
        let tl = new TimelineMax();
        inner.forEach(innerItem => {
            tl.from(innerItem, 0.35, {yPercent: 100, ease: Back.easeOut});
        })

        new ScrollMagic.Scene({
            triggerElement: item,
            triggerHook: 0.7,
            // offset: -100,
            // reverse:false
        })
            .setTween(tl)
            .addTo(ctrl);
    }
});
gsap.utils.toArray(".section-tokenization").forEach(section => {
    let tl = gsap.timeline({
        scrollTrigger: {
            // markers: true,
            trigger: section,
            start: "center 130%",
            end: () => "+=" + section.offsetHeight,
            scrub: true,
            // pin: true,
            // anticipatePin: 1
        },
        defaults: {ease: "none"}
    });
    tl.fromTo(section.querySelector(".after"), { xPercent: 100, x: 0}, {xPercent: 0})
        .fromTo(section.querySelector(".after img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
    document.body.style.overflowY = "overlay"
});
$('.smartplace-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 1150,
            settings: {
                arrows: true,
                dots: false,
            }
        }
    ]
});

const selectSlide = (index) => {
    $('.smartplace-slider').slick('slickGoTo',index, false);
    $('.custom-slider-buttons.clickable').children().each((id,item)=>{
        if(id == index){
            $(item).toggleClass('active',true);
        }else{
            $(item).toggleClass('active',false);
        }
    })
};
$('.custom-slider-buttons.clickable').children().each((id,item)=>{
    $(item).click(()=>{
        selectSlide(id)
    })
})
$('.smartplace-slider').on('afterChange',(data)=>{
    selectSlide($('.smartplace-slider').slick('slickCurrentSlide'))
})
