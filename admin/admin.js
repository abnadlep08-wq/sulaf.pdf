// بيانات لوحة التحكم
const adminData = {
    admin: null,
    novels: [],
    users: [],
    categories: [],
    notifications: [],
    activities: [],
    reports: []
};

// متغيرات عامة
let currentNovelsPage = 1;
let novelsPerPage = 10;
let currentUsersPage = 1;
let usersPerPage = 10;

// بدء التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('بدء تحميل لوحة التحكم...');
    
    // إخفاء شاشة التحميل بعد ثانيتين
    setTimeout(() => {
        const adminLoading = document.getElementById('adminLoading');
        if (adminLoading) {
            adminLoading.style.opacity = '0';
            setTimeout(() => {
                adminLoading.style.display = 'none';
                
                // عرض لوحة التحكم مباشرة (تجاوز التسجيل)
                showAdminDashboard();
            }, 500);
        }
    }, 2000);
    
    // تهيئة الأحداث
    setupEvents();
    
    // تحميل البيانات
    loadData();
});

// عرض لوحة التحكم
function showAdminDashboard() {
    const adminLogin = document.getElementById('adminLogin');
    const adminDashboard = document.getElementById('adminDashboard');
    
    if (adminLogin) adminLogin.style.display = 'none';
    if (adminDashboard) adminDashboard.style.display = 'flex';
    
    // تعيين بيانات المسؤول
    adminData.admin = {
        name: "مدير النظام",
        role: "المشرف العام"
    };
    
    updateAdminInfo();
    updateCurrentDate();
    loadDashboardData();
}

// تحديث معلومات المسؤول
function updateAdminInfo() {
    const adminName = document.getElementById('adminName');
    const adminRole = document.getElementById('adminRole');
    
    if (adminName) adminName.textContent = adminData.admin.name;
    if (adminRole) adminRole.textContent = adminData.admin.role;
}

// تحديث التاريخ
function updateCurrentDate() {
    const currentDate = document.getElementById('currentDate');
    if (currentDate) {
        const now = new Date();
        currentDate.textContent = now.toLocaleDateString('ar-SA');
    }
}

