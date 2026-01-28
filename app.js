// بيانات التطبيق
const appData = {
    user: null,
    novels: [
        {
            id: 1,
            title: "أسطورة التنين الأزرق",
            author: "أحمد الشقيري",
            category: "فانتازيا",
            description: "رواية فانتازيا ملحمية تحكي قصة التنين الأزرق الأسطوري وحارسه البشري في عالم مليء بالسحر والمغامرات.",
            cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.7,
            pages: 320,
            type: "pdf",
            downloads: 1250,
            isFavorite: false,
            isDownloaded: false
        },
        {
            id: 2,
            title: "مملكة الظلال",
            author: "سارة النجار",
            category: "فانتازيا",
            description: "في مملكة تسيطر عليها قوى الظلام، تخرج بطلتنا في رحلة لاستعادة النور إلى عالمها.",
            cover: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.5,
            pages: 280,
            type: "text",
            downloads: 980,
            isFavorite: false,
            isDownloaded: false
        },
        {
            id: 3,
            title: "صائدو الأحلام",
            author: "خالد العلي",
            category: "مغامرة",
            description: "مجموعة من الصيادين الذين يسافرون بين العوالم لاصطياد الأحلام وتحقيق أمنيات البشر.",
            cover: "https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.3,
            pages: 350,
            type: "pdf",
            downloads: 750,
            isFavorite: false,
            isDownloaded: false
        },
        {
            id: 4,
            title: "سيف النور",
            author: "فاطمة الزهراء",
            category: "فانتازيا",
            description: "قصة فارس شاب يكتشف سيفاً مقدساً يمنحه قوى خارقة لمواجهة قوى الشر التي تهدد مملكته.",
            cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            pages: 400,
            type: "pdf",
            downloads: 2100,
            isFavorite: false,
            isDownloaded: false
        },
        {
            id: 5,
            title: "بوابة الزمن",
            author: "محمد السعدون",
            category: "مغامرة",
            description: "مغامرة عبر الزمن إلى عوالم سحيقة حيث يواجه البطل تحديات تختبر قدراته وشجاعته.",
            cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.4,
            pages: 310,
            type: "text",
            downloads: 890,
            isFavorite: false,
            isDownloaded: false
        },
        {
            id: 6,
            title: "وريث العرش المفقود",
            author: "نور الهدى",
            category: "فانتازيا",
            description: "شاب يكتشف أنه وريث عرش مملكة مفقودة، فيبدأ رحلة لإثبات حقه واستعادة ملكه.",
            cover: "https://images.unsplash.com/photo-1518834103325-6725c4b54c14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.6,
            pages: 380,
            type: "pdf",
            downloads: 1500,
            isFavorite: false,
            isDownloaded: false
        }
    ],
    currentNovel: null,
    aiMessages: [],
    isLoggedIn: false
};

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('التطبيق جاري التحميل...');
    
    // محاكاة شاشة التحميل
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            console.log('شاشة التحميل بدأت في الاختفاء');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                console.log('شاشة التحميل اختفت');
                
                // التحقق إذا كان المستخدم مسجلاً مسبقاً
                const savedUser = localStorage.getItem('sulafUser');
                if (savedUser) {
                    try {
                        appData.user = JSON.parse(savedUser);
                        appData.isLoggedIn = true;
                        document.getElementById('appContainer').style.display = 'flex';
                        updateUserInfo();
                        showNotification('مرحباً بعودتك!', 'success');
                    } catch (e) {
                        showLoginModal();
                    }
                } else {
                    showLoginModal();
                }
            }, 500);
        } else {
            console.error('لم يتم العثور على شاشة التحميل');
            showLoginModal();
        }
    }, 2000);
    
    // تهيئة الأحداث
    initializeEvents();
    
    // عرض الروايات الشعبية
    displayPopularNovels();
    
    // عرض الروايات الجديدة
    displayNewNovels();
});

// عرض نافذة تسجيل الدخول
function showLoginModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'flex';
        console.log('عرض نافذة تسجيل الدخول');
    } else {
        console.error('لم يتم العثور على نافذة تسجيل الدخول');
    }
}

