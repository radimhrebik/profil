// DYNAMICKÁ DATA PORTFOLIA (Tady si můžeš nahrávat fotky v libovolném množství a pořadí)
// Přidat novou fotku je hrozně snadné: stačí zkopírovat jeden blok {} a přepsat v něm hodnoty.
const portfolioData = [
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

// FUNKCE PRO AUTOMATICKÉ VYGENEROVÁNÍ GALERIE
function renderPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = ""; // Vyčistíme mřížku

    portfolioData.forEach((item, index) => {
        // Vytvoříme HTML strukturu pro každou kartu
        const card = document.createElement('div');
        card.className = "grid-item";
        // Nastavíme, aby se po kliknutí otevřel detail fotky s jejím indexem
        card.setAttribute('onclick', `openLightbox(${index})`);

        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="item-img" onerror="this.src='https://placehold.co/600x400/222/555?text=Chybi+Fotka'">
            <div class="item-info">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// PŘEPÍNÁNÍ SEKCI (PORTFOLIO / KONTAKT)
function switchSection(sectionId) {
    // Skryjeme všechny sekce a odebereme aktivní třídu z tlačítek
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Zobrazíme vybranou sekci a aktivujeme odpovídající tlačítko
    document.getElementById(`${sectionId}-section`).classList.add('active');
    
    // Najdeme tlačítko, které volalo akci, a označíme ho jako aktivní
    event.currentTarget.classList.add('active');
}

// OTEVŘENÍ DETAILU (LIGHTBOXU)
function openLightbox(index) {
    const item = portfolioData[index];
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    // Vyplníme data do zvětšeného okna
    lightboxImg.src = item.image;
    // Pokud obrázek neexistuje, nahradíme ho šedým zástupným obrázkem
    lightboxImg.onerror = function() {
        this.src = 'https://placehold.co/800x600/222/555?text=Fotka+Nenalezena';
    };
    
    lightboxTitle.innerText = item.title;
    lightboxDesc.innerText = item.desc;

    // Zobrazíme lightbox (změníme styl na flex pro centrování)
    lightbox.style.display = 'flex';
}

// ZAVŘENÍ DETAILU (LIGHTBOXU)
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Spustíme vykreslení portfolia ihned po načtení stránky
window.onload = renderPortfolio;
