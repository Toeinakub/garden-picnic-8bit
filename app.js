import { SPRITES } from './sprites.js';
import { retroAudio } from './audio.js';
import { setupHarvestGame } from './game.js';

// Thai fruit selection; both shelves get six items, with no covered bottom row.
const FRUITS = [
  ['mango', 'มะม่วงน้ำดอกไม้'],
  ['mangosteen', 'มังคุด'],
  ['rambutan', 'เงาะโรงเรียน'],
  ['durian', 'ทุเรียนหมอนทอง'],
  ['pineapple', 'สับปะรด'],
  ['banana', 'กล้วยหอมทอง'],
  ['coconut', 'มะพร้าวน้ำหอม'],
  ['longan', 'ลำไย'],
  ['lychee', 'ลิ้นจี่'],
  ['watermelon', 'แตงโม'],
  ['guava', 'ฝรั่งกิมจู'],
  ['orange', 'ส้มสายน้ำผึ้ง']
].map(([id, name]) => ({
  id, name, targetSouvenir: 'freshFruits',
  souvenirTitle: name, tag: 'ผลไม้ไทย', icon: SPRITES.fruits[id]
}));

const SHORT_NAMES = {
  mango: 'มะม่วง', mangosteen: 'มังคุด', rambutan: 'เงาะ', durian: 'ทุเรียน',
  pineapple: 'สับปะรด', banana: 'กล้วย', coconut: 'มะพร้าว', longan: 'ลำไย',
  lychee: 'ลิ้นจี่', watermelon: 'แตงโม', guava: 'ฝรั่ง', orange: 'ส้ม'
};

const HOME_POS = { x: 50, y: 27 };

// Resolve positions from the current layout so walking still lines up on phones.
function roomPosition(element) {
  const room = el.shopRoom.getBoundingClientRect();
  const box = element.getBoundingClientRect();
  return {
    x: ((box.left + box.width / 2 - room.left) / room.width) * 100,
    y: ((box.top + box.height / 2 - room.top) / room.height) * 100
  };
}

// App State
const state = {
  basketItems: [], // array of picked fruit items
  isShopkeeperBusy: false,
  isMuted: false,
  totalPrice: 1290,
  orderData: {
    name: 'คุณธีรภัทร ชาญวิริยะ (วตท. 32)',
    phone: '089-123-4567'
  }
};

// DOM Cache
const el = {
  dialogueText: document.getElementById('dialogueText'),
  dialoguePortrait: document.getElementById('dialoguePortrait'),
  muteBtn: document.getElementById('muteBtn'),
  resetBtn: document.getElementById('resetBtn'),

  // Shop Elements
  shopRoom: document.getElementById('shopRoom'),
  shopkeeperActor: document.getElementById('shopkeeperActor'),
  carriedItemBubble: document.getElementById('carriedItemBubble'),
  counterBasketIcon: document.getElementById('counterBasketIcon'),
  basketCountBadge: document.getElementById('basketCountBadge'),

  // Crates container
  shelfLeftCrates: document.getElementById('shelfLeftCrates'),
  shelfRightCrates: document.getElementById('shelfRightCrates'),
  quickFruitChips: document.getElementById('quickFruitChips'),

  // Basket Tray
  basketItemsGrid: document.getElementById('basketItemsGrid'),
  trayBadge: document.getElementById('trayBadge'),
  btnOrderAction: document.getElementById('btnOrderAction'),

  // Modals
  checkoutModal: document.getElementById('checkoutModal'),
  qrModal: document.getElementById('qrModal'),
  ticketModal: document.getElementById('ticketModal'),

  // Modal QR & Buttons
  qrBox: document.getElementById('qrBox'),
  ticketQrBox: document.getElementById('ticketQrBox'),
  btnCloseCheckout: document.getElementById('btnCloseCheckout'),
  btnGoToQR: document.getElementById('btnGoToQR'),
  btnCloseQR: document.getElementById('btnCloseQR'),
  btnPaidConfirm: document.getElementById('btnPaidConfirm'),
  btnCloseTicket: document.getElementById('btnCloseTicket'),
  btnSaveTicket: document.getElementById('btnSaveTicket')
};

// Setup Shopkeeper Position
function setActorPos(xPercent, yPercent) {
  el.shopkeeperActor.style.left = `calc(${xPercent}% - 19px)`;
  el.shopkeeperActor.style.top = `calc(${yPercent}% - 25px)`;
}

