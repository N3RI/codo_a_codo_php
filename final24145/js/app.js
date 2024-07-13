document.addEventListener('DOMContentLoaded',function()
{
    const itemsTableBody=this.getElementById('itemsTableBody');

    //va a cargar la tabla en la vista
    function loadItems() {
			fetch('http://localhost/c24145/Clase32/Final24145/api/api.php ')
			// fetch('http://localhost/_Final2024php/api/api.php ')
			//fetch('http://localhost/_Final2024php/api/api.php')
        .then(response => response.json())
        .then(data => {
            itemsTableBody.innerHTML = '';
            if (data.peliculas) 
                {
                data.peliculas.forEach(pelicula => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${pelicula.id}</td>
                        <td>${pelicula.titulo}</td>
                        <td>${pelicula.fecha_lanzamiento}</td>
                        <td>${pelicula.genero}</td>
                        <td>${pelicula.duracion}</td>
                        <td>${pelicula.director}</td>
                        <td>${pelicula.reparto}</td>
                        <td>${pelicula.sinopsis}</td>                    
                        <td>
                            <button class="btn btn-danger" onclick="deleteItem(${pelicula.id})">Eliminar</button>
                        </td>
                        <td>
                            <button class="btn btn-success" onclick="editItem(
                            ${pelicula.id}, 
                            '${pelicula.titulo}', 
                            '${pelicula.fecha_lanzamiento}', 
                            '${pelicula.genero}', 
                            '${pelicula.duracion}', 
                            '${pelicula.director}', 
                            '${pelicula.reparto}',
                            '${pelicula.sinopsis}')">Editar</button>
                        </td>
                    `;
                    itemsTableBody.appendChild(row);
                });
            } 
            else 
            {
                console.error('No se encontraron películas');
            }
        })
        .catch(error => console.error('Error:', error));
    }
       
    
      // Función para borrar una pelicula
      function deleteItem(id) 
      {
				fetch(`http://localhost/c24145/Clase32/Final24145/api/api.php?id=${id}`, 
				// fetch(`http://localhost/_Final2024php/api/api.php?id=${id}`, 
						{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => 
            {           
                loadItems();                      
            })
        ;
        loadItems();
    }


window.editItem=function(id,titulo,fecha_lanzamiento,genero,duracion,director,reparto,sinopsis)
{
    document.getElementById('id').value=id;
    document.getElementById('titulo').value=titulo;
    document.getElementById('fecha_lanzamiento').value=fecha_lanzamiento;
    document.getElementById('genero').value=genero;
    document.getElementById('duracion').value=duracion;
    document.getElementById('director').value=director;
    document.getElementById('reparto').value=reparto;
    document.getElementById('sinopsis').value=sinopsis;
}


  // Función para guardar los cambios de la película editada
	document.getElementById('saveButton').addEventListener('click', function() {
		const id = document.getElementById('id').value;
		const titulo = document.getElementById('titulo').value;
		const fecha_lanzamiento = document.getElementById('fecha_lanzamiento').value;
		const genero = document.getElementById('genero').value;
		const duracion = document.getElementById('duracion').value;
		const director = document.getElementById('director').value;
		const reparto = document.getElementById('reparto').value;
		const sinopsis = document.getElementById('sinopsis').value;

		const pelicula = {
				id,
				titulo,
				fecha_lanzamiento,
				genero,
				duracion,
				director,
				reparto,
				sinopsis
		};

		fetch(`http://localhost/c24145/Clase32/Final24145/api/api.php`, {
				method: 'PUT', // or 'POST' depending on your API design
				headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify(pelicula)
		})
		.then(response => response.json())
		.then(data => {
				loadItems();
		})
		.catch(error => console.error('Error:', error));
});




window.deleteItem=deleteItem;
    loadItems();    
});