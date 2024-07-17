document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('itemForm');
	const itemsTableBody = document.getElementById('itemsTableBody');

	form.addEventListener('submit', function(event) {
			event.preventDefault();

			const formData = new FormData(form);
			const itemId = formData.get('id');

			// Construir objeto con los datos del formulario
			const data = {
					id: formData.get('id'),
					apellido: formData.get('apellido'),
					nombre: formData.get('nombre'),
					email: formData.get('email')
			}; 

			if (itemId) {
					updateItem(data);
			} else {
					createItem(data);
			}
	});

	function createItem(data) {
			fetch('https://n3ri.com.ar/codo_a_codo_php/api/api.php', {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json',
					},
					body: JSON.stringify(data)
			})
			.then(response => {
					if (!response.ok) {
							throw new Error('Network response was not ok');
					}
					return response.json();
			})
			.then(result => {
					console.log('Success:', result);
					loadItems();
					form.reset();
			})
			.catch(error => {
					console.error('Error:', error);
					alert('Error al ingresar el invitado');
			});
	}

	// Función para cargar los elementos desde la API
	function loadItems() {
			fetch('https://n3ri.com.ar/codo_a_codo_php/api/api.php')
			.then(response => response.json())
			.then(data => {
					itemsTableBody.innerHTML = '';
					if (data.invitados) {
							data.invitados.forEach(invitado => {
									const row = document.createElement('tr');
									row.innerHTML = `
											<td>${invitado.id}</td>
											<td>${invitado.apellido}</td>
											<td>${invitado.nombre}</td>
											<td>${invitado.email}</td>                    
											<td>
													<button class="btn btn-danger" onclick="deleteItem(${invitado.id})"><i class="fas fa-trash"></i></button>
											</td>
											<td>
													<button class="btn btn-success" onclick="editItem(
													${invitado.id}, 
													'${invitado.apellido}', 
													'${invitado.nombre}', 
													'${invitado.email}')"><i class="far fa-edit"></i></button>
											</td>
									`;
									itemsTableBody.appendChild(row);
							});
					} else {
							console.error('No se encontraron invitados');
					}
			})
			.catch(error => console.error('Error:', error));
	}

	// Función para borrar un invitado
	function deleteItem(id) {
			fetch(`https://n3ri.com.ar/codo_a_codo_php/api/api.php?id=${id}`, {
					method: 'DELETE',
					headers: {
							'Content-Type': 'application/json'
					}
			})
			.then(response => response.json())
			.then(data => {            
					loadItems();   
			})
			.catch(error => console.error('Error:', error));
	}

	function updateItem(data) {
			fetch(`https://n3ri.com.ar/codo_a_codo_php/api/api.php?id=${data.id}`, {
					method: 'PUT',
					headers: {
							'Content-Type': 'application/json',
					},
					body: JSON.stringify(data)
			})
			.then(response => {
					if (!response.ok) {
							throw new Error('Network response was not ok');
					}
					return response.json();
			})
			.then(result => {
					console.log('Success:', result);   
					loadItems();
					form.reset();
			})
			.catch(error => {
					console.error('Error:', error);
					alert('Error al actualizar el invitado');
			});
	}

	window.editItem = function(id, apellido, nombre, email) {
			document.getElementById('id').value = id;
			document.getElementById('apellido').value = apellido;
			document.getElementById('nombre').value = nombre;
			document.getElementById('email').value = email;
	};

	window.deleteItem = deleteItem;
	loadItems();
});
