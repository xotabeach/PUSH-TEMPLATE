document.addEventListener("DOMContentLoaded", () => {
    let currentScenarioIndex;
    fetch('/log_classes.json')
        .then(response => response.json())
        .then(data => {
            console.log('Полученные данные:', data); 
            if (data.error) {
                document.getElementById('error-message').innerHTML = 'Ошибка загрузки данных.';
            } else {
                var date = new Date();
                document.getElementById('error-time').textContent = date.toLocaleString();
                
                // Здесь вы берете первый столбец и n-ую строку из данных JSON и вставляете их в notification-content
                const columnName = Object.keys(data);
                
                // Генерация случайного индекса сценария от 1 до 24
                currentScenarioIndex = Math.floor(Math.random() * 23) + 0;

                document.getElementById('error-message').textContent = `${columnName[currentScenarioIndex]}`;

                document.querySelector('.notification-container').classList.add('visible');
            }
        })
        .catch(error => {
            const noButton = document.querySelector(".no-button");
            noButton.classList.add("hidden"); // Показывает кнопку "НЕТ"
            console.error('Ошибка загрузки данных:', error);
            document.getElementById('error-message').innerHTML = 'Ошибка загрузки данных.';
            document.querySelector('.notification-container').classList.add('visible');
        });

    

    // Создаем пустой двумерный массив
var data = [];

// Считываем файл (предполагается, что у вас есть файл.txt в корневой директории)
fetch('scenar.txt')
    .then(response => response.text())
    .then(text => {
        // Разбиваем текст на строки
        var lines = text.split('\n');

        // Проходим по каждой строке и создаем объекты
        lines.forEach(line => {
            var parts = line.split(';');
            if (parts.length === 2) {
                //var title = parts[0].trim();
                //var scenario = parts[1].trim();
                data.push(parts[0].trim());
            }
        });

        // Выводим полученные данные
        console.log('Data ' + data);
    })
    .catch(error => {
        console.error('Ошибка при чтении файла:', error);
    });
    
    var scenarios = data.map(item => item.scenarios);
    for(let i = 0; i < scenarios.length; i++){
        console.log('SCENARY ' + scenarios[i]);
    }


    function showScenarios() {
        const notificationContainer = document.querySelector(".notification-container");
        const scenariosContainer = document.querySelector(".scenarios-container");
        const closeButton = document.querySelector(".close-button");
        const noButton = document.querySelector(".no-button");
        const scenarioContent = document.querySelector(".scenario-content");

        // Плавно увеличиваем высоту уведомления
        notificationContainer.style.height = "400px"; // Настройте высоту, которая вам подходит

        closeButton.style.transform = "translate(-655%, 750%)"; 
        noButton.style.transform = "translate(-35%,600%)";
       
        // Настройте смещение, которое вам подходит
        
        closeButton.textContent = "ДА"; // Измените текст кнопки
        

        noButton.classList.remove("hidden"); // Показать кнопку "НЕТ"
        // Плавное изменение положения кнопки "ОК"
        scenarioContent.innerHTML = scenarios[currentScenarioIndex];
        scenariosContainer.style.display = "block";
        // Скрываем "Рекомендации для исправления" после нажатия
        const reportLink = document.querySelector(".report-link");
        reportLink.style.display = "none";
    }

    // Ваша функция для открытия формы обращения к администратору
    function showNotification() {
        const notificationContainer = document.querySelector(".notification-container");
        notificationContainer.classList.remove("hidden");
    }

    const reportLink = document.querySelector(".report-link");
    reportLink.addEventListener("click", showScenarios);

    showNotification();
});

function closeNotification() {
    document.querySelector('.notification-container').classList.remove('visible');
}

function openReportForm() {
    alert('Открывается форма обращения к администратору.');
    location.assign("https://forms.yandex.ru/cloud/6533d70fe010db5753cf98ff/");
}
