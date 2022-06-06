const lazyload = document.querySelectorAll('.lozad');

if (lazyload.length) {
    lazyload.forEach(el => {
        const observer = lozad(el); // lazy loads elements with default selector as '.lozad'
        observer.observe();
    })

}

const header = document.querySelector('header.header')

document.onscroll = function (e) {
    if (window.scrollY > 30) {
        header.classList.add('header-fixed');
    } else {
        header.classList.remove('header-fixed');
    }
}

const anim = document.querySelectorAll('.anim');

if (anim.length) {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const el = entry.target
            if (entry.isIntersecting) {
                el.style.animationDelay = el.dataset.animDel + 'ms'
                el.style.animationDuration = el.dataset.animDur + 'ms'
                el.style.animationName = el.dataset.animName
                observer.unobserve(el)
            }
        }, {threshold: .2})
    })

    anim.forEach(el => {
        observer.observe(el)
    })
}
