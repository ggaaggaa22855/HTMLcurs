// Новые функции для улучшенного сайта

// Система достижений
function initAchievementsSystem() {
    const achievements = document.querySelectorAll('.achievement');
    
    achievements.forEach(achievement => {
        achievement.addEventListener('click', function() {
            if (!this.classList.contains('locked')) {
                // Показать информацию о достижении
                showAchievementInfo(this.dataset.achievement);
            }
        });
    });
    
    // Разблокируем первое достижение
    setTimeout(() => {
        unlockAchievement('first-code');
    }, 2000);
}

function unlockAchievement(achievementId) {
    const achievement = document.querySelector(`[data-achievement="${achievementId}"]`);
    if (achievement) {
        achievement.classList.remove('locked');
        showNotification(`Достижение разблокировано: ${achievement.querySelector('.achievement-name').textContent}`);
    }
}

function showAchievementInfo(achievementId) {
    const messages = {
        'first-code': 'Вы написали свой первый код! Продолжайте в том же духе!',
        'html-master': 'Вы освоили все основы HTML. Отличная работа!',
        'css-wizard': 'Ваши навыки CSS на высоте! Магия стилей в ваших руках!',
        'js-ninja': 'JavaScript больше не имеет секретов для вас!'
    };
    
    showNotification(messages[achievementId] || 'Достижение получено!');
}

// Интерактивный конструктор HTML
function initHTMLConstructor() {
    const constructorBtns = document.querySelectorAll('.constructor-btn');
    const htmlPreview = document.getElementById('html-preview');
    const generatedHTML = document.getElementById('generated-html');
    
    constructorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tag = this.dataset.tag;
            addHTMLElement(tag);
        });
    });
    
    document.getElementById('clear-constructor').addEventListener('click', clearConstructor);
    
    function addHTMLElement(tag) {
        let element, text;
        
        switch(tag) {
            case 'h1':
                element = document.createElement('h1');
                text = 'Заголовок станции';
                break;
            case 'p':
                element = document.createElement('p');
                text = 'Текст описания станции...';
                break;
            case 'button':
                element = document.createElement('button');
                element.className = 'metro-btn';
                text = 'Кнопка действия';
                break;
        }
        
        if (element) {
            element.textContent = text;
            htmlPreview.appendChild(element);
            updateGeneratedCode();
        }
    }
    
    function clearConstructor() {
        htmlPreview.innerHTML = '';
        updateGeneratedCode();
    }
    
    function updateGeneratedCode() {
        generatedHTML.textContent = htmlPreview.innerHTML;
    }
}

// JavaScript консоль
function initJSConsole() {
    const jsInput = document.getElementById('js-input');
    const jsOutput = document.getElementById('js-output');
    const executeBtn = document.getElementById('execute-js');
    
    function executeCommand() {
        const command = jsInput.value.trim();
        if (!command) return;
        
        // Добавляем команду в вывод
        addToOutput(`> ${command}`);
        
        try {
            // Безопасное выполнение команд
            if (command.startsWith('console.')) {
                addToOutput('Ошибка: команды console не разрешены');
            } else if (command.includes('alert') || command.includes('prompt')) {
                addToOutput('Ошибка: диалоговые функции не разрешены');
            } else {
                const result = eval(command);
                addToOutput(result !== undefined ? result : 'Команда выполнена');
            }
        } catch (error) {
            addToOutput(`Ошибка: ${error.message}`);
        }
        
        jsInput.value = '';
        jsOutput.scrollTop = jsOutput.scrollHeight;
    }
    
    function addToOutput(text) {
        const line = document.createElement('div');
        line.className = 'console-line';
        line.textContent = text;
        jsOutput.appendChild(line);
    }
    
    executeBtn.addEventListener('click', executeCommand);
    jsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') executeCommand();
    });
}

// Радиостанция
function initRadioStation() {
    const playBtn = document.getElementById('play-btn');
    const stopBtn = document.getElementById('stop-btn');
    const scanBtn = document.getElementById('scan-btn');
    
    const stations = [
        { name: 'РАДИО ПОЛИСА', freq: '104.7 FM' },
        { name: 'ХАНСКОЕ РАДИО', freq: '98.3 FM' },
        { name: 'РЕД ЛИНИЯ', freq: '106.1 FM' },
        { name: 'СТАНЦИЯ D6', freq: '99.9 FM' }
    ];
    
    let currentStation = 0;
    
    playBtn.addEventListener('click', function() {
        showNotification(`В эфире: ${stations[currentStation].name}`);
    });
    
    stopBtn.addEventListener('click', function() {
        showNotification('Радио выключено');
    });
    
    scanBtn.addEventListener('click', function() {
        currentStation = (currentStation + 1) % stations.length;
        const station = stations[currentStation];
        document.querySelector('.station-name').textContent = station.name;
        document.querySelector('.frequency').textContent = station.freq;
        showNotification(`Найдена станция: ${station.name}`);
    });
}

// Карта метро
function initMetroMap() {
    const stations = document.querySelectorAll('.map-station');
    const stationInfo = document.getElementById('station-info');
    
    const stationData = {
        'polis': 'Станция Полис - центр цивилизации в метро. Здесь находятся библиотека и университет.',
        'exhibition': 'Выставочная - крупный торговый узел и культурный центр.',
        'library': 'Библиотека им. Ленина - хранилище знаний доапокалиптического мира.'
    };
    
    stations.forEach(station => {
        station.addEventListener('click', function() {
            stations.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            const stationId = this.dataset.station;
            stationInfo.textContent = stationData[stationId] || 'Информация о станции отсутствует';
        });
    });
}

// Система уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `metro-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Анимированный счетчик
function initCounters() {
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Запускаем анимацию счетчиков
    setTimeout(() => {
        animateCounter(document.getElementById('code-lines'), 1274);
        animateCounter(document.getElementById('lessons-completed'), 8);
    }, 1000);
}

// Кнопка возврата наверх
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Инициализация всех систем
document.addEventListener('DOMContentLoaded', function() {
    // Существующие функции
    initGasMaskSystem();
    // ... остальная существующая инициализация
    
    // Новые функции
    initAchievementsSystem();
    initHTMLConstructor();
    initJSConsole();
    initRadioStation();
    initMetroMap();
    initCounters();
    initBackToTop();
    
    // Показываем приветственное сообщение
    setTimeout(() => {
        showNotification('Добро пожаловать на станцию кода, сталкер!', 'welcome');
    }, 1000);
});
