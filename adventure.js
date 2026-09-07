'use strict';
const names = { a: 'Ангеліна', s: 'Світлана', m: 'Мама', p: 'Тато' };
const heroes = {
  get scout() { return char === 'p' ? 'Мандрівник' : 'Мандрівниця'; },
  get mage() { return char === 'p' ? 'Чарівник' : 'Чарівниця'; },
  get builder() { return char === 'p' ? 'Винахідник' : 'Винахідниця'; },
  get keeper() { return char === 'p' ? 'Вартовий' : 'Вартова'; }
};
const gear = { coat: [['base','Морський',1],['mint','М’ятний',2],['rose','Кораловий',3]], tool: [['none','Без предмета',1],['staff','Посох',2],['lantern','Ліхтар',3]], badge: [['none','Без прикраси',1],['star','Зірка',2],['crown','Корона',3]] };
const rewardNames = { a:['Кіно на вибір','Спа-вечір','Шопінг на 20€','Поїздка на вибір'], s:['Кіно на вибір','Нове LEGO','Шопінг на 20€','Поїздка на вибір'], m:['Spa-вечір','Вечеря в ресторані','Нова спальня','Поїздка разом'], p:['День рибалки','Вечір для себе','Нова спальня','Рибальська поїздка'] };
let data, char = localStorage.getItem('fq-profile') || 'a', view = 'today', period = 'week', busy = false, fresh = false;
if (!names[char]) char = 'a';
const tokens = JSON.parse(sessionStorage.getItem('fq-tokens') || '{}');
const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dayDate = day => new Date(day + 'T12:00:00Z');
const dayKey = date => date.toISOString().slice(0,10);
function shift(day, n) { const date = dayDate(day); date.setUTCDate(date.getUTCDate() + n); return dayKey(date); }
function startWeek(day) { const date = dayDate(day); return shift(day, -((date.getUTCDay() + 6) % 7)); }
function ranges(today, selected) {
  if (selected === 'week') { const start = startWeek(today); return { start, previous: shift(start,-7), previousEnd: shift(start,-1), completedStart: shift(start,-7), earlierStart: shift(start,-14), earlierEnd: shift(start,-8) }; }
  const start = today.slice(0,7) + '-01';
  const previousEnd = shift(start,-1), previous = previousEnd.slice(0,7) + '-01';
  const earlierEnd = shift(previous,-1);
  return { start, previous, previousEnd, completedStart: previous, earlierStart: earlierEnd.slice(0,7) + '-01', earlierEnd };
}
function baseArt(d) {
  const color = { base:'#377d92', mint:'#52a78b', rose:'#cf7180' }[d.coat] || '#377d92';
  const hats = { scout:'<path d="M65 79 95 35l30 44Z" fill="#d4ad61"/><path d="M57 79h77" stroke="#856447" stroke-width="8"/>', mage:'<path d="m58 79 39-63 30 63Z" fill="#526aa3"/><path d="M52 80h86" stroke="#354977" stroke-width="8"/>', builder:'<path d="M62 78a33 33 0 0 1 66 0Z" fill="#e4ad48"/><path d="M61 81h70" stroke="#ac752c" stroke-width="7"/>', keeper:'<path d="M63 79Q60 27 96 38q39-3 32 42" fill="#749992"/><path d="M94 38v39" stroke="#d9eee7" stroke-width="6"/>' };
  return `<svg class="hero-art" viewBox="0 0 190 230" role="img" aria-label="${esc(heroes[d.hero])}, обраний образ"><ellipse cx="95" cy="213" rx="61" ry="8" fill="#cadfd3"/><path d="m76 169-4 37m40-37 5 37" stroke="#384c51" stroke-width="16" stroke-linecap="round"/><path d="M71 124 49 161m71-37 23 35" stroke="#e6b795" stroke-width="14" stroke-linecap="round"/><path d="M70 115h51l12 67H58Z" fill="${color}"/><path d="M95 118v62" stroke="#ffffff70" stroke-width="3"/><circle cx="95" cy="87" r="32" fill="#ecc19e"/><path d="M65 90q-13-48 31-45 42 0 29 49l-10-24q-21 8-42 1Z" fill="#4c3c3c"/><circle cx="83" cy="88" r="3" fill="#253d34"/><circle cx="108" cy="88" r="3" fill="#253d34"/><path d="M87 103q9 7 17 0" fill="none" stroke="#9b5e50" stroke-width="3" stroke-linecap="round"/>${hats[d.hero] || hats.scout}${d.tool==='staff'?'<path d="M145 196V102" stroke="#877052" stroke-width="6"/><path class="spark" d="m145 82 12 17-12 17-12-17Z" fill="#52c5bb"/>':d.tool==='lantern'?'<path d="M139 154v-15h16v15" fill="none" stroke="#596357" stroke-width="4"/><rect x="131" y="153" width="32" height="36" rx="5" fill="#dba54d"/><rect class="spark" x="140" y="159" width="14" height="23" fill="#fff1b2"/>':''}${d.badge==='star'?'<path d="m94 128 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1Z" fill="#ffda6e"/>':d.badge==='crown'?'<path d="m74 56-3-19 13 9 11-15 12 15 12-9-3 19Z" fill="#f4c95b"/>':''}</svg>`;
}
function art(d) {
  const svg = baseArt(d);
  if (char !== 'p') return svg;
  return svg
    .replace('M70 115h51l12 67H58Z', 'M66 115h59l3 61H62Z')
    .replace('M65 90q-13-48 31-45 42 0 29 49l-10-24q-21 8-42 1Z', 'M65 84q-7-39 31-39 37 0 30 39l-9-17q-22 5-44 0Z')
    .replace('<circle cx="83"', '<path d="M67 94q5 30 28 30t28-30l-13 11H80Z" fill="#59453e"/><circle cx="83"');
}
function scene(count) {
  return `<svg class="scene" viewBox="0 0 720 250" role="img" aria-label="Сімейний табір, ${count} внесків цього тижня"><path fill="#c5e2d6" d="M0 160Q150 65 300 145T720 100V250H0Z"/><path fill="#91b6a0" d="M0 201Q180 118 370 190T720 155V250H0Z"/><path d="M0 239Q350 179 720 231" stroke="#eee9c8" stroke-width="22" fill="none"/>${count>=4?'<path d="m130 207 80-121 82 121Z" fill="#dfae62"/><path d="m210 86 17 121h65Z" fill="#bd8544"/><path d="m178 207 32-66 30 66Z" fill="#4c6861"/>':'<path d="m130 207 80-121 82 121Z" fill="none" stroke="#718f80" stroke-width="3" stroke-dasharray="8 7"/>'}${count>=8?'<path d="M363 200v-89m-4 0h38" stroke="#657769" stroke-width="7"/><rect x="382" y="108" width="27" height="36" rx="5" fill="#e9ba52"/><rect x="390" y="114" width="11" height="22" fill="#fff4c0"/>':''}${count>=12?'<path d="M472 190h105m-89 0v28m73-28v28" stroke="#6d8175" stroke-width="9"/><path d="M488 175h74" stroke="#bd865a" stroke-width="18"/>':''}${count>=16?'<path d="M80 70q260 50 570-10" stroke="#658574" stroke-width="3"/><path d="m150 80 16 27 13-22m100 8 16 27 13-25m105-3 16 27 13-29m106-10 16 26 13-29" fill="#cc7880"/>':''}<circle cx="606" cy="47" r="22" fill="#f3d980"/></svg>`;
}
function stats(events) { return { days:new Set(events.map(e=>e.day)).size, count:events.length, xp:events.reduce((sum,e)=>sum+e.xp,0) }; }
function questsFor(c) { return data.events.filter(e=>e.char===c && e.kind==='quest'); }
function nextText(d) {
  const next = d.level*(d.level+1)*50;
  return `До рівня ${d.level+1}: ${Math.max(0,next-d.xp)} XP`;
}
function intro(d) {
  const floor=d.level*(d.level-1)*50, width=Math.max(0,Math.min(100,(d.xp-floor)/(d.level*100)*100));
  const title=(((data.cosmetics[char]||{}).title||[]).find(t=>t.id===d.title)||{}).name;
  return `<section class="intro"><div><p class="eyebrow">${esc(heroes[d.hero])}${title?' · '+esc(title):''}</p><h1>${esc(names[char])}</h1><div class="stats"><div><strong>${d.level}</strong><span>рівень</span></div><div><strong>${d.xp}</strong><span>досвід</span></div><div><strong>${d.coins}</strong><span>монети</span></div></div><div class="track"><span style="width:${width}%"></span></div><p class="muted next">${nextText(d)}</p></div>${art(d)}</section>`;
}
function questList(list,d) {
  return `<div class="quest-list">${list.map(q=>`<article class="quest ${d.done.includes(q.id)?'done':''}"><div class="body"><h3>${esc(q.name)}</h3><small>${d.done.includes(q.id)?'Виконано сьогодні':`+${q.xp} XP · +${q.xp} монет`}</small></div><button data-action="quest" data-key="${esc(q.id)}" title="${d.done.includes(q.id)?'Виконано':'Зарахувати виконання'}" aria-label="${d.done.includes(q.id)?'Виконано':'Виконати'}: ${esc(q.name)}" ${d.done.includes(q.id)||busy||!fresh?'disabled':''}>${d.done.includes(q.id)?'✓':'＋'}</button></article>`).join('')}</div>`;
}
function render() {
  document.querySelectorAll('nav button').forEach(b=> { if(b.dataset.view===view)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current'); });
  if(!data){$('main').innerHTML='<p class="empty">Пригода з’явиться після підключення.</p>';return;}
  const d=data.chars[char]; let html='';
  if(view==='today') {
    const extra=d.quests.filter(q=>q.group==='extra');
    html=intro(d)+`<h2>Твій день</h2>${questList(d.quests.filter(q=>q.group==='daily'),d)}${extra.length?`<h2>Обери свою пригоду</h2>${questList(extra,d)}`:''}${d.quests.some(q=>q.group==='goal')?`<h2>Крок до моєї цілі</h2>${questList(d.quests.filter(q=>q.group==='goal'),d)}`:''}`;
  } else if(view==='hero') {
    html=intro(d)+`<h2>Обери персонажа</h2><div class="options hero-choices">${Object.entries(heroes).map(([id,name])=>`<button data-action="profile" data-field="hero" data-key="${id}" aria-pressed="${d.hero===id}">${art({...d,hero:id})}${name}</button>`).join('')}</div><div class="split">`;
    Object.entries(gear).forEach(([field,items])=>{html+=`<section><h2>${{coat:'Одяг',tool:'Спорядження',badge:'Прикраса'}[field]}</h2><div class="options">${items.map(([id,name,level])=>`<button data-action="profile" data-field="${field}" data-key="${id}" aria-pressed="${d[field]===id}" ${d.level<level?'disabled':''}>${field==='coat'?`<span class="swatch" style="background:${{base:'#377d92',mint:'#52a78b',rose:'#cf7180'}[id]}"></span>`:''}${name}<small>${d.level<level?'Рівень '+level:d[field]===id?'Обрано':'Відкрито'}</small></button>`).join('')}</div></section>`;});
    html+='</div>';
    const titles=(data.cosmetics[char]||{}).title||[];
    if(titles.length) html+=`<h2>Титули</h2><div class="options">${titles.map(t=>`<button data-action="profile" data-field="title" data-key="${esc(t.id)}" aria-pressed="${d.title===t.id}" ${d.level<t.requiredLevel?'disabled':''}>${esc(t.name)}<small>${d.level<t.requiredLevel?'Рівень '+t.requiredLevel:d.title===t.id?'Обрано':'Відкрито'}</small></button>`).join('')}</div>`;
  } else if(view==='history') {
    const r=ranges(data.today,period), events=questsFor(char), current=events.filter(e=>e.day>=r.start&&e.day<=data.today), completed=events.filter(e=>e.day>=r.completedStart&&e.day<=r.previousEnd), earlier=events.filter(e=>e.day>=r.earlierStart&&e.day<=r.earlierEnd), s=stats(current), a=stats(completed), b=stats(earlier);
    const enough=d.started<=r.earlierStart;
    let bars='';for(let date=r.start;date<=data.today;date=shift(date,1)){const n=current.filter(e=>e.day===date).length;bars+=`<div class="bar" style="height:${Math.max(2,n/Math.max(1,...current.map(e=>current.filter(x=>x.day===e.day).length))*120)}px" title="${date}: ${n}" aria-label="${date}: ${n} квестів"></div>`;}
    html=`<h1>Мій шлях</h1><div class="period"><button data-period="week" aria-pressed="${period==='week'}">Тиждень</button><button data-period="month" aria-pressed="${period==='month'}">Місяць</button></div><div class="stats"><div><strong>${s.days}</strong><span>днів з пригодами</span></div><div><strong>${s.count}</strong><span>виконаних справ</span></div><div><strong>${s.xp}</strong><span>нового досвіду</span></div></div><div class="chart" role="group" aria-label="Виконання за днями">${bars}</div><p class="muted">${r.start} — ${data.today}</p><h2>Завершені ${period==='week'?'тижні':'місяці'}</h2><p>${enough?`За останній завершений період: ${a.days} активних днів. За попередній: ${b.days}.`:'Порівняння з’явиться після двох повних періодів спостереження.'}</p><p class="muted">Історія з ${esc(d.started)}. Досвід до оновлення збережено.</p><h2>Останні кроки</h2>${events.slice(-12).reverse().map(e=>`<div class="event"><span>${esc(e.details.name)}</span><small>${e.day} · +${e.xp} XP</small></div>`).join('')||'<p class="empty">Тут буде твоя перша пригода.</p>'}`;
  } else if(view==='family') {
    const week=startWeek(data.today), events=data.events.filter(e=>e.kind==='quest'&&e.day>=week&&e.day<=data.today);
    // One contribution per person per day keeps a long task list from dominating.
    const contributions=new Set(events.map(e=>e.char+e.day)).size;
    html=`<p class="eyebrow">Пригода тижня · ${week}</p><h1>Наш сімейний табір</h1>${scene(contributions)}<div class="milestones">${[[4,'Намет'],[8,'Світло'],[12,'Місце зустрічі'],[16,'Свято']].map(([n,label])=>`<span class="${contributions>=n?'reached':''}">${contributions>=n?'✓ ':''}${label} · ${n}</span>`).join('')}</div><p>${contributions>=16?'Табір готовий до сімейного вечора!':`${contributions} із 16 внесків до готового табору`}</p><h2>Ми разом</h2>${Object.keys(names).map(c=>`<div class="family-row"><strong>${names[c]}</strong><span>${new Set(events.filter(e=>e.char===c).map(e=>e.day)).size} днів участі</span></div>`).join('')}<p class="muted">Перша виконана справа за день додає один внесок. Новий тиждень — новий табір; досвід героїв залишається.</p>`;
    const oldWeeks=[...new Set(data.events.filter(e=>e.kind==='quest'&&e.day<week).map(e=>startWeek(e.day)))].sort().reverse();
    if(oldWeeks.length)html+=`<h2>Минулі пригоди</h2>${oldWeeks.slice(0,8).map(w=>`<div class="event"><span>Табір · ${w}</span><small>${new Set(data.events.filter(e=>e.kind==='quest'&&startWeek(e.day)===w).map(e=>e.char+e.day)).size} внесків</small></div>`).join('')}`;
  } else {
    html=`<h1>Крамниця</h1><p>${d.coins} монет · рівень ${d.level}</p><div class="shop-grid">${data.shop.map(item=>`<article class="item"><span class="reward-icon">${esc(item.icon)}</span><h2>${esc(item.name)}</h2><p>${item.xp_cost} монет</p><button data-action="buy" data-key="${item.id}" ${d.coins<item.xp_cost?'disabled':''}>Обрати</button></article>`).join('')}</div><h2>Нагороди за рівні</h2><div class="shop-grid">${[3,5,8,10].map((level,i)=>`<article class="item"><h3>${esc(rewardNames[char][i])}</h3><p>Рівень ${level}</p><button data-action="reward" data-key="${i}" ${d.rewards[i]||d.level<level?'disabled':''}>${d.rewards[i]?'Запит збережено':'Отримати'}</button></article>`).join('')}</div><h2>Запити на нагороди</h2>`;
    const requests=data.events.filter(e=>['purchase','reward'].includes(e.kind)&&(['m','p'].includes(char)||e.char===char||(e.details.participants||[]).includes(char)));
    html+=requests.slice(-20).reverse().map(e=>{const done=data.events.some(x=>x.kind==='fulfilled'&&x.key===e.id);const people=e.details.participants||[e.char];return `<div class="event"><span>${esc(people.map(c=>names[c]).join(', '))}: ${esc(e.details.name)}${e.details.charges?`<br><small>${e.details.planned?'Заплановано · без списання':people.map(c=>`${esc(names[c])}: ${e.details.charges[c]} монет`).join(' · ')}</small>`:''}<br><small>${done?'Видано':'Очікує на дорослого'}</small></span>${!done&&['m','p'].includes(char)?`<button data-action="fulfill" data-key="${esc(e.id)}">Видано</button>`:''}</div>`;}).join('')||'<p class="empty">Запитів поки немає.</p>';
  }
  $('main').innerHTML=html;
  if(view==='today') {
    $('main').querySelectorAll('h2').forEach(h=>{if(h.textContent==='Крок до моєї цілі')h.textContent='Моя велика ціль';});
    for(const q of d.quests.filter(q=>q.group==='goal')) {
      const button=[...$('main').querySelectorAll('[data-action="quest"]')].find(b=>b.dataset.key===q.id);
      if(button)button.closest('.quest').querySelector('small').textContent=d.done.includes(q.id)?'Ціль досягнута':`За досягнення: +${q.xp} XP · +${q.xp} монет`;
    }
  }
  if(view==='shop')$('main').querySelectorAll('[data-action="buy"]').forEach(b=>{
    b.closest('.item').querySelector('p').textContent+=' за учасника';
    b.disabled=false;
  });
  if(busy||!fresh)$('main').querySelectorAll('[data-action]').forEach(b=>b.disabled=true);
}
async function request(payload) {
  if(window.familyQuestDemo) return window.familyQuestDemo(payload);
  const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),25000);
  try { const response=await fetch(window.FAMILYQUEST_API,{...(payload?{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(payload)}:{}),signal:controller.signal,cache:'no-store'});if(!response.ok)throw Error('Не вдалося підключитися');return await response.json(); }
  finally {clearTimeout(timer);}
}
async function sync() {
  try { const result=await request();if(result.version!=='familyquest-adventure-3')throw Error('Потрібне оновлення гри на сервері.');data=result;fresh=true;$('connection').textContent=window.familyQuestDemo?'Демонстрація · сімейні дані не змінюються · PIN 1234':'Збережено в родині';render(); }
  catch(e){fresh=false;$('connection').textContent=navigator.onLine?e.message:'Немає інтернету. Підключись, щоб зарахувати справу.';render();}
}
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');setTimeout(()=>$('toast').classList.remove('visible'),3500);}
let loginResolve;
function login(c){$('login-name').textContent=names[c];$('login-error').textContent='';$('pin').value='';$('login').showModal();$('pin').focus();return new Promise(resolve=>loginResolve={resolve,char:c});}
$('login-form').addEventListener('submit',async e=>{e.preventDefault();if(!loginResolve)return;const button=e.submitter;button.disabled=true;try{const result=await request({action:'login',char:loginResolve.char,pin:$('pin').value});if(!result.ok)throw Error(result.error);tokens[loginResolve.char]=result.token;sessionStorage.setItem('fq-tokens',JSON.stringify(tokens));const pending=loginResolve;loginResolve=null;$('login').close();pending.resolve(true);}catch(e){$('login-error').textContent=e.message;}finally{button.disabled=false;}});
$('login').addEventListener('close',()=>{if(loginResolve){loginResolve.resolve(false);loginResolve=null;}});
$('cancel-login').onclick=()=>$('login').close();
function confirmAction(title,copy){$('confirm-title').textContent=title;$('confirm-copy').textContent=copy;$('confirm').returnValue='';$('confirm').showModal();return new Promise(resolve=>$('confirm').addEventListener('close',()=>resolve($('confirm').returnValue==='yes'),{once:true}));}
$('cancel-confirm').onclick=()=>$('confirm').close('no');$('accept-confirm').onclick=()=>$('confirm').close('yes');
function chooseParticipants(item,c) {
  $('outing-title').textContent=item.name;
  $('outing-price').textContent=`${item.xp_cost} монет за учасника`;
  $('outing-people').innerHTML='<legend>Хто бере участь?</legend>'+Object.entries(names).map(([id,name])=>`<label class="participant"><input type="checkbox" value="${id}" ${id===c?'checked':''}>${name} · ${data.chars[id].coins} монет</label>`).join('');
  $('outing-planned').checked=false;
  $('outing-planned-label').hidden=!['m','p'].includes(c);
  function selection(){return {participants:[...$('outing-people').querySelectorAll('input:checked')].map(i=>i.value),planned:['m','p'].includes(c)&&$('outing-planned').checked};}
  function update(){const s=selection();const short=s.participants.filter(id=>data.chars[id].coins<item.xp_cost);$('outing-total').textContent=`Разом: ${s.planned?0:s.participants.length*item.xp_cost} монет`;$('outing-error').textContent=!s.participants.length?'Обери хоча б одного учасника':!s.planned&&short.length?'Не вистачає монет: '+short.map(id=>names[id]).join(', '):'';$('outing-accept').disabled=!!$('outing-error').textContent;}
  $('outing-people').onchange=update;$('outing-planned').onchange=update;
  $('outing').returnValue='';update();$('outing').showModal();
  $('outing-cancel').onclick=()=>$('outing').close('no');
  $('outing-accept').onclick=()=>$('outing').close('yes');
  return new Promise(resolve=>$('outing').addEventListener('close',()=>resolve($('outing').returnValue==='yes'?selection():null),{once:true}));
}
async function mutate(button){
  if(busy||!fresh)return;const c=char, action=button.dataset.action,key=button.dataset.key,field=button.dataset.field;
  busy=true;render();
  try{
    if(!tokens[c]&&!await login(c))return;
    let purchase = {};
    if(action==='buy'){
      const item=data.shop.find(i=>String(i.id)===key);
      purchase=await chooseParticipants(item,c);if(!purchase)return;
      purchase.consents={};
      if(!purchase.planned)for(const participant of purchase.participants){
        if(participant!==c){if(!await login(participant))return;purchase.consents[participant]=tokens[participant];}
      }
    }
    if(action==='quest'&&data.chars[c].quests.find(q=>q.id===key)?.group==='goal'&&!await confirmAction('Велику ціль досягнуто?','Нагороду за цю ціль можна отримати один раз.'))return;
    if(action==='reward'&&!await confirmAction(rewardNames[c][Number(key)],'Надіслати запит на нагороду дорослим?'))return;
    const storageKey='fq-pending:'+c;
    const fingerprint=JSON.stringify([action,key,field||'',data.today,purchase.participants||[],!!purchase.planned]);
    const pending=JSON.parse(sessionStorage.getItem(storageKey)||'null');
    const id=pending&&pending.fingerprint===fingerprint?pending.id:crypto.randomUUID();
    sessionStorage.setItem(storageKey,JSON.stringify({fingerprint,id}));
    const payload=()=>({action,char:c,key,field,value:key,token:tokens[c],id,...purchase});
    let result=await request(payload());
    if(result.auth){delete tokens[c];if(!await login(c))return;result=await request(payload());}
    if(result.consent){if(!await login(result.consent))return;purchase.consents[result.consent]=tokens[result.consent];result=await request(payload());}
    if(!result.ok){sessionStorage.removeItem(storageKey);throw Error(result.error||'Не вдалося зберегти');}
    sessionStorage.removeItem(storageKey);
    await sync();toast(result.duplicate?'Уже збережено':action==='quest'?'Ще один крок у твоїй пригоді!':'Збережено');
  }catch(e){toast(e.name==='AbortError'?'Відповідь затрималась. Онови дані перед повторною спробою.':e.message);await sync();}
  finally{busy=false;render();}
}
$('main').addEventListener('click',e=>{const button=e.target.closest('button');if(!button||button.disabled)return;if(button.dataset.period){period=button.dataset.period;render();}else if(button.dataset.action)mutate(button);});
document.querySelector('nav').addEventListener('click',e=>{if(e.target.dataset.view){view=e.target.dataset.view;render();}});
$('profile').value=char;$('profile').onchange=e=>{char=e.target.value;localStorage.setItem('fq-profile',char);render();};
function renderTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  $('theme').textContent = dark ? '☀' : '☾';
  $('theme').title = dark ? 'Світла тема' : 'Темна тема';
  $('theme').setAttribute('aria-label', $('theme').title);
  document.querySelector('meta[name="theme-color"]').content = dark ? '#151b19' : '#f3f6f4';
}
$('theme').onclick = () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('fq-theme', theme);
  renderTheme();
};
renderTheme();
$('refresh').onclick=()=>{if(!busy)sync();};
window.addEventListener('online',()=>{if(!busy)sync();});window.addEventListener('offline',()=>{fresh=false;$('connection').textContent='Немає інтернету. Виконання буде доступне після підключення.';render();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!busy)sync();});setInterval(()=>{if(!document.hidden&&!busy)sync();},60000);
let installPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('install').hidden=false;});$('install').onclick=async()=>{if(installPrompt){await installPrompt.prompt();installPrompt=null;$('install').hidden=true;}};
if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!navigator.standalone)$('install-note').textContent='Встановити: меню «Поділитися» → «На початковий екран».';
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
render();sync();
