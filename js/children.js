// Функции для страницы "Детям"
document.addEventListener('DOMContentLoaded', function() {
    // ========== Фильтрация категорий ==========
    const categoryBtns = document.querySelectorAll('.category-btn');
    const checklistCategories = document.querySelectorAll('.checklist-category');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Показываем/скрываем категории
            checklistCategories.forEach(cat => {
                if (category === 'all' || cat.getAttribute('data-category') === category) {
                    cat.style.display = 'block';
                    setTimeout(() => {
                        cat.style.opacity = '1';
                        cat.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    cat.style.opacity = '0';
                    cat.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        cat.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ========== Отметить все / Снять отметки ==========
    const checkAllBtn = document.getElementById('checkAllBtn');
    const uncheckAllBtn = document.getElementById('uncheckAllBtn');
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    if (checkAllBtn) {
        checkAllBtn.addEventListener('click', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
                // Добавляем визуальный эффект
                const label = checkbox.nextElementSibling;
                label.style.background = 'rgba(67, 97, 238, 0.1)';
                label.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    label.style.transform = 'scale(1)';
                }, 200);
            });
            
            // Анимация успеха
            this.innerHTML = '<i class="fas fa-check"></i> Отмечено всё!';
            this.style.background = 'var(--success)';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check-double"></i> Отметить всё';
                this.style.background = '';
            }, 2000);
        });
    }
    
    if (uncheckAllBtn) {
        uncheckAllBtn.addEventListener('click', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                // Добавляем визуальный эффект
                const label = checkbox.nextElementSibling;
                label.style.background = 'white';
                label.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    label.style.transform = 'scale(1)';
                }, 200);
            });
            
            // Анимация
            this.innerHTML = '<i class="fas fa-ban"></i> Отметки сняты!';
            this.style.background = 'var(--danger)';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-undo"></i> Снять отметки';
                this.style.background = '';
            }, 2000);
        });
    }
    
    // ========== Печать списка ==========
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // Создаем контент для печати
            const printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Список вещей для выезда ДХВ "Твоя Церковь"</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                        h1 { color: #4361ee; text-align: center; }
                        h2 { color: #333; border-bottom: 2px solid #4361ee; padding-bottom: 5px; }
                        .category { margin-bottom: 20px; }
                        .item { padding: 5px 0; }
                        .item.checked { text-decoration: line-through; color: #666; }
                        .note { font-size: 0.9em; color: #666; font-style: italic; margin-left: 10px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .footer { margin-top: 50px; text-align: center; font-size: 0.9em; color: #666; }
                        @media print {
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>ДХВ "Твоя Церковь"</h1>
                        <h2>Список вещей для детского выезда</h2>
                        <p>Даты: 15-25 июля 2024</p>
                    </div>
                    
                    <div class="category">
                        <h2>👕 Одежда</h2>
                        <div class="item">☐ Спортивный костюм (2-3 комплекта)</div>
                        <div class="item">☐ Футболки (5-7 штук)</div>
                        <div class="item">☐ Шорты/юбки (2-3 шт)</div>
                        <div class="item">☐ Джинсы/брюки (2 пары) <span class="note">На прохладные вечера</span></div>
                        <div class="item">☐ Теплый свитер/кофта</div>
                        <div class="item">☐ Куртка ветровка <span class="note">С капюшоном</span></div>
                        <div class="item">☐ Пижама/одежда для сна</div>
                        <div class="item">☐ Нижнее бельё (10 комплектов)</div>
                        <div class="item">☐ Носки (10 пар)</div>
                        <div class="item">☐ Головной убор (кепка/панама) <span class="note">От солнца</span></div>
                    </div>
                    
                    <div class="category">
                        <h2>🧼 Гигиена</h2>
                        <div class="item">☐ Зубная щетка и паста</div>
                        <div class="item">☐ Мыло/гель для души</div>
                        <div class="item">☐ Шампунь</div>
                        <div class="item">☐ Мочалка</div>
                        <div class="item">☐ Полотенце (2-3 шт) <span class="note">Для душа и для пляжа</span></div>
                        <div class="item">☐ Расческа/зеркало</div>
                        <div class="item">☐ Крем от солнца (SPF 30+)</div>
                        <div class="item">☐ Средство от комаров</div>
                    </div>
                    
                    <div class="category">
                        <h2>⭐ Разное</h2>
                        <div class="item">☐ Рюкзак/сумка</div>
                        <div class="item">☐ Бутылка для воды</div>
                        <div class="item">☐ Фонарик <span class="note">С батарейками</span></div>
                        <div class="item">☐ Блокнот и ручка <span class="note">Для записей</span></div>
                        <div class="item">☐ Библия</div>
                        <div class="item">☐ Любимая игрушка/книга <span class="note">Необязательно</span></div>
                    </div>
                    
                    <div class="footer">
                        <p>ДХВ "Твоя Церковь" © 2024</p>
                        <p>Телефон: +7 (XXX) XXX-XX-XX</p>
                        <p>Email: info@tvoya-cerkov.ru</p>
                    </div>
                </body>
                </html>
            `;
            
            // Открываем новое окно для печати
            const printWindow = window.open('', '_blank');
            printWindow.document.write(printContent);
            printWindow.document.close();
            
            // Ждем загрузки и печатаем
            printWindow.onload = function() {
                printWindow.print();
                printWindow.close();
            };
            
            // Анимация кнопки
            this.innerHTML = '<i class="fas fa-print"></i> Печатаю...';
            this.disabled = true;
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-print"></i> Распечатать список';
                this.disabled = false;
            }, 2000);
        });
    }
    
    // ========== Сохранение состояния чекбоксов ==========
    checkboxes.forEach(checkbox => {
        // Восстанавливаем состояние из localStorage
        const itemId = checkbox.id;
        const savedState = localStorage.getItem(itemId);
        if (savedState === 'checked') {
            checkbox.checked = true;
        }
        
        // Сохраняем состояние при изменении
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem(this.id, 'checked');
            } else {
                localStorage.removeItem(this.id);
            }
        });
    });
    
    // ========== Поиск по списку ==========
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск вещей...';
    searchInput.style.width = '100%';
    searchInput.style.padding = '0.8rem 1rem';
    searchInput.style.marginBottom = '2rem';
    searchInput.style.border = '2px solid var(--light-gray)';
    searchInput.style.borderRadius = 'var(--radius)';
    searchInput.style.fontSize = '1rem';
    
    // Вставляем поле поиска перед списком
    const checklistContainer = document.querySelector('.checklist-container');
    if (checklistContainer) {
        checklistContainer.parentNode.insertBefore(searchInput, checklistContainer);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const items = document.querySelectorAll('.checklist-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // ========== Анимация при отметке ==========
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                // Анимация отметки
                label.style.background = 'rgba(67, 97, 238, 0.1)';
                label.style.transform = 'scale(1.02)';
                
                // Эффект "тик"
                const checkmark = label.querySelector('.checkmark');
                checkmark.style.animation = 'tick 0.3s ease';
                
                // Подсчет отмеченных
                updateProgress();
            } else {
                label.style.background = 'white';
                label.style.transform = 'scale(1)';
                updateProgress();
            }
            
            setTimeout(() => {
                label.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // ========== Прогресс сбора вещей ==========
    function updateProgress() {
        const totalItems = checkboxes.length;
        const checkedItems = Array.from(checkboxes).filter(cb => cb.checked).length;
        const progress = Math.round((checkedItems / totalItems) * 100);
        
        // Создаем или обновляем индикатор прогресса
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.marginTop = '2rem';
            progressBar.style.background = 'var(--light-gray)';
            progressBar.style.borderRadius = '50px';
            progressBar.style.height = '10px';
            progressBar.style.overflow = 'hidden';
            progressBar.style.position = 'relative';
            
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.height = '100%';
            progressFill.style.background = 'var(--gradient-primary)';
            progressFill.style.borderRadius = '50px';
            progressFill.style.transition = 'width 0.5s ease';
            progressFill.style.width = '0%';
            
            const progressText = document.createElement('div');
            progressText.className = 'progress-text';
            progressText.style.textAlign = 'center';
            progressText.style.marginTop = '10px';
            progressText.style.fontWeight = '600';
            progressText.style.color = 'var(--primary)';
            
            progressBar.appendChild(progressFill);
            progressBar.appendChild(progressText);
            
            const checklistActions = document.querySelector('.checklist-actions');
            if (checklistActions) {
                checklistActions.parentNode.insertBefore(progressBar, checklistActions);
            }
        }
        
        const progressFill = progressBar.querySelector('.progress-fill');
        const progressText = progressBar.querySelector('.progress-text');
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Собрано: ${checkedItems} из ${totalItems} вещей (${progress}%)`;
        
        // Если все собрано - показываем поздравление
        if (progress === 100) {
            progressText.innerHTML = `🎉 Все вещи собраны! Вы готовы к выезду!`;
            progressText.style.color = 'var(--success)';
            
            // Запускаем конфетти
            startConfetti();
        }
    }
    
    // ========== Эффект конфетти ==========
    function startConfetti() {
        const colors = ['#4361ee', '#7209b7', '#f72585', '#4cc9f0', '#f8961e'];
        
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-20px';
                confetti.style.zIndex = '9999';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                // Анимация падения
                const animation = confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: 2000 + Math.random() * 3000,
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                });
                
                animation.onfinish = () => confetti.remove();
            }, i * 20);
        }
    }
    
    // Инициализируем прогресс при загрузке
    updateProgress();
});