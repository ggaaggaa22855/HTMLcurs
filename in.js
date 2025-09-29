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
    
    // Инициализация системы фильтров противогаза
    initGasMaskSystem();
    
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

// СИСТЕМА ФИЛЬТРОВ ПРОТИВОГАЗА - РАБОЧАЯ ВЕРСИЯ
function initGasMaskSystem() {
    console.log('Инициализация системы фильтров...');
    
    // Находим элементы в секции examples
    const filterBar = document.querySelector('#examples .filter-bar');
    const replaceBtn = document.querySelector('#examples .metro-btn');
    const timer = document.querySelector('#examples .timer');
    
    console.log('Найдены элементы:', { 
        filterBar: !!filterBar, 
        replaceBtn: !!replaceBtn, 
        timer: !!timer 
    });
    
    if (!filterBar || !replaceBtn || !timer) {
        console.error('Не все элементы системы фильтров найдены!');
        return;
    }

    // Настройки
    const config = {
        maxFilter: 100,
        minFilter: 0,
        degradeSpeed: 0.8,
        timeTotal: 5 * 60 + 23,
        replaceTime: 2000
    };
    
    let filterStatus = config.maxFilter;
    let timeLeft = config.timeTotal;
    let degradeInterval;
    let isReplacing = false;

    // Обновление дисплея
    function updateDisplay() {
        filterBar.style.width = `${filterStatus}%`;
        
        // Цветовая индикация
        if (filterStatus > 50) {
            filterBar.style.background = 'linear-gradient(to right, #00aa00, #00cc00)';
        } else if (filterStatus > 20) {
            filterBar.style.background = 'linear-gradient(to right, #ffcc00, #ff9900)';
        } else {
            filterBar.style.background = 'linear-gradient(to right, #ff6600, #ff0000)';
        }
        
        // Таймер
        const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const secs = (timeLeft % 60).toString().padStart(2, '0');
        timer.textContent = `${mins}:${secs}`;
        
        // Визуальные эффекты при критическом состоянии
        if (filterStatus < 30) {
            timer.style.color = '#ff0000';
            timer.style.fontWeight = 'bold';
            timer.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.7)';
        } else {
            timer.style.color = '#ff5555';
            timer.style.fontWeight = 'normal';
            timer.style.textShadow = 'none';
        }
    }

    // Износ фильтров
    function startDegradation() {
        clearInterval(degradeInterval);
        
        degradeInterval = setInterval(() => {
            if (isReplacing) return;
            
            filterStatus = Math.max(config.minFilter, filterStatus - config.degradeSpeed);
            timeLeft = Math.max(0, timeLeft - 1);
            
            updateDisplay();
            
            // Автоматическая остановка при полном износе
            if (filterStatus <= config.minFilter) {
                clearInterval(degradeInterval);
                console.log('Фильтры полностью изношены!');
            }
        }, 1000);
    }

    // Замена фильтров
    function replaceFilters() {
        if (isReplacing) {
            console.log('Замена уже идет...');
            return;
        }
        
        console.log('Начало замены фильтров...');
        isReplacing = true;
        replaceBtn.disabled = true;
        const originalText = replaceBtn.textContent;
        
        // Визуальная обратная связь
        replaceBtn.textContent = 'ЗАМЕНА...';
        replaceBtn.style.background = '#555';
        
        // Останавливаем износ
        clearInterval(degradeInterval);
        
        // Анимация замены - быстрый рост
        let replaceProgress = filterStatus;
        const replaceStep = (config.maxFilter - filterStatus) / 10;
        
        const replaceAnimation = setInterval(() => {
            replaceProgress += replaceStep;
            filterStatus = Math.min(config.maxFilter, replaceProgress);
            
            updateDisplay();
            
            if (filterStatus >= config.maxFilter) {
                clearInterval(replaceAnimation);
                
                // Завершение замены
                timeLeft = config.timeTotal;
                filterStatus = config.maxFilter;
                
                setTimeout(() => {
                    replaceBtn.textContent = originalText;
                    replaceBtn.disabled = false;
                    replaceBtn.style.background = '';
                    isReplacing = false;
                    
                    // Перезапускаем износ
                    startDegradation();
                    console.log('Фильтры заменены!');
                }, 500);
            }
        }, 100);
    }

    // Назначаем обработчик клика
    replaceBtn.addEventListener('click', replaceFilters);
    
    // Добавляем стили для плавности
    filterBar.style.transition = 'width 0.5s ease, background 0.5s ease';
    
    // Инициализация
    updateDisplay();
    startDegradation();
    
    console.log('Система фильтров инициализирована успешно!');
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
