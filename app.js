/* Data: curated demo specs & prices (EUR). */
const CARS = [
  // McLaren
  { brand: "McLaren", model: "Artura", year: 2025, price: 245000, engine: "3.0L V6 TT Hybrid", power: 680, accel: 3.0, drive: "RWD", fuel: "Hybrid", body: "Coupe" },
  { brand: "McLaren", model: "720S", year: 2023, price: 280000, engine: "4.0L V8 TT", power: 720, accel: 2.9, drive: "RWD", fuel: "Petrol", body: "Coupe" },
  { brand: "McLaren", model: "765LT", year: 2022, price: 360000, engine: "4.0L V8 TT", power: 765, accel: 2.8, drive: "RWD", fuel: "Petrol", body: "Coupe" },
  { brand: "McLaren", model: "GT", year: 2024, price: 210000, engine: "4.0L V8 TT", power: 620, accel: 3.2, drive: "RWD", fuel: "Petrol", body: "Gran Turismo" },

  // Maserati
  { brand: "Maserati", model: "MC20", year: 2024, price: 240000, engine: "3.0L V6 TT", power: 621, accel: 2.9, drive: "RWD", fuel: "Petrol", body: "Coupe" },
  { brand: "Maserati", model: "Ghibli Trofeo", year: 2023, price: 140000, engine: "3.8L V8 TT", power: 572, accel: 4.3, drive: "RWD", fuel: "Petrol", body: "Sedan" },
  { brand: "Maserati", model: "Quattroporte Modena", year: 2024, price: 125000, engine: "3.0L V6 TT", power: 424, accel: 5.1, drive: "RWD", fuel: "Petrol", body: "Saloon" },
  { brand: "Maserati", model: "Levante Trofeo", year: 2023, price: 165000, engine: "3.8L V8 TT", power: 580, accel: 3.9, drive: "AWD", fuel: "Petrol", body: "SUV" },

  // Ferrari
  { brand: "Ferrari", model: "Roma", year: 2024, price: 210000, engine: "3.9L V8 TT", power: 612, accel: 3.4, drive: "RWD", fuel: "Petrol", body: "Coupe" },
  { brand: "Ferrari", model: "296 GTB", year: 2025, price: 310000, engine: "3.0L V6 TT Hybrid", power: 830, accel: 2.9, drive: "RWD", fuel: "Hybrid", body: "Coupe" },
  { brand: "Ferrari", model: "SF90 Stradale", year: 2024, price: 470000, engine: "4.0L V8 TT PHEV", power: 986, accel: 2.5, drive: "AWD", fuel: "Hybrid", body: "Coupe" },
  { brand: "Ferrari", model: "Purosangue", year: 2025, price: 410000, engine: "6.5L V12", power: 715, accel: 3.3, drive: "AWD", fuel: "Petrol", body: "SUV" },

  // BMW
  { brand: "BMW", model: "M3 Competition", year: 2024, price: 99000, engine: "3.0L I6 TT", power: 503, accel: 3.8, drive: "AWD", fuel: "Petrol", body: "Sedan" },
  { brand: "BMW", model: "M5", year: 2025, price: 145000, engine: "4.4L V8 TT Hybrid", power: 717, accel: 3.2, drive: "AWD", fuel: "Hybrid", body: "Sedan" },
  { brand: "BMW", model: "i7 M70", year: 2024, price: 165000, engine: "Dual-motor EV", power: 650, accel: 3.7, drive: "AWD", fuel: "Electric", body: "Saloon" },
  { brand: "BMW", model: "X5 M Competition", year: 2024, price: 140000, engine: "4.4L V8 TT", power: 617, accel: 3.9, drive: "AWD", fuel: "Petrol", body: "SUV" },

  // Lamborghini
  { brand: "Lamborghini", model: "Huracán Tecnica", year: 2023, price: 260000, engine: "5.2L V10 NA", power: 631, accel: 3.2, drive: "RWD", fuel: "Petrol", body: "Coupe" },
  { brand: "Lamborghini", model: "Revuelto", year: 2025, price: 520000, engine: "6.5L V12 PHEV", power: 1001, accel: 2.5, drive: "AWD", fuel: "Hybrid", body: "Coupe" },
  { brand: "Lamborghini", model: "Urus S", year: 2024, price: 250000, engine: "4.0L V8 TT", power: 657, accel: 3.3, drive: "AWD", fuel: "Petrol", body: "SUV" },

  // Maybach (Mercedes-Maybach)
  { brand: "Maybach", model: "S 680", year: 2025, price: 240000, engine: "6.0L V12", power: 621, accel: 4.4, drive: "AWD", fuel: "Petrol", body: "Saloon" },
  { brand: "Maybach", model: "GLS 600", year: 2025, price: 205000, engine: "4.0L V8 TT 48V", power: 550, accel: 4.9, drive: "AWD", fuel: "Hybrid", body: "SUV" },
];

