function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    window.scrollTo(0,0);
}

function checkAdmin() { // یہاں بریکٹ `{} missing تھا، اب ٹھیک ہے
    const pass = document.getElementById('adminPassword').value;
    if(pass === 'admin123') {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadReports();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function logoutAdmin() {
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('reportList').innerHTML = "";
}

function submitTeacherForm() {
    // میں نے یہاں بھی اصل لنک لگا دیا ہے تاکہ فارم کام کرے
    var API_URL = "https://script.google.com/macros/s/AKfycbzVuIQXEzlILy1deIK2VOboctU3dsELgIPa5J9cHq_H2nnL2cA_5HjugGNSaHMhK2SR3Q/exec"; 
    
    var mosque = document.getElementById('mosqueSelect').value;
    var student = document.querySelector('input[placeholder="أدخل اسم الطالب هنا..."]').value;
    var statusInput = document.querySelector('input[name="status"]:checked');
    var status = statusInput ? statusInput.value : "حاضر";
    var notes = document.querySelector('textarea').value;
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
        alert('تم حفظ البيانات بنجاح!');
        document.querySelector('textarea').value = "";
        document.querySelector('input[placeholder="أدخل اسم الطالب هنا..."]').value = "";
    })
    .catch(error => {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الإرسال.');
    });
}

// صرف یہ ایک loadReports فنکشن رہے گا (دوسرا کوڈ حذف کر دیا گیا ہے)
function loadReports() {
    var API_URL = "https://script.google.com/macros/s/AKfycbzVuIQXEzlILy1deIK2VOboctU3dsELgIPa5J9cHq_H2nnL2cA_5HjugGNSaHMhK2SR3Q/exec"; 

    fetch(API_URL)
    .then(function(response) { return response.json(); })
    .then(function(data) {
      var listContainer = document.getElementById('reportList');
      listContainer.innerHTML = ""; 

      if(data.length === 0) {
        listContainer.innerHTML = "<p>لا توجد تقارير بعد.</p>";
        return;
      }

      var recentReports = data.slice().reverse().slice(0,5);

      recentReports.forEach(function(report) {
        var colorClass = "";
        if(report.status === 'حاضر') colorClass = "status-present";
        else if(report.status === 'غائب') colorClass = "status-absent";
        else colorClass = "status-late";

        var html = "<div style='border-bottom:1px solid #eee; padding:10px 0; display:flex; justify-content:space-between;'><div><strong>" + report.student + "</strong><br><small style='color:#666;'>" + report.mosque + " - " + report.notes + "</small></div><span style='font-size:0.8rem; padding:2px 8px; border-radius:4px;' class='" + colorClass + "'>" + report.status + "</span></div>";
        
        listContainer.innerHTML += html;
      });
    })
    .catch(function(error) {
      console.error('Error loading reports:', error);
      var listContainer = document.getElementById('reportList');
      listContainer.innerHTML = "<p>فشل في تحميل البيانات.</p>";
    });
}