/* =========================================================
   SHMS Prototype Logic
   Student Health Management System - PKU, UTM (Group 5)
   Front-end only demo. Data persists in this browser via
   localStorage so the prototype behaves consistently across
   pages, but nothing is sent to a server.
   ========================================================= */

const SHMS = {

  /* ---------------- low level storage helpers ---------------- */
  load(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }catch(e){ return fallback; }
  },
  save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },
  uid(prefix){
    return prefix + '-' + Math.floor(1000 + Math.random()*9000);
  },
  todayStr(){
    return new Date().toISOString().slice(0,10);
  },
  addDays(n){
    const d = new Date();
    d.setDate(d.getDate()+n);
    return d.toISOString().slice(0,10);
  },
  formatDate(str){
    if(!str) return '-';
    const d = new Date(str+'T00:00:00');
    if(isNaN(d)) return str;
    return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  },
  formatTime(t){
    return t || '-';
  },
  initials(name){
    if(!name) return '?';
    return name.trim().split(/\s+/).slice(0,2).map(p=>p[0]).join('').toUpperCase();
  },

  /* ---------------- current session ---------------- */
  getUser(){ return this.load('shms_currentUser', null); },
  setUser(u){ this.save('shms_currentUser', u); },
  logout(){
    localStorage.removeItem('shms_currentUser');
    window.location.href = 'index.html';
  },
  requireLogin(role){
    const u = this.getUser();
    if(!u || u.role !== role){
      window.location.href = 'index.html';
      return null;
    }
    return u;
  },

  /* ---------------- seed mock data (first run only) ---------------- */
  seed(){
    if(this.load('shms_seeded', false)) return;

    const mockStudents = [
      {id:'A23CS0012', name:'Nurul Ain binti Hassan', programme:'SECJ - Computer Science'},
      {id:'A22CS0150', name:'Farid Iskandar', programme:'SECR - Software Engineering'},
      {id:'A24CS0077', name:'Tan Wei Jie', programme:'SECP - Computer Science (Networking)'},
      {id:'A23CS0033', name:'Priya Sharma', programme:'SECD - Computer Science (AI)'}
    ];
    this.save('shms_mockStudents', mockStudents);

    const appointments = [
      {id:this.uid('APT'), studentId:'A23CS0012', studentName:'Nurul Ain binti Hassan', department:'General Consultation', doctor:'Dr. Aisha Rahman', date:this.addDays(2), time:'09:00', status:'Confirmed', notes:'Fever and sore throat, 3 days'},
      {id:this.uid('APT'), studentId:'A22CS0150', studentName:'Farid Iskandar', department:'Dental Care', doctor:'Dr. Kumar Selvam', date:this.todayStr(), time:'10:30', status:'In Progress', notes:'Tooth pain, lower left molar'},
      {id:this.uid('APT'), studentId:'A24CS0077', studentName:'Tan Wei Jie', department:'Counselling & Mental Health', doctor:'Dr. Aisha Rahman', date:this.addDays(-5), time:'14:00', status:'Completed', notes:'Follow-up session, exam stress'},
      {id:this.uid('APT'), studentId:'A23CS0033', studentName:'Priya Sharma', department:'Physiotherapy', doctor:'En. Lim Chong Wei', date:this.addDays(1), time:'11:00', status:'Confirmed', notes:'Lower back pain after sports'}
    ];
    this.save('shms_appointments', appointments);

    const records = [
      {id:this.uid('REC'), studentId:'A24CS0077', studentName:'Tan Wei Jie', date:this.addDays(-5), doctor:'Dr. Aisha Rahman', diagnosis:'Stress-related anxiety, mild insomnia', treatment:'Counselling session, sleep hygiene advice', prescription:'None'},
      {id:this.uid('REC'), studentId:'A22CS0150', studentName:'Farid Iskandar', date:this.addDays(-30), doctor:'Dr. Kumar Selvam', diagnosis:'Dental caries, lower left molar', treatment:'Filling completed, follow-up in 6 months', prescription:'Mefenamic Acid 500mg'},
      {id:this.uid('REC'), studentId:'A23CS0012', studentName:'Nurul Ain binti Hassan', date:this.addDays(-60), doctor:'Dr. Aisha Rahman', diagnosis:'Upper respiratory tract infection', treatment:'Rest and hydration advised', prescription:'Paracetamol 500mg, Loratadine 10mg'}
    ];
    this.save('shms_records', records);

    const prescriptions = [
      {id:this.uid('RX'), studentId:'A22CS0150', studentName:'Farid Iskandar', medication:'Mefenamic Acid 500mg', dosage:'1 tablet, 3x daily after meals', instructions:'For 3 days, stop if rash occurs', status:'Dispensed', date:this.addDays(-30)},
      {id:this.uid('RX'), studentId:'A23CS0012', studentName:'Nurul Ain binti Hassan', medication:'Loratadine 10mg', dosage:'1 tablet daily', instructions:'For 5 days', status:'Pending', date:this.addDays(-60)}
    ];
    this.save('shms_prescriptions', prescriptions);

    const messages = {
      'Dr. Aisha Rahman': [
        {who:'them', text:'Good morning, your blood test results have come back normal. No further action needed.', ts:this.addDays(-2)},
        {who:'me', text:'Thank you doctor, that is a relief.', ts:this.addDays(-2)}
      ],
      'Pharmacy Counter': [
        {who:'them', text:'Your prescription is ready for collection at the PKU pharmacy counter.', ts:this.addDays(-1)}
      ]
    };
    this.save('shms_messages', messages);

    const staffMessages = {
      'Nurul Ain binti Hassan': [
        {who:'them', text:'Doctor, I would like to ask if I should continue the medicine after the fever stops.', ts:this.addDays(-2)}
      ],
      'Farid Iskandar': [
        {who:'them', text:'Is it normal for the area to still feel numb a few hours after the filling?', ts:this.addDays(-1)}
      ]
    };
    this.save('shms_staffMessages', staffMessages);

    const users = [
      {id:'A23CS0012', name:'Nurul Ain binti Hassan', role:'Student', email:'nurulain@graduate.utm.my', status:'Active'},
      {id:'A22CS0150', name:'Farid Iskandar', role:'Student', email:'farid@graduate.utm.my', status:'Active'},
      {id:'A24CS0077', name:'Tan Wei Jie', role:'Student', email:'weijie@graduate.utm.my', status:'Active'},
      {id:'A23CS0033', name:'Priya Sharma', role:'Student', email:'priya@graduate.utm.my', status:'Active'},
      {id:'STF-001', name:'Dr. Aisha Rahman', role:'Doctor', email:'aisha@pku.utm.my', status:'Active'},
      {id:'STF-002', name:'Dr. Kumar Selvam', role:'Dentist', email:'kumar@pku.utm.my', status:'Active'},
      {id:'STF-003', name:'En. Lim Chong Wei', role:'Physiotherapist', email:'lim@pku.utm.my', status:'Active'},
      {id:'STF-004', name:'Mdm. Zaiton Aziz', role:'Receptionist', email:'zaiton@pku.utm.my', status:'Active'},
      {id:'STF-005', name:'En. Razak Halim', role:'Pharmacist', email:'razak@pku.utm.my', status:'Active'},
      {id:'ADM-001', name:'System Administrator', role:'Admin', email:'admin@pku.utm.my', status:'Active'}
    ];
    this.save('shms_users', users);

    this.save('shms_settings', {emailNotif:true, smsReminders:true, maintenance:false});
    this.save('shms_seeded', true);
  },

  /* ---------------- toast ---------------- */
  toast(msg, type){
    let wrap = document.getElementById('toastWrap');
    if(!wrap){
      wrap = document.createElement('div');
      wrap.id = 'toastWrap';
      document.body.appendChild(wrap);
    }
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' error' : '');
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(()=>{ el.remove(); }, 3200);
  },

  badgeClass(status){
    const map = {
      'Confirmed':'confirmed','Pending':'pending','Cancelled':'cancelled',
      'In Progress':'progress','Completed':'completed','Dispensed':'dispensed'
    };
    return map[status] || 'pending';
  }
};

