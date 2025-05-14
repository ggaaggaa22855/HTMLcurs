// Удалите старую функцию simulateFilterDegradation и замените её этой реализацией
function initGasMaskSystem() {
    const filterBar = document.querySelector('.filter-bar');
    const replaceBtn = document.querySelector('.gas-mask-ui .metro-btn');
    const timer = document.querySelector('.timer');
    
    if (!filterBar || !replaceBtn || !timer) return;
    
    // Настройки системы
    const config = {
        maxFilter: 100,          // Максимальный уровень фильтра
        minFilter: 0,            // Минимальный уровень
        degradeSpeed: 0.7,       // Скорость износа (меньше = медленнее)
        timeTotal: 5 * 60 + 23,  // 5 минут 23 секунды
        replaceTime: 2000        // Время замены в мс
    };
    
    let filterStatus = config.maxFilter;
    let timeLeft = config.timeTotal;
    let degradeInterval;
    let isReplacing = false;
    
    // Обновление визуального состояния
    function updateDisplay() {
        // Плавное обновление полосы
        filterBar.style.width = `${filterStatus}%`;
        
        // Цветовая индикация
        if (filterStatus > 50) {
            filterBar.style.background = 'linear-gradient(to right, #00aa00, #ffcc00)';
        } else if (filterStatus > 20) {
            filterBar.style.background = 'linear-gradient(to right, #ffcc00, #ff6600)';
        } else {
            filterBar.style.background = 'linear-gradient(to right, #ff6600, #ff0000)';
        }
        
        // Обновление таймера
        const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const secs = (timeLeft % 60).toString().padStart(2, '0');
        timer.textContent = `${mins}:${secs}`;
        
        // Критическое состояние
        timer.style.color = filterStatus < 30 ? '#ff0000' : '#ff5555';
        timer.style.textShadow = filterStatus < 30 ? '0 0 5px rgba(255, 0, 0, 0.7)' : 'none';
    }
    
    // Процесс износа
    function startDegradation() {
        clearInterval(degradeInterval);
        
        degradeInterval = setInterval(() => {
            if (isReplacing) return;
            
            // Плавный износ
            filterStatus = Math.max(config.minFilter, filterStatus - config.degradeSpeed);
            timeLeft = Math.max(0, timeLeft - 1);
            
            updateDisplay();
            
            if (filterStatus <= config.minFilter) {
                clearInterval(degradeInterval);
            }
        }, 1000);
    }
    
    // Замена фильтров
    function replaceFilters() {
        if (isReplacing) return;
        
        isReplacing = true;
        replaceBtn.disabled = true;
        const originalText = replaceBtn.textContent;
        replaceBtn.textContent = 'ЗАМЕНА...';
        
        // Анимация замены
        const replaceInterval = setInterval(() => {
            filterStatus = Math.min(config.maxFilter, filterStatus + 10);
            updateDisplay();
            
            if (filterStatus >= config.maxFilter) {
                clearInterval(replaceInterval);
                timeLeft = config.timeTotal;
                
                setTimeout(() => {
                    replaceBtn.textContent = originalText;
                    replaceBtn.disabled = false;
                    isReplacing = false;
                    startDegradation();
                }, 500);
            }
        }, config.replaceTime / 10);
    }
    
    // Инициализация
    replaceBtn.addEventListener('click', replaceFilters);
    updateDisplay();
    startDegradation();
}

// В DOMContentLoaded оставьте только вызов initGasMaskSystem()
document.addEventListener('DOMContentLoaded', function() {
    initGasMaskSystem();
    // ... остальная инициализация
});
// ... (остальные ваши существующие функции)
// Инициализация редактора кода
document.addEventListener('DOMContentLoaded', function() {
    // Переключение между вкладками HTML/CSS
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок и панелей
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Добавляем активный класс к текущей кнопке и панели
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Запуск кода
    const runButton = document.getElementById('run-code');
    if (runButton) {
        runButton.addEventListener('click', executeCode);
    }
    
    // Имитация работы счетчика фильтров противогаза
    const filterBar = document.querySelector('.filter-bar');
    if (filterBar) {
        simulateFilterDegradation(filterBar);
    }
    
    // Добавляем интерактивность кнопкам в стиле Metro
    const metroButtons = document.querySelectorAll('.metro-btn, .metro-run-btn');
    metroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(204, 153, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });
    
    // Анимация загрузки станций
    animateStationLoading();
});

// Функция выполнения кода из редактора
function executeCode() {
    const htmlCode = document.querySelector('#html-tab .code-editor').value;
    const cssCode = document.querySelector('#css-tab .code-editor').value;
    const outputFrame = document.getElementById('code-output');
    
    const combinedCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode}</style>
        </head>
        <body>${htmlCode}</body>
        </html>
    `;
    
    outputFrame.srcdoc = combinedCode;
}

// Симуляция износа фильтров противогаза
function simulateFilterDegradation(filterElement) {
    let width = 100;
    const interval = setInterval(() => {
        width -= Math.random() * 2;
        filterElement.style.width = `${width}%`;
        
        // Изменение цвета в зависимости от состояния
        if (width > 50) {
            filterElement.style.background = 'linear-gradient(to right, #00aa00, #ffcc00)';
        } else if (width > 20) {
            filterElement.style.background = 'linear-gradient(to right, #ffcc00, #ff6600)';
        } else {
            filterElement.style.background = 'linear-gradient(to right, #ff6600, #ff0000)';
        }
        
        if (width <= 0) {
            clearInterval(interval);
            filterElement.style.width = '0%';
        }
    }, 1000);
}

// Анимация загрузки станций
function animateStationLoading() {
    const sections = document.querySelectorAll('.metro-section');
    sections.forEach((section, index) => {
        // Задержка для последовательной анимации
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Анимация карточек
    const cards = document.querySelectorAll('.metro-card, .concept-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 300 + (100 * index));
    });
}

// Дополнительная функция для случайных событий в метро
function randomMetroEvent() {
    const events = [
        "Тревога! Мутанты на подходе к станции.",
        "Радио Полиса передает важное сообщение...",
        "Замечено движение в тоннеле 3-B.",
        "На поверхности зафиксирована радиационная буря.",
        "Торговцы прибыли с новыми товарами."
    ];
    
    const eventElement = document.createElement('div');
    eventElement.className = 'metro-event-notification';
    eventElement.textContent = events[Math.floor(Math.random() * events.length)];
    
    document.body.appendChild(eventElement);
    
    // Анимация появления и исчезновения
    setTimeout(() => {
        eventElement.style.opacity = '1';
        eventElement.style.bottom = '20px';
    }, 100);
    
    setTimeout(() => {
        eventElement.style.opacity = '0';
        eventElement.style.bottom = '-50px';
        setTimeout(() => eventElement.remove(), 500);
    }, 3000);
}

// Запускаем случайные события каждые 15-30 секунд
setInterval(randomMetroEvent, 15000 + Math.random() * 15000);