// تهيئة جميع الأحداث
function initializeEvents() {
    console.log('تهيئة أحداث التطبيق...');
    
    // أحداث تسجيل الدخول والتسجيل
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const closeAuthBtn = document.getElementById('closeAuthBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });
    }
    
    if (closeAuthBtn) {
        closeAuthBtn.addEventListener('click', function() {
            // تسجيل دخول تلقائي للمستخدم للاختبار
            loginDemoUser();
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                // محاكاة تسجيل الدخول
                appData.user = {
                    name: "مستخدم sulaf.pdf",
                    email: email,
                    bio: "قارئ ومحب لروايات الفانتازيا"
                };
                appData.isLoggedIn = true;
                
                // حفظ حالة المستخدم
                localStorage.setItem('sulafUser', JSON.stringify(appData.user));
                
                document.getElementById('authModal').style.display = 'none';
                document.getElementById('appContainer').style.display = 'flex';
                
                updateUserInfo();
                showNotification('تم تسجيل الدخول بنجاح!', 'success');
            } else {
                showNotification('يرجى ملء جميع الحقول', 'error');
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showNotification('كلمات المرور غير متطابقة', 'error');
                return;
            }
            
            if (name && email && password) {
                // محاكاة إنشاء حساب
                appData.user = {
                    name: name,
                    email: email,
                    bio: "قارئ ومحب لروايات الفانتازيا"
                };
                appData.isLoggedIn = true;
                
                // حفظ حالة المستخدم
                localStorage.setItem('sulafUser', JSON.stringify(appData.user));
                
                document.getElementById('authModal').style.display = 'none';
                document.getElementById('appContainer').style.display = 'flex';
                
                updateUserInfo();
                showNotification('تم إنشاء حسابك بنجاح!', 'success');
            } else {
                showNotification('يرجى ملء جميع الحقول', 'error');
            }
        });
    }
    
    // تسجيل دخول تلقائي للاختبار
    function loginDemoUser() {
        appData.user = {
            name: "مستخدم تجريبي",
            email: "demo@sulaf.pdf",
            bio: "قارئ ومحب لروايات الفانتازيا"
        };
        appData.isLoggedIn = true;
        
        localStorage.setItem('sulafUser', JSON.stringify(appData.user));
        
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('appContainer').style.display = 'flex';
        
        updateUserInfo();
        showNotification('مرحباً بك في sulaf.pdf!', 'success');
    }
    
    // أحداث التنقل بين الصفحات
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة النشاط من جميع العناصر
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // إضافة النشاط للعنصر الحالي
            this.classList.add('active');
            
            // إخفاء جميع الصفحات
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // عرض الصفحة المحددة
            const pageId = this.getAttribute('data-page');
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                
                // إذا كانت صفحة البحث، قم بإجراء بحث افتراضي
                if (pageId === 'searchPage') {
                    performSearch();
                }
            }
        });
    });
    
    // أحداث التبويب في صفحة رواياتي
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            tabBtns.forEach(tab => tab.classList.remove('active'));
            
            // إضافة النشاط للزر الحالي
            this.classList.add('active');
            
            // إخفاء جميع محتويات التبويبات
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // عرض محتوى التبويب المحدد
            const tabId = this.getAttribute('data-tab') + 'Tab';
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
    
    // أحداث التنقل في صفحة الحساب
    const accountNavItems = document.querySelectorAll('.account-nav-item:not(.logout)');
    accountNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة النشاط من جميع العناصر
            accountNavItems.forEach(nav => nav.classList.remove('active'));
            
            // إضافة النشاط للعنصر الحالي
            this.classList.add('active');
            
            // إخفاء جميع الأقسام
            const accountSections = document.querySelectorAll('.account-section');
            accountSections.forEach(section => section.classList.remove('active'));
            
            // عرض القسم المحدد
            const sectionId = this.getAttribute('data-section') + 'Section';
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // حدث البحث
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // حدث إرسال رسالة الذكاء الاصطناعي
    const sendAiBtn = document.getElementById('sendAiBtn');
    const aiInput = document.getElementById('aiInput');
    
    if (sendAiBtn) {
        sendAiBtn.addEventListener('click', sendAiMessage);
    }
    
    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAiMessage();
            }
        });
    }
    
    // أحداث الأفكار السريعة للذكاء الاصطناعي
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            const prompt = this.getAttribute('data-prompt');
            document.getElementById('aiInput').value = prompt;
            sendAiMessage();
        });
    });
    
    // حدث تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            appData.user = null;
            appData.isLoggedIn = false;
            localStorage.removeItem('sulafUser');
            document.getElementById('appContainer').style.display = 'none';
            showLoginModal();
            showNotification('تم تسجيل الخروج بنجاح', 'info');
        });
    }
    
    // حدث الوضع الليلي
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // تحميل تفضيلات الوضع الليلي
        const darkModePreference = localStorage.getItem('darkMode');
        if (darkModePreference === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
    
    // حدث زر ابدأ الكتابة
    const startWritingBtn = document.getElementById('startWritingBtn');
    if (startWritingBtn) {
        startWritingBtn.addEventListener('click', function() {
            showNotification('سيتم تفعيل هذه الميزة قريباً', 'info');
        });
    }
    
    // حدث زر كتابة رواية في الشريط العلوي
    const writeNovelBtn = document.getElementById('writeNovelBtn');
    if (writeNovelBtn) {
        writeNovelBtn.addEventListener('click', function() {
            showNotification('سيتم تفعيل هذه الميزة قريباً', 'info');
        });
    }
    
    // حدث زر استكشاف المكتبة
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            // الانتقال إلى صفحة البحث
            const searchNav = document.querySelector('.nav-item[data-page="searchPage"]');
            if (searchNav) {
                searchNav.click();
            }
        });
    }
    
    // حدث زر قراءة الرواية في النافذة المنبثقة
    const readNovelBtn = document.getElementById('readNovelBtn');
    if (readNovelBtn) {
        readNovelBtn.addEventListener('click', function() {
            if (appData.currentNovel) {
                showNotification(`جاري فتح رواية "${appData.currentNovel.title}" للقراءة`, 'info');
            }
        });
    }
    
    // حدث زر تنزيل الرواية في النافذة المنبثقة
    const downloadNovelBtn = document.getElementById('downloadNovelBtn');
    if (downloadNovelBtn) {
        downloadNovelBtn.addEventListener('click', function() {
            if (appData.currentNovel) {
                downloadNovel(appData.currentNovel);
            }
        });
    }
    
    // حدث زر إضافة إلى المفضلة في النافذة المنبثقة
    const favoriteNovelBtn = document.getElementById('favoriteNovelBtn');
    if (favoriteNovelBtn) {
        favoriteNovelBtn.addEventListener('click', function() {
            if (appData.currentNovel) {
                toggleFavoriteNovel(appData.currentNovel.id);
            }
        });
    }
    
    // حدث إغلاق نافذة الرواية
    const closeNovelBtn = document.getElementById('closeNovelBtn');
    if (closeNovelBtn) {
        closeNovelBtn.addEventListener('click', function() {
            document.getElementById('novelModal').style.display = 'none';
        });
    }
    
    // حفظ الملف الشخصي
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('profileName').value;
            const email = document.getElementById('profileEmail').value;
            const bio = document.getElementById('profileBio').value;
            
            if (appData.user) {
                appData.user.name = name;
                appData.user.email = email;
                appData.user.bio = bio;
                
                localStorage.setItem('sulafUser', JSON.stringify(appData.user));
                updateUserInfo();
                showNotification('تم حفظ التغييرات بنجاح', 'success');
            }
        });
    }
    
    // إغلاق النوافذ المنبثقة بالنقر خارجها
    window.addEventListener('click', function(e) {
        const authModal = document.getElementById('authModal');
        const novelModal = document.getElementById('novelModal');
        
        if (e.target === authModal) {
            // تسجيل دخول تلقائي
            loginDemoUser();
        }
        
        if (e.target === novelModal) {
            novelModal.style.display = 'none';
        }
    });
    
    console.log('تهيئة الأحداث اكتملت');
}

