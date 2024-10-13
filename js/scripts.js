function showSection(sectionId) {
    // Hide all content sections
    var sections = document.querySelectorAll('.content-section');
    sections.forEach(function(section) {
        section.classList.add('hidden');
    });

    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
}