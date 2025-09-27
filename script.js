const contents = document.querySelectorAll('.content');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
let current = 0;
let typingInterval;

// Store original text
contents.forEach(c => {
    const h2 = c.querySelector('h2');
    if (h2) h2.dataset.fulltext = h2.textContent;
});

// Typing effect
function typeAndDelete(h2, speed = 100, delayBeforeDelete = 1500, delayAfterDelete = 50) {
    const fullText = h2.dataset.fulltext;
    let i = 0, deleting = false, pause = false;

    clearInterval(typingInterval);
    h2.classList.add('typing');

    typingInterval = setInterval(() => {
        if (!deleting && !pause) {
            h2.textContent = fullText.slice(0, i + 1);
            i++;
            if (i === fullText.length) {
                pause = true;
                setTimeout(() => { deleting = true; pause = false; }, delayBeforeDelete);
            }
        } else if (deleting && !pause) {
            if (i > 1) { h2.textContent = fullText.slice(0, i - 1); i--; }
            else { pause = true; setTimeout(() => { deleting = false; pause = false; i = 1; }, delayAfterDelete); }
        }
    }, speed);
}

// Initialize positions for sliding
contents.forEach((c, i) => {
    c.style.position = 'absolute';
    c.style.top = '0';
    c.style.left = `${i * 100}%`;
    c.style.transition = 'left 0.5s ease';
});

// Show content with smooth slide
function showContent(index) {
    // Circular logic
    if (index < 0) index = contents.length - 1;
    if (index >= contents.length) index = 0;
    current = index;

    contents.forEach((c, i) => {
        c.style.left = `${(i - current) * 100}%`;
        const h2 = c.querySelector('h2');
        if (h2) {
            h2.textContent = h2.dataset.fulltext; 
            h2.classList.remove('typing');
        }
    });

    const active = contents[current];
    active.classList.add('active');
    const h2 = active.querySelector('h2');
    if (h2) typeAndDelete(h2, 100, 1500);
}

// Initialize first content
showContent(current);

// Arrow navigation
leftArrow.addEventListener('click', () => showContent(current - 1));
rightArrow.addEventListener('click', () => showContent(current + 1));
