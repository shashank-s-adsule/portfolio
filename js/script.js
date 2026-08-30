// ################################################ Project Accordion ##########################################


// ################################################ Copy Email Address ##########################################
function copyEmail() {
    var email = document.getElementById('email-text').textContent.trim();
    navigator.clipboard.writeText(email).then(function () {
        var btn = document.getElementById('copy-btn');
        btn.classList.add('copied');
        btn.textContent = '✓ Copied';
        setTimeout(function () {
            btn.classList.remove('copied');
            btn.textContent = 'Copy';
        }, 2000);
    });
}

// ################################################ CV Preview Modal ##########################################
document.addEventListener('DOMContentLoaded', function() {
    const previewBtn = document.getElementById('preview-cv-btn');
    const modal = document.getElementById('cv-modal');
    const closeBtn = document.getElementById('close-cv-modal');
    const overlay = document.querySelector('.cv-modal-overlay');

    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            modal.classList.add('active');
        });

        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });

        overlay.addEventListener('click', function() {
            modal.classList.remove('active');
        });

        // Close on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
});

