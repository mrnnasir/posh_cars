const DATA = [
  {
    brand: 'McLaren',
    logo: 'M',
    models: [
      {name:'Artura', price:205000, configs:{power:'671 hp',topSpeed:'205 mph','0to60':'3.0s'}},
      {name:'720S', price:297000, configs:{power:'710 hp',topSpeed:'212 mph','0to60':'2.8s'}}
    ]
  },
  {
    brand: 'Maserati',
    logo: 'Ma',
    models: [
      {name:'Ghibli', price:78900, configs:{power:'330 hp',topSpeed:'166 mph','0to60':'5.5s'}},
      {name:'MC20', price:210000, configs:{power:'621 hp',topSpeed:'202 mph','0to60':'2.9s'}}
    ]
  },
  {
    brand: 'Ferrari',
    logo: 'F',
    models: [
      {name:'Roma', price:226000, configs:{power:'612 hp',topSpeed:'199 mph','0to60':'3.4s'}},
      {name:'F8 Tributo', price:276000, configs:{power:'710 hp',topSpeed:'211 mph','0to60':'2.9s'}}
    ]
  },
  {
    brand: 'BMW',
    logo: 'B',
    models: [
      {name:'M3', price:72900, configs:{power:'473 hp',topSpeed:'155 mph','0to60':'3.8s'}},
      {name:'i7', price:119300, configs:{power:'536 hp',topSpeed:'140 mph','0to60':'4.5s',type:'Electric'}}
    ]
  },
  {
    brand: 'Lamborghini',
    logo: 'L',
    models: [
      {name:'Huracán', price:261274, configs:{power:'630 hp',topSpeed:'202 mph','0to60':'2.9s'}},
      {name:'Aventador', price:393695, configs:{power:'769 hp',topSpeed:'217 mph','0to60':'2.8s'}}
    ]
  },
  {
    brand: 'Maybach',
    logo: 'Mb',
    models: [
      {name:'S 680 Maybach', price:230000, configs:{power:'621 hp',topSpeed:'155 mph','0to60':'4.5s',luxury:'Executive rear seats'}}
    ]
  }
];

const brandFilter = document.getElementById('brandFilter');
const cards = document.getElementById('cards');
const search = document.getElementById('search');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function formatPrice(v){
  return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v);
}

function populateBrands(){
  DATA.forEach(d=>{
    const opt=document.createElement('option');
    opt.value=d.brand;
    opt.textContent=d.brand;
    brandFilter.appendChild(opt);
  });
}

function render(filter='all', query=''){
  cards.innerHTML='';
  const q=query.toLowerCase();
  let list=[];
  DATA.forEach(group=>{
    if(filter!=='all' && group.brand!==filter) return;
    group.models.forEach(m=>{
      if(q && !m.name.toLowerCase().includes(q)) return;
      list.push({brand:group.brand,logo:group.logo,model:m});
    });
  });

  if(list.length===0){cards.innerHTML='<div class=\"card\">No models found.</div>';return;}

  list.forEach(item=>{
    const el=document.createElement('div');
    el.className='card';
    el.innerHTML=`
      <div><strong>${item.brand}</strong> — ${item.model.name}</div>
      <div class=\"price\">${formatPrice(item.model.price)}</div>
      <div class=\"specs\">
        Power: ${item.model.configs.power || '—'}<br>
        0-60: ${item.model.configs['0to60'] || '—'}<br>
        Top speed: ${item.model.configs.topSpeed || '—'}
      </div>
      <div class=\"actions\">
        <button class=\"btn\" data-brand=\"${item.brand}\" data-model=\"${item.model.name}\" data-action=\"view\">View configs</button>
      </div>
    `;
    cards.appendChild(el);
  });
}

cards.addEventListener('click', e=>{
  const btn=e.target.closest('button'); if(!btn) return;
  const brand=btn.dataset.brand; const modelName=btn.dataset.model;
  const group=DATA.find(g=>g.brand===brand);
  const model=group.models.find(m=>m.name===modelName);
  modalTitle.textContent=`${brand} ${model.name} — ${formatPrice(model.price)}`;
  modalBody.innerHTML='<ul>'+Object.entries(model.configs).map(([k,v])=>`<li><b>${k}:</b> ${v}</li>`).join('')+'</ul>';
  modal.setAttribute('aria-hidden','false');
});

modalClose.addEventListener('click',()=>modal.setAttribute('aria-hidden','true'));
modal.addEventListener('click',e=>{if(e.target===modal) modal.setAttribute('aria-hidden','true')});

populateBrands();
render();
brandFilter.addEventListener('change',()=>render(brandFilter.value,search.value));
search.addEventListener('input',()=>render(brandFilter.value,search.value));
