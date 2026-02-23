document.addEventListener('DOMContentLoaded', function(){
        /*Easy selector helper function */
        const select = (el, all = false) => {
                if (!el || typeof el !== 'string') return null;
                el = el.trim();
                if (all) {
                        return [...document.querySelectorAll(el)];
                } else {
                        return document.querySelector(el);
                }
        }
        /* Easy event listener function */
        const on = (type, el, listener, all = false) => {
                let selectEl = select(el, all)
                if (selectEl) {
                if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                selectEl.addEventListener(type, listener)
                }
                }
        }
        /* Easy on scroll event listener  */
        const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
        }
        
        // хедер при при скролле 
        let selectHeader = select('.header')
        if (selectHeader) {
        const headerScrolled = () => {
        if (window.scrollY > 100) {
                selectHeader.classList.add('scrolling')
        } else {
                selectHeader.classList.remove('scrolling')
        }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(window, headerScrolled)
        }
        
        // якоря супер jisht daje for loading lazy images
        document.body.addEventListener('click', function(e) {
        if (!e.target.matches('.js-scrollTo')) return;
        let href = e.target.getAttribute('href');
        if (!href) return;
        if (href.startsWith('/')) href = href.slice(1);
        if (href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (!targetElement) return;

                e.preventDefault();

                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const duration = 800; // Faster scroll (800ms)
                const start = window.scrollY;
                let startTime = null;

                function easeInOutQuad(t) {
                return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
                }

                function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeInOutQuad(progress);

                // Recalculate target position dynamically
                const targetY = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                const scrollTo = start + (targetY - start) * easedProgress;

                window.scrollTo(0, scrollTo);

                if (progress < 1) {
                        requestAnimationFrame(step);
                }
                }

                requestAnimationFrame(step);
        }
        }, true);


        // modal 
        document.addEventListener('click', function (e) {
        if (!e.target.matches('[data-show-modal]')) return;
        else{
                e.preventDefault();
                var modal = document.querySelectorAll('#'+e.target.dataset.id);
                Array.prototype.forEach.call(modal, function (el) {
                        el.classList.add('active');
                });
        }
        });
        document.addEventListener('click', function (e) {
                if (!e.target.matches('[data-close-modal]')) return;
                else{
                e.target.closest('.modal').classList.remove('active');
                }
        });

        // observer animation with data-delay 
        const inViewport = (entries, observer) => {
        entries.forEach(entry => {
                const el = entry.target;

                el.classList.toggle("is-inViewport", entry.isIntersecting);

                if (entry.isIntersecting && !el.classList.contains('watched')) {
                let delay = el.getAttribute('data-delay');
                if (window.innerWidth < 992 && delay) {
                        const delayNum = parseFloat(delay) || 0;
                        delay = Math.min(delayNum, 0.2) + 's';
                }

                if (delay) {
                        el.style.transitionDelay = delay;
                        el.style.animationDelay = delay;
                }

                el.classList.add("watched");
                }
        });
        };
        let ioConfiguration = {
        rootMargin: '0% 0% 0% 0%',
        threshold: 0.2
        };
        const Obs = new IntersectionObserver(inViewport, ioConfiguration);
        document.querySelectorAll('[data-inviewport]').forEach(EL => {
        Obs.observe(EL);
        });

})