// عرض الروايات الشعبية
function displayPopularNovels() {
    const container = document.getElementById('popularNovels');
    if (!container) return;
    
    container.innerHTML = '';
    
    // عرض أول 4 روايات كالأكثر شعبية
    const popularNovels = appData.novels.slice(0, 4);
    
    popularNovels.forEach(novel => {
        const novelElement = createNovelCard(novel);
        container.appendChild(novelElement);
    });
}

// عرض الروايات الجديدة
function displayNewNovels() {
    const container = document.getElementById('newNovels');
    if (!container) return;
    
    container.innerHTML = '';
    
    // عرض آخر 4 روايات كروايات جديدة
    const newNovels = appData.novels.slice(2, 6);
    
    newNovels.forEach(novel => {
        const novelElement = createNovelCard(novel);
        container.appendChild(novelElement);
    });
}

// إنشاء بطاقة رواية
function createNovelCard(novel) {
    const card = document.createElement('div');
    card.className = 'novel-card';
    card.dataset.id = novel.id;
    
    card.innerHTML = `
        <div class="novel-cover">
            <img src="${novel.cover}" alt="${novel.title}">
        </div>
        <div class="novel-info">
            <h3 class="novel-title">${novel.title}</h3>
            <span class="novel-author">${novel.author}</span>
            <div class="novel-meta">
                <span class="novel-type">${novel.type === 'pdf' ? 'PDF' : 'نص'}</span>
                <div class="novel-rating">
                    <div class="stars">
                        ${generateStars(novel.rating)}
                    </div>
                    <span>${novel.rating}</span>
                </div>
            </div>
        </div>
    `;
    
    // إضافة حدث النقر لعرض تفاصيل الرواية
    card.addEventListener('click', function() {
        showNovelDetails(novel);
    });
    
    return card;
}

