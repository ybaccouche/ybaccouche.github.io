function showSection(sectionId) {
    // Get all content sections
    var sections = document.querySelectorAll('.content-section');

    // Hide all sections
    sections.forEach(function(section) {
        section.classList.add('hidden');
    });

    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
}