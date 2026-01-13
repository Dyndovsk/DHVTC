// Функции для медиаархива
document.addEventListener('DOMContentLoaded', function() {
    // ========== Переключение между годами ==========
    const yearTabs = document.querySelectorAll('.year-tab');
    const yearGalleries = document.querySelectorAll('.year-gallery');
    
    yearTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Убираем активный класс у всех вкладок
            yearTabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущей вкладке
            this.classList.add('active');
            
            // Получаем год из data-атрибута
            const year = this.getAttribute('data-year');
            
            // Скрываем все галереи
            yearGalleries.forEach(gallery => {
                gallery.classList.remove('active');
                gallery.style.display = 'none';
            });
            
            // Показываем выбранную галерею
            const selectedGallery = document.getElementById(`gallery-${year}`);
            if (selectedGallery) {
                selectedGallery.style.display = 'block';
                setTimeout(() => {
                    selectedGallery.classList.add('active');
                }, 10);
            }
            
            // Прокручиваем к началу галереи
            setTimeout(() => {
                selectedGallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    });
    
    // ========== Фильтрация медиа ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок фильтра
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const activeGallery = document.querySelector('.year-gallery.active');
            const galleryItems = activeGallery.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ========== Инициализация LightGallery ==========
    const lightGalleryElements = document.querySelectorAll('.gallery-grid');
    
    lightGalleryElements.forEach((element, index) => {
        if (element.children.length > 0) {
            lightGallery(element, {
                selector: '.gallery-item',
                thumbnail: true,
                download: false,
                counter: true,
                plugins: [lgZoom, lgThumbnail, lgVideo],
                videojs: true,
                videojsOptions: {
                    controls: true,
                    preload: 'metadata'
                }
            });
        }
    });
    
    // ========== Видеоплеер ==========
    const playlistItems = document.querySelectorAll('.playlist-item');
    const mainVideo = document.querySelector('.main-video iframe');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close-modal');
    
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            // Убираем активный класс у всех элементов
            playlistItems.forEach(i => i.classList.remove('active'));
            // Добавляем активный класс текущему элементу
            this.classList.add('active');
            
            // Здесь можно обновить основное видео
            // В реальном проекте нужно менять src у iframe
        });
    });
    
    // ========== Модальное окно для видео ==========
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('href');
            
            if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                // Обработка YouTube видео
                const videoId = extractYouTubeId(videoUrl);
                modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            } else if (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm')) {
                // Обработка локальных видео
                modalVideo.src = videoUrl;
            }
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Функция для извлечения ID YouTube видео
    function extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
    
    // Закрытие модального окна
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            modalVideo.src = '';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalVideo.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ========== Ленивая загрузка изображений ==========
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ========== Загрузка дополнительных фото ==========
    const loadMoreBtn = document.querySelector('.gallery-load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Имитация загрузки
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
            this.disabled = true;
            
            setTimeout(() => {
                // В реальном проекте здесь будет AJAX запрос
                const activeGallery = document.querySelector('.year-gallery.active');
                const galleryGrid = activeGallery.querySelector('.gallery-grid');
                
                // Добавляем новые элементы
                for (let i = 0; i < 4; i++) {
                    const newItem = createGalleryItem();
                    galleryGrid.appendChild(newItem);
                }
                
                // Переинициализируем LightGallery
                if (lightGallery) {
                    lightGallery.destroy();
                    lightGallery(galleryGrid, {
                        selector: '.gallery-item',
                        thumbnail: true
                    });
                }
                
                this.innerHTML = '<i class="fas fa-plus"></i> Показать еще 12 фото';
                this.disabled = false;
                
                // Прокручиваем к новым элементам
                const newItems = galleryGrid.querySelectorAll('.gallery-item');
                if (newItems.length > 0) {
                    newItems[newItems.length - 1].scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }, 1500);
        });
    }
    
    // Функция создания элемента галереи
    function createGalleryItem() {
        const item = document.createElement('a');
        item.className = 'gallery-item';
        item.href = 'images/sample.jpg';
        item.setAttribute('data-category', 'photo');
        
        item.innerHTML = `
            <div class="gallery-thumb">
                <div class="loading" style="width: 100%; height: 200px; border-radius: var(--radius)"></div>
            </div>
            <div class="gallery-info">
                <h4>Новое фото</h4>
                <p>Добавлено только что</p>
                <span class="gallery-date"><i class="far fa-calendar"></i> Сегодня</span>
            </div>
        `;
        
        // Имитация загрузки изображения
        setTimeout(() => {
            const thumb = item.querySelector('.gallery-thumb');
            thumb.innerHTML = `
                <img src="https://via.placeholder.com/400x300/4361ee/ffffff?text=ДХВ" 
                     alt="Новое фото" 
                     loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
        }, 500);
        
        return item;
    }
    
    // ========== Архивные годы ==========
    const archiveYearBtns = document.querySelectorAll('.archive-year-btn');
    archiveYearBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            alert(`Просмотр архива за ${year} год. В реальном проекте здесь будет загрузка соответствующих медиа.`);
        });
    });
    
    // ========== Показать пароль для облака ==========
    const showPasswordBtn = document.getElementById('showPasswordBtn');
    if (showPasswordBtn) {
        showPasswordBtn.addEventListener('click', function() {
            const password = 'DHV2024!';
            this.innerHTML = `<i class="fas fa-copy"></i> ${password}`;
            
            // Копирование в буфер обмена
            navigator.clipboard.writeText(password).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);
            });
        });
    }
    
    // ========== Карусель для мобильных ==========
    function initMobileCarousel() {
        if (window.innerWidth < 768) {
            const galleryGrids = document.querySelectorAll('.gallery-grid');
            
            galleryGrids.forEach(grid => {
                if (!grid.classList.contains('splide-initialized')) {
                    // Превращаем grid в горизонтальную карусель
                    grid.style.display = 'flex';
                    grid.style.overflowX = 'auto';
                    grid.style.scrollSnapType = 'x mandatory';
                    grid.style.gap = '1rem';
                    grid.style.padding = '1rem 0';
                    
                    const items = grid.querySelectorAll('.gallery-item');
                    items.forEach(item => {
                        item.style.flex = '0 0 85%';
                        item.style.scrollSnapAlign = 'start';
                    });
                }
            });
        }
    }
    
    // Инициализируем карусель
    initMobileCarousel();
    window.addEventListener('resize', initMobileCarousel);
    
    // ========== Анимация при наведении на элементы галереи ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const info = this.querySelector('.gallery-info');
            if (info) {
                info.style.transform = 'translateY(0)';
                info.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const info = this.querySelector('.gallery-info');
            if (info) {
                info.style.transform = 'translateY(10px)';
                info.style.opacity = '0';
            }
        });
    });
    
    // ========== Сохранение избранного ==========
    galleryItems.forEach(item => {
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.style.position = 'absolute';
        favoriteBtn.style.top = '10px';
        favoriteBtn.style.right = '10px';
        favoriteBtn.style.background = 'white';
        favoriteBtn.style.border = 'none';
        favoriteBtn.style.width = '40px';
        favoriteBtn.style.height = '40px';
        favoriteBtn.style.borderRadius = '50%';
        favoriteBtn.style.cursor = 'pointer';
        favoriteBtn.style.boxShadow = 'var(--shadow)';
        favoriteBtn.style.zIndex = '2';
        favoriteBtn.style.transition = 'var(--transition)';
        
        favoriteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = 'var(--accent)';
                this.style.background = 'rgba(247, 37, 133, 0.1)';
                
                // Анимация
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                
                // Сохраняем в избранное
                saveToFavorites(item);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                this.style.background = 'white';
                
                // Удаляем из избранного
                removeFromFavorites(item);
            }
        });
        
        item.querySelector('.gallery-thumb').appendChild(favoriteBtn);
    });
    
    function saveToFavorites(item) {
        // В реальном проекте здесь будет сохранение в localStorage или на сервер
        console.log('Добавлено в избранное:', item.querySelector('h4').textContent);
    }
    
    function removeFromFavorites(item) {
        console.log('Удалено из избранного:', item.querySelector('h4').textContent);
    }
});