// Animate Shopkeeper Walking
let walkInterval = null;
function startWalkAnimation() {
  let frame = 0;
  walkInterval = setInterval(() => {
    frame = (frame + 1) % 2;
    document.getElementById('actorSprite').innerHTML = frame === 0 ? SPRITES.shopkeeper.walk1 : SPRITES.shopkeeper.walk2;
  }, 140);
}

function stopWalkAnimation() {
  if (walkInterval) {
    clearInterval(walkInterval);
    walkInterval = null;
  }
}

// Speak in Dialogue Box
function speak(text) {
  el.dialogueText.innerHTML = text;
}

// Initialize Shelves and Crates
function renderShopCrates() {
  el.dialoguePortrait.innerHTML = SPRITES.shopkeeper.idle;
  el.counterBasketIcon.innerHTML = SPRITES.basket;
  el.qrBox.innerHTML = SPRITES.qrCode;
  el.ticketQrBox.innerHTML = SPRITES.qrCode;

  [el.shelfLeftCrates, el.shelfRightCrates].forEach((shelf, side) => {
    shelf.innerHTML = '';
    FRUITS.slice(side * 6, side * 6 + 6).forEach(fruit => {
      const crate = document.createElement('button');
      crate.type = 'button';
      crate.setAttribute('aria-label', 'เลือก ' + fruit.name);
      crate.className = 'fruit-crate';
      crate.id = `crate-${fruit.id}`;
      crate.innerHTML = `<span class="crate-icon">${fruit.icon}</span><span class="crate-name">${SHORT_NAMES[fruit.id]}</span>`;
      crate.addEventListener('click', () => onFruitSelected(fruit));
      shelf.appendChild(crate);
    });
  });

  // Quick Chips Bar
  el.quickFruitChips.innerHTML = '';
  FRUITS.forEach(fruit => {
    const chip = document.createElement('button');
    chip.className = 'fruit-chip';
    chip.dataset.fruit = fruit.id;
    chip.setAttribute('aria-pressed', 'false');
    chip.title = fruit.souvenirTitle;
    chip.innerHTML = `
      <span class="fruit-chip-icon">${fruit.icon}</span>
      <span>${fruit.name}</span>
    `;
    chip.addEventListener('click', () => onFruitSelected(fruit));
    el.quickFruitChips.appendChild(chip);
  });
}

// Sparkle Effect at Coordinates
function createSparkle(xPercent, yPercent) {
  const spark = document.createElement('div');
  spark.className = 'sparkle-pop';
  spark.innerHTML = SPRITES.sparkle;
  spark.style.left = `calc(${xPercent}% - 20px)`;
  spark.style.top = `calc(${yPercent}% - 20px)`;
  el.shopRoom.appendChild(spark);
  setTimeout(() => spark.remove(), 600);
}

