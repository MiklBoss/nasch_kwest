'use strict';

// Layered game artwork: equipment remains visible on every character and outfit.
function drawQuestHero(d, label, father) {
  const role = ['scout','mage','builder','keeper'].includes(d.hero) ? d.hero : 'scout';
  const ink = '#202735';
  const coat = {base:'#48bde0',mint:'#68d9a4',rose:'#fa8397'}[d.coat] || '#48bde0';
  const trim = {scout:'#ffcf62',mage:'#b9a0ff',builder:'#ff9866',keeper:'#bce977'}[role];
  const skin = '#f6c297';
  const eyes = {scout:'#29968e',mage:'#7961c3',builder:'#a66732',keeper:'#388ab2'}[role];
  const hair = father ? '#644738' : {scout:'#815135',mage:'#463452',builder:'#794839',keeper:'#d58b46'}[role];
  const face = father
    ? `<path d="M128 140q2 42 49 45 48-6 49-45l-22 14-25 9-24-9Z" fill="${hair}"/><path d="m153 162 25 7 25-7q-23 27-50 0Z" fill="#fff4df" stroke-width="3"/>`
    : `<path d="M155 157q23 10 47-2-8 32-32 17Z" fill="#5d3542" stroke-width="3"/><path d="m162 159 33-1-6 9-24-1Z" fill="#fffdf1" stroke="none"/><path d="M172 173q8-7 16-3" stroke="#ff8da0" stroke-width="5"/><ellipse cx="132" cy="146" rx="10" ry="5" fill="#ef937f" stroke="none"/><ellipse cx="216" cy="145" rx="10" ry="5" fill="#ef937f" stroke="none"/>`;
  const headwear = {
    scout: `<path d="M116 82q8-62 64-58 46 5 63 65l-59-17Z" fill="${trim}"/><path d="M103 85q75-39 151 0l-2 14q-66-24-147 6Z" fill="#e9aa44"/><path d="m198 48 9 28" stroke="#fff0b0" stroke-width="8"/><path d="M135 86h81" stroke="#664737" stroke-width="12"/><rect x="135" y="73" width="33" height="27" rx="10" fill="#74d4e1"/><rect x="178" y="72" width="33" height="27" rx="10" fill="#74d4e1"/><path d="m141 78 18 14m25-14 17 13" stroke="#dbffff" stroke-width="4"/>`,
    mage: `<path d="m107 84 36-55 28-20 43 11-18 12 42 61Z" fill="${trim}"/><path d="m170 15 8 42 34 22" fill="none" stroke="#decfff" stroke-width="8"/><path d="m119 68 105 8 9 17-122-3Z" fill="#5765b0"/><path d="M95 90q72-34 157 0l-4 14q-85-23-153 4Z" fill="#8d79d2"/><path d="m186 63 5 9 11 1-8 7 2 11-10-6-9 5 2-10-8-7 11-1Z" fill="#ffdc74" stroke-width="3"/>`,
    builder: `<path d="M114 90V67q4-44 62-43 55-1 63 44v23Z" fill="${trim}"/><path d="M169 29v48m21-45v44" stroke="#ffd095" stroke-width="10"/><path d="M105 83h144v20H106Z" fill="#ffba70"/><path d="m130 109 93-2" stroke="#54494c" stroke-width="16"/><rect x="131" y="93" width="39" height="29" rx="9" fill="#79d9e3"/><rect x="184" y="92" width="38" height="29" rx="9" fill="#79d9e3"/><path d="m138 99 19 15m53-15-18 15" stroke="#e6ffff" stroke-width="4"/>`,
    keeper: `<path d="M112 95V68q10-45 65-46 56 2 61 48v28l-23-14-9-35-29 20-34-18-11 35Z" fill="#8cb6c2"/><path d="m164 23 16-13 19 14-12 39h-20Z" fill="${trim}"/><path d="m112 70-23-18 7 39 29 15m111-37 25-17-9 39-29 15" fill="#d9eff0"/><path d="m139 38 24 6m34-1 20-5" stroke="#d9eff0" stroke-width="6"/>`
  };
  const silhouette = {
    scout:`<path d="M135 184Q67 168 50 212l70 2-40 36 65-21Z" fill="#f37e7d"/><path d="m75 205 32-7" stroke="#ffd2b2" stroke-width="5"/>`,
    mage:`<path class="hero-cape" d="M137 182Q95 202 63 321q96 23 195-5-44-102-54-134Z" fill="#6c65ab"/><path d="m79 301 20-44m138 49-20-43" stroke="#b5a6ed" stroke-width="6"/>`,
    builder:`<rect x="104" y="180" width="128" height="122" rx="21" fill="#a06c52"/><path d="M123 173v-17h37v17m54 10 11-27 18 8-12 25" fill="#b6d9d9"/>`,
    keeper:`<path class="hero-cape" d="M126 184 86 312l56-7 29 18 29-20 57 9-43-127Z" fill="#d47d6e"/><path d="m102 296 35-95" stroke="#f8b295" stroke-width="7"/>`
  };
  const leftArm = role==='mage'
    ? `<g class="hero-hand"><path d="m137 210-38 17-25-23" fill="none" stroke="${ink}" stroke-width="30"/><path d="m137 210-38 17-25-23" fill="none" stroke="${coat}" stroke-width="20"/><path d="m80 208-11-12-9 5-4-13-9 7 6 22 15 3Z" fill="${skin}"/><path class="magic-gem" d="m56 146 13 23-13 25-14-24Z" fill="#77efde" stroke-width="4"/><path d="m54 151-7 18 8 17" fill="none" stroke="#dafff7" stroke-width="3"/></g>`
    : role==='keeper'
    ? `<path d="m133 210-37 25-12 27" fill="none" stroke="${ink}" stroke-width="30"/><path d="m133 210-37 25-12 27" fill="none" stroke="${coat}" stroke-width="20"/><path d="m54 220 41-17 42 17-5 54q-12 27-37 37-27-15-37-37Z" fill="#91c3c9"/><path d="m68 230 27-10 27 10-4 38q-6 14-23 23-17-10-23-23Z" fill="${coat}"/><path d="m95 231 8 15 15 3-13 10 3 15-13-8-13 8 3-15-12-10 15-3Z" fill="${trim}" stroke-width="3"/>`
    : `<g class="hero-hand"><path d="m136 210-32 16-23-33" fill="none" stroke="${ink}" stroke-width="30"/><path d="m136 210-32 16-23-33" fill="none" stroke="${coat}" stroke-width="20"/><path d="m84 199-13-4-10-20 7-4 8 11-7-26 8-2 9 22 2-16 8 2-1 24Z" fill="${skin}"/></g>`;
  const tool = d.tool==='staff'
    ? `<path d="M272 318V164" stroke="#493443" stroke-width="12"/><path d="M272 318V164" stroke="#dfae67" stroke-width="6"/><path class="magic-gem" d="m272 121 22 29-22 32-22-32Z" fill="#7ceadb"/><path d="m272 128-13 22 13 23" fill="none" stroke="#e5fff5" stroke-width="5"/>`
    : d.tool==='lantern'
    ? `<g class="hero-lantern"><path d="M255 267v-23q17-16 32 0v23" fill="none" stroke-width="6"/><path d="m244 266 12-10h32l10 10-5 44h-45Z" fill="#ffc95d"/><path d="M244 266h53m-51 40h48" stroke="#bd7c38" stroke-width="6"/><path d="M258 272h26v27h-26Z" fill="#fff1b0" stroke="none"/><path class="lamp-flame" d="m272 272 8 17-8 7-7-8Z" fill="#fffde4" stroke="none"/></g>`
    : role==='builder'
    ? `<path d="m260 275 11-77q-12-7-12-21l11-17 2 18 14 2 9-16 3 21q-4 12-14 15l-11 78Z" fill="#b6d7db"/><circle cx="267" cy="268" r="3" fill="#577888" stroke="none"/>`
    : role==='scout'
    ? `<path d="m246 247 29-9 21 10-7 41-24-8-25 6Z" fill="#fff1cc"/><path d="m265 248-1 28m-12-18 27 11" stroke="#ccaa76" stroke-width="3"/><path d="m278 253 6 6-7 7" stroke="#ec8267" fill="none" stroke-width="3"/>`
    : role==='mage'
    ? `<g class="floating-book"><path d="m247 253 25-6 27 8-8 33-24-5-24 4Z" fill="#b792ea"/><path d="m252 253 19-1 20 5-7 24-17-4-18 4Z" fill="#fff2cb" stroke-width="3"/><path d="m271 254-4 22" stroke-width="2"/></g>`
    : `<path d="m270 248 10 12-10 22-10-22Z" fill="${trim}"/>`;
  const badge = d.badge==='star'
    ? `<path d="m178 219 7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2Z" fill="#ffdb6c" stroke-width="3"/>`
    : d.badge==='crown'
    ? `<path d="m148 60-6-28 20 12 16-25 17 25 18-12-5 28Z" fill="#ffce5a"/><circle cx="178" cy="46" r="5" fill="#fa8397" stroke-width="2"/>`
    : `<path d="m168 234 10-9 10 9-10 13Z" fill="${trim}" stroke-width="3"/>`;
  return `<svg class="hero-art role-${role}" viewBox="0 0 360 390" role="img" aria-label="${label}, обраний образ">
    <ellipse class="hero-shadow" cx="180" cy="362" rx="93" ry="13" fill="#0d101a" opacity=".25"/>
    <g class="hero-body" stroke="${ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      ${silhouette[role]}
      <path d="m146 277-14 52-13 16 44 2 12-58m13-10 12 47 20 22 32-11-24-25-10-37" fill="#42546c"/>
      <path d="m128 327 36 8-2 17h-49q-2-17 15-25Zm74-5 29-9 27 23q0 17-22 14l-27-12Z" fill="#303d54"/>
      <path d="M114 353h47m73-2 23-8" stroke="#d8e7eb" stroke-width="6"/>
      <path d="m141 185 58-3 28 29-7 78q-44 19-89-2l-3-73Z" fill="${coat}"/>
      <path d="m148 202-2 55 12 21h-23l-3-62Zm54 8 12 68-13 8Z" fill="#152f4438" stroke="none"/>
      <path d="M175 202v80" stroke="#e9f8f1" stroke-width="4"/>
      ${role==='keeper'?'<path d="m133 192-17 17 18 22 18-18m50-23 25 13-7 27-20-14" fill="#cfebeb"/><path d="m141 272 66 1-1 16-66 1Z" fill="#48546b"/>':role==='builder'?'<path d="M147 200v64h48v-63m-48 28h47" fill="#4d6074"/><path d="M134 270h85v16h-85Z" fill="#9a634d"/><rect x="165" y="266" width="22" height="23" rx="3" fill="#f3c365"/>':'<path d="m139 186 37 26 31-28-26 1-16-5Z" fill="#ffca65"/><path d="m139 270 69 5" stroke="#516075" stroke-width="10"/>'}
      ${leftArm}
      <path d="m211 211 27 21 21 23" fill="none" stroke-width="32"/>
      <path d="m211 211 27 21 21 23" fill="none" stroke="${coat}" stroke-width="22"/>
      ${tool}
      <path d="m248 250 9-8 14 7 5 11-10 10-13-5Z" fill="${skin}"/>
      ${!father?`<path d="M127 81Q94 104 111 155l-12 44 32-6 12-34 62-2 18 44 29-14-17-39q13-56-29-69Z" fill="${hair}"/>`:''}
      <g class="hero-head">
        <path d="M119 113q-17-8-15 13 0 14 18 16m108-31q18-7 18 13-1 16-18 18" fill="${skin}"/>
        <path d="M117 95q11-43 61-43 53 0 59 44l-5 43q-8 43-55 47-47-2-57-43Z" fill="${skin}"/>
        <path d="M118 110q-15-56 36-59 65-15 83 44l-10 22-10-35q-12 20-28 17l-3-16q-27 29-59 20l-6 18Z" fill="${hair}"/>
        <path d="m133 115 22-6m35-1 24 6" fill="none" stroke="${hair}" stroke-width="6"/>
        <g class="hero-eyes"><ellipse cx="146" cy="131" rx="13" ry="17" fill="#fff9ed" stroke-width="3"/><ellipse cx="204" cy="130" rx="13" ry="17" fill="#fff9ed" stroke-width="3"/><ellipse cx="150" cy="133" rx="8" ry="12" fill="${eyes}" stroke-width="2"/><ellipse cx="200" cy="132" rx="8" ry="12" fill="${eyes}" stroke-width="2"/><circle cx="151" cy="134" r="4" fill="${ink}" stroke="none"/><circle cx="199" cy="133" r="4" fill="${ink}" stroke="none"/><circle cx="153" cy="127" r="3" fill="white" stroke="none"/><circle cx="202" cy="125" r="3" fill="white" stroke="none"/></g>
        <path d="m177 140-4 7 8 1" fill="none" stroke="#d49275" stroke-width="3"/>
        ${face}${headwear[role]}
      </g>
      ${badge}
    </g>
  </svg>`;
}

function drawHeroBackdrop(role) {
  const accent={scout:'#72d8b3',mage:'#b6a0ed',builder:'#ffb971',keeper:'#88cce7'}[role]||'#72d8b3';
  return `<svg class="hero-backdrop" viewBox="0 0 580 400" aria-hidden="true"><path d="m45 279 99-34 77 23 86-34 145 27 91 76-120 42-180-21-143-7Z" fill="${accent}" opacity=".16"/><path d="m115 270 34-71 34 71-18-2v20h-32v-20m260 19 40-102 45 102-25-5v26h-35v-26" fill="${accent}" opacity=".35"/><path d="m395 122 17-37 24 40-14-5-13 15Z" fill="${accent}" opacity=".8"/><path d="m76 128 17-10 25 14-12 27-25-7Z" fill="${accent}" opacity=".45"/><path d="m452 206 7-16 8 16 16 7-16 7-8 17-7-17-17-7Z" fill="#ffd578"/><path d="m137 91 4-9 5 9 9 5-9 4-5 10-4-10-10-4Z" fill="#ffc0b2"/></svg>`;
}