/* =========================================================
   GENERIC SIDEBAR NAV (used on student / staff / admin pages)
   ========================================================= */
function initSidebarNav(){
  const links = document.querySelectorAll('.nav-link[data-target]');
  const sections = document.querySelectorAll('.page-section');
  links.forEach(link=>{
    link.addEventListener('click', ()=>{
      const target = link.dataset.target;
      links.forEach(l=>l.classList.remove('active'));
      link.classList.add('active');
      sections.forEach(s=>s.classList.remove('active'));
      const sec = document.getElementById(target);
      if(sec) sec.classList.add('active');
      const crumb = document.getElementById('crumbText');
      if(crumb) crumb.textContent = link.dataset.label || link.textContent.trim();
      window.scrollTo({top:0});
    });
  });
  // jump links (buttons inside content that open another section)
  document.querySelectorAll('[data-jump]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const link = document.querySelector('.nav-link[data-target="'+btn.dataset.jump+'"]');
      if(link) link.click();
    });
  });
}

function initLogoutButtons(){
  document.querySelectorAll('[data-logout]').forEach(b=>{
    b.addEventListener('click', ()=>{
      if(confirm('Log out of SHMS?')) SHMS.logout();
    });
  });
}

function setUserChip(user, roleLabel){
  const nameEl = document.getElementById('chipName');
  const roleEl = document.getElementById('chipRole');
  const avEl = document.getElementById('chipAvatar');
  if(nameEl) nameEl.textContent = user.name;
  if(roleEl) roleEl.textContent = roleLabel;
  if(avEl) avEl.textContent = SHMS.initials(user.name);
}

