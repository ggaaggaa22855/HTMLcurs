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
    
