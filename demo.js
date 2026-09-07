// Explicit preview only. No network requests or writes to the family spreadsheet.
if (new URLSearchParams(location.search).get('demo') === '1') {
  const today = new Date().toISOString().slice(0,10);
  const questNames = ['10 хвилин порядку','Почати уроки в обраний час','Самостійна добра справа','Намалювати щось нове','Приготувати щось разом','20 хвилин читання'];
  const sample = {version:'familyquest-adventure-3',today,chars:{},cosmetics:{},events:[],shop:[{id:1,name:'Фільм на вибір',xp_cost:50,icon:'🎬'},{id:2,name:'Піца',xp_cost:80,icon:'🍕'},{id:3,name:'Похід у кафе-морозиво',xp_cost:20,icon:'🍨'}]};
  ['a','s','m','p'].forEach((c,i)=>{
    sample.chars[c]={xp:720+i*40,coins:140+i*20,level:4,started:'2026-06-01',hero:['scout','builder','mage','keeper'][i],coat:['mint','rose','base','mint'][i],tool:'lantern',badge:'star',title:'',done:[],rewards:[],quests:questNames.map((name,j)=>({id:(j<3?'daily:':'extra:')+j,name,xp:j<2?10:20,group:j<3?'daily':'extra'}))};
    sample.chars[c].quests.push({id:'goal:demo',name:c==='p'?'Подивитися фільм мовою оригіналу':'Досягнути своєї навчальної цілі',xp:50,group:'goal'});
    sample.cosmetics[c]={title:[{id:'adventurer',name:c==='p'?'Шукач пригод':'Шукачка пригод',requiredLevel:3},{id:'star',name:c==='p'?'Хранитель зірок':'Хранителька зірок',requiredLevel:5}]};
    for(let j=1;j<=24;j++)if((j+i)%3!==0){const date=new Date(today+'T12:00:00Z');date.setUTCDate(date.getUTCDate()-j);sample.events.push({id:'demo-'+c+j,day:date.toISOString().slice(0,10),char:c,kind:'quest',key:'daily:0',xp:10,coins:10,details:{name:questNames[0]}});}
  });
  window.familyQuestDemo = async p => {
    if(!p)return structuredClone(sample);
    if(p.action==='login')return p.pin==='1234'?{ok:true,token:'demo'}:{ok:false,error:'Для демонстрації: 1234'};
    const d=sample.chars[p.char];
    if(sample.events.some(e=>e.id===p.id))return {ok:true,duplicate:true};
    let kind=p.action,key=p.key,xp=0,coins=0,details={};
    if(p.action==='quest'){if(d.done.includes(key))return {ok:true,duplicate:true};const q=d.quests.find(q=>q.id===key);xp=q.xp;coins=q.xp;d.done.push(key);details.name=q.name;}
    if(p.action==='profile'){d[p.field]=p.value;details={[p.field]:p.value};}
    if(p.action==='buy'){
      const item=sample.shop.find(i=>String(i.id)===key),people=p.participants||[p.char];
      if(p.planned&&!['m','p'].includes(p.char))return {ok:false,error:'Потрібен профіль дорослого'};
      if(!p.planned&&people.some(c=>sample.chars[c].coins<item.xp_cost))return {ok:false,error:'Недостатньо монет'};
      kind='purchase';details={name:item.name,participants:people,planned:!!p.planned,charges:{}};
      people.forEach(c=>{details.charges[c]=p.planned?0:item.xp_cost;sample.chars[c].coins-=details.charges[c];});
    }
    if(p.action==='reward'){d.rewards[Number(key)]=true;details.name='Нагорода за рівень';}
    if(p.action==='fulfill')kind='fulfilled';
    d.xp+=xp;d.coins+=coins;d.level=1;while(d.xp>=d.level*(d.level+1)*50)d.level++;
    sample.events.push({id:p.id,day:today,char:p.char,kind,key,xp,coins,details});
    return {ok:true};
  };
}
