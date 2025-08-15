document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if(window.scrollY > 50) {
                navbar.style.background = 'rgba(26,26,26,0.95)';
                navbar.style.padding = '0.5rem 0';
            }else {
                navbar.style.background = 'rgba(26,26,26,0.95)';
                navbar.style.padding = '1rem 0';
            }
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');

            if (!name || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }

            const submitBtn = this.querySelector('.submit-Btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...' ;
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your reservation request! We will contact you within 24 hours to confirm your booking.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        document.querySelector('.mobile-menu').addEventListener('click', function() {
            console.log('Mobile menu clicked - implement mobile navigation');
        });

        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px)';
            });
        });