// عرض تفاصيل الرواية
function showNovelDetails(novel) {
    appData.currentNovel = novel;
    
    const modal = document.getElementById('novelModal');
    const novelTitle = document.getElementById('novelTitle');
    const novelCover = document.getElementById('novelCover');
    const novelAuthor = document.getElementById('novelAuthor');
    const novelCategory = document.getElementById('novelCategory');
    const novelPages = document.getElementById('novelPages');
    const novelRating = document.getElementById('novelRating');
    const novelDescription = document.getElementById('novelDescription');
    const favoriteNovelBtn = document.getElementById('favoriteNovelBtn');
    
    if (novelTitle) novelTitle.textContent = novel.title;
    if (novelCover) {
        novelCover.src = novel.cover;
        novelCover.alt = novel.title;
    }
    if (novelAuthor) novelAuthor.textContent = novel.author;
    if (novelCategory) novelCategory.textContent = novel.category;
    if (novelPages) novelPages.textContent = `${novel.pages} صفحة`;
    if (novelRating) novelRating.textContent = novel.rating;
    if (novelDescription) novelDescription.textContent = novel.description;
    
    // تحديث زر المفضلة
    if (favoriteNovelBtn) {
        if (novel.isFavorite) {
            favoriteNovelBtn.innerHTML = '<i class="fas fa-heart"></i> إزالة من المفضلة';
        } else {
            favoriteNovelBtn.innerHTML = '<i class="far fa-heart"></i> إضافة إلى المفضلة';
        }
    }
    
    if (modal) {
        modal.style.display = 'flex';
    }
}

