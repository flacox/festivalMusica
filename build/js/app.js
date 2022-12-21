document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestibal = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function(){
        if(sobreFestibal.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('clic', function(e){
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            seccionScroll.scrollIntoView({behavior: "smooth"});
        });
    });
}

// insertando imagenes con javascrip
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="imagen/avif">
            <source srcset="build/img/thumb/${i}.webp" type="imagen/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galeria">
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }
        
        galeria.appendChild(imagen);
    }
}

// mostrar y cerrar imagen grande
function mostrarImagen (id) {
    // console.log('imagen', id);
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="imagen/avif">
            <source srcset="build/img/grande/${id}.webp" type="imagen/webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galeria">
        `;

        //crea el overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        overlay.onclick = function(){
            body.classList.remove('fijar-body');
            overlay.remove();
        }

        // Boton para cerrar el modal
        const cerrarModal = document.createElement('P');
        cerrarModal.textContent = 'X';
        cerrarModal.classList.add('btn-cerrar');
        cerrarModal.onclick = function(){
            body.classList.remove('fijar-body');
            overlay.remove();
        }
        overlay.appendChild(cerrarModal);

        //Anadirlo al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');
}