// تحميل البيانات
function loadData() {
    // بيانات افتراضية للروايات
    adminData.novels = [
        { id: 1, title: "أسطورة التنين الأزرق", author: "أحمد الشقيري", category: "فانتازيا", type: "pdf", status: "published", downloads: 1250, rating: 4.7, cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", date: "2024-01-01" },
        { id: 2, title: "مملكة الظلال", author: "سارة النجار", category: "فانتازيا", type: "text", status: "published", downloads: 980, rating: 4.5, cover: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", date: "2024-01-02" },
        { id: 3, title: "صائدو الأحلام", author: "خالد العلي", category: "مغامرة", type: "pdf", status: "draft", downloads: 750, rating: 4.3, cover: "https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", date: "2024-01-03" },
        { id: 4, title: "سيف النور", author: "فاطمة الزهراء", category: "فانتازيا", type: "pdf", status: "published", downloads: 2100, rating: 4.8, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", date: "2024-01-04" }
    ];
    
    // بيانات افتراضية للمستخدمين
    adminData.users = [
        { id: 1, name: "أحمد الشقيري", email: "ahmed@example.com", type: "premium", status: "active", date: "2023-12-01", novels: 3, avatar: "A" },
        { id: 2, name: "سارة النجار", email: "sara@example.com", type: "premium", status: "active", date: "2023-12-05", novels: 2, avatar: "س" },
        { id: 3, name: "خالد العلي", email: "khaled@example.com", type: "regular", status: "active", date: "2023-12-10", novels: 1, avatar: "خ" }
    ];
    
    // بيانات افتراضية للتصنيفات
    adminData.categories = [
        { id: 1, name: "فانتازيا", slug: "fantasy", color: "#6d28d9", icon: "fa-dragon", description: "روايات فانتازيا خيالية", status: "active", count: 42 },
        { id: 2, name: "مغامرة", slug: "adventure", color: "#10b981", icon: "fa-compass", description: "روايات مغامرات وإثارة", status: "active", count: 28 },
        { id: 3, name: "رومانسية", slug: "romance", color: "#ef4444", icon: "fa-heart", description: "روايات رومانسية", status: "active", count: 35 }
    ];
    
    // تحديث الإحصائيات
    updateDashboardStats();
}

// تحديث الإحصائيات
function updateDashboardStats() {
    document.getElementById('totalNovels').textContent = adminData.novels.length;
    document.getElementById('totalUsers').textContent = adminData.users.length;
    document.getElementById('novelsCount').textContent = adminData.novels.length;
    document.getElementById('usersCount').textContent = adminData.users.length;
}

// تحميل بيانات لوحة التحكم
function loadDashboardData() {
    loadNovelsTable();
    loadUsersTable();
    loadCategories();
    loadReports();
}

// تحميل جدول الروايات
function loadNovelsTable(page = 1) {
    const tableBody = document.getElementById('novelsTableBody');
    if (!tableBody) return;
    
    currentNovelsPage = page;
    const start = (page - 1) * novelsPerPage;
    const end = start + novelsPerPage;
    const novelsToShow = adminData.novels.slice(start, end);
    
    tableBody.innerHTML = '';
    
    if (novelsToShow.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="10" class="text-center">لا توجد روايات</td></tr>';
        return;
    }
    
    novelsToShow.forEach(novel => {
        const row = document.createElement('tr');
        
        let statusBadge = '';
        if (novel.status === 'published') {
            statusBadge = '<span class="status-badge status-published">منشور</span>';
        } else if (novel.status === 'draft') {
            statusBadge = '<span class="status-badge status-draft">مسودة</span>';
        } else if (novel.status === 'pending') {
            statusBadge = '<span class="status-badge status-pending">قيد المراجعة</span>';
        }
        
        row.innerHTML = `
            <td><input type="checkbox" class="novel-checkbox" data-id="${novel.id}"></td>
            <td><img src="${novel.cover}" alt="${novel.title}" style="width:50px;height:50px;object-fit:cover;"></td>
            <td><strong>${novel.title}</strong><br><small>ID: ${novel.id}</small></td>
            <td>${novel.author}</td>
            <td>${novel.category}</td>
            <td>${novel.type === 'pdf' ? 'PDF' : 'نص'}</td>
            <td>${statusBadge}</td>
            <td>${novel.downloads.toLocaleString()}</td>
            <td>${novel.rating}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view" data-id="${novel.id}"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit" data-id="${novel.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" data-id="${novel.id}"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تحميل جدول المستخدمين
function loadUsersTable(page = 1) {
    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) return;
    
    currentUsersPage = page;
    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;
    const usersToShow = adminData.users.slice(start, end);
    
    tableBody.innerHTML = '';
    
    if (usersToShow.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" class="text-center">لا يوجد مستخدمين</td></tr>';
        return;
    }
    
    usersToShow.forEach(user => {
        const row = document.createElement('tr');
        
        let statusBadge = '';
        if (user.status === 'active') {
            statusBadge = '<span class="status-badge status-published">نشط</span>';
        } else {
            statusBadge = '<span class="status-badge status-draft">غير نشط</span>';
        }
        
        let typeBadge = '';
        if (user.type === 'premium') {
            typeBadge = '<span class="status-badge" style="background:rgba(245,158,11,0.1);color:#f59e0b;">مميز</span>';
        } else {
            typeBadge = '<span class="status-badge" style="background:rgba(156,163,175,0.1);color:#6b7280;">عادي</span>';
        }
        
        row.innerHTML = `
            <td><input type="checkbox" class="user-checkbox" data-id="${user.id}"></td>
            <td><div style="width:40px;height:40px;background:#6d28d9;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">${user.avatar}</div></td>
            <td><strong>${user.name}</strong><br><small>ID: ${user.id}</small></td>
            <td>${user.email}</td>
            <td>${typeBadge}</td>
            <td>${statusBadge}</td>
            <td>${user.date}</td>
            <td>${user.novels || 0}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view" data-user-id="${user.id}"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit" data-user-id="${user.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" data-user-id="${user.id}"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تحميل التصنيفات
function loadCategories() {
    const categoriesList = document.getElementById('categoriesList');
    if (!categoriesList) return;
    
    categoriesList.innerHTML = '';
    
    adminData.categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.style.borderRightColor = category.color;
        categoryItem.innerHTML = `
            <div class="category-color" style="background-color:${category.color};"></div>
            <div class="category-info">
                <h5>${category.name}</h5>
                <p>${category.description || 'لا يوجد وصف'}</p>
                <small>${category.count || 0} رواية</small>
            </div>
            <div class="category-actions">
                <button class="action-btn edit" data-category-id="${category.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" data-category-id="${category.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        categoriesList.appendChild(categoryItem);
    });
}

// تحميل التقارير
function loadReports() {
    // يمكنك إضافة كود التقارير هنا
}

// تهيئة الأحداث
function setupEvents() {
    // تسجيل الدخول
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showAdminDashboard();
        });
    }
    
    // تسجيل الخروج
    const adminLogoutBtn = document.getElementById('adminLogout');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', function() {
            showAdminLogin();
        });
    }
    
    // زر القائمة الجانبية
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.querySelector('.admin-sidebar').classList.toggle('active');
        });
    }
    
    // التنقل بين الأقسام
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const sectionId = this.getAttribute('data-section') + 'Section';
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // زر إضافة رواية
    const addNovelBtn = document.getElementById('addNovelBtn');
    if (addNovelBtn) {
        addNovelBtn.addEventListener('click', function() {
            document.querySelector('.menu-item[data-section="addNovel"]').click();
        });
    }
    
    // نموذج إضافة رواية
    const addNovelForm = document.getElementById('addNovelForm');
    if (addNovelForm) {
        addNovelForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveNovel();
        });
    }
    
    // رفع صورة الغلاف
    const uploadArea = document.getElementById('uploadArea');
    const novelCoverInput = document.getElementById('novelCover');
    if (uploadArea && novelCoverInput) {
        uploadArea.addEventListener('click', () => novelCoverInput.click());
        novelCoverInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const coverPreview = document.getElementById('coverPreview');
                    coverPreview.src = e.target.result;
                    uploadArea.style.display = 'none';
                    document.getElementById('uploadPreview').style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// حفظ الرواية
function saveNovel() {
    const title = document.getElementById('novelTitle').value;
    const author = document.getElementById('novelAuthor').value;
    
    if (!title || !author) {
        alert('يرجى ملء الحقول المطلوبة');
        return;
    }
    
    const newId = adminData.novels.length + 1;
    const newNovel = {
        id: newId,
        title: title,
        author: author,
        category: document.getElementById('novelCategory').value,
        type: document.getElementById('novelType').value,
        status: document.getElementById('novelStatus').value,
        downloads: 0,
        rating: 4.0,
        cover: 'https://via.placeholder.com/200x300/6d28d9/ffffff?text=New+Novel',
        date: new Date().toISOString().split('T')[0]
    };
    
    adminData.novels.unshift(newNovel);
    loadNovelsTable(1);
    updateDashboardStats();
    document.getElementById('addNovelForm').reset();
    alert('تم إضافة الرواية بنجاح');
}

// عرض نافذة تسجيل الدخول
function showAdminLogin() {
    const adminLogin = document.getElementById('adminLogin');
    const adminDashboard = document.getElementById('adminDashboard');
    if (adminLogin) adminLogin.style.display = 'flex';
    if (adminDashboard) adminDashboard.style.display = 'none';
}

// إظهار إشعار
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

console.log('لوحة التحكم جاهزة');
