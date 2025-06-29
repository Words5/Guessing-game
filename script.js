// بيانات الموضوعات
const topics = {
  fruits:['🍎','🍌','🍇','🍒','🍉','🍍','🥭','🍐'],
  planets:['🪐','🌍','🌕','☀️','🌑','🌏','🛰️'],
  food:['🍕','🍟','🍔','🍣','🍜','🍩','🥗'],
  flags:['🚩','🏳️‍🌈','🇺🇸','🇫🇷','🇯🇵','🇩🇪','🇧🇷']
};

// صفحة index.html
if (document.getElementById('wordsInput')) {
  let chosenTopic = null;
  const area = document.getElementById('wordsInput');
  const btns = document.querySelectorAll('.topic-btn');
  const start = document.getElementById('startBtn');

  btns.forEach(b=>{
    b.onclick = ()=>{
      btns.forEach(x=>x.classList.remove('selected'));
      b.classList.add('selected');
      chosenTopic = b.dataset.topic;
      checkReady();
    }
  });
  area.oninput = checkReady;
  function checkReady(){
    start.disabled = !(area.value.trim() && chosenTopic);
  }
  start.onclick = ()=>{
    const words = area.value.trim().split('\n').map(w=>w.trim()).filter(Boolean);
    sessionStorage.setItem('words', JSON.stringify(words));
    sessionStorage.setItem('topic', chosenTopic);
    window.location = 'game.html';
  }
}

// صفحة game.html
if (document.getElementById('itemsGrid')) {
  const words = JSON.parse(sessionStorage.getItem('words') || '[]');
  const topic = sessionStorage.getItem('topic');
  const grid = document.getElementById('itemsGrid');
  const status = document.getElementById('statusText');
  const restart = document.getElementById('restartBtn');

  grid.innerHTML = '';
  let remaining = [...words];
  const emojis = topics[topic];
  for (let i=0; i<remaining.length; i++) {
    const emo = emojis[i % emojis.length];
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = emo;
    div.onclick = ()=>{
      const idx = Math.floor(Math.random() * remaining.length);
      const name = remaining.splice(idx,1)[0];
      div.textContent = name;
      div.style.opacity = '0';
      if (remaining.length===0) {
        status.textContent = `🎉 الفائز: ${name}`;
        restart.style.display = 'inline-block';
      }
    }
    grid.appendChild(div);
  }

  restart.onclick = ()=>window.location = 'index.html';
}