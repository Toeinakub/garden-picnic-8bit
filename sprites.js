// One shared face keeps the reference-inspired glasses, beard and smile consistent.
// Half-pixel details add definition while preserving the existing pixel-art costume.
function shopkeeperFace(y) {
  return `<g transform="translate(0 ${y})">
    <path d="M7 0h10v5H7z M8 5h8v1H8z M6 2h1v2H6z M17 2h1v2h-1z" fill="#d9a581"/>
    <path d="M7 0h10v1H7z M6.5 1h1.5v2H6.5z M16 1h1.5v2H16z" fill="#292827"/>
    <path d="M8 1h8v.5H8z" fill="#e8ba94"/>
    <path d="M7 3.5h10V5H7z M8 5h8v1H8z" fill="#40312c"/>
    <path d="M7 1.5h4.5v2H7z M12.5 1.5H17v2h-4.5z M11.5 2h1v.5h-1z" fill="#d9dce9"/>
    <path d="M7.5 2H11v1H7.5z M13 2h3.5v1H13z" fill="#bea9a3"/>
    <path d="M8.5 2h1v1h-1z M14 2h1v1h-1z" fill="#2c2928"/>
    <path d="M11.5 2.5h1v1.5h-1z M8 3.5h1v.5H8z M15 3.5h1v.5h-1z" fill="#c99070"/>
    <path d="M9 4h6v.5H9z M10 4.5h4v.5h-4z" fill="#fff0d7"/>
    <path d="M10 5h4v.5h-4z" fill="#b87e68"/>
  </g>`;
}

