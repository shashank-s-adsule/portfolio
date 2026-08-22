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

