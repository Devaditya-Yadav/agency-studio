const swatches = [
  { name: 'Alabaster Veil (60%)', hex: '#FAF8F4', fg: '#2A2820', desc: 'Lienzo principal luminoso (--bg-canvas)' },
  { name: 'Porcelain Linen (60%)', hex: '#F2EFE9', fg: '#2A2820', desc: 'Tarjetas elevadas y secciones suaves (--bg-surface)' },
  { name: 'Oat Silk (60%)', hex: '#DEDAD0', fg: '#555132', desc: 'Bloques editoriales y citas (--bg-editorial)' },
  { name: 'Olive Essence (30%)', hex: '#8B8563', fg: '#FAF8F4', desc: 'Verde oliva identitario y emblema LD.' },
  { name: 'Botanical Sage (30%)', hex: '#AEB291', fg: '#2A2820', desc: 'Acento botánico suave y modo nocturno' },
  { name: 'Deep Olive Moss (30%)', hex: '#555132', fg: '#FAF8F4', desc: 'Titulares serif AAA (7.59:1) y botón marca' },
  { name: 'Espresso Umber (30%)', hex: '#2A2820', fg: '#FAF8F4', desc: 'Texto corrido cálido AAA (13.91:1)' },
  { name: 'Conscious Terracotta (10%)', hex: '#B65028', fg: '#FAF8F4', desc: 'CTA de conversión cálido (4.75:1 AA)' }
];

const container = document.getElementById('portalSwatches');
if (container) {
  swatches.forEach((item) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'swatch-card';
    card.setAttribute('aria-label', `Copy ${item.name} ${item.hex}`);

    const colorBox = document.createElement('div');
    colorBox.className = 'swatch-color';
    colorBox.style.background = item.hex;
    colorBox.style.color = item.fg;

    const hint = document.createElement('span');
    hint.textContent = 'CLICK TO COPY';

    const hexCode = document.createElement('strong');
    hexCode.textContent = item.hex;

    colorBox.append(hint, hexCode);

    const meta = document.createElement('div');
    meta.className = 'swatch-meta';

    const title = document.createElement('div');
    title.className = 'swatch-name';
    title.textContent = item.name;

    const desc = document.createElement('div');
    desc.className = 'swatch-desc';
    desc.textContent = item.desc;

    meta.append(title, desc);
    card.append(colorBox, meta);

    card.addEventListener('click', () => {
      navigator.clipboard?.writeText(item.hex).then(() => {
        hint.textContent = 'COPIED';
        window.setTimeout(() => {
          hint.textContent = 'CLICK TO COPY';
        }, 1200);
      });
    });

    container.appendChild(card);
  });
}

const modeBtn = document.getElementById('modeBtn');
if (modeBtn) {
  modeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    modeBtn.textContent = next === 'dark' ? 'Sunlit Atelier Mode' : 'Evening Studio Mode';
  });
}
