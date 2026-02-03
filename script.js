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
// شیخ کا پاس ورڈ چیک کرنے کا فنکشن (اپ ڈیٹ شدہ)
function checkAdmin() {
    const pass = document.getElementById('adminPassword').value;
    if(pass === 'admin123') {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        
        // === ضروری: لاگ ان ہوتے ہی رپورٹ لوڈ کر دیں ===
        loadReports(); 
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
    
// === نئا فنکشن: شیخ کے لیے رپورٹس لوڈ کرنا ===
function loadReports() {
  // وہی API لنک جسے ہم سے پہلے سے استعمال کر رہے ہیں
  var API_URL = "https://script.google.com/macros/s/AKfycbwg2XEXGy3gKzK2YuCDVsHM48-8Zg5hEMIaWOdlJeqIr2q6E__fnb1TmPW86JDE5eCO/exec"; 

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      var listContainer = document.getElementById('reportList');
      listContainer.innerHTML = ""; // پرانا ڈیٹا صاف کر دیں

      // اگر کوئی ڈیٹا نہ ہو
      if(data.length === 0) {
        listContainer.innerHTML = "<p>لا توجد تقارير بعد.</p>";
        return;
      }

      // ڈیٹا کو دکھانا (آخری 5 رپورٹس، سب سے نیا اوپر)
      var recentReports = data.slice().reverse().slice(0, 5);

      recentReports.forEach(report => {
        // رنگوں کو منتخب کرنا
        var colorClass = "";
        if(report.status === 'حاضر') colorClass = "status-present";
        else if(report.status === 'غائب') colorClass = "status-absent";
        else colorClass = "status-late";

        var html = `
          <div style="border-bottom:1px solid #eee; padding:10px 0; display:flex; justify-content:space-between;">
             <div>
                <strong>${report.student}</strong> <br>
                <small style="color:#666;">${report.mosque} - ${report.notes}</small>
             </div>
             <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px;" class="${colorClass}">
               ${report.status}
             </span>
          </div>
        `;
        listContainer.innerHTML += html;
      });
    })
    .catch(error => {
      console.error('Error loading reports:', error);
    });
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
