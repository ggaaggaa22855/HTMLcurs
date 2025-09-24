<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML/CSS в мире Metro - Java версия</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        /* Все CSS стили остаются без изменений */
        :root {
            --metro-dark: #1a1a1a;
            --metro-darker: #0d0d0d;
            --metro-orange: #cc9900;
            --metro-light: #e6e6e6;
            --metro-gray: #333333;
            --metro-green: #00aa00;
            --metro-red: #cc0000;
        }

        body {
            font-family: 'Roboto', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: var(--metro-dark);
            color: var(--metro-light);
            background-image: linear-gradient(
                to bottom,
                rgba(26, 26, 26, 0.9),
                rgba(13, 13, 13, 0.9)
            ), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a1a1a"/><path d="M0,50 L100,50 M50,0 L50,100" stroke="%23333" stroke-width="1"/></svg>');
            background-size: cover;
            background-attachment: fixed;
        }

        /* Остальные стили остаются без изменений */
        /* ... */
    </style>
</head>
<body>
    <header class="metro-header">
        <div class="header-content">
            <div class="logo">🚇</div>
            <h1>HTML/CSS в постапокалиптическом метро - Java версия</h1>
            <p class="tagline">Изучайте веб-разработку в атмосфере вселенной Metro</p>
            <p class="server-info">Сервер: <%= application.getServerInfo() %></p>
            <p class="java-version">Java версия: <%= System.getProperty("java.version") %></p>
        </div>
        <nav class="metro-nav">
            <ul>
                <li><a href="#html-basics"><span class="nav-icon">🚇</span> Основы HTML</a></li>
                <li><a href="#css-basics"><span class="nav-icon">🔦</span> Основы CSS</a></li>
                <li><a href="#examples"><span class="nav-icon">💻</span> Примеры кода</a></li>
                <li><a href="#practice"><span class="nav-icon">⚡</span> Практика</a></li>
                <li><a href="#java-info"><span class="nav-icon">☕</span> Java информация</a></li>
            </ul>
        </nav>
    </header>

    <main class="metro-main">
        <!-- Добавляем секцию с Java информацией -->
        <section id="java-info" class="metro-section">
            <div class="section-header">
                <h2><span class="section-icon">☕</span> Java информация</h2>
                <div class="section-image">☕</div>
            </div>
            
            <article class="metro-article">
                <h3>Серверная информация</h3>
                
                <div class="metro-grid">
                    <div class="metro-card">
                        <h4>Сервер</h4>
                        <p><%= application.getServerInfo() %></p>
                    </div>
                    <div class="metro-card">
                        <h4>Java версия</h4>
                        <p><%= System.getProperty("java.version") %></p>
                    </div>
                    <div class="metro-card">
                        <h4>Время сервера</h4>
                        <p><%= new java.util.Date() %></p>
                    </div>
                    <div class="metro-card">
                        <h4>Контекст приложения</h4>
                        <p><%= application.getContextPath() %></p>
                    </div>
                </div>
                
                <h3>Параметры запроса</h3>
                <div class="code-block">
                    <pre><code>
IP адрес: <%= request.getRemoteAddr() %>
Метод запроса: <%= request.getMethod() %>
URL: <%= request.getRequestURL() %>
                    </code></pre>
                </div>
            </article>
        </section>

        <!-- Остальные секции остаются без изменений -->
        <section id="html-basics" class="metro-section">
            <div class="section-header">
                <h2><span class="section-icon">🚇</span> Основы HTML</h2>
                <div class="section-image">🚇</div>
            </div>
            
            <article class="metro-article">
                <h3>Строим станции: структура HTML</h3>
                <p>Как станции метро соединены тоннелями, так HTML-элементы образуют структуру веб-страницы.</p>
                
                <div class="code-block">
                    <h4>Каркас станции (базовая структура HTML):</h4>
                    <pre><code>
