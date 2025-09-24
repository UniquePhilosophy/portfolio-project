document.addEventListener('DOMContentLoaded', () => {
    // --- Page Navigation ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // --- Corrected Typewriter Setup ---
    let aboutHasBeenTyped = false;
    const aboutTextElement = document.querySelector('#about .about-text');
    let aboutContent = ''; // Variable to hold the original text

    // 1. Store the original content and then clear the element
    if (aboutTextElement) {
        aboutContent = aboutTextElement.innerHTML;
        aboutTextElement.innerHTML = '';
    }

    function typewriter(element, htmlString, callback) {
        element.innerHTML = '';
        element.classList.add('typing-cursor');
        let i = 0;
        const textNode = element.querySelector('.about-text') || element;
        textNode.innerHTML = '';

        function type() {
            if (i < htmlString.length) {
                let char = htmlString.charAt(i);
                if (char === '<') {
                    const endIndex = htmlString.indexOf('>', i);
                    textNode.innerHTML += htmlString.substring(i, endIndex + 1);
                    i = endIndex;
                } else {
                    textNode.innerHTML += char;
                }
                let delay = Math.random() * 20 + 10;
                if (char === '.' || char === '!') delay += 400;
                if (char === ',') delay += 150;
                i++;
                setTimeout(type, delay);
            } else {
                element.classList.remove('typing-cursor');
                if (callback) callback();
            }
        }
        type();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            if (targetId === 'home') {
                document.body.classList.remove('blur-background');
            } else {
                document.body.classList.add('blur-background');
            }

            pages.forEach(page => {
                page.classList.toggle('active', page.id === targetId);
            });

            navLinks.forEach(navLink => {
                navLink.classList.toggle('active', navLink.getAttribute('href') === `#${targetId}`);
            });

            // 2. Only run the typewriter on the first click, using the stored content
            if (targetId === 'about' && !aboutHasBeenTyped) {
                aboutHasBeenTyped = true;
                typewriter(aboutTextElement, aboutContent); 
            }
        });
    });

    // --- Contact Form Logic ---
    const emailCardBtn = document.getElementById('email-card-btn');
    const backBtn = document.getElementById('form-back-btn');
    const cardsView = document.getElementById('contact-cards-view');
    const formView = document.getElementById('contact-form-view');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    emailCardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cardsView.classList.add('hidden');
        formView.classList.remove('hidden');
    });

    backBtn.addEventListener('click', () => {
        formView.classList.add('hidden');
        cardsView.classList.remove('hidden');
        formStatus.classList.remove('success', 'error');
        formStatus.style.display = 'none';
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        formStatus.style.display = 'block';
        formStatus.textContent = 'Sending...';
        formStatus.className = '';

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                formStatus.textContent = "Message sent successfully! Thanks for reaching out.";
                formStatus.className = 'success';
                contactForm.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "Oops! There was a problem submitting your form.";
                    }
                    formStatus.className = 'error';
                });
            }
        }).catch(error => {
            formStatus.textContent = "Oops! There was a network error. Please try again.";
            formStatus.className = 'error';
        });
    });
});