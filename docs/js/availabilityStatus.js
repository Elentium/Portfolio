export function initAvailabilityStatus() {
    const availability = { shortTerm: false, longTerm: false };
    const heroAvailability = document.getElementById('hero-availability');
    const statusDot = document.querySelector('.status-dot');
    if (!heroAvailability || !statusDot) return;

    let textContent = "";
    const isAvailable = availability.shortTerm || availability.longTerm;

    if (availability.longTerm && availability.shortTerm) {
        textContent = "Available for both short term and long term commissions.";
    } else if (availability.shortTerm && !availability.longTerm) {
        textContent = "Available for short term commissions only."
    } else if (availability.longTerm && !availability.shortTerm) {
        textContent = "Available for long term commissions only."
    } else {
        textContent = "Currently not accepting new commissions."
    }

    statusDot.classList.toggle('is-unavailable', !isAvailable);
    heroAvailability.textContent = textContent;
}
