const form = document.querySelector('#reservaForm');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const data = {
            nome: document.querySelector('input[name="nome"]').value,
            email: document.querySelector('input[name="email"]').value,
            data_entrada: document.querySelector('input[name="data_entrada"]').value,
            data_saida: document.querySelector('input[name="data_saida"]').value,
            mensagem: document.querySelector('textarea[name="mensagem"]').value,
            adultos: document.querySelector('input[name="adultos"]').value,
            criancas: document.querySelector('input[name="criancas"]').value
        };
        
        fetch('http://localhost:3000/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Reserva realizada:', data);
        })
        .catch(error => console.error('Error:', error));
    });
} else {
    console.error("El formulario con id 'reservaForm' no se encontró en el DOM.");
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/reservas')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = ''; 

        data.forEach(reserva => {
            const row = `<tr>
                            <td>${reserva.nome}</td>
                            <td>${reserva.data_entrada}</td>
                            <td>${reserva.data_saida}</td>
                            <td>${reserva.email}</td>
                            <td>${reserva.mensagem}</td>
                            <td>${reserva.adultos}</td>
                            <td>${reserva.criancas}</td>
                        </tr>`;
            tableBody.innerHTML += row;
        });
    })
    .catch(error => console.error('Error:', error));
});