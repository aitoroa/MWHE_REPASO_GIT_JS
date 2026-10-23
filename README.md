# Práctica guiada: Git en parejas + JavaScript y librerías

**Maquetación Web con Hojas de Estilo · 4.º Diseño Multimedia y Gráfico · UDIT**

Vais a terminar la web de **La Aguja y el Tornillo** trabajando **en pareja sobre el mismo repositorio**, cada uno en su propia rama, igual que haréis en la Práctica 1.

- **Persona A** (rama `menu-y-tema`): menú móvil y modo claro/oscuro con **JavaScript nativo**.
- **Persona B** (rama `slider-y-animaciones`): slider de productos con **Swiper** y animaciones con **AOS**.

Por el camino vais a provocar **un conflicto a propósito** para aprender a resolverlo. No hace falta terminarlo en clase: lo que quede, en casa.

> **Regla de oro:** nadie trabaja directamente en `main`. `main` es la versión que siempre funciona. Se trabaja en ramas y se une a `main` con un *pull request*.

---

## Paso 0 · Antes de empezar (los dos)

1. Tener cuenta en [GitHub](https://github.com) y saber el nombre de usuario de tu pareja.
2. Abrir **GitHub Desktop** e iniciar sesión: `File > Options > Accounts > Sign in`.
3. Poner VS Code como editor: `File > Options > Integrations > External editor > Visual Studio Code`.
4. Decidir quién es Persona A y quién Persona B.

---

## Paso 1 · Crear el repositorio (solo Persona A)

1. En GitHub Desktop: `File > New repository...`
   - **Name:** `practica-git-apellido1-apellido2`
   - **Local path:** la carpeta donde guardas tus repos (por ejemplo `Documentos/GitHub`).
   - Pulsa **Create repository**.
2. Abre la carpeta del repo (`Repository > Show in Explorer`) y **copia dentro** todo el contenido de esta carpeta: `index.html`, `README.md`, `css/` y `js/`.
3. Vuelve a GitHub Desktop. En la pestaña **Changes** aparecen los archivos nuevos.
   Abajo a la izquierda escribe el resumen `Estructura inicial` y pulsa **Commit to main**.
4. Pulsa **Publish repository**. **Desmarca** `Keep this code private` (así podréis publicarla gratis en GitHub Pages) y pulsa **Publish Repository**.
5. Invita a tu pareja: `Repository > View on GitHub` y en la web, **Settings > Collaborators > Add people**. Busca su usuario y añádelo.

## Paso 2 · Clonar el repositorio (solo Persona B)

1. Acepta la invitación: te llega por correo o la ves en [github.com/notifications](https://github.com/notifications).
2. En GitHub Desktop: `File > Clone repository...` > pestaña **GitHub.com** > elige el repo.
3. En **Local path** elige dónde guardarlo y pulsa **Clone**.

Ahora los dos tenéis una copia del repositorio en vuestro ordenador, conectada con la de GitHub (`origin`).

---

## Paso 3 · Cada uno, su rama (los dos)

1. Comprueba que estás en `main` (botón **Current Branch**) y pulsa **Fetch origin** para traer lo último.
2. **Current Branch > New Branch** (`Ctrl + Shift + N`):
   - Persona A: `menu-y-tema`
   - Persona B: `slider-y-animaciones`
   - En *Create branch based on...* deja **main** y pulsa **Create Branch**.
3. Pulsa **Publish branch** para subir la rama a GitHub.
4. Abre el proyecto en VS Code: `Repository > Open in Visual Studio Code` (`Ctrl + Shift + A`).

---

## Paso 4 · A trabajar

Haced **commits pequeños**: uno por cada cosa que funcione, con un mensaje que explique qué habéis hecho. Después de cada commit, **Push origin**.

| Mal mensaje | Buen mensaje |
|---|---|
| `cambios` | `Menú móvil: abre y cierra con el botón` |
| `asdf` | `Slider de productos con Swiper` |

### Persona A · `js/interfaz.js` (JavaScript nativo)

Todas las instrucciones están en los comentarios de `js/interfaz.js`. Resumen:

1. **Menú móvil:** al pulsar `#boton-menu`, poner y quitar la clase `hidden` de `#menu`, actualizar `aria-expanded` y cambiar el texto (`Menú` / `Cerrar`).
2. **Modo claro/oscuro:** al pulsar `#boton-tema`, poner y quitar la clase `dark` en `<html>` (`document.documentElement`), cambiar el texto del botón y guardar la elección en `localStorage`.

Fíjate en que **no tienes que tocar el CSS** para el modo oscuro: en `css/styles.css` la clase `.dark` ya redefine las variables del `@theme` (`--color-fondo`, `--color-texto`...) y todas las clases que las usan cambian solas.

Los 3 pasos de cualquier interacción:

```js
const boton = document.querySelector('#boton-menu');   // 1. seleccionar
boton.addEventListener('click', function () {          // 2. escuchar
    menu.classList.toggle('hidden');                   // 3. cambiar
});
```

### Persona B · librerías (`index.html` y `js/librerias.js`)

1. **Enlaza las librerías** en `index.html`, en los huecos marcados con comentarios:

   En el `<head>`, **antes** de `css/styles.css`:
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@14/swiper-bundle.min.css">
   ```
   Al final del `<body>`, **antes** de nuestros `<script>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/swiper@14/swiper-bundle.min.js"></script>
   ```

2. **AOS:** añade `data-aos="fade-up"` a los títulos y bloques que quieras animar y en `js/librerias.js` inicializa con `AOS.init({ ... })`. Prueba opciones como `duration`, `once` o `data-aos-delay`.

3. **Swiper:** convierte la rejilla de productos en la estructura que pide Swiper:
   ```html
   <div class="swiper">
       <div class="swiper-wrapper">
           <article class="swiper-slide ...">...</article>
           <!-- un .swiper-slide por producto -->
       </div>
       <div class="swiper-pagination"></div>
       <div class="swiper-button-prev"></div>
       <div class="swiper-button-next"></div>
   </div>
   ```
   Inicialízalo en `js/librerias.js` con `new Swiper('.swiper', { ... })`: paginación, flechas y `breakpoints` para ver 1 producto en móvil, 2 en tablet y 3 en escritorio.

> **Ojo con el CSS de las librerías:** el CSS de Swiper o AOS **no está en ninguna capa**, así que gana a Tailwind y a vuestras capas (`@layer`). Si queréis cambiar algo suyo (por ejemplo que todas las tarjetas midan lo mismo con `.swiper-slide { height: auto; }`), esa regla tiene que ir en `styles.css` **fuera de las capas**.

---

## Paso 5 · El conflicto (a propósito, los dos)

Al final de `index.html` está el horario de la tienda:

```html
<p id="horario" class="mt-3 font-rotulo text-2xl">Horario por decidir</p>
```

Cada uno cambia **esa misma línea** en su rama, sin ponerse de acuerdo:

- Persona A escribe: `Lunes a viernes: 9:30 a 14:00 y 17:00 a 20:30`
- Persona B escribe: `Sábados: 10:00 a 14:00`

Commit (`Horario de la tienda`) y **Push origin**. Git no sabe cuál de las dos versiones es la buena: eso es un conflicto, y lo vais a resolver en el paso 7.

---

## Paso 6 · Pull request de Persona A

1. Persona A, con todo commiteado y subido, pulsa **Preview Pull Request** y después **Create pull request**. Se abre GitHub.
2. Comprueba que pone `base: main` ← `compare: menu-y-tema`, escribe un título y una descripción de lo que has hecho y pulsa **Create pull request**.
3. **Persona B revisa**: en la pestaña **Files changed** ve los cambios línea a línea y puede dejar comentarios.
4. Si todo está bien, Persona B pulsa **Merge pull request > Confirm merge**. El trabajo de A ya está en `main`.

## Paso 7 · Persona B trae `main` a su rama y resuelve el conflicto

1. Persona B: asegúrate de no tener cambios sin commitear.
2. Cambia a `main` (**Current Branch > main**) y pulsa **Pull origin**. Ahora tu `main` tiene el trabajo de A.
3. Vuelve a tu rama (**Current Branch > slider-y-animaciones**) y haz `Branch > Update from main` (`Ctrl + Shift + U`).
4. GitHub Desktop avisa de que hay **conflictos en `index.html`**. Ábrelo en Visual Studio Code. Verás algo así:

   ```html
   <<<<<<< HEAD
   <p id="horario" class="mt-3 font-rotulo text-2xl">Sábados: 10:00 a 14:00</p>
   =======
   <p id="horario" class="mt-3 font-rotulo text-2xl">Lunes a viernes: 9:30 a 14:00 y 17:00 a 20:30</p>
   >>>>>>> main
   ```
   - Entre `<<<<<<< HEAD` y `=======`: tu versión (la de tu rama).
   - Entre `=======` y `>>>>>>> main`: la versión que llega de `main`.

5. VS Code te ofrece encima: **Accept Current Change** (la tuya), **Accept Incoming Change** (la que llega) o **Accept Both Changes** (las dos). Elegid **Accept Both Changes**, ordenad las líneas y **quitad el `id` de una de ellas** (un `id` no se puede repetir). Las marcas `<<<<<<<`, `=======` y `>>>>>>>` no pueden quedar en el archivo.
6. Guarda. En GitHub Desktop el archivo aparece como resuelto: pulsa **Continue merge** (en versiones antiguas, *Commit merge*) y después **Push origin**.
7. Abre la web y comprueba que funciona todo: lo de A y lo de B.

## Paso 8 · Pull request de Persona B

Igual que en el paso 6, pero al revés: B crea el pull request de `slider-y-animaciones` y **A lo revisa y hace el merge**. Como el conflicto ya está resuelto, GitHub dejará unir sin problemas.

## Paso 9 · Los dos, al día

Cada uno: **Current Branch > main** y **Pull origin**. Los dos tenéis ya la web completa. Las ramas terminadas se pueden borrar (`Branch > Delete...`).

## Paso 10 · Publicar con GitHub Pages (Persona A)

En la web del repo: **Settings > Pages**. En *Build and deployment*, *Source*: **Deploy from a branch**, rama **main** y carpeta **/ (root)**, y pulsa **Save**. En un par de minutos la web estará en `https://usuario.github.io/nombre-del-repo/`.

---

## Reto extra (en casa) · Acordeón con jQuery

Uno de los dos crea la rama `preguntas-jquery` desde `main` (actualizado) y el otro revisa el pull request.

1. Enlaza jQuery al final del `<body>`, junto a las otras librerías y antes de vuestros scripts:
   ```html
   <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
   ```
2. Crea `js/preguntas.js` y enlázalo después de los demás scripts.
3. Oculta las respuestas (clase `hidden` en cada `.respuesta`) y, al pulsar una `.pregunta`, ábrela y ciérrala con `slideToggle()`. Usa `toggleClass()` para marcarla como abierta.

```js
$(function () {                       // espera a que el HTML esté listo
    $('.pregunta').on('click', function () {
        $(this).next('.respuesta').slideToggle(300);
    });
});
```

---

## Si algo falla

Abre la consola del navegador (`F12` > **Console**). Los errores más típicos:

| Error | Qué pasa |
|---|---|
| `Cannot read properties of null (reading 'addEventListener')` | El selector no encuentra nada: revisa el `#id` o la `.clase`. |
| `AOS is not defined`, `Swiper is not defined`, `$ is not defined` | La librería no está enlazada, la URL está mal o está **después** de tu script. |
| GitHub Desktop no te deja hacer push | Alguien subió antes que tú: haz **Pull origin** y vuelve a intentarlo. |
| Has trabajado en `main` sin querer | Crea la rama ahora: GitHub Desktop te ofrece llevarte los cambios (*Bring my changes to...*). |

## Documentación

- GitHub Desktop: [ramas](https://docs.github.com/es/desktop/making-changes-in-a-branch/managing-branches-in-github-desktop) · [pull requests](https://docs.github.com/es/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/creating-an-issue-or-pull-request-from-github-desktop) · [sincronizar y unir ramas](https://docs.github.com/es/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/syncing-your-branch-in-github-desktop)
- [Resolver conflictos (marcas de conflicto)](https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)
- [GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [AOS](https://michalsnik.github.io/aos/) · [Swiper: primeros pasos](https://swiperjs.com/get-started) · [Swiper: API](https://swiperjs.com/swiper-api) · [jQuery: API](https://api.jquery.com/)
- [MDN: manipular el DOM](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/DOM_scripting) · [MDN: classList](https://developer.mozilla.org/es/docs/Web/API/Element/classList) · [MDN: localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
