// MyOS Sticky Notes — colored note cards saved to localStorage.
const KEY = 'myos.notes';
const board = document.getElementById('nt-board');
const COLORS = ['#ffe08a', '#b6e3a7', '#a7d8e3', '#e3a7d0', '#f3b7a1'];

if (board) {
  let notes = [];
  try { notes = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
  if (!notes.length) notes = [{ text: '', color: COLORS[0] }];
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch (e) {} };

  function render() {
    board.replaceChildren();
    notes.forEach((note, i) => {
      const card = document.createElement('div');
      card.className = 'nt-card';
      card.style.background = note.color;

      const ta = document.createElement('textarea');
      ta.value = note.text; ta.placeholder = 'Write a note…';
      ta.addEventListener('input', () => { notes[i].text = ta.value; save(); });

      const bar = document.createElement('div'); bar.className = 'nt-bar';
      COLORS.forEach((c) => {
        const sw = document.createElement('span'); sw.className = 'nt-swatch'; sw.style.background = c;
        sw.addEventListener('click', () => { notes[i].color = c; save(); render(); });
        bar.appendChild(sw);
      });
      const del = document.createElement('button'); del.className = 'nt-del'; del.textContent = '🗑';
      del.addEventListener('click', () => { notes.splice(i, 1); save(); render(); });
      bar.appendChild(del);

      card.append(ta, bar);
      board.appendChild(card);
    });
  }

  document.getElementById('nt-add').addEventListener('click', () => {
    notes.push({ text: '', color: COLORS[notes.length % COLORS.length] }); save(); render();
  });
  render();
}
