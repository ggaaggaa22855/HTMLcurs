
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





