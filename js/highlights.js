// Accordion
document.querySelectorAll('.acc-header').forEach(function(header) {
    header.addEventListener('click', function() {
        var item = header.closest('.acc-item');
        var wasOpen = item.classList.contains('open');
        document.querySelectorAll('.acc-item.open').forEach(function(el) {
            el.classList.remove('open');
        });
        if (!wasOpen) item.classList.add('open');
    });
});

// Certificate lightbox
var lb = document.getElementById('certLightbox');
var lbImgWrap = document.getElementById('certLbImgWrap');
var lbName = document.getElementById('certLbName');
var lbIssuer = document.getElementById('certLbIssuer');
var lbClose = document.getElementById('certLbClose');

document.querySelectorAll('.cert-card').forEach(function(card) {
    card.addEventListener('click', function() {
        var title = card.dataset.title;
        var issuer = card.dataset.issuer;
        var img = card.dataset.img;

        lbName.textContent = title;
        lbIssuer.textContent = issuer;
        lbImgWrap.innerHTML = '';

        if (img) {
            var el = document.createElement('img');
            el.src = img;
            el.alt = title;
            lbImgWrap.appendChild(el);
        } else {
            var placeholder = card.querySelector('.cert-thumb-placeholder, .cert-thumb');
            var emoji = placeholder && placeholder.textContent ? placeholder.textContent.trim() : '📜';
            var div = document.createElement('div');
            div.className = 'cert-lb-placeholder';
            div.textContent = emoji;
            lbImgWrap.appendChild(div);
        }

        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
}
lbClose.addEventListener('click', closeLightbox);
lb.addEventListener('click', function(e) {
    if (e.target === lb) closeLightbox();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});

// Tabs
document.querySelectorAll('.hl-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.hl-tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('.hl-panel').forEach(function(p) { p.classList.remove('active'); });
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});