// 8-bit Pixel Art Sprites for Stardew Valley Style Shop & Items
export const SPRITES = {
  // เจ้าของร้าน (Shopkeeper Character): Idle, Walk, and Carry
  shopkeeper: {
    idle: `
      <svg viewBox="0 0 24 32" width="100%" height="100%" shape-rendering="crispEdges" class="pixel-art-svg">
        <!-- Straw Hat -->
        <path d="M6 3 h12 v2 h-12 z" fill="#d9a543"/>
        <path d="M3 5 h18 v3 h-18 z" fill="#f0be5b"/>
        <path d="M8 5 h8 v2 h-8 z" fill="#2b5e39"/>
        ${shopkeeperFace(8)}
        <!-- Apron & Shirt -->
        <path d="M6 14 h12 v10 h-12 z" fill="#264e36"/>
        <path d="M9 14 h6 v9 h-6 z" fill="#3b7250"/>
        <path d="M10 17 h4 v3 h-4 z" fill="#f5e6cc"/>
        <!-- Arms / Hands -->
        <path d="M4 15 h2 v6 h-2 z" fill="#d9a581"/>
        <path d="M18 15 h2 v6 h-2 z" fill="#d9a581"/>
        <!-- Trousers & Boots -->
        <path d="M7 24 h4 v5 h-4 z M13 24 h4 v5 h-4 z" fill="#4a3b32"/>
        <path d="M6 29 h5 v3 h-5 z M13 29 h5 v3 h-5 z" fill="#241913"/>
      </svg>
    `,
    walk1: `
      <svg viewBox="0 0 24 32" width="100%" height="100%" shape-rendering="crispEdges" class="pixel-art-svg">
        <!-- Straw Hat -->
        <path d="M6 2 h12 v2 h-12 z" fill="#d9a543"/>
        <path d="M3 4 h18 v3 h-18 z" fill="#f0be5b"/>
        <path d="M8 4 h8 v2 h-8 z" fill="#2b5e39"/>
        ${shopkeeperFace(7)}
        <!-- Body -->
        <path d="M6 13 h12 v10 h-12 z" fill="#264e36"/>
        <path d="M9 13 h6 v9 h-6 z" fill="#3b7250"/>
        <path d="M10 16 h4 v3 h-4 z" fill="#f5e6cc"/>
        <!-- Arms Swinging -->
        <path d="M4 13 h2 v5 h-2 z" fill="#d9a581"/>
        <path d="M18 16 h2 v5 h-2 z" fill="#d9a581"/>
        <!-- Stride Leg 1 Forward, Leg 2 Back -->
        <path d="M5 23 h4 v6 h-4 z" fill="#4a3b32"/>
        <path d="M4 29 h5 v3 h-5 z" fill="#241913"/>
        <path d="M14 23 h4 v5 h-4 z" fill="#4a3b32"/>
        <path d="M15 28 h4 v3 h-4 z" fill="#241913"/>
      </svg>
    `,
    walk2: `
      <svg viewBox="0 0 24 32" width="100%" height="100%" shape-rendering="crispEdges" class="pixel-art-svg">
        <!-- Straw Hat -->
        <path d="M6 2 h12 v2 h-12 z" fill="#d9a543"/>
        <path d="M3 4 h18 v3 h-18 z" fill="#f0be5b"/>
        <path d="M8 4 h8 v2 h-8 z" fill="#2b5e39"/>
        ${shopkeeperFace(7)}
        <!-- Body -->
        <path d="M6 13 h12 v10 h-12 z" fill="#264e36"/>
        <path d="M9 13 h6 v9 h-6 z" fill="#3b7250"/>
        <path d="M10 16 h4 v3 h-4 z" fill="#f5e6cc"/>
        <!-- Arms Swinging Reverse -->
        <path d="M4 16 h2 v5 h-2 z" fill="#d9a581"/>
        <path d="M18 13 h2 v5 h-2 z" fill="#d9a581"/>
        <!-- Stride Leg 2 Forward, Leg 1 Back -->
        <path d="M7 23 h4 v5 h-4 z" fill="#4a3b32"/>
        <path d="M6 28 h4 v3 h-4 z" fill="#241913"/>
        <path d="M15 23 h4 v6 h-4 z" fill="#4a3b32"/>
        <path d="M15 29 h5 v3 h-5 z" fill="#241913"/>
      </svg>
    `,
    carry: `
      <svg viewBox="0 0 24 32" width="100%" height="100%" shape-rendering="crispEdges" class="pixel-art-svg">
        <!-- Straw Hat -->
        <path d="M6 6 h12 v2 h-12 z" fill="#d9a543"/>
        <path d="M3 8 h18 v3 h-18 z" fill="#f0be5b"/>
        ${shopkeeperFace(11)}
        <!-- Arms Raised Up Carrying Item -->
        <path d="M3 3 h3 v8 h-3 z" fill="#d9a581"/>
        <path d="M18 3 h3 v8 h-3 z" fill="#d9a581"/>
        <!-- Body -->
        <path d="M6 17 h12 v8 h-12 z" fill="#264e36"/>
        <path d="M9 17 h6 v7 h-6 z" fill="#3b7250"/>
        <!-- Legs -->
        <path d="M7 25 h4 v4 h-4 z M13 25 h4 v4 h-4 z" fill="#4a3b32"/>
        <path d="M6 29 h5 v3 h-5 z M13 29 h5 v3 h-5 z" fill="#241913"/>
      </svg>
    `
  },

  // ผลไม้และผลผลิตในร้าน (Fruit & Produce Sprites)
  fruits: {
    apple: `
      <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
        <path d="M11 2 h2 v4 h-2 z" fill="#583119"/>
        <path d="M13 3 h4 v2 h-4 z" fill="#4e9939"/>
        <path d="M6 6 h12 v14 h-12 z" fill="#b82525"/>
        <path d="M4 8 h16 v10 h-16 z" fill="#b82525"/>
        <path d="M7 8 h3 v4 h-3 z" fill="#ff7070"/>
        <path d="M7 18 h10 v2 h-10 z" fill="#781010"/>
      </svg>
    `,
    greenApple: `
      <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
        <path d="M11 2 h2 v4 h-2 z" fill="#583119"/>
        <path d="M13 3 h4 v2 h-4 z" fill="#7fa655"/>
        <path d="M6 6 h12 v14 h-12 z" fill="#3d8b37"/>
        <path d="M4 8 h16 v10 h-16 z" fill="#3d8b37"/>
        <path d="M7 8 h3 v4 h-3 z" fill="#8fe077"/>
        <path d="M7 18 h10 v2 h-10 z" fill="#1b5417"/>
      </svg>
    `,
    orange: `
      <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
        <path d="M11 2 h2 v3 h-2 z" fill="#583119"/>
        <path d="M13 3 h3 v2 h-3 z" fill="#588b39"/>
        <path d="M5 6 h14 v14 h-14 z" fill="#d96c14"/>
        <path d="M4 8 h16 v10 h-16 z" fill="#eb7d28"/>
        <path d="M7 8 h3 v3 h-3 z" fill="#f7b76d"/>
        <path d="M7 18 h10 v2 h-10 z" fill="#8c3a07"/>
      </svg>
    `,
    grape: `
      <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
        <path d="M11 2 h2 v3 h-2 z" fill="#4a2e1b"/>
        <path d="M9 3 h2 v2 h-2 z" fill="#588b39"/>
        <!-- Grape Clusters -->
        <path d="M7 5 h10 v4 h-10 z" fill="#7532a8"/>
        <path d="M5 8 h14 v5 h-14 z" fill="#602191"/>
        <path d="M7 13 h10 v4 h-10 z" fill="#50187d"/>
        <path d="M9 17 h6 v4 h-6 z" fill="#390e5c"/>
        <path d="M11 21 h2 v2 h-2 z" fill="#290745"/>
        <path d="M8 9 h2 v2 h-2 z M14 9 h2 v2 h-2 z M10 14 h2 v2 h-2 z" fill="#ba73f2"/>
      </svg>
    `,
    lemonCitronella: `
      <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
        <!-- Citronella Leaves -->
        <path d="M6 18 L11 2 h2 L8 20 z" fill="#2d6e35"/>
        <path d="M11 4 h2 v16 h-2 z" fill="#4ba356"/>
        <!-- Lemon -->
        <path d="M12 10 h9 v10 h-9 z" fill="#e0b91b"/>
        <path d="M11 12 h11 v6 h-11 z" fill="#e8c731"/>
        <path d="M14 12 h3 v3 h-3 z" fill="#fff799"/>
        <path d="M13 18 h7 v2 h-7 z" fill="#a3820a"/>
      </svg>
    `,
    strawberry: `
      <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
        <!-- Calyx (Leaves) -->
        <path d="M6 3 h12 v3 h-12 z" fill="#3d8531"/>
        <path d="M10 2 h4 v2 h-4 z" fill="#5cb04e"/>
        <!-- Berry -->
        <path d="M5 6 h14 v7 h-14 z" fill="#c91a34"/>
        <path d="M7 13 h10 v5 h-10 z" fill="#c91a34"/>
        <path d="M9 18 h6 v4 h-6 z" fill="#b01027"/>
        <path d="M11 22 h2 v1 h-2 z" fill="#8c071b"/>
        <!-- Seeds -->
        <path d="M8 8 h1 v1 h-1 z M12 8 h1 v1 h-1 z M16 8 h1 v1 h-1 z" fill="#fff073"/>
        <path d="M10 12 h1 v1 h-1 z M14 12 h1 v1 h-1 z M11 16 h1 v1 h-1 z" fill="#fff073"/>
      </svg>
    `,
    banana: `
      <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
        <path d="M5 6 h3 v2 h-3 z" fill="#583119"/>
        <path d="M7 7 h4 v4 h-4 z" fill="#e8c227"/>
        <path d="M10 10 h4 v5 h-4 z" fill="#fad744"/>
        <path d="M13 14 h4 v4 h-4 z" fill="#fad744"/>
        <path d="M16 16 h4 v3 h-4 z" fill="#e8c227"/>
        <path d="M19 18 h2 v2 h-2 z" fill="#583119"/>
        <path d="M9 9 h4 v1 h-4 z M12 13 h4 v1 h-4 z" fill="#fff59d"/>
      </svg>
    `,
    peach: `
      <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
        <path d="M11 2 h2 v3 h-2 z" fill="#4d2f16"/>
        <path d="M13 2 h4 v2 h-4 z" fill="#5b9e38"/>
        <path d="M5 6 h14 v14 h-14 z" fill="#e88458"/>
        <path d="M4 8 h16 v10 h-16 z" fill="#fa986b"/>
        <path d="M7 8 h4 v4 h-4 z" fill="#ffc2a6"/>
        <path d="M11 8 h2 v12 h-2 z" fill="#c45d35"/> <!-- Crease -->
        <path d="M7 18 h10 v2 h-10 z" fill="#ab451f"/>
      </svg>
    `,
    wheat: `
      <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
        <path d="M11 10 h2 v13 h-2 z" fill="#8c6227"/>
        <path d="M10 3 h4 v3 h-4 z" fill="#f4c430"/>
        <path d="M7 6 h4 v3 h-4 z" fill="#e5aa24"/>
        <path d="M13 6 h4 v3 h-4 z" fill="#f4c430"/>
        <path d="M7 10 h4 v3 h-4 z" fill="#e5aa24"/>
        <path d="M13 10 h4 v3 h-4 z" fill="#f4c430"/>
        <path d="M6 14 h5 v2 h-5 z" fill="#7fa655"/>
        <path d="M13 16 h5 v2 h-5 z" fill="#6d9344"/>
      </svg>
    `
  },

  // ตะกร้าปิกนิกสาน (Woven Basket)
  basket: `
    <svg viewBox="0 0 48 48" width="100%" height="100%" shape-rendering="crispEdges">
      <!-- Handle -->
      <path d="M20 4 h8 v3 h-8 z" fill="#4a2612"/>
      <path d="M17 7 h3 v11 h-3 z M28 7 h3 v11 h-3 z" fill="#4a2612"/>
      <path d="M18 8 h2 v9 h-2 z M28 8 h2 v9 h-2 z" fill="#8c5327"/>
      <!-- Rim -->
      <path d="M6 16 h36 v5 h-36 z" fill="#361a0a"/>
      <path d="M8 18 h32 v2 h-32 z" fill="#ad6d34"/>
      <!-- Gingham Cloth Liner -->
      <path d="M8 21 h32 v3 h-32 z" fill="#f4ede1"/>
      <path d="M10 21 h4 v3 h-4 z M18 21 h4 v3 h-4 z M26 21 h4 v3 h-4 z M34 21 h4 v3 h-4 z" fill="#2d5e3f"/>
      <path d="M6 23 h4 v4 h-4 z M14 23 h4 v4 h-4 z M22 23 h4 v4 h-4 z M30 23 h4 v4 h-4 z M38 23 h4 v4 h-4 z" fill="#488c60"/>
      <!-- Basket Woven Body -->
      <path d="M8 26 h32 v18 h-32 z" fill="#7d471d"/>
      <path d="M10 27 h6 v3 h-6 z M22 27 h6 v3 h-6 z M34 27 h6 v3 h-6 z" fill="#ba7c41"/>
      <path d="M16 30 h6 v3 h-6 z M28 30 h6 v3 h-6 z" fill="#ad6d34"/>
      <path d="M10 33 h6 v3 h-6 z M22 33 h6 v3 h-6 z M34 33 h6 v3 h-6 z" fill="#ba7c41"/>
      <path d="M16 36 h6 v3 h-6 z M28 36 h6 v3 h-6 z" fill="#ad6d34"/>
      <path d="M10 39 h6 v3 h-6 z M22 39 h6 v3 h-6 z M34 39 h6 v3 h-6 z" fill="#ba7c41"/>
      <path d="M11 44 h26 v3 h-26 z" fill="#361a0a"/>
    </svg>
  `,

  // ของที่ระลึกหน้า 10
  toteBag: `
    <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
      <path d="M12 2 h3 v9 h-3 z M18 2 h3 v9 h-3 z" fill="#1b3c29"/>
      <path d="M6 10 h20 v20 h-20 z" fill="#4a3b2c"/>
      <path d="M8 12 h16 v16 h-16 z" fill="#f4ebd9"/>
      <path d="M13 16 h6 v2 h-6 z" fill="#2d5e3f"/>
      <path d="M11 20 h10 v2 h-10 z" fill="#1b3c29"/>
      <path d="M23 22 h2 v4 h-2 z" fill="#2d5e3f"/>
    </svg>
  `,

  picnicMat: `
    <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
      <path d="M12 6 h8 v3 h-8 z" fill="#583119"/>
      <path d="M10 9 h3 v16 h-3 z M19 9 h3 v16 h-3 z" fill="#583119"/>
      <path d="M4 12 h24 v12 h-24 z" fill="#302219"/>
      <path d="M5 13 h22 v2 h-22 z" fill="#3b5e43"/>
      <path d="M5 15 h22 v2 h-22 z" fill="#eae3d2"/>
      <path d="M5 17 h22 v2 h-22 z" fill="#4d7557"/>
      <path d="M5 19 h22 v2 h-22 z" fill="#eae3d2"/>
      <path d="M5 21 h22 v2 h-22 z" fill="#3b5e43"/>
    </svg>
  `,

  tumbler: `
    <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
      <path d="M11 4 h10 v3 h-10 z" fill="#2d2824"/>
      <path d="M10 7 h12 v20 h-12 z" fill="#2b231d"/>
      <path d="M11 8 h10 v18 h-10 z" fill="#696150"/>
      <path d="M12 9 h2 v16 h-2 z" fill="#8a806c"/>
      <path d="M14 14 h4 v5 h-4 z" fill="#383329"/>
    </svg>
  `,

  sprayBottle: `
    <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
      <path d="M14 3 h4 v3 h-4 z M11 4 h4 v2 h-4 z" fill="#1b1c1d"/>
      <path d="M13 6 h6 v3 h-6 z" fill="#2c2d30"/>
      <path d="M10 9 h12 v19 h-12 z" fill="#381b0a"/>
      <path d="M11 10 h10 v17 h-10 z" fill="#693b18"/>
      <path d="M11 15 h10 v8 h-10 z" fill="#f7f2e4"/>
      <path d="M13 17 h6 v2 h-6 z" fill="#2d5e3f"/>
    </svg>
  `,

  // Sparkle
  sparkle: `
    <svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges">
      <path d="M11 2 h2 v20 h-2 z M2 11 h20 v2 h-20 z" fill="#fff07c"/>
      <path d="M9 9 h6 v6 h-6 z" fill="#ffffff"/>
      <path d="M6 6 h3 v3 h-3 z M15 6 h3 v3 h-3 z M6 15 h3 v3 h-3 z M15 15 h3 v3 h-3 z" fill="#ffd13b"/>
    </svg>
  `,

  qrCode: `
    <svg viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
      <rect width="32" height="32" fill="#ffffff"/>
      <path d="M3 3 h8 v8 h-8 z M5 5 h4 v4 h-4 z M21 3 h8 v8 h-8 z M23 5 h4 v4 h-4 z M3 21 h8 v8 h-8 z M5 23 h4 v4 h-4 z" fill="#1b2e21"/>
      <path d="M13 4 h2 v2 h-2 z M17 4 h2 v2 h-2 z M13 8 h4 v2 h-4 z M4 13 h2 v2 h-2 z M8 13 h4 v2 h-4 z M14 13 h4 v4 h-4 z M20 13 h4 v2 h-4 z M26 13 h2 v4 h-2 z M6 17 h4 v2 h-4 z M12 17 h2 v2 h-2 z M22 17 h4 v2 h-4 z M13 21 h2 v4 h-2 z M17 21 h4 v2 h-4 z M23 21 h2 v2 h-2 z M27 21 h2 v4 h-2 z M15 26 h4 v3 h-4 z M21 25 h4 v2 h-4 z M25 27 h4 v2 h-4 z" fill="#1b2e21"/>
    </svg>
  `
};

