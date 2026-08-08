function sendMail() {
    var name    = document.getElementById('sender-name').value.trim();
    var replyTo = document.getElementById('sender-email').value.trim();
    var body    = document.getElementById('sender-msg').value.trim();
    if (!body) { document.getElementById('sender-msg').focus(); return; }
    var toEmail  = 'shashank.s.adsule@mail.com';
    var subject  = encodeURIComponent('Message from ' + (name || 'your portfolio'));
    var bodyText = encodeURIComponent(
        body +
        (replyTo ? '\n\n--\nReply to: ' + replyTo : '') +
        (name    ? '\n' + name : '')
    );
    window.location.href = 'mailto:' + toEmail + '?subject=' + subject + '&body=' + bodyText;
}