/* --- جاوا اسکرپٹ (JS) --- */

// پیجز کو سوئچ کرنے کا فنکشن
function showPage(pageId) {
    // تمام سیکشن چھپا دو
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    // منتخب سیکشن دکھا دو
    document.getElementById(pageId).classList.add('active');

    // نیویگیشن آئیکنز کو اپڈیٹ کرو
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // اوپر اسکرول کرو
    window.scrollTo(0, 0);
}

// شیخ کا پاس ورڈ چیک کرنے کا فنکشن
function checkAdmin() {
    const pass = document.getElementById('adminPassword').value;
    if(pass === 'admin123') {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

// لاگ آؤٹ فنکشن
function logoutAdmin() {
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginError').style.display = 'none';
}

// فارم سابمیشن (Google Sheets API سے جوڑا ہوا)
function submitTeacherForm() {
    // === ضروری: اپنے Apps Script کا لنک یہاں پیسٹ کریں ===
    var API_URL = "https://script.google.com/macros/s/AKfycbxBKTeqV4tFiRGN68qJcxPYYyVWp6Ao58vxPOFbSOrIo32ioVKpVZBMg6EMjgc8ngOK/exec"; 

    var mosque = document.getElementById('mosqueSelect').value;
    var student = document.querySelector('input[placeholder="أدخل اسم الطالب هنا..."]').value;
    
    // چیک کریں کہ کون سا رادیو بٹن سلیکٹ ہوا ہے
    var statusInput = document.querySelector('input[name="status"]:checked');
    var status = statusInput ? statusInput.value : "حاضر";
    
    var notes = document.querySelector('textarea').value;

    // ڈیٹا بھیجنا
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            mosque: mosque,
            student: student,
            status: status,
            notes: notes
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('تم حفظ البيانات بنجاح! (Data Saved Successfully)');
        // فارم صاف کر دیں
        document.querySelector('textarea').value = "";
        document.querySelector('input[placeholder="أدخل اسم الطالب هنا..."]').value = "";
    })
    .catch(error => {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    });
}
