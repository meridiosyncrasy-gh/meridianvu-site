/* Free AI Skill Library helpers.
   1) Paste your Kit form ID between the quotes below once your Kit form exists.
   2) Loom videos: put your Loom share link in data-loom="" on any .loom box. */
const KIT_FORM_ID = "";

document.querySelectorAll('.loom').forEach(function (box) {
  var link = (box.dataset.loom || '').trim();
  var m = link.match(/(?:share|embed)\/([a-f0-9]{16,})/i) || link.match(/^([a-f0-9]{16,})$/i);
  if (!m) return;
  box.innerHTML = '<iframe src="https://www.loom.com/embed/' + m[1] + '?hide_owner=true&hide_share=true&hideEmbedTopBar=true" allowfullscreen loading="lazy" title="Video walkthrough"></iframe>';
});

document.querySelectorAll('.signup form').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var box = form.closest('.signup');
    var email = form.querySelector('[name=email_address]').value.trim();
    var nameEl = form.querySelector('[name="fields[first_name]"]');
    var first = nameEl ? nameEl.value.trim() : '';
    if (!email) return;
    if (!KIT_FORM_ID) {
      var body = 'Hi Meridian! Please send me the free AI Skill Library.%0D%0A%0D%0AName: ' + encodeURIComponent(first) + '%0D%0AEmail: ' + encodeURIComponent(email);
      window.location.href = 'mailto:MeridianVu@gmail.com?subject=' + encodeURIComponent('Free AI Skill Library') + '&body=' + body;
      box.querySelector('.ok').textContent = 'Your email app just opened. Hit send and I will email you the library link. \u2661';
      box.classList.add('done');
      return;
    }
    var data = new FormData();
    data.append('email_address', email);
    if (first) data.append('fields[first_name]', first);
    var btn = form.querySelector('button'); btn.disabled = true; btn.textContent = 'Sending...';
    fetch('https://app.kit.com/forms/' + KIT_FORM_ID + '/subscriptions', { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
      .then(function () { box.classList.add('done'); })
      .catch(function () { box.classList.add('done'); });
  });
});
