document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-button');
    let isDrawing = false; // Флаг для режима рисования

    // Обработчик для лайков
    likeButtons.forEach(button => {
        const likeCount = button.querySelector('.like-count');

        button.addEventListener('click', () => {
            button.classList.toggle('liked');

            // Увеличиваем или уменьшаем количество лайков
            let count = parseInt(likeCount.textContent, 10);
            if (button.classList.contains('liked')) {
                count++;
                isDrawing = true; // Включаем рисование
            } else {
                count--;
                isDrawing = false; // Выключаем рисование
            }
            likeCount.textContent = count;
        });
    });

    // Функция для создания элемента под курсором
    function createCursorElement(x, y) {
        const element = document.createElement('div');
        element.className = 'cursor-element';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        document.body.appendChild(element);

        // Удаляем элемент после завершения анимации
        setTimeout(() => {
            document.body.removeChild(element);
        }, 1000);
    }

    // Обработчик движения мыши
    document.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            createCursorElement(event.pageX, event.pageY);
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const badge = document.querySelector(".badge");
    const notificationList = document.querySelector(".notification-list");
    const bellIcon = document.querySelector(".bell");

    // Массив с новыми уведомлениями
    const newNotifications = [
        "Акция: 25% на все диваны",
        "Акция: 30% на шкафы-купе",
        "Акция: 20% на обеденные столы",
        "Акция: 15% на кухонные гарнитуры",
        "Акция: 40% на стулья",
        "Акция: 35% на кровати",
        "Акция: 50% на тумбы и комоды",
        "Акция: 10% на товары из новой коллекции",
        "Акция: 20% на мягкие кресла",
        "Акция: 30% на товары для офиса"
    ];

    let currentIndex = 0;
    let currentCount = parseInt(badge.textContent);
    const maxNotifications = 20; // Максимальное количество уведомлений
    let canAddNotifications = true; // Флаг, позволяющий добавлять уведомления

    // Функция для удаления уведомления
    function deleteNotification(event) {
        const item = event.target.closest(".item");
        if (item) {
            item.remove();
            currentCount--;
            badge.textContent = Math.max(currentCount, 0); // Обновляем счетчик

            // Когда уведомление удалено, проверяем количество уведомлений
            if (currentCount < maxNotifications && canAddNotifications) {
                // Даем возможность добавлять уведомления через 10 секунд
                canAddNotifications = false;
                setTimeout(() => {
                    canAddNotifications = true;
                    checkAndAddNotification();
                }, 10000); // Ожидание 10 секунд
            }
        }
    }

    // Функция для отображения или скрытия уведомлений при клике на значок
    bellIcon.addEventListener("click", function () {
        notificationList.style.display = notificationList.style.display === "block" ? "none" : "block";
    });

    // Добавляем обработчик для уже существующих кнопок удаления
    function addDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", deleteNotification);
        });
    }

    // Изначально добавляем обработчики на кнопки удаления, если они уже есть
    addDeleteButtonListeners();

    // Функция для добавления нового уведомления
    function addNewNotification() {
        // Проверяем, не достигли ли мы максимального количества уведомлений
        if (currentCount >= maxNotifications || !canAddNotifications) {
            return; // Прекращаем добавление, если уведомлений уже 20 или флаг запрещает добавление
        }

        const newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.textContent = newNotifications[currentIndex];

        // Создаем кнопку удаления
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "×";

        // Добавляем кнопку удаления к уведомлению
        newItem.appendChild(deleteBtn);

        // Вставляем новое уведомление в список
        notificationList.appendChild(newItem);

        // Увеличиваем счетчик
        currentCount++;
        badge.textContent = currentCount;

        // Добавляем обработчик события для кнопки удаления
        deleteBtn.addEventListener("click", deleteNotification);

        // Переходим к следующему уведомлению
        currentIndex = (currentIndex + 1) % newNotifications.length;
    }

    // Функция для проверки и добавления уведомлений при уменьшении их количества
    function checkAndAddNotification() {
        if (currentCount < maxNotifications && canAddNotifications) {
            addNewNotification();
        }
    }

    // Добавляем новое уведомление через определенные интервалы времени
    setInterval(() => {
        checkAndAddNotification();
    }, 3000);
});


