// Show/Hide sections dynamically
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
    }
}

// Contact form submission alert
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Thank you for your message!');
});

// Display current date
document.getElementById('currentDate').textContent = new Date().toLocaleDateString();

// Optional: Hide sidebar on section click in mobile view (if you're using a sidebar)
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth <= 767) {
            document.querySelector('.sidebar').classList.remove('active');
            document.querySelector('.container').classList.remove('sidebar-active');
        }
    });
});