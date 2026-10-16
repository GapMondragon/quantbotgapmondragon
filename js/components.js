// Quantbot Technologies - Core Interactive Components & Behavior
// Minimalist, robust, institutional UI logic

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModals();
  initTabs();
  initAccordion();
  initContactForm();
  initCareers();
  initNewsFilter();
  initBlogFilter();
  initSmoothScroll();
  initScrollReveals();
});

// Navigation Handling
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  // Sticky header class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  function openMobileMenu() {
    mobileToggle?.classList.add('active');
    mobileDrawer?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle?.classList.remove('active');
    mobileDrawer?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Highlight active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown-link, .mobile-nav-link, .mobile-submenu-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Modal System (Team bios, Careers application, Blog/News preview, Contact feedback)
function initModals() {
  const modalOverlay = document.querySelector('#global-modal');
  if (!modalOverlay) return;

  const modalBody = modalOverlay.querySelector('.modal-body');
  const closeBtn = modalOverlay.querySelector('.modal-close');

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  window.openModal = function(htmlContent) {
    if (modalBody) modalBody.innerHTML = htmlContent;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Team Read More Delegation
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.team-read-more');
    if (!btn) return;

    const memberName = btn.dataset.member;
    const member = window.QuantbotData?.teamMembers?.find(m => m.name === memberName);
    if (!member) return;

    const modalHTML = `
      <div style="display:flex; align-items:center; gap:20px; margin-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:20px;">
        <img src="${member.image}" alt="${member.name}" style="width:90px; height:90px; border-radius:50%; object-fit:cover; border:2px solid var(--accent-mint); background:#031d44;">
        <div>
          <h2 style="font-size:1.6rem; color:#fff; text-transform:uppercase; margin-bottom:4px;">${member.name}</h2>
          <span style="color:var(--accent-mint); font-weight:600; font-size:1rem;">${member.role}</span>
        </div>
      </div>
      <div style="color:var(--text-secondary); line-height:1.75; font-size:1.025rem;">
        <p>${member.bio}</p>
      </div>
    `;
    window.openModal(modalHTML);
  });
}

// Tabs Component (POC & QMM Setup)
function initTabs() {
  const tabsContainer = document.querySelector('.tabs-layout');
  if (!tabsContainer) return;

  const tabBtns = tabsContainer.querySelectorAll('.tab-btn');
  const tabPanes = tabsContainer.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = tabsContainer.querySelector(`#tab-${targetId}`);
      if (activePane) activePane.classList.add('active');
    });
  });
}

// Accordion (FAQ / Q&A)
function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}