/* =========================================================
   PAGE: LOGIN (index.html)
   ========================================================= */
function initLoginPage(){
  SHMS.seed();
  let selectedRole = 'Student';
  const tabs = document.querySelectorAll('.role-tab');
  const idLabel = document.getElementById('idLabel');
  const idInput = document.getElementById('idInput');
  const idHints = {
    Student: {label:'Matric Number', placeholder:'e.g. A23CS0099'},
    Staff: {label:'Staff ID', placeholder:'e.g. STF-010'},
    Admin: {label:'Admin ID', placeholder:'e.g. ADM-002'}
  };

  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      selectedRole = tab.dataset.role;
      const hint = idHints[selectedRole];
      idLabel.textContent = hint.label;
      idInput.placeholder = hint.placeholder;
    });
  });

  const form = document.getElementById('loginForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const idVal = idInput.value.trim();
    const pwVal = document.getElementById('pwInput').value.trim();
    const idErr = document.getElementById('idErr');
    const pwErr = document.getElementById('pwErr');
    let ok = true;
    if(!idVal){ idErr.style.display='block'; ok=false; } else { idErr.style.display='none'; }
    if(!pwVal){ pwErr.style.display='block'; ok=false; } else { pwErr.style.display='none'; }
    if(!ok) return;

    // demo auth: any non-empty credential is accepted, role is whichever tab is active
    let name = idVal;
    const users = SHMS.load('shms_users', []);
    const match = users.find(u => u.id.toLowerCase() === idVal.toLowerCase());
    if(match) name = match.name;
    else if(selectedRole === 'Student') name = 'Demo Student';
    else if(selectedRole === 'Staff') name = 'Dr. Aisha Rahman';
    else name = 'System Administrator';

    const user = {
      id: idVal,
      name: name,
      role: selectedRole === 'Student' ? 'student' : (selectedRole === 'Staff' ? 'staff' : 'admin')
    };
    SHMS.setUser(user);

    const dest = user.role === 'student' ? 'student.html' : (user.role === 'staff' ? 'staff.html' : 'admin.html');
    window.location.href = dest;
  });
}

/* =========================================================
   PAGE: STUDENT DASHBOARD
   ========================================================= */
