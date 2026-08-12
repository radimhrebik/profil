// DYNAMICKÁ DATA PRO FOTOGALERII (Nová sekce před portfoliem)
const galleryData = [
    {
        image: "fotky/vez.jpg", // Název souboru tvé fotky v téže složce (může být i odkaz z internetu)
        title: "Věž kostela sv. Maří Magdalény v Blatě ⛪",
        desc: "Pohled na menší věž kostelu v Blatě u Nové Bystřice. Slunce v daný moment zašlo za mrak, a proto se zde ukazují tmavší odstíny a na pozadí modrá obloha."
    },
    {
        image: "fotky/zetor.JPG",
        title: "Kapota zemědělského stroje Zetor 6340 🚜",
        desc: "Detailní záběr staršího a zanedbaného stroje Zetor 6340. Pohled byl zachycen při dopoledních hodinách na ostrém slunci."
    },
    {
        image: "fotky/landstejn.JPG",
        title: "Zeď hradu Landštejn 🏰",
        desc: "Pozdější odpolední fotografie pod zapadajícím sluncem, focena skoro od země. Cílem bylo zachytit pocit krásné stavby a její historickou atmosféru."
    }
    // Sem můžeš pod sebe vkládat další a další položky podle stejného vzoru!
];

// DYNAMICKÁ DATA PROJEKTY (Portfolio)
const portfolioData = [
    {
        image: "fotky/",
        title: "---",
        desc: "---"
    }
];

// POMOCNÁ FUNKCE PRO PROKRESLENÍ MŘÍŽKY
function renderGrid(containerId, dataArray, sectionType) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = ""; // Vyčistíme mřížku

    dataArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "grid-item";
        card.setAttribute('onclick', `openLightbox('${sectionType}', ${index})`);

        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="item-img" onerror="this.src='https://placehold.co/600x400/222/555?text=Chybí+Fotka'">
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
    // Podle typu zvolíme správný zdroj dat
    const dataArray = sectionType === 'gallery' ? galleryData : portfolioData;
    const item = dataArray[index];
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    lightboxImg.src = item.image;
    lightboxImg.onerror = function() {
        this.src = 'https://placehold.co/800x600/222/555?text=Fotka+Nenalezena';
    };
    
    lightboxTitle.innerText = item.title;
    lightboxDesc.innerText = item.desc;

    lightbox.style.display = 'flex';
}

// ZAVŘENÍ DETAILU (LIGHTBOXU)
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Spustíme vykreslení po načtení stránky
window.onload = renderAllSections;