// Careers Job Board Filter & Application Modal
function initCareers() {
  const careersList = document.querySelector('#job-openings-list');
  if (!careersList) return;

  const deptChips = document.querySelectorAll('[data-dept-filter]');
  const searchInput = document.querySelector('#careers-search');

  function renderJobs() {
    const selectedDept = document.querySelector('[data-dept-filter].active')?.dataset.deptFilter || 'all';
    const query = (searchInput?.value || '').toLowerCase().trim();

    const jobs = window.QuantbotData?.jobOpenings || [];
    const filtered = jobs.filter(job => {
      const matchesDept = selectedDept === 'all' || job.department.toLowerCase().includes(selectedDept.toLowerCase());
      const matchesSearch = !query || job.title.toLowerCase().includes(query) || job.description.toLowerCase().includes(query);
      return matchesDept && matchesSearch;
    });

    if (filtered.length === 0) {
      careersList.innerHTML = `<div style="text-align:center; padding:48px; color:var(--text-muted); background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-card);">No open roles matching your search criteria. Please contact <strong>${window.QuantbotData.brand.careersEmail}</strong> for exploratory discussions.</div>`;
      return;
    }

    careersList.innerHTML = filtered.map(job => `
      <div class="card" style="margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:12px;">
          <div>
            <h3 style="font-size:1.35rem; color:#fff; margin-bottom:6px;">${job.title}</h3>
            <div style="display:flex; gap:12px; font-size:0.875rem; color:var(--accent-mint); font-weight:600; flex-wrap:wrap;">
              <span><i class="fa fa-briefcase"></i> ${job.department}</span>
              <span><i class="fa fa-map-marker-alt"></i> ${job.locations.join(', ')}</span>
              <span><i class="fa fa-clock"></i> ${job.type}</span>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="openJobModal('${job.id}')">Apply Now</button>
        </div>
        <p style="color:var(--text-secondary); margin-bottom:16px;">${job.description}</p>
        <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:12px;">
          <strong style="color:var(--text-primary); font-size:0.9rem;">Key Requirements:</strong>
          <ul style="margin:8px 0 0 20px; color:var(--text-secondary); font-size:0.9rem;">
            ${job.requirements.map(req => `<li style="margin-bottom:4px;">${req}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  deptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      deptChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderJobs();
    });
  });

  searchInput?.addEventListener('input', renderJobs);
  renderJobs();

  window.openJobModal = function(jobId) {
    const job = window.QuantbotData?.jobOpenings?.find(j => j.id === jobId);
    if (!job) return;

    const modalHTML = `
      <div style="margin-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:16px;">
        <span style="color:var(--accent-mint); text-transform:uppercase; font-size:0.8rem; letter-spacing:2px; font-weight:700;">Application Form</span>
        <h2 style="font-size:1.5rem; color:#fff; margin-top:4px;">${job.title}</h2>
        <p style="color:var(--text-muted); font-size:0.9rem;">${job.locations.join(', ')} · ${job.department}</p>
      </div>
      <form id="job-apply-form" onsubmit="handleJobSubmit(event, '${job.title}')">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-control" required placeholder="Jane Doe">
          </div>
          <div class="form-group">
            <label class="form-label">Email Address *</label>
            <input type="email" class="form-control" required placeholder="jane@example.com">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" class="form-control" placeholder="+1 (555) 000-0000">
          </div>
          <div class="form-group">
            <label class="form-label">Preferred Location</label>
            <select class="form-control">
              ${job.locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">LinkedIn / GitHub Profile URL</label>
          <input type="url" class="form-control" placeholder="https://linkedin.com/in/username">
        </div>
        <div class="form-group">
          <label class="form-label">Brief Background / Cover Note</label>
          <textarea class="form-control" rows="4" placeholder="Highlight your relevant research, algorithmic systems, or quantitative background..."></textarea>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm">Submit Application</button>
        </div>
      </form>
    `;
    window.openModal(modalHTML);
  };

  window.handleJobSubmit = function(e, roleTitle) {
    e.preventDefault();
    const form = document.querySelector('#job-apply-form');
    if (form) {
      form.innerHTML = `
        <div style="text-align:center; padding:36px 12px;">
          <div style="width:64px; height:64px; border-radius:50%; background:rgba(96,162,68,0.2); border:2px solid var(--accent-mint); color:var(--accent-mint); font-size:2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">✓</div>
          <h3 style="color:#fff; font-size:1.4rem; margin-bottom:8px;">Application Received</h3>
          <p style="color:var(--text-secondary); line-height:1.6; max-width:440px; margin:0 auto 24px;">Thank you for your interest in the <strong>${roleTitle}</strong> position. Our recruiting team will review your qualifications and contact you promptly.</p>
          <button class="btn btn-primary btn-sm" onclick="closeModal()">Close</button>
        </div>
      `;
    }
  };
}

// News Filter
function initNewsFilter() {
  const newsGrid = document.querySelector('#news-articles-grid');
  if (!newsGrid) return;

  const searchInput = document.querySelector('#news-search');
  const articles = window.QuantbotData?.newsArticles || [];

  function renderNews() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const filtered = articles.filter(item => {
      return !query || item.title.toLowerCase().includes(query) || item.source.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      newsGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:48px; color:var(--text-muted); background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-card);">No news articles found matching your query.</div>`;
      return;
    }

    newsGrid.innerHTML = filtered.map(item => `
      <div class="article-card">
        <div class="article-body">
          <div class="article-meta">
            <span><i class="fa fa-newspaper"></i> ${item.source}</span>
            <span>·</span>
            <span>${item.date}</span>
          </div>
          <h3 class="article-title"><a href="${item.url}" target="_blank" rel="noopener">${item.title}</a></h3>
          <p class="article-excerpt">${item.summary}</p>
          <div style="margin-top:auto;">
            <a href="${item.url}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="width:100%;">Read Full Story <i class="fa fa-external-link-alt" style="font-size:0.75rem;"></i></a>
          </div>
        </div>
      </div>
    `).join('');
  }

  searchInput?.addEventListener('input', renderNews);
  renderNews();
}

