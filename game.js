import { SPRITES } from './sprites.js';
import { WORLD, BASKET, STATIONS, movePlayer, nearestStation } from './game-physics.js';

export function setupHarvestGame({ fruits, onCollect, getCount, canOpen }) {
  const dialog = document.createElement('dialog');
  dialog.className = 'harvest-game';
  dialog.tabIndex = -1;
  dialog.setAttribute('aria-labelledby', 'gameTitle');
  dialog.innerHTML = `
    <header class="game-header"><div><span class="eyebrow">GARDEN PICNIC · PLAY MODE</span><h2 id="gameTitle">เดินเล่น เก็บผลไม้ไทย</h2></div><button class="game-close" aria-label="ออกจากเกม">กลับร้าน ✕</button></header>
    <div class="game-hud"><span id="gameHint" role="status">เดินเข้าใกล้ผลไม้ แล้วกดเก็บ</span><span id="gameCount"></span></div>
    <div class="game-viewport"><div class="game-world" aria-label="สวนผลไม้ไทย">
      <div class="game-rug"></div>
      ${STATIONS.map((s, i) => `<div class="game-station" data-station="${i}" style="left:${s.x}px;top:${s.y}px" aria-label="${fruits[i].name}"><span>${fruits[i].icon}</span><small>${fruits[i].name}</small></div>`).join('')}
      <div class="game-basket" style="left:${BASKET.x}px;top:${BASKET.y}px">${SPRITES.basket}</div>
      <div class="game-player">${SPRITES.shopkeeper.idle}</div>
    </div></div>
    <div class="game-controls">
      <div class="joystick-side"><div class="game-joystick" aria-label="จอยเดินทุกทิศทาง" role="group"><span class="joy-arrows" aria-hidden="true">↟</span><span class="joy-knob"></span></div><span>ลากจอยเพื่อเดิน</span></div>
      <div class="harvest-side"><button id="harvestAction" disabled>เข้าใกล้ผลไม้</button><span>คอมพิวเตอร์: ลูกศร / WASD · Space เก็บ</span></div>
    </div>`;
  document.body.append(dialog);
  const viewport = dialog.querySelector('.game-viewport');
  const world = dialog.querySelector('.game-world');
  const actor = dialog.querySelector('.game-player');
  const hint = dialog.querySelector('#gameHint');
  const count = dialog.querySelector('#gameCount');
  const action = dialog.querySelector('#harvestAction');
  const joystick = dialog.querySelector('.game-joystick');
  const knob = dialog.querySelector('.joy-knob');
  const stations = [...dialog.querySelectorAll('.game-station')];
  const keys = new Set();
  let player = { x: 360, y: 205 };
  let stick = { x: 0, y: 0 };
  let pointer = null;
  let raf = 0;
  let previous = 0;
  let lastFrame = '';
  let target = null;
  let cooldown = 0;
  let returnFocus;
  let oldOverflow;
  let messageUntil = 0;

  function resize() {
    const scale = Math.min(viewport.clientWidth / WORLD.width, viewport.clientHeight / WORLD.height);
    world.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
  new ResizeObserver(resize).observe(viewport);

  function clearInput() {
    keys.clear();
    const captured = pointer;
    pointer = null;
    if (captured !== null && joystick.hasPointerCapture(captured)) joystick.releasePointerCapture(captured);
    stick = { x: 0, y: 0 };
    knob.style.transform = 'translate(-50%, -50%)';
  }

  function harvest() {
    const now = performance.now();
    target = nearestStation(player);
    if (!dialog.open || !target || now < cooldown) return;
    cooldown = now + 550;
    const fruit = fruits[target.index];
    onCollect(fruit);
    count.textContent = `ตะกร้า ${getCount()} ชิ้น`;
    hint.textContent = `✓ เก็บ${fruit.name}ลงตะกร้าแล้ว`;
    messageUntil = now + 1300;
    const station = stations[target.index];
    station.classList.remove('just-picked');
    void station.offsetWidth;
    station.classList.add('just-picked');
  }

  function tick(now) {
    if (!dialog.open) return;
    const dt = previous ? (now - previous) / 1000 : 0;
    previous = now;
    const keyX = Number(keys.has('ArrowRight') || keys.has('d')) - Number(keys.has('ArrowLeft') || keys.has('a'));
    const keyY = Number(keys.has('ArrowDown') || keys.has('s')) - Number(keys.has('ArrowUp') || keys.has('w'));
    const direction = pointer === null ? { x: keyX, y: keyY } : stick;
    const next = movePlayer(player, direction, dt);
    const moving = next.x !== player.x || next.y !== player.y;
    player = next;
    actor.style.left = player.x + 'px';
    actor.style.top = player.y + 'px';
    const frame = moving ? (Math.floor(now / 140) % 2 ? 'walk1' : 'walk2') : 'idle';
    if (frame !== lastFrame) { actor.innerHTML = SPRITES.shopkeeper[frame]; lastFrame = frame; }
    target = nearestStation(player);
    stations.forEach((station, i) => station.classList.toggle('in-reach', target?.index === i));
    action.disabled = !target || now < cooldown;
    action.textContent = target ? `เก็บ${fruits[target.index].name}` : 'เข้าใกล้ผลไม้เพื่อเก็บ';
    if (now > messageUntil) hint.textContent = target ? `ใกล้${fruits[target.index].name}แล้ว · กดเก็บได้เลย` : 'เดินเข้าใกล้ผลไม้ แล้วกดเก็บ';
    raf = requestAnimationFrame(tick);
  }

  function open(trigger) {
    if (dialog.open) return;
    if (!canOpen()) return;
    returnFocus = trigger;
    oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    player = { x: 360, y: 205 };
    previous = 0;
    cooldown = 0;
    messageUntil = 0;
    clearInput();
    count.textContent = `ตะกร้า ${getCount()} ชิ้น`;
    resize();
    raf = requestAnimationFrame(tick);
    dialog.focus();
  }
  dialog.addEventListener('close', () => {
    cancelAnimationFrame(raf);
    clearInput();
    document.body.style.overflow = oldOverflow;
    returnFocus?.focus({ preventScroll: true });
  });
  dialog.querySelector('.game-close').addEventListener('click', () => dialog.close());
  action.addEventListener('click', harvest);

  const moveKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'];
  dialog.addEventListener('keydown', event => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (moveKeys.includes(key)) { event.preventDefault(); keys.add(key); }
    if (event.code === 'Space' && event.target !== dialog.querySelector('.game-close')) {
      event.preventDefault();
      if (!event.repeat) harvest();
    }
  });
  dialog.addEventListener('keyup', event => keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key));
  window.addEventListener('blur', clearInput);
  document.addEventListener('visibilitychange', () => { clearInput(); previous = 0; });

  function updateStick(event) {
    const box = joystick.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    const length = Math.hypot(x, y);
    const radius = box.width * 0.3;
    const strength = Math.min(length / radius, 1);
    stick = length < 7 ? { x: 0, y: 0 } : { x: x / length * strength, y: y / length * strength };
    knob.style.transform = `translate(calc(-50% + ${stick.x * radius}px), calc(-50% + ${stick.y * radius}px))`;
  }
  joystick.addEventListener('pointerdown', event => {
    if (pointer !== null) return;
    event.preventDefault();
    pointer = event.pointerId;
    joystick.setPointerCapture(pointer);
    updateStick(event);
  });
  joystick.addEventListener('pointermove', event => { if (event.pointerId === pointer) updateStick(event); });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    joystick.addEventListener(type, event => { if (event.pointerId === pointer) clearInput(); });
  }
  document.getElementById('enterGame').addEventListener('click', event => open(event.currentTarget));
  document.getElementById('shopRoom').addEventListener('click', event => {
    if (!event.target.closest('button')) open(document.getElementById('enterGame'));
  });
  return { open };
}