&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Название станции&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;Вход на станцию&lt;/header&gt;
    &lt;main&gt;Центральный зал&lt;/main&gt;
    &lt;footer&gt;Выход к тоннелям&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;
                    </code></pre>
                </div>
                
                <h3>Основные элементы - жители метро</h3>
                <div class="metro-grid">
                    <div class="metro-card">
                        <h4>&lt;h1&gt;-&lt;h6&gt;</h4>
                        <p>Как указатели станций - определяют важность заголовков</p>
                    </div>
                    <div class="metro-card">
                        <h4>&lt;p&gt;</h4>
                        <p>Как рассказы старых сталкеров - содержат текстовую информацию</p>
                    </div>
                    <div class="metro-card">
                        <h4>&lt;a&gt;</h4>
                        <p>Как переходы между станциями - связывают страницы</p>
                    </div>
                    <div class="metro-card">
                        <h4>&lt;img&gt;</h4>
                        <p>Как фотографии на стенах - показывают изображения</p>
                    </div>
                </div>
            </article>
        </section>

        <!-- Остальные секции (CSS, примеры, практика) остаются без изменений -->
        <!-- ... -->

    </main>

    <footer class="metro-footer">
        <p>Станция разработки на Java | <%= new java.util.Date() %></p>
        <p>Сервер: <%= application.getServerInfo() %> | Java: <%= System.getProperty("java.version") %></p>
        <div class="footer-links">
            <a href="${pageContext.request.contextPath}/api/info">API информации</a>
            <a href="${pageContext.request.contextPath}/admin">Панель управления</a>
            <a href="mailto:admin@metrodev.java">Связь с разработчиками</a>
        </div>
    </footer>

    <script>
        // JavaScript код с добавлением Java-специфичных функций
        document.addEventListener('DOMContentLoaded', function() {
            // Переключение между вкладками HTML/CSS
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    document.querySelectorAll('.tab-pane').forEach(pane => {
                        pane.classList.remove('active');
                    });
                    
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
            
            // Загружаем дополнительную информацию с сервера
            loadServerInfo();
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
                filterElement.style.width = \`\${width}%\`;
                
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
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 200 * index);
            });
            
            const cards = document.querySelectorAll('.metro-card, .concept-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 300 + (100 * index));
            });
        }

        // Загрузка информации с сервера
        function loadServerInfo() {
            // В реальном приложении здесь был бы AJAX запрос к серверу
            console.log('Загрузка информации с Java сервера...');
            
            // Имитация получения данных с сервера
            setTimeout(() => {
                const serverInfoElement = document.createElement('div');
                serverInfoElement.className = 'metro-event-notification';
                serverInfoElement.textContent = 'Java сервер готов к работе';
                serverInfoElement.style.background = 'rgba(0, 100, 0, 0.9)';
                
                document.body.appendChild(serverInfoElement);
                
                setTimeout(() => {
                    serverInfoElement.style.opacity = '1';
                    serverInfoElement.style.bottom = '20px';
                }, 100);
                
                setTimeout(() => {
                    serverInfoElement.style.opacity = '0';
                    serverInfoElement.style.bottom = '-50px';
                    setTimeout(() => serverInfoElement.remove(), 500);
                }, 3000);
            }, 1000);
        }

        // Случайные события в метро с Java-тематикой
        function randomMetroEvent() {
            const events = [
                "Тревога! Мутанты на подходе к станции.",
                "Радио Полиса передает важное сообщение...",
                "Замечено движение в тоннеле 3-B.",
                "На поверхности зафиксирована радиационная буря.",
                "Торговцы прибыли с новыми товарами.",
                "Java сервер обработал новый запрос.",
                "База данных синхронизирована.",
                "JVM оптимизирует выполнение кода."
            ];
            
            const eventElement = document.createElement('div');
            eventElement.className = 'metro-event-notification';
            eventElement.textContent = events[Math.floor(Math.random() * events.length)];
            
            // Разные цвета для Java-событий
            if (eventElement.textContent.includes("Java") || 
                eventElement.textContent.includes("JVM") || 
                eventElement.textContent.includes("сервер")) {
                eventElement.style.background = 'rgba(0, 100, 0, 0.9)';
            }
            
            document.body.appendChild(eventElement);
            
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

        // Запускаем случайные события
        setInterval(randomMetroEvent, 15000 + Math.random() * 15000);
    </script>
</body>
</html>
