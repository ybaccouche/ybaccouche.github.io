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
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    function toggleSection(section) {
        section.classList.toggle('open');
    }

    sections.forEach(section => {
        section.querySelector('h2').addEventListener('click', () => toggleSection(section));
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                sections.forEach(s => s.classList.remove('open'));
                targetSection.classList.add('open');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
