$(document).ready(function() {
    // Función para mostrar el resultado de la búsqueda por nombre del Digimon
    function mostrarResultadoBusqueda(data) {
      let resultados = '';
      if (data.length > 0) {
        data.forEach(function(digimon) {
          resultados += `
            <div class="col-md-4">
              <div class="card mb-3">
                <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
                <div class="card-body">
                  <h5 class="card-title">${digimon.name}</h5>
                  <p class="card-text">${digimon.level}</p>
                </div>
              </div>
            </div>
          `;
        });
      } else {
        resultados = `
          <div class="col-md-12">
            <p>No se encontraron Digimon con el nombre "${$('#nombreDigimon').val()}"</p>
          </div>
        `;
      }
      $('#resultadoBusqueda').html(resultados);
    }
    
    // Función para mostrar la lista de nombres de todos los Digimon
    function mostrarListaNombres(data) {
      let listaNombres = '<ul>';
      data.forEach(function(digimon) {
        listaNombres += `<li>${digimon.name}</li>`;
      });
      listaNombres += '</ul>';
      $('#listaNombres').html(listaNombres);
    }
    
    // Obtener todos los Digimon y mostrar la lista de nombres
    $.getJSON('https://digimon-api.vercel.app/api/digimon')
    .done(function(data) {
      mostrarListaNombres(data);
    })
    .fail(function() {
      alert('Ha ocurrido un error al obtener los datos');
    });
    
    // Manejar la búsqueda por nombre del Digimon
    $('form').submit(function(event) {
      event.preventDefault();
      const nombreDigimon = $('#nombreDigimon').val();
      $.getJSON(`https://digimon-api.vercel.app/api/digimon/name/${nombreDigimon}`)
      .done(function(data) {
        mostrarResultadoBusqueda(data);
      })
      .fail(function() {
        alert('Ha ocurrido un error al obtener los datos');
      });
    });
  });

  //--------------- funcion del boton de sonido-----------------------
  var btnToggleSong = $('#btn-toggle-song');
  btnToggleSong.click(function() {
    var audioPlayer = document.getElementById('audio-player');
    if (audioPlayer.paused) {
      audioPlayer.play();
      btnToggleSong.text('Detener');
    } else {
      audioPlayer.pause();
      btnToggleSong.text('Reproducir');
    }
  });
  