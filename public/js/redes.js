// FACEBOOK
let currentUrl = window.location.href;
let facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentUrl);
document.getElementById('facebook').href = facebookShareUrl;

// WHATSAPP
let current_ws = window.location.href;
let text = '¡Mira esto! ' + current_ws;
let whatsappShareUrl = 'https://wa.me/?text=' + encodeURIComponent(text);
document.getElementById('whatsapp').href = whatsappShareUrl;

document.getElementById('url').addEventListener('click', function() {
  let w_href = window.location.href;
  navigator.clipboard.writeText(w_href).then(() => {
    alert("URL copiada: " + w_href);
  }).catch(err => {
    console.error("Error al copiar: ", err);
  });
});