// Thai fruit variants extend the shop's existing 24 × 24 pixel sprite system.
function fruitSprite(layers) {
  return '<svg viewBox="0 0 24 24" width="100%" height="100%" shape-rendering="crispEdges" aria-hidden="true">' +
    layers.map(([fill, d]) => '<path fill="' + fill + '" d="' + d + '"/>').join('') + '</svg>';
}

Object.assign(SPRITES.fruits, {
  mango: fruitSprite([
    ['#52713a', 'M13 2h2v4h-2z M15 3h5v2h-5z'],
    ['#e8a52e', 'M9 5h8v3h-8z M7 8h11v7H7z M5 13h11v5H5z M4 18h8v3H4z'],
    ['#f9d65b', 'M9 7h5v3H9z M7 10h5v6H7z M5 16h5v3H5z'],
    ['#bd7424', 'M15 10h3v5h-3z M12 16h4v2h-4z M8 19h4v2H8z']
  ]),
  mangosteen: fruitSprite([
    ['#49243f', 'M6 8h12v12H6z M4 11h16v6H4z M8 20h8v2H8z'],
    ['#794466', 'M6 10h11v8H6z M8 8h8v2H8z'],
    ['#b7809c', 'M7 11h3v4H7z'],
    ['#648443', 'M10 2h3v5h-3z M5 5h14v3H5z M8 8h3v3H8z M14 7h3v3h-3z'],
    ['#98ae57', 'M7 4h4v3H7z M13 4h4v3h-4z']
  ]),
  rambutan: fruitSprite([
    ['#96a642', 'M5 3h2v4H5z M11 2h2v4h-2z M17 3h2v4h-2z M2 8h4v2H2z M19 8h3v2h-3z M1 14h4v2H1z M19 14h4v2h-4z M4 19h3v3H4z M10 20h2v3h-2z M17 19h3v3h-3z'],
    ['#b9383f', 'M6 5h12v15H6z M4 8h16v9H4z M8 20h8v2H8z'],
    ['#ed6551', 'M7 7h7v10H7z M5 10h3v5H5z'],
    ['#e9ae57', 'M8 8h2v3H8z M14 9h2v3h-2z M7 16h3v2H7z M14 16h2v3h-2z']
  ]),
  durian: fruitSprite([
    ['#725b2a', 'M11 1h3v5h-3z'],
    ['#648047', 'M8 4h8v2H8z M5 6h14v3H5z M3 9h18v9H3z M5 18h14v3H5z M8 21h8v2H8z'],
    ['#a9b75c', 'M7 7h2v3H7z M12 5h2v3h-2z M16 8h2v3h-2z M4 12h3v3H4z M9 11h2v3H9z M16 14h3v3h-3z M6 17h3v3H6z'],
    ['#f3d778', 'M12 9h3v3h-3z M11 12h5v7h-5z M12 19h3v2h-3z']
  ]),
  pineapple: fruitSprite([
    ['#4e7d42', 'M5 2h3v3H5z M10 1h3v7h-3z M16 2h3v3h-3z M7 5h10v3H7z'],
    ['#cb9138', 'M7 8h10v2H7z M5 10h14v10H5z M7 20h10v2H7z'],
    ['#f0c358', 'M7 10h8v9H7z M9 8h5v2H9z'],
    ['#a9742f', 'M6 12h12v1H6z M6 16h12v1H6z M9 10h1v11H9z M14 10h1v11h-1z'],
    ['#fae391', 'M7 10h2v2H7z M11 14h2v2h-2z']
  ]),
  coconut: fruitSprite([
    ['#4e7042', 'M7 5h10v2H7z M4 7h16v12H4z M7 19h10v3H7z'],
    ['#92b76b', 'M6 8h12v10H6z M8 18h8v2H8z'],
    ['#d4dba7', 'M8 6h8v3H8z M6 9h12v3H6z'],
    ['#f8f2d8', 'M9 7h6v3H9z'],
    ['#6c5434', 'M12 2h2v6h-2z M13 2h5v2h-5z'],
    ['#b5cc84', 'M7 13h3v4H7z']
  ]),
  longan: fruitSprite([
    ['#78623a', 'M11 2h2v6h-2z M6 6h12v2H6z'],
    ['#73944d', 'M14 3h6v3h-6z'],
    ['#b9874c', 'M4 8h7v8H4z M13 8h7v8h-7z M8 15h9v7H8z'],
    ['#dcb77c', 'M5 9h5v5H5z M14 9h5v5h-5z M9 16h6v4H9z'],
    ['#f2d79c', 'M5 9h2v2H5z M14 9h2v2h-2z M9 16h2v2H9z']
  ]),
  lychee: fruitSprite([
    ['#658845', 'M11 2h2v5h-2z M13 3h6v2h-6z'],
    ['#b94755', 'M7 6h10v2H7z M5 8h14v11H5z M8 19h8v3H8z'],
    ['#df7981', 'M7 8h8v10H7z M9 18h5v2H9z'],
    ['#f8b3a7', 'M8 9h2v2H8z M12 8h2v2h-2z M7 13h2v2H7z M11 12h2v2h-2z M15 14h2v2h-2z M10 17h2v2h-2z']
  ]),
  watermelon: fruitSprite([
    ['#3f713b', 'M2 6h20v11H2z M5 17h14v3H5z M8 20h8v2H8z'],
    ['#aad17d', 'M3 6h18v10H3z M6 16h12v3H6z'],
    ['#e85b5b', 'M4 6h16v8H4z M7 14h10v3H7z M10 17h4v2h-4z'],
    ['#773335', 'M7 8h1v3H7z M12 7h1v3h-1z M16 9h1v3h-1z M10 13h1v2h-1z']
  ]),
  guava: fruitSprite([
    ['#577b3f', 'M11 2h2v4h-2z M13 3h5v2h-5z'],
    ['#7c9d4b', 'M7 6h10v2H7z M4 8h16v11H4z M7 19h10v3H7z'],
    ['#bad277', 'M6 9h7v9H6z M8 7h5v2H8z'],
    ['#eff0c3', 'M13 10h5v8h-5z M14 18h3v2h-3z'],
    ['#d29985', 'M14 12h3v4h-3z'],
    ['#678c42', 'M10 20h3v2h-3z']
  ])
});
