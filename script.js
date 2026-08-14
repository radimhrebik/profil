// DYNAMICKÁ DATA PRO FOTOGALERII
const galleryData = [
    {
        images: ["fotky/vez.jpg"],
        title: "Věž kostela sv. Maří Magdalény v Blatě ⛪",
        desc: "Pohled na menší věž kostelu v Blatě u Nové Bystřice. Slunce v daný moment zašlo za mrak, a proto se zde ukazují tmavší odstíny a na pozadí modrá obloha."
    },
    {
        images: [
            "fotky/zetor.JPG",
            "fotky/zetor2.JPG"
        ],
        title: "Pohled na Zetor 6340 🚜",
        desc: "Soubor fotografií zachycující Zetor 6340 v horším kosmetickém stavu. Fotografie pořízeny pod ostrým dopoledním sluncem."
    },
    {
        images: ["fotky/landstejn.JPG"],
        title: "Zeď hradu Landštejn 🏰",
        desc: "Pozdější odpolední fotografie pod zapadajícím sluncem, focena skoro od země. Cílem bylo zachytit pocit krásné stavby a její historickou atmosféru."
    }
];

// DYNAMICKÁ DATA PORTFOLIA (Více fotek na jeden projekt)
const portfolioData = [
    {
        images: [],
        title: "---",
        desc: "---"
    },
   
];

// Proměnné pro sledování stavu v lightboxu
let currentSectionData = null;
let currentItemIndex = 0;
let currentImageIndex = 0;

// POMOCNÁ FUNKCE PRO PROKRESLENÍ MŘÍŽKY (S ODZNAKEM PRO VÍCE FOTEK)
function renderGrid(containerId, dataArray, sectionType) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = "";

    dataArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "grid-item";
        card.setAttribute('onclick', `openLightbox('${sectionType}', ${index})`);

        // Náhledový obrázek (použije se první fotka z pole images)
        const coverImg = (item.images && item.images.length > 0) ? item.images[0] : "";
        const imgCount = item.images ? item.images.length : 0;

        // Pokud je fotek více než 1, vytvoříme odznak (badge)
        const countBadge = imgCount > 1 
            ? `<span class="badge-multi-photo">🖼️ ${imgCount}</span>` 
            : '';

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${coverImg}" alt="${item.title}" class="item-img" onerror="this.src='https://placehold.co/600x400/222/555?text=Chybi+Fotka'">
                ${countBadge}
            </div>
            <div class="item-info">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// VYKRESLENÍ VŠECH GALERIÍ
function renderAllSections() {
    renderGrid('gallery-grid', galleryData, 'gallery');
    renderGrid('portfolio-grid', portfolioData, 'portfolio');
}

// PŘEPÍNÁNÍ SEKCE (FOTOGALERIE / PORTFOLIO / KONTAKT)
function switchSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(`${sectionId}-section`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// OTEVŘENÍ DETAILU (LIGHTBOXU)
function openLightbox(sectionType, index) {
    currentSectionData = sectionType === 'gallery' ? galleryData : portfolioData;
    currentItemIndex = index;
    currentImageIndex = 0; // Začínáme od první fotky

    updateLightboxImage();

    const item = currentSectionData[currentItemIndex];
    document.getElementById('lightbox-title').innerText = item.title;
    document.getElementById('lightbox-desc').innerText = item.desc;

    document.getElementById('lightbox').style.display = 'flex';
}

// AKTUALIZACE ZOBRAZENÉ FOTKY A ŠIPEK
function updateLightboxImage() {
    const item = currentSectionData[currentItemIndex];
    const lightboxImg = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const totalImages = item.images ? item.images.length : 0;

    if (totalImages > 0) {
        lightboxImg.src = item.images[currentImageIndex];
        lightboxImg.onerror = function() {
            this.src = 'https://placehold.co/800x600/222/555?text=Fotka+Nenalezena';
        };
    }

    // Pokud je více než 1 fotka, zobrazíme šipky a počítadlo
    if (totalImages > 1) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        counter.style.display = 'block';
        counter.innerText = `${currentImageIndex + 1} / ${totalImages}`;
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        counter.style.display = 'none';
    }
}

// POSUN MEZI FOTKAMI (ŠIPKY)
function changeImage(direction) {
    const item = currentSectionData[currentItemIndex];
    const totalImages = item.images.length;

    currentImageIndex += direction;

    // Cyklení (z poslední fotky zpět na první a naopak)
    if (currentImageIndex >= totalImages) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 1;
    }

    updateLightboxImage();
}

// ZAVŘENÍ DETAILU
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Spuštění po načtení
window.onload = renderAllSections;
