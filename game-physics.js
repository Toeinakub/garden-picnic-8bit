export const WORLD = { width: 720, height: 640 };
export const BASKET = { x: 360, y: 320, width: 78, height: 70 };
export const STATIONS = [
  [180, 85], [360, 85], [540, 85],
  [78, 215], [78, 335], [78, 455],
  [642, 215], [642, 335], [642, 455],
  [180, 555], [360, 555], [540, 555],
].map(([x, y], index) => ({ x, y, width: 82, height: 68, index }));

export function movePlayer(player, direction, seconds) {
  const length = Math.hypot(direction.x, direction.y);
  if (!length) return { ...player };
  const distance = 185 * Math.min(seconds, 0.05) * Math.min(length, 1);
  const dx = direction.x / length * distance;
  const dy = direction.y / length * distance;
  const blocked = (x, y) => [BASKET, ...STATIONS].some(rect =>
    Math.abs(x - rect.x) < rect.width / 2 + 15 &&
    Math.abs(y - rect.y) < rect.height / 2 + 15);
  let { x, y } = player;
  const nx = Math.max(22, Math.min(WORLD.width - 22, x + dx));
  if (!blocked(nx, y)) x = nx;
  const ny = Math.max(32, Math.min(WORLD.height - 22, y + dy));
  if (!blocked(x, ny)) y = ny;
  return { x, y };
}

export function nearestStation(player) {
  const distances = STATIONS.map(station => ({
    station,
    distance: Math.hypot(player.x - station.x, player.y - station.y),
  })).sort((a, b) => a.distance - b.distance);
  return distances[0].distance <= 104 ? distances[0].station : null;
}