// Shopkeeper Movement & Picking Sequence
function onFruitSelected(fruit) {
  if (state.isShopkeeperBusy) return;
  state.isShopkeeperBusy = true;
  el.resetBtn.disabled = true;
  document.getElementById('enterGame').disabled = true;
  document.querySelectorAll('.fruit-chip, .fruit-crate').forEach(c => { c.disabled = true; });

  // Highlight selected crate
  document.querySelectorAll('.fruit-crate').forEach(c => c.classList.remove('selected'));
  const crateEl = document.getElementById(`crate-${fruit.id}`);
  if (crateEl) crateEl.classList.add('selected');
  const fruitPos = roomPosition(crateEl);
  // Stand on the aisle side of the shelf rather than underneath its fruit.
  const shelfPos = roomPosition(crateEl.closest('.shop-shelf'));
  const aisleX = shelfPos.x < 50 ? 38 : 62;
  const basketPos = roomPosition(el.counterBasketIcon);
  const dropPos = { x: basketPos.x, y: basketPos.y - 13 };

  retroAudio.playClick();
  speak(`"รับ <b>${fruit.name}</b> นะครับ! รอสักครู่ เดี๋ยวผมเดินไปหยิบจากชั้นวางให้ครับ"`);

  // Step 1: Walk from the central aisle to the selected fruit
  startWalkAnimation();
  setActorPos(aisleX, fruitPos.y);

  // Time taken to walk to shelf (450ms)
  setTimeout(() => {
    stopWalkAnimation();

    // Step 2: Pick item up above head (Carry state)
    document.getElementById('actorSprite').innerHTML = SPRITES.shopkeeper.carry;
    el.carriedItemBubble.innerHTML = fruit.icon;
    el.carriedItemBubble.style.display = 'block';
    retroAudio.playHarvest();
    createSparkle(fruitPos.x, fruitPos.y);
    speak(`"หยิบ <b>${fruit.name}</b> แล้ว! กำลังนำไปใส่ตะกร้าปิกนิกกลางร้านครับ"`);

    // Step 3: Return to the basket at the center of the room
    setTimeout(() => {
      startWalkAnimation();
      setActorPos(dropPos.x, dropPos.y);

      // Time taken to walk to basket (450ms)
      setTimeout(() => {
        stopWalkAnimation();

        // Step 4: Place the fruit in the basket
        el.carriedItemBubble.style.display = 'none';
        document.getElementById('actorSprite').innerHTML = SPRITES.shopkeeper.idle;
        retroAudio.playDrop();

        setTimeout(() => {
          retroAudio.playTransform();
          createSparkle(basketPos.x, basketPos.y);

          // Add to basket state
          state.basketItems.push(fruit);
          updateBasketUI();

          speak(`"เรียบร้อยครับ! <b>${fruit.name}</b> จัดลงตะกร้ากลางร้านแล้ว เลือกผลไม้ไทยเพิ่มได้เลยครับ!"`);

          // Return to the open aisle above the basket
          setTimeout(() => {
            setActorPos(HOME_POS.x, HOME_POS.y);
            state.isShopkeeperBusy = false;
            el.resetBtn.disabled = false;
            document.getElementById('enterGame').disabled = false;
            document.querySelectorAll('.fruit-chip, .fruit-crate').forEach(c => { c.disabled = false; });
          }, 300);
        }, 150);

      }, 450);
    }, 400);

  }, 450);
}

// Update Basket Inventory Display
function updateBasketUI() {
  const count = state.basketItems.length;
  document.querySelectorAll('.fruit-chip').forEach(chip => {
    const selected = state.basketItems.some(item => item.id === chip.dataset.fruit);
    chip.classList.toggle('selected', selected);
    chip.setAttribute('aria-pressed', String(selected));
  });
  el.basketCountBadge.innerText = `${count} ชิ้น`;
  el.trayBadge.innerText = `${count} รายการในตะกร้า`;

  if (count === 0) {
    el.basketItemsGrid.innerHTML = `
      <div class="basket-item-row empty">
        <div class="item-row-icon">${SPRITES.basket}</div>
        <div class="item-row-info">
          <div class="item-row-name">ตะกร้าปิกนิกยังว่างอยู่</div>
          <div class="item-row-from">เลือกผลไม้ที่ชอบ แล้วให้พี่คนสวน<br>จัดผลไม้ไทยลงตะกร้าให้คุณ</div>
        </div>
      </div>
    `;
    el.btnOrderAction.setAttribute('disabled', 'true');
    el.btnOrderAction.innerHTML = `เลือกผลไม้เพื่อเริ่มจัดตะกร้า`;
    return;
  }

  // Populate rows
  el.basketItemsGrid.innerHTML = '';
  state.basketItems.forEach((item, index) => {
    // Get appropriate souvenir icon
    let sIcon = SPRITES.basket;
    if (item.targetSouvenir === 'toteBag') sIcon = SPRITES.toteBag;
    else if (item.targetSouvenir === 'picnicMat') sIcon = SPRITES.picnicMat;
    else if (item.targetSouvenir === 'tumbler') sIcon = SPRITES.tumbler;
    else if (item.targetSouvenir === 'sprayBottle') sIcon = SPRITES.sprayBottle;
    else sIcon = item.icon;

    const row = document.createElement('div');
    row.className = 'basket-item-row';
    row.innerHTML = `
      <div class="item-row-icon">${sIcon}</div>
      <div class="item-row-info">
        <span class="item-row-tag">${item.tag}</span>
        <div class="item-row-name">${item.souvenirTitle}</div>
        <div class="item-row-from">คัดจากสวน · จัดลงตะกร้าปิกนิก</div>
      </div>
      <button class="btn-pixel-icon" style="width:24px;height:24px;font-size:10px;" aria-label="นำ ${item.souvenirTitle} ออกจากตะกร้า" data-remove="${index}">✕</button>
    `;

    row.querySelector('[data-remove]').addEventListener('click', (e) => {
      e.stopPropagation();
      state.basketItems.splice(index, 1);
      retroAudio.playClick();
      updateBasketUI();
    });

    el.basketItemsGrid.appendChild(row);
  });

  // Enable Checkout Button
  el.btnOrderAction.removeAttribute('disabled');
  el.btnOrderAction.innerHTML = `สั่งจองตะกร้านี้ · ${count} ชิ้น →`;
}

