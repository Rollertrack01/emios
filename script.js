// JavaScript Completo para Emios

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Menu Mobile =====
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Toggle menu ao clicar no botão
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Previne scroll quando menu está aberto
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }

    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target);
        const isClickOnToggle = mobileMenu && mobileMenu.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Fechar menu ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // ===== Header com Scroll =====
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== Scroll to Top Button =====
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Smooth Scroll para Links Internos =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Animação de Contadores (Estatísticas) =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // Observador para animar quando visível
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ===== Animação ao Scroll (Fade In) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Adicionar classe fade-in aos elementos
    const animateElements = document.querySelectorAll('.card, .service-item, .curso-item, .mv-item, .feature-item, .testimonial-card, .stat-item');
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        fadeInObserver.observe(element);
    });

    // ===== Validação do Formulário de Contato =====
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            const mensagem = document.getElementById('mensagem');
            
            // Reset de erros
            clearErrors();
            
            let isValid = true;
            
            // Validação do nome
            if (nome && nome.value.trim() === '') {
                showError(nome, 'Por favor, preencha o seu nome.');
                isValid = false;
            }
            
            // Validação do email
            if (email && !isValidEmail(email.value.trim())) {
                showError(email, 'Por favor, insira um email válido.');
                isValid = false;
            }
            
            // Validação da mensagem
            if (mensagem && mensagem.value.trim() === '') {
                showError(mensagem, 'Por favor, escreva uma mensagem.');
                isValid = false;
            }
            
            if (isValid) {
                // Simulação de envio
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    alert('✅ Mensagem enviada com sucesso! Entraremos em contacto em breve.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }

    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email !== '' && emailRegex.test(email);
    }

    // Função para mostrar erro
    function showError(input, message) {
        input.style.borderColor = '#dc3545';
        
        // Remove erro anterior se existir
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
        
        // Remove o erro ao digitar
        input.addEventListener('input', function() {
            input.style.borderColor = '#e0e0e0';
            const error = input.parentElement.querySelector('.error-message');
            if (error) error.remove();
        });
    }

    // Função para limpar erros
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
            input.style.borderColor = '#e0e0e0';
        });
    }

    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                alert('✅ Obrigado por se inscrever! Você receberá nossas novidades em breve.');
                emailInput.value = '';
            } else {
                alert('❌ Por favor, insira um email válido.');
            }
        });
    }

    // ===== Hero Scroll Indicator =====
    const heroScroll = document.querySelector('.hero-scroll');
    
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const nextSection = document.querySelector('.services');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===== Parallax Effect no Hero =====
    const hero = document.querySelector('.hero');
    
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            hero.style.backgroundPositionY = rate + 'px';
        });
    }

    // ===== Active Link no Menu =====
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveLink();

    // ===== Prevenção de Links Vazios =====
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ===== Log de Boas-vindas =====
    console.log('%c🚀 Bem-vindo ao Emios! ', 'background: #0d6efd; color: white; font-size: 20px; padding: 10px;');
    console.log('%c💡 Transformando dados em soluções inteligentes', 'color: #0d6efd; font-size: 14px;');
});
