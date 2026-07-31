let videosExpanded = false;

function createPortfolioCard({ title, description, media, mediaType, link }) {
    const card = document.createElement('article');
    card.className = 'surface-card portfolio-card';

    const mediaElement = document.createElement(mediaType === 'video' ? 'video' : 'img');
    if (mediaType === 'video') {
        mediaElement.src = media;
        mediaElement.controls = true;
        mediaElement.preload = 'metadata';
        mediaElement.setAttribute('aria-label', `${title} video showcase`);
    } else {
        mediaElement.src = media;
        mediaElement.alt = `${title} project preview`;
        mediaElement.loading = 'lazy';
    }

    const content = document.createElement('div');
    content.className = 'portfolio-content';
    const heading = document.createElement('h3');
    heading.textContent = title;
    const copy = document.createElement('p');
    copy.textContent = description;
    content.append(heading, copy);

    if (link) {
        const action = document.createElement('a');
        action.className = 'btn btn-secondary';
        action.href = link;
        action.target = '_blank';
        action.rel = 'noopener noreferrer';
        action.textContent = 'View source';
        content.appendChild(action);
    }

    card.append(mediaElement, content);
    return card;
}

function buildVideoCard(data) {
    return createPortfolioCard({
        title: data.Title,
        description: data.Description,
        media: data.Video,
        mediaType: 'video'
    });
}

async function fetchVideo(fileName) {
    try {
        const response = await fetch(`json/videoJson/${fileName}`);
        return await response.json();
    } catch (e) {
        console.error("Error loading video JSON:", fileName, e);
        return null;
    }
}

function updateShowAllVisibility() {
    const wrap = document.getElementById('show-all-wrap');
    const videoGrid = document.getElementById('video-grid');
    if (!wrap) return;

    const videosTabActive = videoGrid?.classList.contains('active-tab');
    const hasMore = PortfolioData.videoFiles.length > PortfolioData.featuredVideoFiles.length;
    wrap.classList.toggle('is-visible', videosTabActive && !videosExpanded && hasMore);
}

function showTab(type, shouldFocus = false) {
    const targetGrid = document.getElementById(type === 'videos' ? 'video-grid' : 'os-grid');
    const targetButton = document.querySelector(`.tab-btn[data-tab="${type}"]`);

    document.querySelectorAll('.grid').forEach(grid => {
        const isSelected = grid === targetGrid;
        grid.classList.toggle('active-tab', isSelected);
        grid.hidden = !isSelected;
    });
    document.querySelectorAll('.tab-btn').forEach(button => {
        const isSelected = button === targetButton;
        button.classList.toggle('active', isSelected);
        button.setAttribute('aria-selected', String(isSelected));
        button.tabIndex = isSelected ? 0 : -1;
    });

    if (shouldFocus) targetButton?.focus();
    updateShowAllVisibility();
}

async function loadFeaturedVideos() {
    const videoGrid = document.getElementById('video-grid');
    if (!videoGrid) return;

    const results = await Promise.all(PortfolioData.featuredVideoFiles.map(fetchVideo));
    results.forEach(data => {
        if (data) videoGrid.appendChild(buildVideoCard(data));
    });
}

async function loadRemainingVideos() {
    const videoGrid = document.getElementById('video-grid');
    if (!videoGrid) return;

    const remaining = PortfolioData.videoFiles.filter(
        f => !PortfolioData.featuredVideoFiles.includes(f)
    );
    const results = await Promise.all(remaining.map(fetchVideo));
    results.forEach(data => {
        if (data) {
            const card = buildVideoCard(data);
            card.classList.add('video-card-reveal');
            videoGrid.appendChild(card);
        }
    });
}

async function showAllVideos() {
    if (videosExpanded) return;
    videosExpanded = true;

    const btn = document.getElementById('show-all-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerText = 'Loading...';
    }

    await loadRemainingVideos();
    updateShowAllVisibility();
}

async function loadOpenSource() {
    const osGrid = document.getElementById('os-grid');
    if (!osGrid) return;

    for (const fileName of PortfolioData.openSourceFiles) {
        try {
            const response = await fetch(`json/osJson/${fileName}`);
            const data = await response.json();
            osGrid.appendChild(createPortfolioCard({
                title: data.Title,
                description: data.Description || 'Open source Roblox module.',
                media: data.Image,
                mediaType: 'image',
                link: data.Link
            }));
        } catch (e) {
            console.error("Error loading OS JSON:", e);
        }
    }
}

function bindPortfolioControls() {
    const tabs = [...document.querySelectorAll('.tab-btn[data-tab]')];
    tabs.forEach((btn, index) => {
        btn.tabIndex = index === 0 ? 0 : -1;
        btn.addEventListener('click', () => showTab(btn.dataset.tab));
        btn.addEventListener('keydown', event => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            let nextIndex = index;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = tabs.length - 1;
            showTab(tabs[nextIndex].dataset.tab, true);
        });
    });

    document.getElementById('show-all-btn')?.addEventListener('click', showAllVideos);
}

export async function initPortfolio() {
    bindPortfolioControls();
    await loadFeaturedVideos();
    await loadOpenSource();
    updateShowAllVisibility();
}
