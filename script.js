// Smooth scrolling for navigation links
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

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards, skill categories, and goal items for animation
document.querySelectorAll('.project-card, .skill-category, .goal-item, .certification-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active styling to navigation
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #2563eb;
        border-bottom: 2px solid #2563eb;
        padding-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);

// Project Modal Functionality
const projectData = {
    1: {
        title: 'Bettermomsh Landing Page',
        description: 'During my internship, I designed and built the landing page and home page for the Bettermomsh website, ensuring responsive layouts, intuitive user flow, and consistent branding across the platform.',
        image: 'assets/projects/project1.png',
        tags: ['HTML', 'CSS', 'JavaScript']
    },
    2: {
        title: 'PacePoint Admin Platform',
        description: 'During my internship, I developed the superadmin and admin interfaces for the PacePoint platform, implementing role-based access features, management tools, and responsive UI components.',
        image: 'assets/projects/project2.png',
        tags: ['React', 'Node.js', 'MongoDB']
    }
};

const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');
const viewProjectBtns = document.querySelectorAll('.view-project');

// Open modal when "View Project" is clicked
viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            
            modalBody.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="modal-project-image">
                <h2 class="modal-project-title">${project.title}</h2>
                <p class="modal-project-description">${project.description}</p>
                <div class="modal-project-tags">
                    ${tagsHTML}
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal when X is clicked
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

