// Registro del Service Worker para soporte Offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker activo', reg))
      .catch(err => console.error('Error al registrar SW', err));
  });
}

// Lógica del botón de instalación de la PWA
let deferredPrompt;
const installContainer = document.getElementById('install-container');
const btnInstall = document.getElementById('btn-install');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Muestra el contenedor del botón si la app es instalable
  installContainer.style.display = 'block';
});

btnInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Usuario respondió a la instalación: ${outcome}`);
    deferredPrompt = null;
    installContainer.style.display = 'none';
  }
});

window.addEventListener('appinstalled', () => {
  console.log('Aplicación instalada con éxito');
  installContainer.style.display = 'none';
});
