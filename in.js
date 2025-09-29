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
// РАБОЧАЯ СИСТЕМА ФИЛЬТРОВ ПРОТИВОГАЗА
function initGasMaskSystem() {
    console.log('🚀 Инициализация системы фильтров...');
    
    // Ждем немного чтобы DOM точно загрузился
    setTimeout(() => {
        // Находим элементы в секции examples
        const filterBar = document.querySelector('#examples .filter-bar');
        const replaceBtn = document.querySelector('#examples .metro-btn');
        const timer = document.querySelector('#examples .timer');
        
        console.log('🔍 Поиск элементов:', { 
            filterBar: filterBar, 
            replaceBtn: replaceBtn, 
            timer: timer 
        });
        
        if (!filterBar || !replaceBtn || !timer) {
            console.error('❌ Не все элементы системы фильтров найдены!');
            console.log('Ищем в:', document.querySelector('#examples'));
            return;
        }

        // Настройки
        const config = {
            maxFilter: 100,
            minFilter: 0,
            degradeSpeed: 0.5, // Медленнее для лучшей видимости
            timeTotal: 5 * 60 + 23, // 5 минут 23 секунды
            replaceTime: 1500
        };
        
        let filterStatus = config.maxFilter;
        let timeLeft = config.timeTotal;
        let degradeInterval;
        let isReplacing = false;

        console.log('✅ Система фильтров настроена');

        // Обновление дисплея
        function updateDisplay() {
            console.log('🔄 Обновление дисплея:', { filterStatus, timeLeft });
            
            // Полоса фильтров
            filterBar.style.width = `${filterStatus}%`;
            
            // Цветовая индикация
            if (filterStatus > 60) {
                filterBar.style.background = 'linear-gradient(to right, #00ff00, #00aa00)';
            } else if (filterStatus > 30) {
                filterBar.style.background = 'linear-gradient(to right, #ffff00, #ff9900)';
            } else if (filterStatus > 15) {
                filterBar.style.background = 'linear-gradient(to right, #ff9900, #ff6600)';
            } else {
                filterBar.style.background = 'linear-gradient(to right, #ff0000, #cc0000)';
            }
            
            // Таймер
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            timer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
            // Визуальные эффекты при критическом состоянии
            if (filterStatus < 20) {
                timer.style.color = '#ff0000';
                timer.style.fontWeight = 'bold';
                timer.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.7)';
                timer.style.animation = 'pulse 1s infinite';
            } else if (filterStatus < 40) {
                timer.style.color = '#ff9900';
                timer.style.fontWeight = 'bold';
                timer.style.textShadow = '0 0 5px rgba(255, 153, 0, 0.5)';
                timer.style.animation = 'none';
            } else {
                timer.style.color = '#00ff00';
                timer.style.fontWeight = 'normal';
                timer.style.textShadow = 'none';
                timer.style.animation = 'none';
            }
        }

        // Износ фильтров
        function startDegradation() {
            console.log('🔄 Запуск износа фильтров');
            clearInterval(degradeInterval);
            
            degradeInterval = setInterval(() => {
                if (isReplacing) {
                    console.log('⏸️ Износ приостановлен - идет замена');
                    return;
                }
                
                // Уменьшаем фильтры и время
                filterStatus = Math.max(config.minFilter, filterStatus - config.degradeSpeed);
                timeLeft = Math.max(0, timeLeft - 1);
                
                updateDisplay();
                
                // Автоматическая остановка при полном износе
                if (filterStatus <= config.minFilter) {
                    clearInterval(degradeInterval);
                    console.log('🛑 Фильтры полностью изношены!');
                    replaceBtn.style.background = '#ff0000';
                    replaceBtn.textContent = '!!! ЗАМЕНИТЬ ФИЛЬТРЫ !!!';
                }
                
                // Обновляем точки качества воздуха
                updateAirQuality();
                
            }, 1000); // Обновляем каждую секунду
        }

        // Обновление качества воздуха
        function updateAirQuality() {
            const qualityDots = document.querySelectorAll('.quality-dot');
            const activeDots = Math.floor(filterStatus / 25); // 4 точки = 100%
            
            qualityDots.forEach((dot, index) => {
                if (index < activeDots) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Замена фильтров
        function replaceFilters() {
            if (isReplacing) {
                console.log('⚠️ Замена уже идет...');
                return;
            }
            
            console.log('🔄 Начало замены фильтров...');
            isReplacing = true;
            replaceBtn.disabled = true;
            const originalText = replaceBtn.textContent;
            
            // Визуальная обратная связь
            replaceBtn.textContent = '🔄 ЗАМЕНА...';
            replaceBtn.style.background = '#555';
            
            // Останавливаем износ
            clearInterval(degradeInterval);
            
            // Анимация замены
            let replaceProgress = filterStatus;
            const totalIncrease = config.maxFilter - filterStatus;
            const steps = 20;
            const stepSize = totalIncrease / steps;
            
            console.log(`🎯 Замена: с ${filterStatus}% до 100% (шаг: ${stepSize})`);
            
            const replaceAnimation = setInterval(() => {
                replaceProgress += stepSize;
                filterStatus = Math.min(config.maxFilter, replaceProgress);
                
                updateDisplay();
                
                if (filterStatus >= config.maxFilter) {
                    clearInterval(replaceAnimation);
                    console.log('✅ Замена завершена');
                    
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
                        console.log('🚀 Износ перезапущен');
                        
                    }, 500);
                }
            }, 50); // Быстрая анимация
        }

        // Назначаем обработчик клика
        replaceBtn.addEventListener('click', replaceFilters);
        console.log('✅ Обработчик кнопки назначен');
        
        // Добавляем стили для плавности
        filterBar.style.transition = 'width 0.5s ease, background 0.5s ease';
        filterBar.style.width = '100%'; // Начальное значение
        
        // Добавляем CSS анимацию для пульсации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            .quality-dot {
                transition: background 0.3s ease;
            }
            .quality-dot.active {
                background: #00ff00 !important;
                box-shadow: 0 0 8px #00ff00;
            }
        `;
        document.head.appendChild(style);
        
        // Инициализация
        updateDisplay();
        startDegradation();
        
        console.log('🎉 Система фильтров инициализирована успешно!');
        
    }, 500); // Задержка для полной загрузки DOM
}
