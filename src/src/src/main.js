const sigma = 5.670e-8;
const K = c => c + 273.15;

function setText(id, v){ const el = document.getElementById(id); if(el) el.textContent = v; }
function setBadge(id, value){
  const el = document.getElementById(id); if(!el) return;
  el.classList.remove('ok','warn','crit');
  if(value < 0) el.classList.add('ok');
  else if(value < 50) el.classList.add('warn');
  else el.classList.add('crit');
}

// Tabs
const tabAtm = document.getElementById('tab-atm');
const tabFire = document.getElementById('tab-fire');
const panelAtm = document.getElementById('panel-atm');
const panelFire = document.getElementById('panel-fire');

tabAtm?.addEventListener('click', () => {
  tabAtm.classList.add('active'); tabFire.classList.remove('active');
  panelAtm.hidden = false; panelFire.hidden = true;
});
tabFire?.addEventListener('click', () => {
  tabFire.classList.add('active'); tabAtm.classList.remove('active');
  panelFire.hidden = false; panelAtm.hidden = true;
});

// Atmosphere calculator
function updateAtm(){
  const Ts = +document.getElementById('Ts').value;
  const Ta = +document.getElementById('Ta').value;
  const ea = +document.getElementById('ea').value;
  const es = +document.getElementById('es').value;

  document.getElementById('Ts_v').textContent = Ts;
  document.getElementById('Ta_v').textContent = Ta;
  document.getElementById('ea_v').textContent = ea.toFixed(2);
  document.getElementById('es_v').textContent = es.toFixed(2);

  const LWu = es * sigma * Math.pow(K(Ts),4);
  const LWd = ea * sigma * Math.pow(K(Ta),4);
  const LWnet = LWd - LWu;

  setText('LWu', Math.round(LWu));
  setText('LWd', Math.round(LWd));
  setText('LWnet', Math.round(LWnet));
  setBadge('LWnet_badge', LWnet);
}
['Ts','Ta','ea','es'].forEach(id => document.getElementById(id)?.addEventListener('input', updateAtm));
updateAtm();

// Fire radiant calculator
function updateFire(){
  const Tf = +document.getElementById('Tf').value;
  const Tt = +document.getElementById('Tt').value;
  const Fv = +document.getElementById('Fv').value;
  const tau = +document.getElementById('tau').value;
  const ef = +document.getElementById('ef').value;

  document.getElementById('Tf_v').textContent = Tf;
  document.getElementById('Tt_v').textContent = Tt;
  document.getElementById('Fv_v').textContent = Fv.toFixed(2);
  document.getElementById('tau_v').textContent = tau.toFixed(2);
  document.getElementById('ef_v').textContent = ef.toFixed(2);

  const qrad = Math.max(0, Fv * tau * ef * sigma * (Math.pow(Tf,4) - Math.pow(Tt,4)));
  setText('qrad', Math.round(qrad));

  const badge = document.getElementById('qrad_badge');
  badge.classList.remove('ok','warn','crit');
  const msg = document.getElementById('qrad_msg');

  if(qrad < 3000){ badge.classList.add('ok');  msg.textContent = 'Low radiant load — unlikely to pre-heat quickly.'; }
  else if(qrad < 12000){ badge.classList.add('warn'); msg.textContent = 'Moderate radiant load — pre-heating likely for fine fuels.'; }
  else { badge.classList.add('crit'); msg.textContent = 'High radiant load — rapid pre-heating/ignition potential nearby.'; }
}
['Tf','Tt','Fv','tau','ef'].forEach(id => document.getElementById(id)?.addEventListener('input', updateFire));
updateFire();