// Reset Basket
function resetBasket() {
  if (state.isShopkeeperBusy) return;
  document.querySelectorAll('.fruit-crate').forEach(c => c.classList.remove('selected'));
  state.basketItems = [];
  setActorPos(HOME_POS.x, HOME_POS.y);
  el.carriedItemBubble.style.display = 'none';
  document.getElementById('actorSprite').innerHTML = SPRITES.shopkeeper.idle;
  speak(`"ยินดีต้อนรับสู่ร้านค้าปิกนิกครับ! แตะเลือกผลไม้บนชั้นวางได้เลย เดี๋ยวผมเดินไปหยิบมาใส่ตะกร้าให้ครับ"`);
  updateBasketUI();
  retroAudio.playClick();
}

// Event Listeners for UI & Modals
el.muteBtn.addEventListener('click', () => {
  const isMuted = retroAudio.toggleMute();
  el.muteBtn.innerText = isMuted ? '🔇' : '🔊';
  el.muteBtn.setAttribute('aria-pressed', String(isMuted));
});

el.resetBtn.addEventListener('click', resetBasket);

el.btnOrderAction.addEventListener('click', () => {
  if (state.basketItems.length === 0) return;
  retroAudio.playClick();
  el.checkoutModal.classList.add('active');
});

el.btnCloseCheckout.addEventListener('click', () => {
  retroAudio.playClick();
  el.checkoutModal.classList.remove('active');
});

el.btnGoToQR.addEventListener('click', () => {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  if (name) state.orderData.name = name;
  if (phone) state.orderData.phone = phone;

  retroAudio.playClick();
  el.checkoutModal.classList.remove('active');
  el.qrModal.classList.add('active');
});

el.btnCloseQR.addEventListener('click', () => {
  retroAudio.playClick();
  el.qrModal.classList.remove('active');
});

el.btnPaidConfirm.addEventListener('click', () => {
  retroAudio.playFanfare();
  el.qrModal.classList.remove('active');

  // Fill ticket data
  document.getElementById('ticketHolderName').innerText = state.orderData.name;
  document.getElementById('ticketHolderPhone').innerText = state.orderData.phone;
  
  const itemsSummary = state.basketItems.map(i => i.souvenirTitle).join(', ');
  document.getElementById('ticketItemsSummary').innerText = itemsSummary || 'CMA Picnic Set';

  const randCode = 'CMA-GPN-' + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('ticketCodeDisplay').innerText = randCode;

  el.ticketModal.classList.add('active');
});

el.btnCloseTicket.addEventListener('click', () => {
  retroAudio.playClick();
  el.ticketModal.classList.remove('active');
});

el.btnSaveTicket.addEventListener('click', () => {
  retroAudio.playClick();
  const code = document.getElementById('ticketCodeDisplay').textContent;
  const content = ['CMA Garden Picnic Night — ตั๋วตัวอย่าง', code, 'ผู้รับ: ' + state.orderData.name, 'โทร: ' + state.orderData.phone, '', ...state.basketItems.map(i => '• ' + i.souvenirTitle), '', 'ราคาเซ็ต: 1,290 บาท', 'ตัวอย่างเท่านั้น ไม่ใช่หลักฐานชำระเงินหรือบัตรรับของจริง'].join('\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = code + '.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

// Setup Initial View
renderShopCrates();
setActorPos(HOME_POS.x, HOME_POS.y);
document.getElementById('actorSprite').innerHTML = SPRITES.shopkeeper.idle;
updateBasketUI();

document.getElementById('counterBasketClick').addEventListener('click', () => {
  document.querySelector('.lower-content').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') document.querySelectorAll('.modal-backdrop.active').forEach(modal => modal.classList.remove('active'));
});

setupHarvestGame({
  fruits: FRUITS,
  canOpen: () => !state.isShopkeeperBusy,
  getCount: () => state.basketItems.length,
  onCollect: fruit => {
    state.basketItems.push(fruit);
    retroAudio.playHarvest();
    updateBasketUI();
    speak(`เก็บ <b>${fruit.name}</b> ลงตะกร้าแล้วครับ!`);
  }
});
