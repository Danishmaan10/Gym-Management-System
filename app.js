let db = {
  members: [],
  attendance: [],
  payments: [],
};

/* ================= LOAD DATA ================= */
function loadData() {
  let data = localStorage.getItem('gymDB');
  if (data) {
    db = JSON.parse(data);
  }
}

/* ================= SAVE DATA ================= */
function saveData() {
  localStorage.setItem('gymDB', JSON.stringify(db));
  updateDashboard();
}

/* ================= SECTION SWITCH ================= */
function showSection(id) {
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));

  document.getElementById(id).classList.add('active');
}

/* ================= DASHBOARD ================= */
function updateDashboard() {
  document.getElementById('totalMembers').innerText = db.members.length;
  document.getElementById('totalAttendance').innerText = db.attendance.length;
  document.getElementById('totalPayments').innerText = db.payments.length;
}

/* ================= CLEAR INPUTS ================= */
function clearInputs(ids) {
  ids.forEach(id => {
    let el = document.getElementById(id);
    if (el) el.value = '';
  });
}

/* ================= MEMBERS ================= */
function addMember() {
  let name = document.getElementById('memberName').value;
  let phone = document.getElementById('memberPhone').value;

  if (name === '' || phone === '') {
    alert('Please fill all fields');
    return;
  }

  db.members.push({
    name: name,
    phone: phone,
  });

  saveData();
  renderMembers();
  clearInputs(['memberName', 'memberPhone']); // auto clear
}

function renderMembers() {
  let table = document.getElementById('memberTable');
  table.innerHTML = '';

  db.members.forEach((m, index) => {
    table.innerHTML += `
      <tr>
        <td>${m.name}</td>
        <td>${m.phone}</td>
        <td><button onclick="deleteMember(${index})">Delete</button></td>
      </tr>
    `;
  });
}

function deleteMember(index) {
  db.members.splice(index, 1);
  saveData();
  renderMembers();
}

/* ================= ATTENDANCE ================= */
function addAttendance() {
  let name = document.getElementById('attName').value;
  let date = document.getElementById('attDate').value;

  if (name === '' || date === '') {
    alert('Fill attendance fields');
    return;
  }

  db.attendance.push({
    name,
    date,
  });

  saveData();
  renderAttendance();
  clearInputs(['attName', 'attDate']); // auto clear
}

function renderAttendance() {
  let table = document.getElementById('attendanceTable');
  table.innerHTML = '';

  db.attendance.forEach((a, index) => {
    table.innerHTML += `
      <tr>
        <td>${a.name}</td>
        <td>${a.date}</td>
        <td><button onclick="deleteAttendance(${index})">Delete</button></td>
      </tr>
    `;
  });
}

function deleteAttendance(index) {
  db.attendance.splice(index, 1);
  saveData();
  renderAttendance();
}

/* ================= PAYMENTS ================= */
function addPayment() {
  let name = document.getElementById('payName').value;
  let amount = document.getElementById('payAmount').value;

  if (name === '' || amount === '') {
    alert('Fill payment fields');
    return;
  }

  db.payments.push({
    name,
    amount: 'Rs ' + amount, // PKR format
  });

  saveData();
  renderPayments();
  clearInputs(['payName', 'payAmount']); // auto clear
}

function renderPayments() {
  let table = document.getElementById('paymentTable');
  table.innerHTML = '';

  db.payments.forEach((p, index) => {
    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.amount}</td>
        <td><button onclick="deletePayment(${index})">Delete</button></td>
      </tr>
    `;
  });
}

function deletePayment(index) {
  db.payments.splice(index, 1);
  saveData();
  renderPayments();
}

/* ================= INIT ================= */
window.onload = function () {
  loadData();

  renderMembers();
  renderAttendance();
  renderPayments();

  updateDashboard();
  showSection('dashboard');
};
