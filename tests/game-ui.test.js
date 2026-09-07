import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { setupHarvestGame } from '../game.js';

test('game opens, moves, harvests into shared basket, cancels joystick, closes and reopens', () => {
  const dom = new JSDOM('<button id="enterGame">Play</button><div id="shopRoom"></div>', { pretendToBeVisual:true });
  const {window} = dom;
  let now=1000, callback;
  const original={};
  const values={
    window, document:window.document,
    ResizeObserver:class { observe(){} },
    requestAnimationFrame:fn=>{callback=fn;return 1;},
    cancelAnimationFrame:()=>{callback=null;},
    performance:{now:()=>now}
  };
  for(const [key,value] of Object.entries(values)) {
    original[key]=Object.getOwnPropertyDescriptor(globalThis,key);
    Object.defineProperty(globalThis,key,{configurable:true,writable:true,value});
  }
  window.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  window.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new window.Event('close'));};
  const fruits=Array.from({length:12},(_,i)=>({name:'fruit-'+i,icon:'🍊'}));
  const basket=[];
  let busy=false;
  try {
    setupHarvestGame({fruits,onCollect:fruit=>basket.push(fruit),getCount:()=>basket.length,canOpen:()=>!busy});
    const doc=window.document, entry=doc.getElementById('enterGame');
    const dialog=doc.querySelector('dialog');
    const action=doc.getElementById('harvestAction');
    const actor=doc.querySelector('.game-player');
    const tick=(frames=1)=>{for(let i=0;i<frames;i++){now+=16;const fn=callback;callback=null;fn?.(now);}};
    const key=(type,key,code=key)=>dialog.dispatchEvent(new window.KeyboardEvent(type,{key,code,bubbles:true,cancelable:true}));
    busy=true;entry.click();assert.equal(dialog.open,false);
    busy=false;entry.click();tick();
    assert.equal(dialog.open,true);
    assert.equal(doc.activeElement,dialog);
    assert.equal(doc.body.style.overflow,'hidden');
    assert.equal(action.disabled,true);
    key('keydown','ArrowUp');tick(20);key('keyup','ArrowUp');tick();
    assert.equal(action.disabled,false);
    assert.equal(action.textContent,'เก็บfruit-1');
    key('keydown',' ','Space');tick();
    assert.equal(basket.length,1);
    assert.equal(basket[0],fruits[1]);
    assert.equal(doc.getElementById('gameCount').textContent,'ตะกร้า 1 ชิ้น');
    key('keydown',' ','Space');assert.equal(basket.length,1,'cooldown prevents double collect');

    const joy=doc.querySelector('.game-joystick');
    let captured=false;
    joy.getBoundingClientRect=()=>({left:0,top:0,width:116,height:116});
    joy.setPointerCapture=()=>{captured=true;};
    joy.hasPointerCapture=()=>captured;
    joy.releasePointerCapture=()=>{captured=false;};
    const pointer=(type,x=93,y=58)=> {
      const event=new window.Event(type,{bubbles:true,cancelable:true});
      Object.assign(event,{pointerId:7,clientX:x,clientY:y});
      joy.dispatchEvent(event);
    };
    const before=actor.style.left;
    pointer('pointerdown');tick(5);
    assert.notEqual(actor.style.left,before,'joystick moves the player');
    pointer('pointercancel');
    const stopped=actor.style.left;
    tick(5);assert.equal(actor.style.left,stopped,'cancelled touch stops movement');
    doc.querySelector('.game-close').click();
    assert.equal(dialog.open,false);assert.equal(callback,null);
    assert.equal(doc.body.style.overflow,'');
    assert.equal(doc.activeElement,entry);
    entry.click();tick();
    assert.equal(actor.style.left,'360px');
    assert.equal(doc.getElementById('gameCount').textContent,'ตะกร้า 1 ชิ้น');
    dialog.close();
  } finally {
    dom.window.close();
    for(const key of Object.keys(values)) {
      if(original[key]) Object.defineProperty(globalThis,key,original[key]);
      else delete globalThis[key];
    }
  }
});