const state = {
  brands: [...new Set(CARS.map(c => c.brand))],
  activeBrands: new Set(), // none = all
  query: "",
  minPrice: null,
  maxPrice: null,
  minHp: 0,
  drivetrain: "",
  fuel: "",
  bodies: new Set(),
  sort: "relevance"
};

/* DOM references */
const el = {
  cards: document.getElementById("cards"),
  empty: document.getElementById("emptyState"),
  count: document.getElementById("resultsCount"),
  brandChips: document.getElementById("brandChips"),
  activeFilters: document.getElementById("activeFilters"),
  search: document.getElementById("searchInput"),
  sort: document.getElementById("sortSelect"),
  minPrice: document.getElementById("minPrice"),
  maxPrice: document.getElementById("maxPrice"),
  minHp: document.getElementById("minHp"),
  minHpValue: document.getElementById("minHpValue"),
  drivetrain: document.getElementById("drivetrain"),
  fuel: document.getElementById("fuel"),
  filtersForm: document.getElementById("filtersForm"),
  resetBtn: document.getElementById("resetBtn"),
  clearAll: document.getElementById("clearAll"),
  toggleFilters: document.getElementById("toggleFilters"),
  filtersPanel: document.getElementById("filtersPanel"),
  dialog: document.getElementById("dialog"),
  dialogClose: document.getElementById("dialogClose"),
  dialogTitle: document.getElementById("dialogTitle"),
  dialogBody: document.getElementById("dialogBody"),
  cardTemplate: document.getElementById("cardTemplate")
};

/* Build brand chips */
function renderBrandChips(){
  el.brandChips.innerHTML = "";
  state.brands.forEach(b => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = b;
    chip.setAttribute("aria-pressed", "false");
    chip.addEventListener("click", () => {
      if(state.activeBrands.has(b)) state.activeBrands.delete(b);
      else state.activeBrands.add(b);
      chip.classList.toggle("active");
      chip.setAttribute("aria-pressed", chip.classList.contains("active") ? "true" : "false");
      update();
    });
    el.brandChips.appendChild(chip);
  });
}

/* Filtering & sorting */
function matchesFilters(car){
  if(state.activeBrands.size && !state.activeBrands.has(car.brand)) return false;
  if(state.minPrice !== null && car.price < state.minPrice) return false;
  if(state.maxPrice !== null && car.price > state.maxPrice) return false;
  if(state.minHp && car.power < state.minHp) return false;
  if(state.drivetrain && car.drive !== state.drivetrain) return false;
  if(state.fuel && car.fuel !== state.fuel) return false;
  if(state.bodies.size && !state.bodies.has(car.body)) return false;

  if(state.query){
    const q = state.query.toLowerCase();
    const hay = `${car.brand} ${car.model} ${car.engine} ${car.body} ${car.fuel}`.toLowerCase();
    if(!hay.includes(q)) return false;
  }
  return true;
}

function sortCars(cars){
  switch(state.sort){
    case "price-asc": return cars.sort((a,b)=> a.price-b.price);
    case "price-desc": return cars.sort((a,b)=> b.price-a.price);
    case "power-desc": return cars.sort((a,b)=> b.power-a.power);
    case "accel-asc": return cars.sort((a,b)=> a.accel-b.accel);
    case "year-desc": return cars.sort((a,b)=> b.year-a.year);
    default: return cars; // relevance = leave order as data-defined
  }
}

/* Render cards */
function renderCards(list){
  el.cards.innerHTML = "";
  const fragment = document.createDocumentFragment();

  list.forEach(car => {
    const node = el.cardTemplate.content.cloneNode(true);
    node.querySelector(".brand-badge").textContent = car.brand;
    node.querySelector(".year-pill").textContent = car.year;
    node.querySelector(".model").textContent = car.model;
    node.querySelector(".price").textContent = `€ ${car.price.toLocaleString()}`;
    node.querySelector(".engine").textContent = car.engine;
    node.querySelector(".power").textContent = car.power.toString();
    node.querySelector(".accel").textContent = car.accel.toFixed(1);
    node.querySelector(".drive").textContent = car.drive;
    node.querySelector(".fuel").textContent = car.fuel;
    node.querySelector(".body").textContent = car.body;

    node.querySelector(".details-btn").addEventListener("click", () => openDialog(car));

    fragment.appendChild(node);
  });

  el.cards.appendChild(fragment);
  el.count.textContent = `${list.length} car${list.length!==1?'s':''}`;
  el.empty.classList.toggle("hidden", list.length !== 0);
}