// Blog Filter & Reader
function initBlogFilter() {
  const blogGrid = document.querySelector('#blog-posts-grid');
  if (!blogGrid) return;

  const searchInput = document.querySelector('#blog-search');
  const catChips = document.querySelectorAll('[data-blog-cat]');
  const posts = window.QuantbotData?.blogPosts || [];

  function renderBlog() {
    const selectedCat = document.querySelector('[data-blog-cat].active')?.dataset.blogCat || 'all';
    const query = (searchInput?.value || '').toLowerCase().trim();

    const filtered = posts.filter(post => {
      const matchesCat = selectedCat === 'all' || post.category.toLowerCase().includes(selectedCat.toLowerCase());
      const matchesSearch = !query || post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      blogGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:48px; color:var(--text-muted); background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-card);">No blog posts found matching your criteria.</div>`;
      return;
    }

    blogGrid.innerHTML = filtered.map(post => `
      <div class="article-card">
        <img src="${post.image}" alt="${post.title}" class="article-img">
        <div class="article-body">
          <div class="article-meta">
            <span>${post.category}</span>
            <span>·</span>
            <span>${post.date}</span>
          </div>
          <h3 class="article-title"><a href="javascript:void(0)" onclick="openPostModal('${post.id}')">${post.title}</a></h3>
          <p class="article-excerpt">${post.excerpt}</p>
          <div style="margin-top:auto;">
            <button class="btn btn-secondary btn-sm" onclick="openPostModal('${post.id}')" style="width:100%;">Read Article</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderBlog();
    });
  });

  searchInput?.addEventListener('input', renderBlog);
  renderBlog();

  window.openPostModal = function(postId) {
    const post = window.QuantbotData?.blogPosts?.find(p => p.id === postId);
    if (!post) return;

    const modalHTML = `
      <div style="margin-bottom:20px;">
        <span style="color:var(--accent-mint); font-weight:700; text-transform:uppercase; font-size:0.85rem; letter-spacing:2px;">${post.category} · ${post.date}</span>
        <h2 style="font-size:1.8rem; color:#fff; margin:10px 0 16px;">${post.title}</h2>
        <img src="${post.image}" alt="${post.title}" style="width:100%; max-height:360px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:24px; border:1px solid var(--border-card);">
      </div>
      <div style="color:var(--text-secondary); line-height:1.8; font-size:1.05rem;">
        ${post.content}
      </div>
    `;
    window.openModal(modalHTML);
  };
}

// Contact Form Handling with instant validation & feedback
function initContactForm() {
  const form = document.querySelector('#main-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = form.querySelector('[name="first-name"]')?.value || '';
    const lastName = form.querySelector('[name="last-name"]')?.value || '';
    const inquiry = form.querySelector('[name="inquiry-about"]')?.value || '';

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Sending...`;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      const confirmationHTML = `
        <div style="text-align:center; padding:36px 16px;">
          <div style="width:70px; height:70px; border-radius:50%; background:rgba(96,162,68,0.2); border:2px solid var(--accent-mint); color:var(--accent-mint); font-size:2.2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">✓</div>
          <h2 style="color:#fff; font-size:1.6rem; margin-bottom:10px;">Message Delivered</h2>
          <p style="color:var(--text-secondary); line-height:1.6; max-width:440px; margin:0 auto 24px;">
            Thank you, <strong>${firstName} ${lastName}</strong>. Your inquiry regarding <strong>${inquiry}</strong> has been forwarded to our team at <strong>info@quantbot.com</strong>. We will review your message and get in touch with you shortly.
          </p>
          <button class="btn btn-primary" onclick="closeModal()">Close</button>
        </div>
      `;
      window.openModal(confirmationHTML);
      form.reset();
    }, 800);
  });
}

// Smooth scrolling with Lenis
function initSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    try {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      window.lenis = lenis;
    } catch (_) {}
  }
}

// Subtle intersection observer for graceful content reveal
function initScrollReveals() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.card, .feature-item, .step-card, .location-card, .section-header').forEach(el => {
    el.classList.add('fade-in-target');
    observer.observe(el);
  });
}
