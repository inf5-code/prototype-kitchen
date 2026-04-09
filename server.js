const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;
const DEV  = process.env.NODE_ENV !== 'production';

// ── Live reload (solo en desarrollo) ────────────────────────────────────────
if (DEV) {
  const livereload        = require('livereload');
  const connectLivereload = require('connect-livereload');

  const lrServer = livereload.createServer({
    exts: ['html', 'css', 'js', 'png', 'jpg', 'svg'],
    delay: 200,
  });

  // Observa todo el directorio del proyecto
  lrServer.watch(path.join(__dirname));

  // Inyecta el script de recarga automática en cada respuesta HTML
  app.use(connectLivereload());

  console.log('🔄  Live reload activo — el navegador se recarga al guardar archivos');
}

// ── Archivos estáticos ───────────────────────────────────────────────────────
// Sirve todo lo que esté en la raíz del proyecto (HTML, imágenes, etc.)
app.use(
  express.static(path.join(__dirname), {
    index: 'index.html',
    extensions: ['html'],    // permite /contact en lugar de /contact.html
  })
);

// ── 404 — redirige a index ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// ── Arranque ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Servidor activo → http://localhost:${PORT}\n`);
});
