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

// ################################################ Resume Modal ##########################################
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    const previewBtn = document.getElementById('preview-resume-btn');
    const modal = document.getElementById('resume-modal');
    const closeModalBtn = document.getElementById('close-resume-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const resumeIframe = document.getElementById('resume-iframe');
    const resumePlaceholder = document.querySelector('.resume-placeholder');

    console.log('previewBtn:', previewBtn);
    console.log('modal:', modal);

    if (previewBtn) {
        console.log('Adding click listener to preview button');
        previewBtn.addEventListener('click', function() {
            console.log('Preview button clicked!');
            modal.classList.add('active');
            console.log('Modal active class added');

            // Check if resume file exists and load it
            fetch('./assets/shashank CV (2).pdf', { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        resumeIframe.src = './assets/shashank CV (2).pdf';
                        resumeIframe.style.display = 'block';
                        if (resumePlaceholder) {
                            resumePlaceholder.style.display = 'none';
                        }
                    } else {
                        resumeIframe.style.display = 'none';
                        if (resumePlaceholder) {
                            resumePlaceholder.style.display = 'flex';
                        }
                    }
                })
                .catch(() => {
                    resumeIframe.style.display = 'none';
                    if (resumePlaceholder) {
                        resumePlaceholder.style.display = 'flex';
                    }
                });
        });

        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            resumeIframe.src = '';
        });

        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            resumeIframe.src = '';
        });

        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('active');
                resumeIframe.src = '';
            }
        });
    }
});