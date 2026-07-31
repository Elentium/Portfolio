const termsOfServiceData = {
    items: [
        {
            title: "01. Requirements",
            body: "I need a clear 'to-do' list before I start. If you want to change things once I've started coding, we'll treat those as new tasks with a new price."
        },
        {
            title: "02. Payment Policy",
            body: "<strong>50% upfront, 50% on completion.</strong> The agreed price is final; you cover all taxes and transaction fees. I <strong>do not begin work</strong> until the upfront (50%) is paid <em>and</em> the money has been <strong>delivered and available to me</strong> (cleared/received, not merely sent or pending). That protects both of us: <strong>fast-delivery payment methods</strong> (Remitly, quick bank transfers) reduce delays and ambiguity about when work can start."
        },
        {
            title: "03. Refunds",
            body: "No cancellations once a commission is confirmed. Upfront payments are not refundable except where I am personally unable to complete the agreed work. If you default on the second payment or abandon the project per these terms, amounts already paid may be forfeited and work may be withheld as described under Ownership."
        },
        {
            title: "04. Bug Fixes",
            body: "I fix my own bugs for free. Please report issues within 48 hours. After that, any problems are assumed to be from your own edits."
        },
        {
            title: "05. Ownership & License",
            body: "Once <strong>100% of the agreed price is paid and received</strong>, the commission is yours: you may use it in your game, resell or share it, or rework it. Before that, I may hold the final handoff until the balance is paid; any previews or test builds we arrange are just for checking progress, not a substitute for payment. I may still show non-confidential work in my portfolio unless we agree otherwise. Please only send me assets or code you're allowed to use."
        },
        {
            title: "06. Communication & 72-hour inactivity",
            body: "Timely replies matter on <strong>both sides</strong>. If <strong>either of us</strong> does not respond for <strong>72 hours</strong>: while terms are still being discussed, the deal may be treated as <strong>abandoned</strong> (time-wasting risk). After a commission is <strong>confirmed</strong>, prolonged silence may indicate <strong>abandonment or bad faith</strong>; I may <strong>pause or stop work</strong>, require reconfirmation, or treat the arrangement according to Payment and Refunds. This clause exists to reduce fraud and wasted time. Keep communication clear and prompt."
        },
        {
            title: "07. Scope changes & disputes",
            body: "Requests outside the agreed scope are new work and may be quoted separately. If you dispute quality, you must report specific, reproducible issues in writing within the Bug Fixes window. These terms are the <strong>entire agreement</strong> for the commission unless we both sign something else. If one part is unenforceable, the rest still applies."
        },
        {
            title: "08. Liability",
            body: "Work is provided <strong>as is</strong> to the maximum extent permitted by law. I am <strong>not liable</strong> for indirect, consequential, or lost-profit damages, or for issues caused by your changes, third-party assets, or Roblox/platform changes. My total liability for any claim relating to a commission is limited to <strong>fees you paid me for that specific commission</strong>. You agree to indemnify me against claims arising from content or instructions you provide."
        }
    ],
    footer: "<strong>Agreement:</strong> By commissioning me, you confirm you have read, understood, and accept these terms. No waiver of a term is valid unless in writing. These terms are here so both sides know what to expect from a Roblox commission."
};

export function initTermsOfService() {
    const grid = document.getElementById('tos-grid');
    const footer = document.getElementById('tos-footer');
    if (!grid || !footer) return;

    termsOfServiceData.items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'surface-card tos-item';
        card.innerHTML = `<h4>${item.title}</h4><p>${item.body}</p>`;
        grid.appendChild(card);
    });

    footer.innerHTML = `<p>${termsOfServiceData.footer}</p>`;
}
