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