function openDialog(car){
  el.dialogTitle.textContent = `${car.brand} ${car.model} (${car.year})`;
  el.dialogBody.innerHTML = `
    <div class="spec-grid">
      <p><strong>Price:</strong> € ${car.price.toLocaleString()}</p>
      <p><strong>Engine:</strong> ${car.engine}</p>
      <p><strong>Power:</strong> ${car.power} hp</p>
      <p><strong>0–100 km/h:</strong> ${car.accel.toFixed(1)} s</p>
      <p><strong>Drivetrain:</strong> ${car.drive}</p>
      <p><strong>Fuel type:</strong> ${car.fuel}</p>
      <p><strong>Body:</strong> ${car.body}</p>
      <p><em>Note:</em> Specs/prices are demo values.</p>
    </div>
  `;
  el.dialog.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeDialog(){
  el.dialog.classList.add("hidden");
  document.body.style.overflow = "";
}

/* Active filter pills */
function renderActivePills(){
  el.activeFilters.innerHTML = "";
  const pills = [];

  if(state.activeBrands.size){
    pills.push({ key: "brand", label: [...state.activeBrands].join(", ") });
  }
  if(state.minPrice !== null || state.maxPrice !== null){
    const a = state.minPrice !== null ? `€${state.minPrice.toLocaleString()}` : "€0";
    const b = state.maxPrice !== null ? `€${state.maxPrice.toLocaleString()}` : "∞";
    pills.push({ key: "price", label: `${a} – ${b}` });
  }
  if(state.minHp){
    pills.push({ key: "hp", label: `${state.minHp}+ hp` });
  }
  if(state.drivetrain){
    pills.push({ key: "drive", label: state.drivetrain });
  }
  if(state.fuel){
    pills.push({ key: "fuel", label: state.fuel });
  }
  if(state.bodies.size){
    pills.push({ key: "body", label: [...state.bodies].join(", ") });
  }
  if(state.query){
    pills.push({ key: "q", label: `“${state.query}”` });
  }

  pills.forEach(p => {
    const div = document.createElement("span");
    div.className = "pill";
    div.innerHTML = `${p.label} <button title="Remove filter">×</button>`;
    div.querySelector("button").addEventListener("click", () => {
      switch(p.key){
        case "brand": state.activeBrands.clear(); document.querySelectorAll("#brandChips .chip.active").forEach(c=>c.classList.remove("active")); break;
        case "price": state.minPrice = null; state.maxPrice = null; el.minPrice.value = ""; el.maxPrice.value = ""; break;
        case "hp": state.minHp = 0; el.minHp.value = 0; el.minHpValue.textContent = "0"; break;
        case "drive": state.drivetrain = ""; el.drivetrain.value = ""; break;
        case "fuel": state.fuel = ""; el.fuel.value = ""; break;
        case "body": state.bodies.clear(); document.querySelectorAll("input[name='body']").forEach(cb => cb.checked = false); break;
        case "q": state.query = ""; el.search.value = ""; break;
      }
      update();
    });
    el.activeFilters.appendChild(div);
  });
}

/* Main update cycle */
function update(){
  const filtered = CARS.filter(matchesFilters);
  const sorted = sortCars(filtered);
  renderCards(sorted);
  renderActivePills();
}

/* Events */
el.search.addEventListener("input", (e) => {
  state.query = e.target.value.trim();
  update();
});
el.sort.addEventListener("change", (e) => {
  state.sort = e.target.value;
  update();
});
el.minHp.addEventListener("input", (e) => {
  state.minHp = Number(e.target.value || 0);
  el.minHpValue.textContent = state.minHp.toString();
});
el.filtersForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.minPrice = el.minPrice.value ? Number(el.minPrice.value) : null;
  state.maxPrice = el.maxPrice.value ? Number(el.maxPrice.value) : null;
  state.drivetrain = el.drivetrain.value;
  state.fuel = el.fuel.value;
  state.bodies = new Set([...document.querySelectorAll("input[name='body']:checked")].map(cb => cb.value));
  update();
});
el.resetBtn.addEventListener("click", () => resetFilters());
el.clearAll.addEventListener("click", () => resetFilters());

function resetFilters(){
  // state reset
  state.activeBrands.clear();
  state.query = "";
  state.minPrice = null;
  state.maxPrice = null;
  state.minHp = 0;
  state.drivetrain = "";
  state.fuel = "";
  state.bodies.clear();
  state.sort = "relevance";

  // UI reset
  el.search.value = "";
  el.sort.value = "relevance";
  el.minPrice.value = "";
  el.maxPrice.value = "";
  el.minHp.value = 0;
  el.minHpValue.textContent = "0";
  el.drivetrain.value = "";
  el.fuel.value = "";
  document.querySelectorAll("#brandChips .chip.active").forEach(c=>c.classList.remove("active"));
  document.querySelectorAll("input[name='body']").forEach(cb => cb.checked = false);

  update();
}

/* Mobile filter toggle */
el.toggleFilters.addEventListener("click", () => {
  const open = el.filtersPanel.classList.toggle("open");
  el.toggleFilters.setAttribute("aria-expanded", open ? "true" : "false");
  if(open) el.filtersPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* Dialog events */
el.dialog.addEventListener("click", (e) => { if(e.target === el.dialog) closeDialog(); });
el.dialogClose.addEventListener("click", closeDialog);
document.addEventListener("keydown", (e) => { if(e.key === "Escape" && !el.dialog.classList.contains("hidden")) closeDialog(); });

/* Init */
renderBrandChips();
update();
