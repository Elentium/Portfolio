const pricingData = [
    { name: "Feature commissions", price: "$50+", desc: "Single systems or tasks" },
    { name: "Simple gameplay", price: "$300+", desc: "Obbies, tycoons, basic loops" },
    { name: "Medium gameplay", price: "$750+", desc: "Platformers, racing, pet sims" },
    { name: "Complex gameplay", price: "$1500+", desc: "Combat, FPS, open world" },
    { name: "Anticheat", price: "$100+", desc: "Depends on the game" },
    { name: "Monetization", price: "$100+", desc: "Gamepasses, dev products, etc." }
];

export function initPricing() {
    const pGrid = document.getElementById('pricing-grid');
    if (!pGrid) return;

    pricingData.forEach(p => {
        const card = document.createElement('article');
        card.className = 'pricing-card';
        const content = document.createElement('div');
        const heading = document.createElement('h3');
        heading.textContent = p.name;
        const description = document.createElement('p');
        description.textContent = p.desc;
        const price = document.createElement('span');
        price.textContent = p.price;
        content.append(heading, description);
        card.append(content, price);
        pGrid.appendChild(card);
    });
}
