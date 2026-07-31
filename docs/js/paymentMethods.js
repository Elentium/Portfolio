const paymentMethodsData = [
    {
        title: "Robux",
        type: "accepted",
        items: [
            "Gamepasses (tax covered)",
            "Group payouts"
        ]
    },
    {
        title: "USD",
        type: "accepted",
        items: [
            "Bank transfer",
            "Wise"
        ]
    },
    {
        title: "Revshare",
        type: "accepted",
        items: [
            "Only with projects that already bring decent revenue"
        ]
    },
    {
        title: "What I do not accept",
        type: "declined",
        items: [
            "Crypto",
            "PayPal (blocked in my country)",
            "Revshare of an upcoming project"
        ]
    },
    {
        title: "Priority option",
        type: "priority",
        items: [
            "If you need your request done ASAP, I can prioritize your commission. This requires an additional 15 to 40 percent depending on how fast you need it done."
        ]
    }
];

function createPaymentCard(section) {
    const card = document.createElement('article');
    card.className = `payment-method-card surface-card payment-method-${section.type}`;

    const heading = document.createElement('h3');
    heading.textContent = section.title;

    const list = document.createElement('ul');
    section.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });

    card.append(heading, list);
    return card;
}

export function initPaymentMethods() {
    const container = document.getElementById('payment-methods');
    if (!container) return;

    paymentMethodsData.forEach(section => {
        container.appendChild(createPaymentCard(section));
    });
}