function initStudentPage(){
  SHMS.seed();
  const user = SHMS.requireLogin('student');
  if(!user) return;
  setUserChip(user, 'Student');
  initSidebarNav();
  initLogoutButtons();

  const STUDENT_ID = user.id;
  const STUDENT_NAME = user.name;

  function myAppointments(){
    return SHMS.load('shms_appointments', []).filter(a => a.studentId === STUDENT_ID);
  }

  /* ---- dashboard summary ---- */
  function renderSummary(){
    const all = myAppointments();
    const upcoming = all.filter(a => a.status === 'Confirmed' || a.status === 'In Progress')
      .sort((a,b)=> (a.date+a.time).localeCompare(b.date+b.time))[0];
    const upEl = document.getElementById('sumUpcoming');
    if(upEl){
      upEl.textContent = upcoming ? (SHMS.formatDate(upcoming.date)+' · '+upcoming.time) : 'No appointment booked';
    }
    const totalEl = document.getElementById('sumTotal');
    if(totalEl) totalEl.textContent = all.length;
    const msgData = SHMS.load('shms_messages', {});
    const unread = Object.keys(msgData).length ? 1 : 0; // simple demo indicator
    const msgEl = document.getElementById('sumMessages');
    if(msgEl) msgEl.textContent = unread ? '1 new' : '0 new';
    const recEl = document.getElementById('sumRecords');
    if(recEl) recEl.textContent = SHMS.load('shms_records', []).filter(r=>r.studentId===STUDENT_ID).length;
    const welcomeEl = document.getElementById('welcomeName');
    if(welcomeEl) welcomeEl.textContent = STUDENT_NAME.split(' ')[0];
  }

  /* ---- booking form ---- */
  const deptSelect = document.getElementById('deptSelect');
  const doctorSelect = document.getElementById('doctorSelect');
  const dateInput = document.getElementById('dateInput');
  const slotGrid = document.getElementById('slotGrid');
  let selectedSlot = null;

  const doctorsByDept = {
    'General Consultation':['Dr. Aisha Rahman','Dr. Hafiz Mansor'],
    'Dental Care':['Dr. Kumar Selvam'],
    'Counselling & Mental Health':['Dr. Aisha Rahman','Pn. Sarah Lim'],
    'Physiotherapy':['En. Lim Chong Wei']
  };
  const baseSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30'];

  function populateDoctors(){
    const dept = deptSelect.value;
    doctorSelect.innerHTML = '';
    (doctorsByDept[dept]||[]).forEach(doc=>{
      const opt = document.createElement('option');
      opt.value = doc; opt.textContent = doc;
      doctorSelect.appendChild(opt);
    });
  }

  function renderSlots(){
    slotGrid.innerHTML = '';
    selectedSlot = null;
    const date = dateInput.value;
    const dept = deptSelect.value;
    const allAppts = SHMS.load('shms_appointments', []);
    baseSlots.forEach(time=>{
      const taken = date && allAppts.some(a => a.date===date && a.time===time && a.department===dept && a.status!=='Cancelled');
      const div = document.createElement('div');
      div.className = 'slot' + (taken ? ' taken' : '');
      div.textContent = time;
      if(!taken){
        div.addEventListener('click', ()=>{
          slotGrid.querySelectorAll('.slot').forEach(s=>s.classList.remove('selected'));
          div.classList.add('selected');
          selectedSlot = time;
        });
      }
      slotGrid.appendChild(div);
    });
  }

  if(deptSelect){
    deptSelect.addEventListener('change', ()=>{ populateDoctors(); renderSlots(); });
    dateInput.addEventListener('change', renderSlots);
    populateDoctors();
    dateInput.min = SHMS.todayStr();
    dateInput.value = SHMS.addDays(1);
    renderSlots();

    document.getElementById('bookingForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const notes = document.getElementById('notesInput').value.trim();
      if(!dateInput.value){ SHMS.toast('Please choose a date.', 'error'); return; }
      if(!selectedSlot){ SHMS.toast('Please choose an available time slot.', 'error'); return; }
      const appts = SHMS.load('shms_appointments', []);
      appts.push({
        id: SHMS.uid('APT'),
        studentId: STUDENT_ID,
        studentName: STUDENT_NAME,
        department: deptSelect.value,
        doctor: doctorSelect.value,
        date: dateInput.value,
        time: selectedSlot,
        status: 'Confirmed',
        notes: notes || '-'
      });
      SHMS.save('shms_appointments', appts);
      SHMS.toast('Appointment booked and confirmed for '+SHMS.formatDate(dateInput.value)+' at '+selectedSlot+'.');
      document.getElementById('notesInput').value='';
      renderSlots();
      renderApptTable();
      renderSummary();
    });
  }

  /* ---- my appointments table ---- */
  function renderApptTable(){
    const tbody = document.getElementById('apptTableBody');
    if(!tbody) return;
    const list = myAppointments().sort((a,b)=> (b.date+b.time).localeCompare(a.date+a.time));
    if(!list.length){
      tbody.innerHTML = '<tr><td colspan="6" class="table-empty">You have no appointments yet. Book one from "Book Appointment".</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(a=>`
      <tr>
        <td>${SHMS.formatDate(a.date)}</td>
        <td>${a.time}</td>
        <td>${a.department}</td>
        <td>${a.doctor}</td>
        <td><span class="badge ${SHMS.badgeClass(a.status)}">${a.status}</span></td>
        <td>${a.status==='Confirmed' ? `<button class="btn small outline" data-cancel="${a.id}">Cancel</button>` : '&mdash;'}</td>
      </tr>
    `).join('');
    tbody.querySelectorAll('[data-cancel]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        if(!confirm('Cancel this appointment?')) return;
        const appts = SHMS.load('shms_appointments', []);
        const item = appts.find(a=>a.id===btn.dataset.cancel);
        if(item) item.status = 'Cancelled';
        SHMS.save('shms_appointments', appts);
        SHMS.toast('Appointment cancelled.');
        renderApptTable();
        renderSummary();
        renderSlots();
      });
    });
  }

  /* ---- medical records (read-only) ---- */
  function renderRecords(){
    const tbody = document.getElementById('recordsTableBody');
    if(!tbody) return;
    const list = SHMS.load('shms_records', []).filter(r=>r.studentId===STUDENT_ID)
      .sort((a,b)=> b.date.localeCompare(a.date));
    if(!list.length){
      tbody.innerHTML = '<tr><td colspan="5" class="table-empty">No medical records on file yet.</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(r=>`
      <tr>
        <td>${SHMS.formatDate(r.date)}</td>
        <td>${r.doctor}</td>
        <td>${r.diagnosis}</td>
        <td>${r.treatment}</td>
        <td>${r.prescription}</td>
      </tr>
    `).join('');
  }

  /* ---- messages ---- */
  let activeContact = 'Dr. Aisha Rahman';
  function renderContacts(){
    const wrap = document.getElementById('contactList');
    if(!wrap) return;
    const data = SHMS.load('shms_messages', {});
    wrap.innerHTML = Object.keys(data).map(name=>{
      const last = data[name][data[name].length-1];
      return `<div class="contact ${name===activeContact?'active':''}" data-contact="${name}">
        <div class="c-name">${name}</div>
        <div class="c-last">${last ? last.text : ''}</div>
      </div>`;
    }).join('');
    wrap.querySelectorAll('.contact').forEach(c=>{
      c.addEventListener('click', ()=>{ activeContact = c.dataset.contact; renderContacts(); renderChat(); });
    });
  }
  function renderChat(){
    const head = document.getElementById('chatHead');
    const body = document.getElementById('chatMessages');
    if(!head) return;
    head.textContent = activeContact;
    const data = SHMS.load('shms_messages', {});
    const thread = data[activeContact] || [];
    body.innerHTML = thread.map(m=>`
      <div class="msg ${m.who==='me'?'out':'in'}">${m.text}<span class="ts">${SHMS.formatDate(m.ts)}</span></div>
    `).join('');
    body.scrollTop = body.scrollHeight;
  }
  const chatForm = document.getElementById('chatForm');
  if(chatForm){
    chatForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if(!text) return;
      const data = SHMS.load('shms_messages', {});
      if(!data[activeContact]) data[activeContact] = [];
      data[activeContact].push({who:'me', text, ts:SHMS.todayStr()});
      SHMS.save('shms_messages', data);
      input.value='';
      renderChat();
      renderContacts();
      setTimeout(()=>{
        const d2 = SHMS.load('shms_messages', {});
        d2[activeContact].push({who:'them', text:'Thank you for the message. The healthcare team will get back to you shortly.', ts:SHMS.todayStr()});
        SHMS.save('shms_messages', d2);
        renderChat();
        renderContacts();
      }, 900);
    });
  }

  /* ---- emergency request ---- */
  const emgForm = document.getElementById('emergencyForm');
  if(emgForm){
    emgForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const desc = document.getElementById('emgDesc').value.trim();
      if(!desc){ SHMS.toast('Please describe the emergency briefly.', 'error'); return; }
      document.getElementById('emgConfirm').style.display = 'block';
      emgForm.reset();
      SHMS.toast('Emergency request sent to on-call staff.');
    });
  }

  /* ---- profile ---- */
  const profileForm = document.getElementById('profileForm');
  if(profileForm){
    const stored = SHMS.load('shms_profile_'+STUDENT_ID, {
      name: STUDENT_NAME, matric: STUDENT_ID, email:'', phone:'', programme:''
    });
    document.getElementById('pName').value = stored.name;
    document.getElementById('pMatric').value = stored.matric;
    document.getElementById('pEmail').value = stored.email;
    document.getElementById('pPhone').value = stored.phone;
    document.getElementById('pProgramme').value = stored.programme;
    profileForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = {
        name: document.getElementById('pName').value.trim() || STUDENT_NAME,
        matric: document.getElementById('pMatric').value.trim() || STUDENT_ID,
        email: document.getElementById('pEmail').value.trim(),
        phone: document.getElementById('pPhone').value.trim(),
        programme: document.getElementById('pProgramme').value.trim()
      };
      SHMS.save('shms_profile_'+STUDENT_ID, data);
      SHMS.toast('Profile updated.');
    });
  }

  renderSummary();
  renderApptTable();
  renderRecords();
  renderContacts();
  renderChat();
}

/* =========================================================
   PAGE: STAFF DASHBOARD
   ========================================================= */
function initStaffPage(){
  SHMS.seed();
  const user = SHMS.requireLogin('staff');
  if(!user) return;
  setUserChip(user, 'Healthcare Staff');
  initSidebarNav();
  initLogoutButtons();

  /* ---- dashboard summary ---- */
  function renderSummary(){
    const appts = SHMS.load('shms_appointments', []);
    const today = SHMS.todayStr();
    const todayCount = appts.filter(a=>a.date===today && a.status!=='Cancelled').length;
    const pendingRx = SHMS.load('shms_prescriptions', []).filter(p=>p.status==='Pending').length;
    const msgThreads = Object.keys(SHMS.load('shms_staffMessages', {})).length;
    document.getElementById('staffSumToday').textContent = todayCount;
    document.getElementById('staffSumPendingRx').textContent = pendingRx;
    document.getElementById('staffSumThreads').textContent = msgThreads;
    document.getElementById('staffSumTotal').textContent = appts.filter(a=>a.status!=='Cancelled').length;
  }

  /* ---- appointments management ---- */
  function renderAppts(){
    const tbody = document.getElementById('staffApptBody');
    if(!tbody) return;
    const list = SHMS.load('shms_appointments', []).sort((a,b)=> (b.date+b.time).localeCompare(a.date+a.time));
    if(!list.length){ tbody.innerHTML = '<tr><td colspan="7" class="table-empty">No appointments in the system.</td></tr>'; return; }
    tbody.innerHTML = list.map(a=>{
      let actions = '';
      if(a.status==='Confirmed') actions += `<button class="btn small outline" data-checkin="${a.id}">Check In</button> `;
      if(a.status==='In Progress') actions += `<button class="btn small" data-complete="${a.id}">Complete</button> `;
      if(a.status==='Confirmed' || a.status==='In Progress') actions += `<button class="btn small danger" data-cancelstaff="${a.id}">Cancel</button>`;
      return `<tr>
        <td>${SHMS.formatDate(a.date)} · ${a.time}</td>
        <td>${a.studentName}<br><span class="helper-text">${a.studentId}</span></td>
        <td>${a.department}</td>
        <td>${a.doctor}</td>
        <td>${a.notes||'-'}</td>
        <td><span class="badge ${SHMS.badgeClass(a.status)}">${a.status}</span></td>
        <td>${actions || '&mdash;'}</td>
      </tr>`;
    }).join('');

    tbody.querySelectorAll('[data-checkin]').forEach(b=>b.addEventListener('click', ()=>updateApptStatus(b.dataset.checkin,'In Progress')));
    tbody.querySelectorAll('[data-complete]').forEach(b=>b.addEventListener('click', ()=>updateApptStatus(b.dataset.complete,'Completed')));
    tbody.querySelectorAll('[data-cancelstaff]').forEach(b=>b.addEventListener('click', ()=>{
      if(confirm('Cancel this appointment?')) updateApptStatus(b.dataset.cancelstaff,'Cancelled');
    }));
  }
  function updateApptStatus(id, status){
    const appts = SHMS.load('shms_appointments', []);
    const item = appts.find(a=>a.id===id);
    if(item) item.status = status;
    SHMS.save('shms_appointments', appts);
    SHMS.toast('Appointment marked as '+status+'.');
    renderAppts();
    renderSummary();
  }

  /* ---- patient records ---- */
  function renderPatientOptions(){
    const sel = document.getElementById('patientSelect');
    if(!sel) return;
    const students = SHMS.load('shms_mockStudents', []);
    sel.innerHTML = '<option value="">-- Select a patient --</option>' +
      students.map(s=>`<option value="${s.id}">${s.name} (${s.id})</option>`).join('');
  }
  function renderRecordHistory(studentId){
    const wrap = document.getElementById('recordHistory');
    if(!wrap) return;
    const list = SHMS.load('shms_records', []).filter(r=>r.studentId===studentId).sort((a,b)=>b.date.localeCompare(a.date));
    if(!list.length){ wrap.innerHTML = '<p class="helper-text">No previous records for this patient.</p>'; return; }
    wrap.innerHTML = list.map(r=>`
      <div class="panel" style="margin-bottom:10px;">
        <div class="panel-body">
          <strong>${SHMS.formatDate(r.date)}</strong> — ${r.doctor}<br>
          <span class="helper-text">Diagnosis:</span> ${r.diagnosis}<br>
          <span class="helper-text">Treatment:</span> ${r.treatment}<br>
          <span class="helper-text">Prescription:</span> ${r.prescription}
        </div>
      </div>
    `).join('');
  }
  const patientSelect = document.getElementById('patientSelect');
  if(patientSelect){
    renderPatientOptions();
    patientSelect.addEventListener('change', ()=>{
      const id = patientSelect.value;
      document.getElementById('recordForm').style.display = id ? 'block' : 'none';
      if(id) renderRecordHistory(id);
    });
    document.getElementById('recordForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const id = patientSelect.value;
      const students = SHMS.load('shms_mockStudents', []);
      const stu = students.find(s=>s.id===id);
      const diagnosis = document.getElementById('rDiagnosis').value.trim();
      const treatment = document.getElementById('rTreatment').value.trim();
      const prescription = document.getElementById('rPrescription').value.trim() || 'None';
      if(!diagnosis || !treatment){ SHMS.toast('Please fill in diagnosis and treatment.', 'error'); return; }
      const records = SHMS.load('shms_records', []);
      records.push({id:SHMS.uid('REC'), studentId:id, studentName: stu?stu.name:id, date:SHMS.todayStr(), doctor:user.name, diagnosis, treatment, prescription});
      SHMS.save('shms_records', records);
      if(prescription !== 'None'){
        const rx = SHMS.load('shms_prescriptions', []);
        rx.push({id:SHMS.uid('RX'), studentId:id, studentName: stu?stu.name:id, medication:prescription, dosage:'As advised', instructions:'See attached note', status:'Pending', date:SHMS.todayStr()});
        SHMS.save('shms_prescriptions', rx);
      }
      SHMS.toast('Medical record saved.');
      document.getElementById('recordForm').reset();
      renderRecordHistory(id);
      renderSummary();
      renderRx();
    });
  }

  /* ---- prescriptions ---- */
  function renderRx(){
    const tbody = document.getElementById('rxTableBody');
    if(!tbody) return;
    const list = SHMS.load('shms_prescriptions', []).sort((a,b)=>b.date.localeCompare(a.date));
    if(!list.length){ tbody.innerHTML = '<tr><td colspan="6" class="table-empty">No prescriptions issued yet.</td></tr>'; return; }
    tbody.innerHTML = list.map(r=>`
      <tr>
        <td>${SHMS.formatDate(r.date)}</td>
        <td>${r.studentName}</td>
        <td>${r.medication}</td>
        <td>${r.dosage}</td>
        <td><span class="badge ${SHMS.badgeClass(r.status)}">${r.status}</span></td>
        <td>${r.status==='Pending' ? `<button class="btn small outline" data-dispense="${r.id}">Mark Dispensed</button>` : '&mdash;'}</td>
      </tr>
    `).join('');
    tbody.querySelectorAll('[data-dispense]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const list2 = SHMS.load('shms_prescriptions', []);
        const item = list2.find(r=>r.id===b.dataset.dispense);
        if(item) item.status='Dispensed';
        SHMS.save('shms_prescriptions', list2);
        SHMS.toast('Prescription marked as dispensed.');
        renderRx();
      });
    });
  }

  /* ---- messages ---- */
  let activeStudentThread = null;
  function renderStaffContacts(){
    const wrap = document.getElementById('staffContactList');
    if(!wrap) return;
    const data = SHMS.load('shms_staffMessages', {});
    const names = Object.keys(data);
    if(!activeStudentThread) activeStudentThread = names[0];
    wrap.innerHTML = names.map(name=>{
      const last = data[name][data[name].length-1];
      return `<div class="contact ${name===activeStudentThread?'active':''}" data-contact="${name}">
        <div class="c-name">${name}</div>
        <div class="c-last">${last?last.text:''}</div>
      </div>`;
    }).join('');
    wrap.querySelectorAll('.contact').forEach(c=>{
      c.addEventListener('click', ()=>{ activeStudentThread = c.dataset.contact; renderStaffContacts(); renderStaffChat(); });
    });
  }
  function renderStaffChat(){
    const head = document.getElementById('staffChatHead');
    const body = document.getElementById('staffChatMessages');
    if(!head) return;
    head.textContent = activeStudentThread || 'Select a conversation';
    const data = SHMS.load('shms_staffMessages', {});
    const thread = (activeStudentThread && data[activeStudentThread]) || [];
    body.innerHTML = thread.map(m=>`<div class="msg ${m.who==='me'?'out':'in'}">${m.text}<span class="ts">${SHMS.formatDate(m.ts)}</span></div>`).join('');
    body.scrollTop = body.scrollHeight;
  }
  const staffChatForm = document.getElementById('staffChatForm');
  if(staffChatForm){
    staffChatForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!activeStudentThread) return;
      const input = document.getElementById('staffChatInput');
      const text = input.value.trim();
      if(!text) return;
      const data = SHMS.load('shms_staffMessages', {});
      data[activeStudentThread].push({who:'me', text, ts:SHMS.todayStr()});
      SHMS.save('shms_staffMessages', data);
      input.value='';
      renderStaffChat();
      renderStaffContacts();
      SHMS.toast('Reply sent to '+activeStudentThread+'.');
    });
  }

  renderSummary();
  renderAppts();
  renderRx();
  renderStaffContacts();
  renderStaffChat();
}

/* =========================================================
   PAGE: ADMIN DASHBOARD
   ========================================================= */
function initAdminPage(){
  SHMS.seed();
  const user = SHMS.requireLogin('admin');
  if(!user) return;
  setUserChip(user, 'System Administrator');
  initSidebarNav();
  initLogoutButtons();

  function renderSummary(){
    const users = SHMS.load('shms_users', []);
    const appts = SHMS.load('shms_appointments', []);
    document.getElementById('admSumStudents').textContent = users.filter(u=>u.role==='Student').length;
    document.getElementById('admSumStaff').textContent = users.filter(u=>u.role!=='Student' && u.role!=='Admin').length;
    document.getElementById('admSumAppts').textContent = appts.filter(a=>a.status!=='Cancelled').length;
    document.getElementById('admSumRecords').textContent = SHMS.load('shms_records', []).length;
  }

  /* ---- user management ---- */
  function renderUsers(){
    const tbody = document.getElementById('userTableBody');
    if(!tbody) return;
    const term = (document.getElementById('userSearch')?.value || '').toLowerCase();
    const list = SHMS.load('shms_users', []).filter(u =>
      u.name.toLowerCase().includes(term) || u.id.toLowerCase().includes(term) || u.role.toLowerCase().includes(term)
    );
    if(!list.length){ tbody.innerHTML = '<tr><td colspan="5" class="table-empty">No matching users.</td></tr>'; return; }
    tbody.innerHTML = list.map(u=>`
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.role}</td>
        <td>${u.email}</td>
        <td><span class="badge ${u.status==='Active'?'completed':'cancelled'}">${u.status}</span></td>
        <td>
          <button class="btn small outline" data-toggle="${u.id}">${u.status==='Active'?'Suspend':'Reactivate'}</button>
          <button class="btn small danger" data-del="${u.id}">Delete</button>
        </td>
      </tr>
    `).join('');
    tbody.querySelectorAll('[data-toggle]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const list2 = SHMS.load('shms_users', []);
        const it = list2.find(u=>u.id===b.dataset.toggle);
        if(it) it.status = it.status==='Active' ? 'Suspended' : 'Active';
        SHMS.save('shms_users', list2);
        SHMS.toast('User status updated.');
        renderUsers();
      });
    });
    tbody.querySelectorAll('[data-del]').forEach(b=>{
      b.addEventListener('click', ()=>{
        if(!confirm('Delete this user account? This cannot be undone.')) return;
        let list2 = SHMS.load('shms_users', []);
        list2 = list2.filter(u=>u.id!==b.dataset.del);
        SHMS.save('shms_users', list2);
        SHMS.toast('User deleted.');
        renderUsers();
        renderSummary();
      });
    });
  }
  const userSearch = document.getElementById('userSearch');
  if(userSearch) userSearch.addEventListener('input', renderUsers);

  const addUserModal = document.getElementById('addUserModal');
  const openAddUser = document.getElementById('openAddUser');
  if(openAddUser){
    openAddUser.addEventListener('click', ()=> addUserModal.classList.add('open'));
    document.querySelectorAll('[data-close-modal]').forEach(b=>b.addEventListener('click', ()=>addUserModal.classList.remove('open')));
    document.getElementById('addUserForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('newUserName').value.trim();
      const role = document.getElementById('newUserRole').value;
      const email = document.getElementById('newUserEmail').value.trim();
      if(!name || !email){ SHMS.toast('Please fill in all fields.', 'error'); return; }
      const list = SHMS.load('shms_users', []);
      const prefix = role==='Student' ? 'STU' : (role==='Admin' ? 'ADM' : 'STF');
      const id = prefix+'-'+Math.floor(100+Math.random()*900);
      list.push({id, name, role, email, status:'Active'});
      SHMS.save('shms_users', list);
      SHMS.toast('User account created.');
      addUserModal.classList.remove('open');
      document.getElementById('addUserForm').reset();
      renderUsers();
      renderSummary();
    });
  }

  /* ---- reports ---- */
  const reportData = {
    'Appointment Summary': {labels:['Gen. Consult','Dental','Counselling','Physio'], values:[42,18,11,9], unit:'visits'},
    'Healthcare Usage': {labels:['Week 1','Week 2','Week 3','Week 4'], values:[58,63,49,71], unit:'visits'},
    'System Activity': {labels:['Logins','Bookings','Cancellations','Messages'], values:[210,80,12,134], unit:'events'}
  };
  function renderReport(){
    const type = document.getElementById('reportType').value;
    const data = reportData[type];
    const max = Math.max(...data.values);
    const bars = document.getElementById('reportBars');
    bars.innerHTML = data.values.map((v,i)=>`
      <div class="bar-col">
        <span class="bar-val">${v}</span>
        <div class="bar" style="height:${(v/max*100).toFixed(0)}%"></div>
        <span class="bar-lbl">${data.labels[i]}</span>
      </div>
    `).join('');
    document.getElementById('reportTitle').textContent = type+' ('+data.unit+')';
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = data.labels.map((l,i)=>`<tr><td>${l}</td><td>${data.values[i]} ${data.unit}</td></tr>`).join('');
  }
  const genBtn = document.getElementById('generateReportBtn');
  if(genBtn){
    genBtn.addEventListener('click', renderReport);
    renderReport();
    document.getElementById('exportReportBtn').addEventListener('click', ()=>{
      SHMS.toast('Report exported (demo only — no file is generated in this prototype).');
    });
  }

  /* ---- settings ---- */
  const settings = SHMS.load('shms_settings', {emailNotif:true, smsReminders:true, maintenance:false});
  const emailToggle = document.getElementById('toggleEmail');
  const smsToggle = document.getElementById('toggleSms');
  const maintToggle = document.getElementById('toggleMaint');
  if(emailToggle){
    emailToggle.checked = settings.emailNotif;
    smsToggle.checked = settings.smsReminders;
    maintToggle.checked = settings.maintenance;
    document.getElementById('saveSettingsBtn').addEventListener('click', ()=>{
      const updated = {emailNotif:emailToggle.checked, smsReminders:smsToggle.checked, maintenance:maintToggle.checked};
      SHMS.save('shms_settings', updated);
      SHMS.toast('System settings saved.');
    });
  }

  renderSummary();
  renderUsers();
}

/* ---------------- dispatch based on body[data-page] ---------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  const page = document.body.dataset.page;
  if(page === 'login') initLoginPage();
  else if(page === 'student') initStudentPage();
  else if(page === 'staff') initStaffPage();
  else if(page === 'admin') initAdminPage();
});
