 function handleSubmit(event) {
        event.preventDefault();
        
        const btn = event.target.querySelector('.submit-btn');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        
        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                event.target.reset();
            }, 2000);
        }, 1500);
    }

    // Add floating animation to icons
    document.querySelectorAll('.icon').forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        icon.style.animation = 'float 3s ease-in-out infinite';
    });

    // Add CSS keyframes for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);

    // Add input focus effects
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(5px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });

    // Add hover effects to skill tags//
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = '#a09f9f';
            this.style.color = '#ffeaa7';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.background = '#ffeaa7';
            this.style.color = '#f5f5dc'
        });
    });
    //Add typing animation to the name//
    const nameElement = document.querySelector('.name');
    const nameText = 'TOSIN';
    nameElement.textContent = '';

    let i = 0
    const typeInterval = setInterval(() => {
        nameElement.textContent += nameText[i];
        i++;
        if( i >= nameText.length) {
            clearInterval(typeInterval);
        }
    }, 200);

