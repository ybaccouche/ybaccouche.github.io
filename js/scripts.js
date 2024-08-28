function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.container').classList.toggle('sidebar-active');
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Thank you for your message!');
});

document.getElementById('currentDate').textContent = new Date().toLocaleDateString();

// Hide sidebar on section click in mobile view
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth <= 767) {
            document.querySelector('.sidebar').classList.remove('active');
            document.querySelector('.container').classList.remove('sidebar-active');
        }
    });
});

// Color picker functionality
function applyColours() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', document.getElementById('primary-colour').value);
    root.style.setProperty('--secondary-color', document.getElementById('secondary-colour').value);
    root.style.setProperty('--accent-color', document.getElementById('accent-colour').value);
    root.style.setProperty('--background-color', document.getElementById('background-colour').value);
    root.style.setProperty('--text-color', document.getElementById('text-colour').value);
}

function resetColours() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', '#20a4f3ff');
    root.style.setProperty('--secondary-color', '#fff');
    root.style.setProperty('--accent-color', '#FFC107');
    root.style.setProperty('--background-color', '#f2f4f3ff');
    root.style.setProperty('--text-color', '#333');

    // Reset colour picker input values
    document.getElementById('primary-colour').value = '#20a4f3';
    document.getElementById('secondary-colour').value = '#ffffff';
    document.getElementById('accent-colour').value = '#FFC107';
    document.getElementById('background-colour').value = '#f2f4f3';
    document.getElementById('text-colour').value = '#333333';
}

// New function to set up color picker layout
function setupColourPicker() {
    const colourPicker = document.createElement('section');
    colourPicker.id = 'colour-picker';
    colourPicker.className = 'closed';
    colourPicker.innerHTML = `
        <h2>Customise Colours</h2>
        <div class="section-content">
            <div class="colour-options">
                <div class="colour-option">
                    <label for="primary-colour">Primary</label>
                    <input type="color" id="primary-colour" value="#20a4f3">
                </div>
                <div class="colour-option">
                    <label for="secondary-colour">Secondary</label>
                    <input type="color" id="secondary-colour" value="#ffffff">
                </div>
                <div class="colour-option">
                    <label for="accent-colour">Accent</label>
                    <input type="color" id="accent-colour" value="#FFC107">
                </div>
                <div class="colour-option">
                    <label for="background-colour">Background</label>
                    <input type="color" id="background-colour" value="#f2f4f3">
                </div>
                <div class="colour-option">
                    <label for="text-colour">Text</label>
                    <input type="color" id="text-colour" value="#333333">
                </div>
            </div>
            <div class="colour-buttons">
                <button onclick="applyColours()">Apply Colours</button>
                <button onclick="resetColours()">Reset to Default</button>
            </div>
        </div>
    `;
    document.querySelector('footer').insertAdjacentElement('beforebegin', colourPicker);
}

// Call setupColourPicker when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupColourPicker);

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    let currentOpenSection = null;

    function closeSection(section) {
        section.classList.remove('open');
        section.classList.add('closed');
    }

    function openSection(section) {
        if (currentOpenSection && currentOpenSection !== section) {
            closeSection(currentOpenSection);
        }
        section.classList.remove('closed');
        section.classList.add('open');
        currentOpenSection = section;
    }

    function handleScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Close all sections if we're at the very top
        if (scrollPosition < windowHeight / 2) {
            sections.forEach(closeSection);
            currentOpenSection = null;
            return;
        }

        // Find the section to open based on scroll position
        let sectionToOpen = null;
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop - windowHeight / 2 && scrollPosition < sectionBottom) {
                sectionToOpen = section;
                break;
            }
        }

        // Open the appropriate section or close all if we're at the bottom
        if (sectionToOpen) {
            openSection(sectionToOpen);
        } else if (scrollPosition + windowHeight >= documentHeight - 100) {
            sections.forEach(closeSection);
            currentOpenSection = null;
        }
    }

    // Initially close all sections
    sections.forEach(closeSection);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set the initial state
});
