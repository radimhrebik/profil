// DATA PRO FOTOGALERII (Zde můžeš nechat title a desc prázdné)

// Nezapomenou přiřazovat tagy!
// krajina technika architektura
const galleryData = [
    {
        images: ["fotky/vez.jpg"],
        title: "",
        desc: "",
        category: "architektura"
    },
    {
        images: [
            "fotky/zetor3.jpg",
            "fotky/zetor.JPG",
            "fotky/zetor2.JPG"

        ],
        title: "",
        desc: "",
        category:"technika"
    },
    {
        images: ["fotky/landstejn.JPG"],
        title: "",
        desc: "",
        category: "architektura"
    },
    {
        images: ["fotky/pole1111.jpg"],
        title: "",
        desc: "",
        category: "krajina"
    },
    {
        images: ["fotky/fortschritt.jpg"],
        title: "",
        desc: "",
        category: "technika"
    }
];

// DATA PORTFOLIA
const portfolioData = [
];

// Proměnné pro sledování stavu v lightboxu
let currentSectionData = null;
let currentItemIndex = 0;
let currentImageIndex = 0;

// vykreslení mřížky
function renderGrid(containerId, dataArray, sectionType) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = "";

    dataArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "grid-item";

        if (item.category) {
        card.setAttribute('data-category', item.category);
        }

        card.setAttribute('onclick', `openLightbox('${sectionType}', ${index})`);

        const coverImg = (item.images && item.images.length > 0) ? item.images[0] : "";
        const imgCount = item.images ? item.images.length : 0;

        const countBadge = imgCount > 1 
            ? `<span class="badge-multi-photo">🖼️ ${imgCount}</span>` 
            : '';

        const hasTitle = item.title && item.title.trim() !== "";
        const hasDesc = item.desc && item.desc.trim() !== "";

        // Pokud chybí název i popis, blok .item-info se vůbec nevytvoří
        const infoBlock = (hasTitle || hasDesc) ? `
            <div class="item-info">
                ${hasTitle ? `<h3>${item.title}</h3>` : ''}
                ${hasDesc ? `<p>${item.desc}</p>` : ''}
            </div>
        ` : '';

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${coverImg}" alt="${item.title || ''}" class="item-img" onerror="this.src='https://placehold.co/600x400/222/555?text=Chybi+Fotka'">
                ${countBadge}
            </div>
            ${infoBlock}
        `;
        
        grid.appendChild(card);
    });
}

function renderAllSections() {
    renderGrid('gallery-grid', galleryData, 'gallery');
    renderGrid('portfolio-grid', portfolioData, 'portfolio');
}

// PŘEPÍNÁNÍ SEKCE (FOTOGALERIE / PORTFOLIO / KONTAKT)
function switchSection(sectionId) {
    // Skryjeme všechny sekce a deaktivujeme záložky v menu
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Zobrazíme požadovanou sekci
    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Najdeme a zvýrazníme příslušné tlačítko v horním menu
    const matchingTab = document.querySelector(`.tab-btn[onclick*="'${sectionId}'"]`);
    if (matchingTab) {
        matchingTab.classList.add('active');
    }
}

function openLightbox(sectionType, index) {
    currentSectionData = sectionType === 'gallery' ? galleryData : portfolioData;
    currentItemIndex = index;
    currentImageIndex = 0;

    updateLightboxImage();
    document.getElementById('lightbox').style.display = 'flex';
}

function updateLightboxImage() {
    const item = currentSectionData[currentItemIndex];
    const lightboxImg = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    const captionBlock = document.querySelector('.lightbox-caption');
    const titleEl = document.getElementById('lightbox-title');
    const descEl = document.getElementById('lightbox-desc');

    const totalImages = item.images ? item.images.length : 0;

    if (totalImages > 0) {
        lightboxImg.src = item.images[currentImageIndex];
        lightboxImg.onerror = function() {
            this.src = 'https://placehold.co/800x600/222/555?text=Fotka+Nenalezena';
        };
    }

    const hasTitle = item.title && item.title.trim() !== "";
    const hasDesc = item.desc && item.desc.trim() !== "";
    const hasCounter = totalImages > 1;

    titleEl.innerText = item.title || "";
    titleEl.style.display = hasTitle ? "block" : "none";

    descEl.innerText = item.desc || "";
    descEl.style.display = hasDesc ? "block" : "none";

    if (hasCounter) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        counter.style.display = 'block';
        counter.innerText = `${currentImageIndex + 1} / ${totalImages}`;
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        counter.style.display = 'none';
    }

    // Pokud chybí název, popis i počítadlo fotek, skryje se celý spodní panel
    if (!hasTitle && !hasDesc && !hasCounter) {
        captionBlock.style.display = 'none';
    } else {
        captionBlock.style.display = 'block';
    }
}

function changeImage(direction) {
    const item = currentSectionData[currentItemIndex];
    const totalImages = item.images.length;

    currentImageIndex += direction;

    if (currentImageIndex >= totalImages) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 1;
    }

    updateLightboxImage();
}

// ... tvoje předchozí funkce (renderGrid, switchSection, closeLightbox atd.) ...

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// OTEVŘENÍ A ZAVŘENÍ OKNA "ABOUT ME" (PŘIDANÉ NAKONEC)
function openAboutModal() {
    document.getElementById('about-modal').style.display = 'flex';
}

function closeAboutModal() {
    document.getElementById('about-modal').style.display = 'none';
}

// Sledování stavu zvuku
let isAudioPlaying = false;

function toggleAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('audio-btn');
    const icon = btn.querySelector('i');

    if (audio.paused) {
        audio.volume = 0.2; // Nastavení hlasitosti na 20%
        
        audio.play().then(() => {
            // Přehrávání úspěšně začalo
            icon.className = 'fas fa-volume-high';
            btn.classList.add('playing');
        }).catch(error => {
            console.error("Chyba přehrávání:", error);
            alert("Zvuk se nepodařilo spustit. Zkontroluj, zda máš v projektu správnou cestu k MP3 souboru.");
        });
    } else {
        audio.pause();
        icon.className = 'fas fa-volume-mute';
        btn.classList.remove('playing');
    }
}

// KOPÍROVÁNÍ E-MAILU S TOAST HLÁŠKOU
function copyEmailToClipboard() {
    const email = "rada.hrebik@gmail.com";
    
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        
        // Po 2.5 sekundách hlášku opět skryjeme
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }).catch(err => {
        console.error("Chyba při kopírování:", err);
    });
}

// FILTROVÁNÍ FOTOGALERIE
function filterGallery(category) {
    // 1. Aktualizace aktivního tlačítka
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }

    const items = Array.from(document.querySelectorAll('#gallery-grid .grid-item'));

    // FÁZE 1 (First): Uložíme si původní pozice všech viditelných prvků
    const firstPositions = new Map();
    items.forEach(item => {
        if (item.style.display !== 'none') {
            firstPositions.set(item, item.getBoundingClientRect());
        }
    });

    // FÁZE 2: Okamžitá změna viditelnosti prvků v DOM
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category') || '';
        const matchesCategory = category === 'all' || itemCategory.includes(category);

        if (matchesCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // FÁZE 3 & 4 (Last, Invert, Play): Plynulý posun na nová místa
    requestAnimationFrame(() => {
        items.forEach(item => {
            if (item.style.display === 'none') return;

            const first = firstPositions.get(item);
            const last = item.getBoundingClientRect();

            // Pokud prvek existoval předtím i teď, animujeme jeho přesun
            if (first) {
                const deltaX = first.left - last.left;
                const deltaY = first.top - last.top;

                if (deltaX !== 0 || deltaY !== 0) {
                    // Vrátíme prvek vizuálně na starou pozici bez animace
                    item.style.transition = 'none';
                    item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

                    // V dalším snímku zapneme animaci a necháme jej sklouznout na novou pozici
                    requestAnimationFrame(() => {
                        item.style.transition = 'transform 0.5s cubic-bezier(0.2, 0, 0.2, 1), opacity 0.4s ease';
                        item.style.transform = 'translate(0, 0)';
                    });
                }
            } else {
                // Zcela nové fotky se plynule vynoří s jemným zvětšením
                item.style.transition = 'none';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';

                requestAnimationFrame(() => {
                    item.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                });
            }
        });
    });
}


window.onload = renderAllSections;
