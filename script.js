// DYNAMICKÁ DATA PORTFOLIA (Tady si můžeš nahrávat fotky v libovolném množství a pořadí)
// Přidat novou fotku je hrozně snadné: stačí zkopírovat jeden blok {} a přepsat v něm hodnoty.
const portfolioData = [
    {
        image: "fotky/pole.jpg", // Název souboru tvé fotky v téže složce (může být i odkaz z internetu)
        title: "Krajina obilného pole ☀️",
        desc: "Foceno v odpoledních hodinách, ještě s výraznějším sluncem. Cílem bylo zachytit krásné modré nebe a kontrastní barvy zralého obilí."
    },
    {
        image: "fotky/slunecnice1.jpg",
        title: "Slunečnice při slunci za mrakem. ☁️",
        desc: "Detailní záběr na skleněnou fasádu nové kancelářské budovy v Praze. Zaměřeno na odrazy nebe a geometrické tvary."
    },
    {
        image: "fotky/landstejn.jpg",
        title: "Zeď hradu Landštejn 🏰",
        desc: "Pozdější odpolední fotografie pod zapadajícím sluncem, focena skoro od země. Cílem bylo zachytit pocit krásné stavby a její historickou atmosféru."
    },
    {
        image: "fotky/fotka.jpg",
        title: "Design mobilní aplikace",
        desc: "Návrh uživatelského rozhraní (UI/UX) pro aplikaci sledující pitný režim. Čistý, minimalistický styl laděný do tmavých barev."
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
