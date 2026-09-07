import test from 'node:test';
import assert from 'node:assert/strict';
import { movePlayer, nearestStation, STATIONS } from '../game-physics.js';

test('diagonal input travels at the same speed as cardinal input', () => {
  const p = { x: 360, y: 205 };
  const straight = movePlayer(p, { x: 1, y: 0 }, .016);
  const diagonal = movePlayer(p, { x: 1, y: 1 }, .016);
  assert.ok(Math.abs(Math.hypot(straight.x-p.x, straight.y-p.y)-Math.hypot(diagonal.x-p.x,diagonal.y-p.y)) < 1e-8);
});
test('all twelve fruit stations can be reached from the center without crossing obstacles', () => {
  const start = { x:360, y:205 };
  const queue = [start], visited = new Set(), reached = new Set();
  for (let i=0; i<queue.length; i++) {
    const p=queue[i];
    const station=nearestStation(p);
    if(station) reached.add(station.index);
    for (const d of [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}]) {
      const next=movePlayer(p,d, .05);
      const key=Math.round(next.x/8)+','+Math.round(next.y/8);
      if(!visited.has(key)) { visited.add(key); queue.push(next); }
    }
  }
  assert.equal(reached.size,STATIONS.length);
});
test('basket collision blocks entry but allows sliding along its edge', () => {
  const start={x:305,y:320};
  const p=movePlayer(start,{x:1,y:1},.05);
  assert.equal(p.x,start.x);
  assert.ok(p.y>start.y);
});
test('world bounds contain the player and large frame gaps are capped', () => {
  assert.equal(movePlayer({x:22,y:32},{x:-1,y:-1},1).x,22);
  assert.equal(movePlayer({x:22,y:32},{x:-1,y:-1},1).y,32);
  assert.ok(movePlayer({x:360,y:205},{x:1,y:0},20).x<=369.25);
});
test('harvest requires proximity, and every station has a matching index', () => {
  assert.equal(nearestStation({x:360,y:205}),null);
  STATIONS.forEach((s,i)=>assert.equal(nearestStation({x:s.x,y:s.y+55})?.index,i));
});
