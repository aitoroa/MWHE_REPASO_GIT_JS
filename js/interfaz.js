/* =========================================================
   interfaz.js · PERSONA A (rama menu-y-tema)
   JavaScript nativo: menú móvil y modo claro/oscuro
   =========================================================

   Recuerda los 3 pasos de cualquier interacción:
     1. SELECCIONAR el elemento    -> document.querySelector('#id')
     2. ESCUCHAR un evento         -> elemento.addEventListener('click', ...)
     3. CAMBIAR algo               -> elemento.classList.toggle('clase')


   TAREA 1 · Menú móvil
   - Al pulsar #boton-menu, poner y quitar la clase "hidden" a #menu.
   - Actualizar aria-expanded del botón (true / false).
   - Cambiar el texto del botón: "Menú" / "Cerrar".
   - Extra: cerrar el menú al pulsar cualquiera de sus enlaces.


   TAREA 2 · Modo claro / oscuro
   - Al pulsar #boton-tema, poner y quitar la clase "dark" en <html>
     (document.documentElement). Los colores oscuros ya están en css/styles.css.
   - Cambiar el texto del botón: "Modo oscuro" / "Modo claro".
   - Actualizar aria-pressed del botón.
   - Guardar la elección en localStorage para que se recuerde al recargar.

*/

// Escribe aquí tu código

// Menú móvil
const botonMenu = document.querySelector('#boton-menu');
const menu = document.querySelector('#menu');
const enlacesMenu = document.querySelectorAll('#menu a');

botonMenu.addEventListener('click', function () {
    menu.classList.toggle('hidden');
    
    const estaAbierto = !menu.classList.contains('hidden');
    
    botonMenu.setAttribute('aria-expanded', estaAbierto);
    botonMenu.textContent = estaAbierto ? 'Cerrar' : 'Menú';
});

enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener('click', function () {
        menu.classList.add('hidden');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.textContent = 'Menú';
    });
});


// Modo claro / oscuro
const botonTema = document.querySelector('#boton-tema');
const raizHtml = document.documentElement; 

function actualizarBotonTema(esOscuro) {
    botonTema.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
    botonTema.setAttribute('aria-pressed', esOscuro);
}

if (localStorage.getItem('tema') === 'oscuro') {
    raizHtml.classList.add('dark');
    actualizarBotonTema(true);
}

botonTema.addEventListener('click', function () {
    const esOscuro = raizHtml.classList.toggle('dark');
    
    actualizarBotonTema(esOscuro);
    
    localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
});