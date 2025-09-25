const contents = document.querySelectorAll('.content');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
let current = 0;
let typingInterval;

function typeAndDelete(h2, speed = 100, delayBeforeDelete = 1500, delayAfterDelete = 50) {
    const fullText = h2.dataset.fulltext;
    let i = 0;
    let deleting = false;
    let pause = false;

    clearInterval(typingInterval);
    h2.classList.add('typing');

    typingInterval = setInterval(() => {
        if (!deleting && !pause) {
            // Typing forward
            h2.textContent = fullText.slice(0, i + 1);
            i++;
            if (i === fullText.length) {
                pause = true;
                setTimeout(() => {
                    deleting = true;
                    pause = false;
                }, delayBeforeDelete); // pause before deleting
            }
        } else if (deleting && !pause) {
            // Delete but stop at 1st letter
            if (i > 1) {
                h2.textContent = fullText.slice(0, i - 1);
                i--;
            } else {
                // Reached first letter, pause then start typing again
                pause = true;
                setTimeout(() => {
                    deleting = false;
                    pause = false;
                    i = 1; // start typing from second letter
                }, delayAfterDelete);
            }
        }
    }, speed);
}



function showContent(index) {
    contents.forEach((c, i) => {
        c.classList.remove('active');
        c.style.transform = `translateX(${(i - index) * 100}%)`;

        const h2 = c.querySelector('h2');
        if (h2) {
            h2.textContent = h2.dataset.fulltext; // reset text
            h2.classList.remove('typing');
        }
    });

    const active = contents[index];
    active.classList.add('active');

    const h2 = active.querySelector('h2');
    if (h2) {
        typeAndDelete(h2, 100, 1500); // type & delete continuously
    }
}

// Store original text
contents.forEach(c => {
    const h2 = c.querySelector('h2');
    if (h2) h2.dataset.fulltext = h2.textContent;
});

// Initialize
showContent(current);

// Arrow click events
leftArrow.addEventListener('click', () => {
    current = (current - 1 + contents.length) % contents.length;
    showContent(current);
});

rightArrow.addEventListener('click', () => {
    current = (current + 1) % contents.length;
    showContent(current);
});