// توليد نجوم التقييم
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// البحث عن روايات
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const typeFilter = document.getElementById('typeFilter');
    const sortFilter = document.getElementById('sortFilter');
    const resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) return;
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const type = typeFilter ? typeFilter.value : 'all';
    const sort = sortFilter ? sortFilter.value : 'popular';
    
    // تصفية الروايات
    let filteredNovels = appData.novels.filter(novel => {
        // البحث بالنص
        const matchesSearch = !searchTerm || 
            novel.title.toLowerCase().includes(searchTerm) ||
            novel.author.toLowerCase().includes(searchTerm) ||
            novel.description.toLowerCase().includes(searchTerm);
        
        // البحث بالتصنيف
        const matchesCategory = category === 'all' || novel.category === category;
        
        // البحث بالنوع
        const matchesType = type === 'all' || novel.type === type;
        
        return matchesSearch && matchesCategory && matchesType;
    });
    
    // ترتيب النتائج
    if (sort === 'popular') {
        filteredNovels.sort((a, b) => b.downloads - a.downloads);
    } else if (sort === 'new') {
        filteredNovels.sort((a, b) => b.id - a.id);
    } else if (sort === 'rating') {
        filteredNovels.sort((a, b) => b.rating - a.rating);
    }
    
    // عرض النتائج
    resultsContainer.innerHTML = '';
    
    if (filteredNovels.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>لا توجد نتائج</h3>
                <p>لم نتمكن من العثور على روايات تطابق بحثك</p>
            </div>
        `;
        return;
    }
    
    filteredNovels.forEach(novel => {
        const novelElement = createNovelCard(novel);
        resultsContainer.appendChild(novelElement);
    });
}

// إرسال رسالة للذكاء الاصطناعي
function sendAiMessage() {
    const aiInput = document.getElementById('aiInput');
    const aiMessages = document.getElementById('aiMessages');
    
    if (!aiInput || !aiMessages) return;
    
    const message = aiInput.value.trim();
    if (!message) return;
    
    // إضافة رسالة المستخدم
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
        <div class="message-sender">
            <i class="fas fa-user"></i> أنت
        </div>
    `;
    aiMessages.appendChild(userMessage);
    
    // مسح حقل الإدخال
    aiInput.value = '';
    
    // إظهار مؤشر كتابة
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message ai-message';
    typingIndicator.innerHTML = `
        <div class="message-content">
            <p><i class="fas fa-circle"></i> <i class="fas fa-circle"></i> <i class="fas fa-circle"></i></p>
        </div>
        <div class="message-sender">
            <i class="fas fa-robot"></i> مساعد AI
        </div>
    `;
    aiMessages.appendChild(typingIndicator);
    
    // التمرير إلى الأسفل
    aiMessages.scrollTop = aiMessages.scrollHeight;
    
    // محاكاة رد الذكاء الاصطناعي بعد تأخير
    setTimeout(() => {
        // إزالة مؤشر الكتابة
        typingIndicator.remove();
        
        // إضافة رد الذكاء الاصطناعي
        const aiResponse = generateAiResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `
            <div class="message-content">
                <p>${aiResponse}</p>
            </div>
            <div class="message-sender">
                <i class="fas fa-robot"></i> مساعد AI
            </div>
        `;
        aiMessages.appendChild(aiMessage);
        
        // التمرير إلى الأسفل
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }, 1500);
}

// توليد رد الذكاء الاصطناعي
function generateAiResponse(message) {
    const responses = [
        "هذا سؤال رائع عن روايات الفانتازيا! بناءً على خبرتي، أنصحك بقراءة روايات مثل 'أسطورة التنين الأزرق' و'سيف النور' لما تتمتعان به من حبكة شيقة وعناصر فانتازيا غنية.",
        "لإنشاء رواية فانتازيا ناجحة، احرص على بناء عالم خيالي متكامل، وشخصيات ذات أعماق نفسية، وحبكة مليئة بالمفاجآت. تذكر أن أفضل روايات الفانتازيا هي تلك التي تخلق عالماً يمكن للقارئ تصديقه رغم خياليته.",
        "الروايات الفانتازية العربية تشهد ازدهاراً ملحوظاً هذه الأيام. من أشهر كتاب هذا النوع: أحمد خالد توفيق، وعمرو عبد الحميد، وندى عادل. يمكنك استكشاف أعمالهم على منصتنا.",
        "لتطوير شخصية بطلة قوية، ابدأ بتحديد خلفيتها ودوافعها ونقاط ضعفها. الشخصيات الكاملة هي تلك التي تواجه تحديات تنمي شخصيتها على مدار القصة.",
        "مشهد افتتاحي مقترح: 'في ليلة مقمرة، بينما كانت ليانا تجري بين أشجار الغابة القديمة، سمعت همساً غامضاً ينادي اسمها. لم تكن تعلم أن هذه اللحظة ستغير مصيرها إلى الأبد، وستدفعها إلى عالم من السحر والأساطير التي طالما ظنتها خيالاً.'",
        "نعم، يمكنني مساعدتك في كتابة رواية فانتازيا! ما هو الجزء الذي تحتاج مساعدة فيه: بناء العالم، تطوير الشخصيات، الحبكة الرئيسية، أو شيء آخر؟",
        "من أفضل تقنيات كتابة الفانتازيا: 1) قاعدة السحر الواضحة والمحددة 2) التوازن بين الخيال والواقعية 3) الربط بين العناصر الخيالية ومواضيع إنسانية عميقة 4) الإيقاع السردي المتوازن بين الحركة والتأمل."
    ];
    
    // اختيار رد عشوائي (في التطبيق الحقيقي سيكون رد الذكاء الاصطناعي حقيقياً)
    return responses[Math.floor(Math.random() * responses.length)];
}

