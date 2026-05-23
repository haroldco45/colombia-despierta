// Registro seguro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado correctamente', reg.scope))
      .catch(err => console.error('Fallo en el registro del Service Worker:', err));
  });
}

// Lógica de instalación de la PWA
let deferredPrompt;
const installContainer = document.getElementById('install-container');
const btnInstall = document.getElementById('btn-install');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installContainer) {
    installContainer.style.display = 'block';
  }
});

if (btnInstall) {
  btnInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Resultado de la instalación: ${outcome}`);
      deferredPrompt = null;
      if (installContainer) installContainer.style.display = 'none';
    }
  });
}

window.addEventListener('appinstalled', () => {
  console.log('¡Aplicación instalada con éxito!');
  if (installContainer) installContainer.style.display = 'none';
});
