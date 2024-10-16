fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        const usersList = document.getElementById('users-list');

        data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} (${user.email})`;
            usersList.appendChild(li);
            const button = document.createElement('button');
            button.textContent = "Редактировать";
            usersList.appendChild(button);
            const button1 = document.createElement('button');
            button1.textContent = "Удалить";
            usersList.appendChild(button1);
            button1.addEventListener('click', (e) => {
                e.preventDefault(); 
                const id1 = user.id;
                fetch('http://localhost:3000/users/' + id1, {
                    
                    method: 'DELETE'                    
                    })
                    .then(() => {
                    console.log('Пользователь удален');
                    })
                    .catch(error => alert('Не удалось удалить'));
            });
            button.addEventListener('click', (e) => {
                e.preventDefault(); 
                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
                document.getElementById('id').value = user.id;
            });

        });
        
    }) 
    .catch(error => alert('Не удалось создать список пользователей'));                  
        

        const form = document.getElementById('user-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Предотвращаем отправку формы по умолчанию
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const id = document.getElementById('id').value;
          
            // Создаем объект пользователя
            const newUser = {
                name: name,
                email: email
            };
            // Отправляем POST-запрос на сервер
            fetch('http://localhost:3000/users/' + id, {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser) // Преобразуем объект в JSON-строку
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Пользователь добавлен:', data);
                })
                .catch(error => alert('Не удалось добавить'));
        });
        
        