// تنزيل رواية
function downloadNovel(novel) {
    showNotification(`جاري تنزيل "${novel.title}"...`, 'info');
    
    // محاكاة التنزيل
    setTimeout(() => {
        novel.isDownloaded = true;
        showNotification(`تم تنزيل "${novel.title}" بنجاح!`, 'success');
        
        // تحديث زر التنزيل
        const downloadBtn = document.getElementById('downloadNovelBtn');
        if (downloadBtn) {
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> تم التنزيل';
            downloadBtn.disabled = true;
        }
    }, 2000);
}

// تبديل حالة المفضلة للرواية
function toggleFavoriteNovel(novelId) {
    const novel = appData.novels.find(n => n.id === novelId);
    if (novel) {
        novel.isFavorite = !novel.isFavorite;
        
        const favoriteBtn = document.getElementById('favoriteNovelBtn');
        if (favoriteBtn) {
            if (novel.isFavorite) {
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> إزالة من المفضلة';
                showNotification(`تمت إضافة "${novel.title}" إلى المفضلة`, 'success');
            } else {
                favoriteBtn.innerHTML = '<i class="far fa-heart"></i> إضافة إلى المفضلة';
                showNotification(`تمت إزالة "${novel.title}" من المفضلة`, 'info');
            }
        }
    }
}

// تحديث معلومات المستخدم
function updateUserInfo() {
    if (!appData.user) return;
    
    const userNameElements = document.querySelectorAll('#userName, #profileName');
    const userEmailElements = document.querySelectorAll('#userEmail, #profileEmail');
    const userBioElement = document.getElementById('profileBio');
    const userAvatar = document.getElementById('userAvatar');
    
    userNameElements.forEach(el => {
        if (el) el.value = appData.user.name;
    });
    
    userEmailElements.forEach(el => {
        if (el) el.value = appData.user.email;
    });
    
    if (userBioElement) {
        userBioElement.value = appData.user.bio || '';
    }
    
    // تحديث الاسم في واجهة المستخدم
    const userNameDisplay = document.querySelector('#userName');
    if (userNameDisplay && userNameDisplay.tagName !== 'INPUT') {
        userNameDisplay.textContent = appData.user.name;
    }
    
    const userEmailDisplay = document.querySelector('#userEmail');
    if (userEmailDisplay && userEmailDisplay.tagName !== 'INPUT') {
        userEmailDisplay.textContent = appData.user.email;
    }
    
    // تحديث الصورة الرمزية
    if (userAvatar) {
        const initials = appData.user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        userAvatar.innerHTML = `<span>${initials.substring(0, 2)}</span>`;
    }
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    // إنصراف الإشعار القديم إن وجد
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    // إنشاء الإشعار الجديد
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إخفاء الإشعار تلقائياً بعد 3 ثوان
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// إضافة تنسيقات الإشعارات إلى CSS
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: white;
        color: #1f2937;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 1001;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        max-width: 400px;
    }
    
    .dark-mode .notification {
        background-color: #374151;
        color: white;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-right: 4px solid #10b981;
    }
    
    .notification.error {
        border-right: 4px solid #ef4444;
    }
    
    .notification.info {
        border-right: 4px solid #6d28d9;
    }
    
    .notification i {
        font-size: 1.5rem;
    }
    
    .notification.success i {
        color: #10b981;
    }
    
    .notification.error i {
        color: #ef4444;
    }
    
    .notification.info i {
        color: #6d28d9;
    }
`;

document.head.appendChild(style);

console.log('تطبيق sulaf.pdf جاهز للاستخدام!');
