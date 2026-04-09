fetch('/components/footer.html')
  .then(r => r.text())
  .then(html => {
    document.getElementById('site-footer').outerHTML = html;
  });
