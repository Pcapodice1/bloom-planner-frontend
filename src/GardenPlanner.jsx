import React from "react";
import { useState, useEffect } from "react";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{--cream:#F5F0E8;--deep:#1A3028;--forest:#2D5016;--sage:#7A9E7E;--lsage:#EBF2EC;--terra:#C4622D;--tan:#D4956A;--muted:#6B7B6C;--white:#FEFEF9;--border:#E8E4DC}
  .print-overlay{display:none}
  @media print{.app{display:none}.print-overlay{display:block!important;font-family:'DM Sans',sans-serif;color:#1A3028;padding:32px 40px;max-width:900px;font-size:13px}.print-overlay h1{font-family:'Playfair Display',serif;font-size:32px;font-weight:400;margin-bottom:8px}.print-overlay h1 em{color:#C4622D;font-style:italic}.print-meta{color:#7A9E7E;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px}.print-summary{font-size:13px;color:#4a5d4e;line-height:1.7;margin-bottom:24px;border-left:3px solid #7A9E7E;padding-left:12px}.print-overlay h2{font-family:'Playfair Display',serif;font-size:18px;font-weight:400;margin:22px 0 10px;padding-bottom:5px;border-bottom:1.5px solid #E8E4DC}.print-cal table{border-collapse:separate;border-spacing:2px;width:100%}.print-cal .cn{font-size:11px;font-weight:500;padding-right:6px;white-space:nowrap;max-width:130px;overflow:hidden;text-overflow:ellipsis}.print-cal .cm{font-size:8px;color:#6B7B6C;font-weight:600;letter-spacing:.5px;text-align:center;padding:2px 0}.plant-print-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}.ppc{border:1px solid #E8E4DC;border-radius:8px;padding:11px;break-inside:avoid}.ppc-nm{font-weight:600;font-size:13px}.ppc-sci{font-style:italic;font-size:11px;color:#6B7B6C;margin-top:1px}.ppc-dots{display:flex;gap:2px;flex-wrap:wrap;margin-top:5px}.ppc-dot{width:18px;height:12px;border-radius:3px;font-size:7px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center}.ppc-dot.off{background:#F0ECE5;color:#999}.ppc-tip{font-size:11px;color:#6B7B6C;margin-top:5px;line-height:1.5}.seas-print{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}.sc-print{background:#EBF2EC;border-radius:8px;padding:11px}.sc-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7A9E7E;margin-bottom:4px}.sc-txt{font-size:11.5px;color:#1A3028;line-height:1.6}.print-footer{margin-top:24px;padding-top:10px;border-top:1px solid #E8E4DC;font-size:10px;color:#b0bdb1;text-align:center}}
  body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--deep);min-height:100vh}
  .app{max-width:480px;margin:0 auto;min-height:100vh;background:var(--white);position:relative;overflow-x:hidden;box-shadow:0 0 80px rgba(0,0,0,.12)}
  .wel{min-height:100vh;background:var(--deep);display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:64px 32px 52px;position:relative;overflow:hidden}
  .wel-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 15% 85%,rgba(122,158,126,.28) 0%,transparent 55%),radial-gradient(ellipse at 85% 15%,rgba(196,98,45,.22) 0%,transparent 55%);pointer-events:none}
  .wel-icon{font-size:88px;filter:drop-shadow(0 6px 24px rgba(0,0,0,.35));animation:float 3.5s ease-in-out infinite}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  .wel-h{font-family:'Playfair Display',serif;font-size:44px;color:var(--cream);text-align:center;line-height:1.12;font-weight:400}
  .wel-h em{color:var(--tan);font-style:italic}
  .wel-sub{color:rgba(245,240,232,.65);text-align:center;font-size:15px;font-weight:300;line-height:1.65;margin-top:14px}
  .btn-p{background:var(--terra);color:#fff;border:none;padding:18px 40px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:500;cursor:pointer;width:100%;transition:all .2s;letter-spacing:.3px}
  .btn-p:hover{background:#b5552a;transform:translateY(-2px);box-shadow:0 10px 28px rgba(196,98,45,.4)}
  .btn-ghost{background:transparent;color:rgba(245,240,232,.6);border:1.5px solid rgba(255,255,255,.2);padding:13px 40px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:14px;cursor:pointer;width:100%;transition:all .2s;margin-top:10px}
  .btn-ghost:hover{border-color:rgba(255,255,255,.45);color:var(--cream)}
  .saved-panel{position:absolute;inset:0;background:var(--deep);overflow-y:auto;padding:48px 28px 40px;z-index:20}
  .saved-back{background:transparent;border:none;color:var(--tan);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;display:flex;align-items:center;gap:6px;margin-bottom:24px;padding:0}
  .saved-item{border:1.5px solid rgba(255,255,255,.15);border-radius:14px;padding:16px;margin-bottom:10px;cursor:pointer;transition:all .2s;background:rgba(255,255,255,.06);display:flex;justify-content:space-between;align-items:center}
  .saved-item:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.3)}
  .saved-nm{font-size:14px;color:var(--cream);font-weight:500}
  .saved-dt{font-size:11px;color:rgba(245,240,232,.45);margin-top:3px}
  .del-btn{background:rgba(255,255,255,.08);border:none;color:rgba(245,240,232,.45);width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:13px;transition:all .2s;flex-shrink:0}
  .del-btn:hover{background:rgba(196,98,45,.35);color:#fff}
  .ob{min-height:100vh;display:flex;flex-direction:column}
  .ob-hd{background:var(--deep);padding:48px 28px 32px;color:var(--cream)}
  .prog{display:flex;gap:6px;margin-bottom:24px}
  .prog-d{height:3px;flex:1;border-radius:2px;background:rgba(255,255,255,.18);transition:background .35s}
  .prog-d.on{background:var(--tan)}
  .step-lbl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--tan);margin-bottom:8px}
  .step-ttl{font-family:'Playfair Display',serif;font-size:28px;color:var(--cream);font-weight:400;line-height:1.25}
  .ob-body{flex:1;padding:28px;overflow-y:auto}
  .ob-foot{padding:20px 28px 40px;border-top:1px solid var(--border);display:flex;gap:12px;background:var(--white)}
  .btn-bk{background:transparent;color:var(--muted);border:1.5px solid var(--border);padding:16px 22px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:15px;cursor:pointer;transition:all .2s}
  .btn-nx{flex:1;background:var(--forest);color:#fff;border:none;padding:16px 32px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;transition:all .2s}
  .btn-nx:disabled{opacity:.35;cursor:not-allowed}
  .btn-nx:not(:disabled):hover{background:var(--deep);transform:translateY(-1px)}
  .opt-grid{display:grid;gap:11px}
  .opt-card{border:2px solid var(--border);border-radius:16px;padding:16px 18px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:14px;background:var(--white)}
  .opt-card:hover{border-color:var(--sage);background:var(--lsage)}
  .opt-card.sel{border-color:var(--forest);background:var(--lsage)}
  .opt-em{font-size:26px;flex-shrink:0}
  .opt-lbl{font-weight:500;font-size:15px;color:var(--deep)}
  .opt-desc{font-size:12px;color:var(--muted);margin-top:2px;font-weight:300}
  .zone-sel{width:100%;padding:16px 18px;border:2px solid var(--border);border-radius:14px;font-family:'DM Sans',sans-serif;font-size:16px;color:var(--deep);background:var(--white);cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='%232D5016' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}
  .zone-sel:focus{outline:none;border-color:var(--forest)}
  .zone-hint{margin-top:12px;padding:14px 16px;background:var(--lsage);border-radius:12px;font-size:13px;color:var(--muted);line-height:1.55}
  .multi-opt{border:2px solid var(--border);border-radius:13px;padding:14px 18px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:12px;background:var(--white);margin-bottom:10px}
  .multi-opt.sel{border-color:var(--terra);background:#fff8f5}
  .chk{width:20px;height:20px;border-radius:6px;border:2px solid #ccc;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .2s;font-size:12px}
  .chk.on{background:var(--terra);border-color:var(--terra);color:#fff}
  .load{min-height:100vh;background:var(--deep);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;gap:36px}
  .lf{font-size:34px;animation:bloom 1.5s ease-in-out infinite}
  @keyframes bloom{0%,100%{transform:scale(.75) rotate(-8deg);opacity:.45}50%{transform:scale(1.2) rotate(6deg);opacity:1}}
  .res{min-height:100vh;display:flex;flex-direction:column}
  .res-hd{background:var(--deep);padding:48px 28px 28px;color:var(--cream)}
  .zone-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.13);border-radius:100px;padding:6px 14px;font-size:13px;color:var(--tan);margin-bottom:16px;font-weight:500}
  .res-sum{margin-top:14px;color:rgba(245,240,232,.72);font-size:14px;line-height:1.65;font-weight:300}
  .act-bar{display:flex;gap:7px;margin-top:18px;flex-wrap:wrap}
  .act-btn{display:flex;align-items:center;gap:5px;padding:8px 13px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;border:1.5px solid rgba(255,255,255,.22);background:rgba(255,255,255,.1);color:var(--cream);white-space:nowrap}
  .act-btn:hover{background:rgba(255,255,255,.2)}
  .act-btn.ok{background:rgba(122,158,126,.45);border-color:var(--sage);color:#d4edd8}
  .tab-bar{display:flex;border-bottom:2px solid var(--border);background:var(--white);position:sticky;top:0;z-index:10}
  .tab-btn{flex:1;padding:14px 4px;border:none;background:none;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all .2s;border-bottom:2.5px solid transparent;margin-bottom:-2px}
  .tab-btn.active{font-weight:600;color:var(--deep);border-bottom-color:var(--forest)}
  .tab-btn:not(.active){font-weight:400;color:#999}
  .sec{padding:28px;border-bottom:1px solid #EEE8DE}
  .sec-ttl{font-family:'Playfair Display',serif;font-size:20px;color:var(--deep);margin-bottom:20px}
  .sec-lbl{font-size:12px;font-weight:500;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
  .cal-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
  .cal-tbl{min-width:620px;width:100%}
  .cal-hd{display:grid;grid-template-columns:150px repeat(12,1fr);gap:2px;margin-bottom:5px}
  .cal-mth{text-align:center;font-size:10px;font-weight:600;color:var(--muted);letter-spacing:.5px;padding:3px 0}
  .cal-row{display:grid;grid-template-columns:150px repeat(12,1fr);gap:2px;margin-bottom:3px;align-items:center}
  .cal-nm{font-size:11.5px;color:var(--deep);font-weight:500;padding-right:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cal-c{height:22px;border-radius:3px;background:#F0ECE5}
  .cal-c.bl.first{border-radius:11px 0 0 11px}
  .cal-c.bl.last{border-radius:0 11px 11px 0}
  .cal-c.bl.solo{border-radius:11px}
  .legend{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
  .leg-i{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted)}
  .leg-d{width:12px;height:12px;border-radius:3px}
  .pc{border:1.5px solid #EEE8DE;border-radius:16px;padding:16px 18px;background:var(--white);margin-bottom:13px;transition:border-color .2s}
  .pc-hdr{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px;cursor:pointer}
  .pc-nm{font-weight:500;font-size:15px;color:var(--deep)}
  .pc-sci{font-style:italic;font-size:12px;color:var(--muted);margin-top:2px}
  .pc-badge{font-size:11px;font-weight:500;letter-spacing:.4px;padding:4px 10px;border-radius:100px;text-transform:capitalize;flex-shrink:0}
  .pc-months{display:flex;gap:3px;flex-wrap:wrap;margin-bottom:10px;cursor:pointer}
  .mchip{width:26px;height:19px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:#fff}
  .mchip.off{background:#F0ECE5;color:var(--muted)}
  .pc-detail{padding-top:12px;border-top:1px solid #F0EDE8}
  .det-lbl{font-weight:600;font-size:11px;color:var(--sage);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;margin-top:10px}
  .det-lbl:first-child{margin-top:0}
  .det-txt{font-size:13px;color:var(--muted);line-height:1.55;font-weight:300}
  
  
  
  
  }
  
  .seas-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px}
  .seas-card{background:var(--lsage);border-radius:16px;padding:18px}
  .seas-icon{font-size:26px;margin-bottom:8px}
  .seas-lbl{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--sage);margin-bottom:6px}
  .seas-txt{font-size:13px;color:var(--deep);line-height:1.55;font-weight:300}
  .res-foot{padding:28px;background:var(--lsage)}
  .btn-rst{background:transparent;color:var(--forest);border:2px solid var(--sage);padding:16px 32px;border-radius:100px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;cursor:pointer;width:100%;transition:all .2s}
  .btn-rst:hover{background:var(--forest);color:var(--cream);border-color:var(--forest)}
`;

const TYPE_C = {
  annual:    {bg:'#FDECD8',tx:'#B85C22',bar:'#E8924A'},
  perennial: {bg:'#E8F0E9',tx:'#2D6A4F',bar:'#52B788'},
  bulb:      {bg:'#EDE0F5',tx:'#5E3A8A',bar:'#9B72CF'},
  shrub:     {bg:'#D9EDF5',tx:'#1A6E8A',bar:'#4CA3C3'},
  tree:      {bg:'#EFE8DC',tx:'#6B4C2A',bar:'#9E7242'},
};
const MO = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ZONE_DESC = {
  '1':'Sub-arctic (−60°F to −50°F). Extremely short, 2-month growing season.',
  '2':'Very cold (−50°F to −40°F). Short growing season — select very hardy species.',
  '3':'Cold (−40°F to −30°F). 3–4 month season. Native tough perennials shine.',
  '4':'Cold (−30°F to −20°F). 4–5 month season. Good perennial diversity.',
  '5':'Cool (−20°F to −10°F). ~5 month season. Wide plant variety.',
  '6':'Mild (−10°F to 0°F). 6+ month season. Excellent gardening zone.',
  '7':'Moderate (0°F to 10°F). ~7 month season. Great shrub & perennial range.',
  '8':'Warm (10°F to 20°F). Long 8-month season. Near year-round interest.',
  '9':'Warm (20°F to 30°F). Near year-round growing. Subtropical plants possible.',
  '10':'Subtropical (30°F to 40°F). True year-round garden. Tropical plants viable.',
  '11':'Tropical (40°F to 50°F). Frost-free. Lush tropical blooms all year.',
  '12':'Tropical (50°F to 60°F). Intense heat lovers thrive. Constant blooms.',
  '13':'Tropical (60°F+). Ultra-tropical. Heat-adapted exotics only.',
};
function getContrastColor(hex) {
  if (!hex) return '#fff';
  const h = hex.replace('#','').padEnd(6,'0');
  const r = parseInt(h.slice(0,2),16);
  const g = parseInt(h.slice(2,4),16);
  const b = parseInt(h.slice(4,6),16);
  return (0.299*r + 0.587*g + 0.114*b) / 255 > 0.55 ? '#1A3028' : '#fff';
}

function hexToColorName(hex) {
  if (!hex) return 'Mixed';
  const map = [
    ['#ff0000','Red'],['#cc0000','Deep Red'],['#ff3333','Bright Red'],['#dc143c','Crimson'],
    ['#ff4500','Red-Orange'],['#ff6347','Tomato Red'],['#ff7f50','Coral'],
    ['#ff8c00','Dark Orange'],['#ffa500','Orange'],['#ffb347','Peach'],['#ffd700','Gold'],
    ['#ffff00','Yellow'],['#f5e642','Bright Yellow'],['#fffacd','Cream Yellow'],
    ['#adff2f','Yellow-Green'],['#7fff00','Chartreuse'],['#00ff00','Green'],
    ['#228b22','Forest Green'],['#2d5016','Dark Green'],['#90ee90','Light Green'],
    ['#00ffff','Cyan'],['#40e0d0','Turquoise'],['#00ced1','Dark Turquoise'],
    ['#4169e1','Royal Blue'],['#0000ff','Blue'],['#1e90ff','Dodger Blue'],
    ['#87ceeb','Sky Blue'],['#b0e0e6','Powder Blue'],['#6495ed','Cornflower Blue'],
    ['#800080','Purple'],['#9b59b6','Violet'],['#9b72cf','Soft Purple'],['#ee82ee','Violet'],
    ['#ff00ff','Magenta'],['#ff69b4','Hot Pink'],['#ffb6c1','Light Pink'],
    ['#ffc0cb','Pink'],['#ff1493','Deep Pink'],['#db7093','Pale Violet Red'],
    ['#fff','White'],['#ffffff','White'],['#fefef9','Cream White'],['#fffaf0','Floral White'],
    ['#f5f5dc','Beige'],['#d2b48c','Tan'],['#c4a35a','Golden Tan'],
    ['#a0522d','Sienna'],['#8b4513','Saddle Brown'],['#d2691e','Chocolate'],
    ['#e8924a','Warm Orange'],['#52b788','Sage Green'],['#9e7242','Warm Brown'],
    ['#4ca3c3','Steel Blue'],['#c4622d','Terra Cotta'],['#d4956a','Dusty Peach'],
  ];
  // Normalize input
  let h = hex.toLowerCase().replace(/^#/,'');
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  const r1 = parseInt(h.slice(0,2),16);
  const g1 = parseInt(h.slice(2,4),16);
  const b1 = parseInt(h.slice(4,6),16);
  let best = 'Colorful', bestDist = Infinity;
  for (const [mhex, name] of map) {
    const mh = mhex.replace('#','').padEnd(6,'0');
    const r2 = parseInt(mh.slice(0,2),16)||0;
    const g2 = parseInt(mh.slice(2,4),16)||0;
    const b2 = parseInt(mh.slice(4,6),16)||0;
    const dist = Math.sqrt((r1-r2)**2+(g1-g2)**2+(b1-b2)**2);
    if (dist < bestDist) { bestDist = dist; best = name; }
  }
  return best;
}


const STEPS = [
  {lbl:'Location',ttl:"What's your USDA\nHardiness Zone?"},
  {lbl:'Light',   ttl:"How much sun does\nyour garden receive?"},
  {lbl:'Style',   ttl:"What's your garden\nstyle & size?"},
  {lbl:'Colors',  ttl:"What bloom colors\ndo you love?"},
];

/* ── HELPERS ────────────────────────────────────────────────────────────── */
// ── API CONFIGURATION ─────────────────────────────────────────────────────────
// Set API_BASE to your backend URL for local dev or production.
//   Local dev:   'http://localhost:3001'
//   Production:  'https://your-app.railway.app'
//   Claude.ai artifact testing: leave as '' (direct Anthropic call, auth is automatic)
const API_BASE = 'https://bloom-planner-backend-production.up.railway.app';

async function callClaude(system, msg, max_tokens = 4000) {
  let r;
  if (API_BASE) {
    // ── Production / local dev: route through backend proxy ──
    r = await fetch(`${API_BASE}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system, messages: [{ role: 'user', content: msg }], max_tokens }),
    });
  } else {
    // ── Claude.ai artifact sandbox: call Anthropic directly (auth injected automatically) ──
    r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens, system, messages: [{ role: 'user', content: msg }] }),
    });
  }
  const d = await r.json();
  console.log('API response:', JSON.stringify(d).slice(0,300));
  if (d.error) throw new Error(JSON.stringify(d.error));
  if (!d.content?.[0]?.text) throw new Error('No content in response: ' + JSON.stringify(d).slice(0,200));
  return d.content[0].text.trim().replace(/^```json\s*/i,'').replace(/```\s*$/i,'').trim();
}



function openPrint(plan, form) {
  const tc = t => TYPE_C[t]||TYPE_C.perennial;
  const body = `
    <div style="color:#7A9E7E;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px">🌿 Year-Round Bloom Plan · Zone ${form.zone} · ${form.style} · ${form.sun}</div>
    <h1 style="font-family:'Playfair Display',serif;font-size:32px;font-weight:400;margin-bottom:8px">Bloom <em style="color:#C4622D;font-style:italic">all</em> year long</h1>
    <div style="font-size:13px;color:#4a5d4e;line-height:1.7;margin-bottom:24px;border-left:3px solid #7A9E7E;padding-left:12px">${plan.gardenSummary}</div>
    <h2 style="font-family:'Playfair Display',serif;font-size:18px;font-weight:400;margin:22px 0 10px;padding-bottom:5px;border-bottom:1.5px solid #E8E4DC">📅 Bloom Calendar</h2>
    <table style="border-collapse:separate;border-spacing:2px;width:100%">
      <thead><tr><td style="font-size:11px;font-weight:500;padding-right:6px;width:130px"></td>${MO.map(m=>`<td style="font-size:8px;color:#6B7B6C;font-weight:600;letter-spacing:.5px;text-align:center;padding:2px 0">${m}</td>`).join('')}</tr></thead>
      <tbody>${plan.plants.map(p=>`<tr><td style="font-size:11px;font-weight:500;padding-right:6px;white-space:nowrap;max-width:130px;overflow:hidden;text-overflow:ellipsis">${p.name}</td>${MO.map((_,i)=>`<td style="background:${(p.bloomMonths||[]).includes(i+1)?p.bloomColor||tc(p.type).bar:'#F0ECE5'};width:24px;height:14px;border-radius:2px"></td>`).join('')}</tr>`).join('')}</tbody>
    </table>
    <h2 style="font-family:'Playfair Display',serif;font-size:18px;font-weight:400;margin:22px 0 10px;padding-bottom:5px;border-bottom:1.5px solid #E8E4DC">🌿 Your Plants (${plan.plants.length})</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">
      ${plan.plants.map(p=>{const c=tc(p.type);return`<div style="border:1px solid #E8E4DC;border-radius:8px;padding:11px;break-inside:avoid">
        <div style="font-weight:600;font-size:13px">${p.name}</div>
        <div style="font-style:italic;font-size:11px;color:#6B7B6C;margin-top:1px">${p.scientificName}</div>
        <div style="display:flex;gap:2px;flex-wrap:wrap;margin-top:5px">${MO.map((m,i)=>{const bl=(p.bloomMonths||[]).includes(i+1);const bg=bl?p.bloomColor||c.bar:'#F0ECE5';return`<div style="width:18px;height:12px;border-radius:3px;font-size:7px;font-weight:700;color:${bl?getContrastColor(bg):'#999'};background:${bg};display:flex;align-items:center;justify-content:center">${m[0]}</div>`;}).join('')}</div>
        ${p.plantingTip?`<div style="font-size:11px;color:#6B7B6C;margin-top:5px;line-height:1.5"><strong>Tip:</strong> ${p.plantingTip}</div>`:''}
      </div>`;}).join('')}
    </div>
    <h2 style="font-family:'Playfair Display',serif;font-size:18px;font-weight:400;margin:22px 0 10px;padding-bottom:5px;border-bottom:1.5px solid #E8E4DC">💡 Seasonal Tasks</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">
      ${[{k:'spring',ic:'🌱',l:'Spring'},{k:'summer',ic:'☀️',l:'Summer'},{k:'fall',ic:'🍂',l:'Fall'},{k:'winter',ic:'❄️',l:'Winter'}].map(s=>`<div style="background:#EBF2EC;border-radius:8px;padding:11px"><div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7A9E7E;margin-bottom:4px">${s.ic} ${s.l}</div><div style="font-size:11.5px;color:#1A3028;line-height:1.6">${plan.seasonalTips?.[s.k]||''}</div></div>`).join('')}
    </div>
    <p style="margin-top:16px;font-size:12px;color:#6B7B6C;font-style:italic">${plan.continuityNote}</p>
    <div style="margin-top:24px;padding-top:10px;border-top:1px solid #E8E4DC;font-size:10px;color:#b0bdb1;text-align:center">Generated by Bloom Planner · Your personalized year-round garden plan</div>
  `;
  const html = `<!DOCTYPE html><html><head><title>Bloom Plan – Zone ${form.zone}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap">
    <style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif;color:#1A3028;padding:32px 40px;max-width:900px;font-size:13px}@media print{@page{margin:1cm}}</style>
  </head><body>${body}</body></html>`;
  const win = window.open('', '_blank');
  if (!win) { alert('Please allow pop-ups to use Print / PDF.'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
  win.print();
}


const storage = {
  set: async (key, value) => {
    try { if (window.storage) await window.storage.set(key, value); return; } catch(e) {}
    localStorage.setItem(key, value);
  },
  get: async (key) => {
    try { if (window.storage) return await window.storage.get(key); } catch(e) {}
    const v = localStorage.getItem(key);
    return v ? { value: v } : null;
  },
  list: async (prefix) => {
    try { if (window.storage) return await window.storage.list(prefix); } catch(e) {}
    const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
    return { keys };
  },
  delete: async (key) => {
    try { if (window.storage) { await window.storage.delete(key); return; } } catch(e) {}
    localStorage.removeItem(key);
  }
};

async function getSaved() {
  try {
    const r = await storage.list('gplan-');
    const plans = [];
    for (const k of (r?.keys||[])) {
      try { const x = await storage.get(k); if(x) plans.push({key:k,...JSON.parse(x.value)}); } catch(e){}
    }
    return plans.sort((a,b)=>b.savedAt-a.savedAt);
  } catch(e){ return []; }
}

/* ── MAIN ─────────────────────────────────────────────────────────────────── */
export default function GardenPlanner() {
  const [screen,   setScreen]   = useState('welcome');
  const [step,     setStep]     = useState(0);
  const [form,     setForm]     = useState({zone:'',sun:'',size:'',style:'',colors:[]});
  const [plan,     setPlan]     = useState(null);
  const [loadMsg,  setLoadMsg]  = useState('Consulting the botanists...');
  const [toast,    setToast]    = useState('');
  const [saved,    setSaved]    = useState([]);
  const [showSaved,setShowSaved]= useState(false);

  const [photos,   setPhotos]   = useState({});
  const [shareUrl, setShareUrl] = useState('');
  const [errMsg,   setErrMsg]   = useState('');
  const [errorLog, setErrorLog] = useState([]);
  const [showLog,  setShowLog]  = useState(false);

  const logError = (label, e) => {
    const entry = `[${new Date().toLocaleTimeString()}] ${label}: ${e?.message||String(e)}`;
    setErrorLog(prev => [entry, ...prev].slice(0, 50));
  };

  useEffect(()=>{
    if (!window.location.hash) return;
    try { const d=JSON.parse(atob(window.location.hash.slice(1))); if(d.plan&&d.form){setForm(d.form);setPlan(d.plan);setScreen('results');} } catch(e){}
  },[]);

  useEffect(()=>{
    if (screen!=='loading') return;
    const msgs=['Consulting the botanists...','Matching plants to your zone...','Planning your bloom calendar...','Selecting perfect companions...','Crafting your garden story...'];
    let i=0; const id=setInterval(()=>{i=(i+1)%msgs.length;setLoadMsg(msgs[i]);},2200);
    return()=>clearInterval(id);
  },[screen]);

  const flash = msg => { setToast(msg); setTimeout(()=>setToast(''),2500); };

  const canGo=()=>{
    if(step===0)return!!form.zone; if(step===1)return!!form.sun;
    if(step===2)return!!form.size&&!!form.style; if(step===3)return form.colors.length>0; return true;
  };

  const generate=async()=>{
    setScreen('loading');
    const prompt=`Create a year-round bloom garden plan for Zone ${form.zone}, ${form.sun}, ${form.size}, ${form.style}, colors: ${form.colors.join(', ')}.
Return ONLY raw JSON: {"gardenSummary":"2-3 sentence intro","continuityNote":"1 sentence","plants":[{"name":"","scientificName":"","type":"perennial","bloomMonths":[5,6,7],"bloomColor":"#hex","height":"","sunNeeds":"","plantingTip":"","whyItWorks":""}],"seasonalTips":{"spring":"","summer":"","fall":"","winter":""}}
Exactly 18 plants. type: annual|perennial|bulb|shrub|tree. Ensure meaningful bloom coverage every month for Zone ${form.zone}.`;
    try {
      const raw=await callClaude('You are an expert horticulturist. Respond with valid JSON only.',prompt, 8000);
      setPlan(JSON.parse(raw)); setScreen('results');
    } catch(e){logError('Generate',e);setErrMsg(e.message||String(e));setScreen('error');}
  };

  const savePlan=async()=>{
    try {
      await storage.set(`gplan-${Date.now()}`,JSON.stringify({plan,form,savedAt:Date.now(),label:`Zone ${form.zone} · ${form.style}`}));
      flash('✓ Plan saved!');
    } catch(e){logError('Save',e);flash('Save failed: ' + (e?.message||String(e)));}
  };

  const sharePlan=()=>{
    try {
      const enc=btoa(unescape(encodeURIComponent(JSON.stringify({plan,form}))));
      const url=`${window.location.origin}${window.location.pathname}#${enc}`;
      navigator.clipboard.writeText(url)
        .then(()=>flash('✓ Link copied!'))
        .catch(()=>setShareUrl(url)); // clipboard blocked (e.g. artifact sandbox) — show URL for manual copy
    } catch(e){logError('Share',e);flash('Share failed');}
  };

  const loadSaved=async()=>{setSaved(await getSaved());setShowSaved(true);};
  const deleteSaved=async(key,e)=>{e.stopPropagation();try{await storage.delete(key);}catch(e){}setSaved(s=>s.filter(p=>p.key!==key));};
  const loadPlan=p=>{setForm(p.form);setPlan(p.plan);setPhotos({});setShowSaved(false);setScreen('results');};

  const next=()=>step<STEPS.length-1?setStep(s=>s+1):generate();
  const back=()=>step===0?setScreen('welcome'):setStep(s=>s-1);
  const restart=()=>{setScreen('welcome');setStep(0);setForm({zone:'',sun:'',size:'',style:'',colors:[]});setPlan(null);setPhotos({});window.location.hash='';};

  return (
    <div className="app">
      <style>{G}</style>
      {/* ── ERROR LOG PANEL ── */}
      <div style={{position:'fixed',bottom:'12px',right:'12px',zIndex:9999}}>
        <button onClick={()=>setShowLog(v=>!v)} style={{background:'#1A3028',color:'#fff',border:'none',borderRadius:'100px',padding:'7px 14px',fontSize:'12px',cursor:'pointer',opacity:.7,fontFamily:'DM Sans,sans-serif'}}>
          {showLog ? '✕ Close Log' : `🐛 Log${errorLog.length?` (${errorLog.length})`:''}` }
        </button>
        {showLog&&(
          <div style={{position:'absolute',bottom:'36px',right:0,width:'320px',maxHeight:'260px',overflowY:'auto',background:'#1A3028',border:'1px solid rgba(255,255,255,.15)',borderRadius:'12px',padding:'12px',fontFamily:'monospace',fontSize:'11px',color:'rgba(245,240,232,.85)'}}>
            {errorLog.length===0
              ? <p style={{color:'rgba(245,240,232,.4)',textAlign:'center',margin:'8px 0'}}>No errors logged yet.</p>
              : errorLog.map((e,i)=><div key={i} style={{marginBottom:'8px',borderBottom:'1px solid rgba(255,255,255,.08)',paddingBottom:'8px',lineHeight:'1.5',wordBreak:'break-word'}}>{e}</div>)
            }
          </div>
        )}
      </div>
      {screen==='welcome'&&<Welcome onStart={()=>setScreen('onboarding')} onSaved={loadSaved} showSaved={showSaved} saved={saved} onLoad={loadPlan} onDelete={deleteSaved} onClose={()=>setShowSaved(false)}/>}
      {screen==='onboarding'&&<Onboard step={step} form={form} setForm={setForm} onNext={next} onBack={back} canGo={canGo()}/>}
      {screen==='loading'&&<Loading msg={loadMsg}/>}
      {screen==='error'&&<ErrorScreen msg={errMsg} onRetry={()=>{setScreen('onboarding');setStep(3);}} />}
      {screen==='results'&&plan&&<Results plan={plan} form={form} onRestart={restart} onSave={savePlan} onShare={sharePlan} onPrint={()=>openPrint(plan,form)} toast={toast} shareUrl={shareUrl} onDismissShare={()=>setShareUrl('')}/>}
    </div>
  );
}

/* ── WELCOME ──────────────────────────────────────────────────────────────── */
function Welcome({onStart,onSaved,showSaved,saved,onLoad,onDelete,onClose}){
  return(
    <div className="wel">
      <div className="wel-bg"/>
      {showSaved&&(
        <div className="saved-panel">
          <button className="saved-back" onClick={onClose}>← Back</button>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'26px',color:'var(--cream)',fontWeight:'400',marginBottom:'6px'}}>My Saved Plans</h2>
          <p style={{fontSize:'13px',color:'rgba(245,240,232,.5)',marginBottom:'20px'}}>Tap a plan to load it</p>
          {saved.length===0&&<p style={{color:'rgba(245,240,232,.4)',fontSize:'14px',marginTop:'24px',textAlign:'center'}}>No saved plans yet</p>}
          {saved.map(p=>(
            <div key={p.key} className="saved-item" onClick={()=>onLoad(p)}>
              <div><div className="saved-nm">{p.label||`Zone ${p.form?.zone}`}</div><div className="saved-dt">{p.savedAt?new Date(p.savedAt).toLocaleDateString():''}</div></div>
              <button className="del-btn" onClick={e=>onDelete(p.key,e)}>✕</button>
            </div>
          ))}
        </div>
      )}
      <div style={{position:'relative',textAlign:'center'}}><div className="wel-icon">🌸</div></div>
      <div style={{position:'relative',textAlign:'center'}}>
        <h1 className="wel-h">Bloom <em>all</em><br/>year long</h1>
        <p className="wel-sub">Your personalized year-round garden plan,<br/>crafted for your zone, style & taste.</p>
      </div>
      <div style={{position:'relative',width:'100%'}}>
        <button className="btn-p" onClick={onStart}>Start My Garden Plan ✦</button>
        <button className="btn-ghost" onClick={onSaved}>📂 My Saved Plans</button>
        <p style={{textAlign:'center',color:'rgba(245,240,232,.3)',fontSize:'12px',marginTop:'14px'}}>Takes about 2 minutes</p>
      </div>
    </div>
  );
}

/* ── ONBOARDING ───────────────────────────────────────────────────────────── */
function Onboard({step,form,setForm,onNext,onBack,canGo}){
  return(
    <div className="ob">
      <div className="ob-hd">
        <div className="prog">{STEPS.map((_,i)=><div key={i} className={`prog-d ${i<=step?'on':''}`}/>)}</div>
        <div className="step-lbl">Step {step+1} of {STEPS.length} · {STEPS[step].lbl}</div>
        <div className="step-ttl">{STEPS[step].ttl}</div>
      </div>
      <div className="ob-body">
        {step===0&&<ZoneStep form={form} setForm={setForm}/>}
        {step===1&&<SunStep form={form} setForm={setForm}/>}
        {step===2&&<StyleStep form={form} setForm={setForm}/>}
        {step===3&&<ColorStep form={form} setForm={setForm}/>}
      </div>
      <div className="ob-foot">
        <button className="btn-bk" onClick={onBack}>{step===0?'✕':'←'}</button>
        <button className="btn-nx" onClick={onNext} disabled={!canGo}>{step===STEPS.length-1?'Generate My Plan 🌱':'Continue →'}</button>
      </div>
    </div>
  );
}

function ZoneStep({form,setForm}){
  return(
    <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
      <select className="zone-sel" value={form.zone} onChange={e=>setForm(f=>({...f,zone:e.target.value}))}>
        <option value="">Select your USDA zone...</option>
        {Array.from({length:13},(_,i)=>i+1).map(z=><option key={z} value={String(z)}>Zone {z}</option>)}
      </select>
      {form.zone&&<div className="zone-hint"><strong>Zone {form.zone}:</strong> {ZONE_DESC[form.zone]}</div>}
      <p style={{fontSize:'13px',color:'#aaa'}}>Not sure? Search "USDA hardiness zone" + your zip code.</p>
    </div>
  );
}
function SunStep({form,setForm}){
  const opts=[{v:'full sun',em:'☀️',lb:'Full Sun',ds:'6+ hours direct sunlight'},{v:'partial shade',em:'⛅',lb:'Partial Sun / Shade',ds:'3–6 hours of direct sun'},{v:'full shade',em:'🌥️',lb:'Full Shade',ds:'Less than 3 hours direct sun'}];
  return(<div className="opt-grid">{opts.map(o=><div key={o.v} className={`opt-card ${form.sun===o.v?'sel':''}`} onClick={()=>setForm(f=>({...f,sun:o.v}))}><span className="opt-em">{o.em}</span><div><div className="opt-lbl">{o.lb}</div><div className="opt-desc">{o.ds}</div></div></div>)}</div>);
}
function StyleStep({form,setForm}){
  const sizes=[{v:'container',em:'🪴',lb:'Container / Patio',ds:'Pots & planters'},{v:'small bed',em:'🌿',lb:'Small Bed',ds:'Under 50 sq ft'},{v:'medium garden',em:'🌻',lb:'Medium Garden',ds:'50–200 sq ft'},{v:'large garden',em:'🏡',lb:'Large Garden',ds:'Over 200 sq ft'}];
  const styles=[{v:'cottage garden',em:'🌹',lb:'Cottage Garden',ds:'Romantic, abundant'},{v:'formal garden',em:'🌷',lb:'Formal / Structured',ds:'Clean lines, symmetry'},{v:'pollinator garden',em:'🐝',lb:'Pollinator Haven',ds:'Natives, bees & butterflies'},{v:'naturalistic',em:'🌾',lb:'Naturalistic / Wild',ds:'Meadow-inspired, relaxed'}];
  return(
    <div style={{display:'flex',flexDirection:'column',gap:'22px'}}>
      <div><div className="sec-lbl">Garden Size</div>
        <div className="opt-grid" style={{gridTemplateColumns:'1fr 1fr'}}>{sizes.map(s=><div key={s.v} className={`opt-card ${form.size===s.v?'sel':''}`} onClick={()=>setForm(f=>({...f,size:s.v}))} style={{flexDirection:'column',alignItems:'flex-start',padding:'14px'}}><span style={{fontSize:'22px'}}>{s.em}</span><div className="opt-lbl" style={{fontSize:'13px',marginTop:'6px'}}>{s.lb}</div><div className="opt-desc" style={{fontSize:'11px'}}>{s.ds}</div></div>)}</div>
      </div>
      <div><div className="sec-lbl">Garden Style</div>
        <div className="opt-grid">{styles.map(s=><div key={s.v} className={`opt-card ${form.style===s.v?'sel':''}`} onClick={()=>setForm(f=>({...f,style:s.v}))}><span className="opt-em" style={{fontSize:'22px'}}>{s.em}</span><div><div className="opt-lbl" style={{fontSize:'13px'}}>{s.lb}</div><div className="opt-desc" style={{fontSize:'11px'}}>{s.ds}</div></div></div>)}</div>
      </div>
    </div>
  );
}
function ColorStep({form,setForm}){
  const opts=[{v:'warm tones',em:'🌹',lb:'Warm Tones',ds:'Reds, oranges, golds'},{v:'cool tones',em:'💜',lb:'Cool Tones',ds:'Blues, purples, lavender'},{v:'white & cream',em:'🤍',lb:'White & Cream',ds:'Soft, elegant neutrals'},{v:'bright & bold',em:'🌈',lb:'Bright & Bold',ds:'High-contrast mixed'},{v:'pastel',em:'🌸',lb:'Pastels',ds:'Soft, dreamy hues'},{v:'wildflower',em:'🌼',lb:'Wildflower',ds:'Natural, native palette'}];
  const tog=v=>setForm(f=>({...f,colors:f.colors.includes(v)?f.colors.filter(c=>c!==v):[...f.colors,v]}));
  return(<div><p style={{fontSize:'14px',color:'#999',marginBottom:'14px'}}>Select all that apply</p>{opts.map(o=>{const sel=form.colors.includes(o.v);return(<div key={o.v} className={`multi-opt ${sel?'sel':''}`} onClick={()=>tog(o.v)}><div className={`chk ${sel?'on':''}`}>{sel?'✓':''}</div><span style={{fontSize:'20px'}}>{o.em}</span><div><div style={{fontWeight:'500',fontSize:'14px',color:'var(--deep)'}}>{o.lb}</div><div style={{fontSize:'12px',color:'var(--muted)'}}>{o.ds}</div></div></div>);})}</div>);
}

/* ── LOADING ──────────────────────────────────────────────────────────────── */
function ErrorScreen({msg, onRetry}){
  return(
    <div className="load">
      <div style={{fontSize:'52px'}}>🌧️</div>
      <div style={{textAlign:'center'}}>
        <p style={{fontFamily:'Playfair Display,serif',fontSize:'22px',color:'var(--cream)',fontStyle:'italic',marginBottom:'12px'}}>Something went wrong</p>
        <p style={{color:'rgba(245,240,232,.6)',fontSize:'13px',maxWidth:'300px',lineHeight:'1.6',marginBottom:'6px'}}>The garden plan could not be generated.</p>
        {msg&&<p style={{color:'rgba(245,240,232,.4)',fontSize:'11px',maxWidth:'320px',wordBreak:'break-all',marginTop:'8px',background:'rgba(0,0,0,.2)',padding:'10px',borderRadius:'8px'}}>{msg}</p>}
      </div>
      <button className="btn-p" style={{maxWidth:'260px'}} onClick={onRetry}>← Try Again</button>
    </div>
  );
}

function Loading({msg}){
  return(
    <div className="load">
      <div style={{display:'flex',gap:'10px'}}>{['🌷','🌸','🌼','🌺','🌻'].map((f,i)=><span key={i} className="lf" style={{animationDelay:`${i*.2}s`}}>{f}</span>)}</div>
      <div>
        <p style={{fontFamily:'Playfair Display,serif',fontSize:'26px',color:'var(--cream)',textAlign:'center',fontStyle:'italic'}}>{msg}</p>
        <p style={{color:'rgba(245,240,232,.55)',fontSize:'14px',textAlign:'center',fontWeight:'300',marginTop:'8px'}}>Your personalized bloom plan is growing...</p>
      </div>
    </div>
  );
}

/* ── RESULTS ──────────────────────────────────────────────────────────────── */
function Results({plan,form,onRestart,onSave,onShare,onPrint,toast,shareUrl,onDismissShare}){
  const [tab,setTab]=useState('calendar');
  return(
    <div className="res">
      {shareUrl&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
          <div style={{background:'var(--white)',borderRadius:'16px',padding:'24px',width:'100%',maxWidth:'400px'}}>
            <p style={{fontFamily:'Playfair Display,serif',fontSize:'18px',color:'var(--deep)',marginBottom:'6px'}}>Copy your share link</p>
            <p style={{fontSize:'13px',color:'var(--muted)',marginBottom:'14px'}}>Select the text below and copy it manually.</p>
            <input readOnly value={shareUrl} onFocus={e=>e.target.select()} style={{width:'100%',padding:'11px 13px',border:'1.5px solid var(--border)',borderRadius:'10px',fontFamily:'DM Sans,sans-serif',fontSize:'12px',color:'var(--deep)',background:'var(--cream)',wordBreak:'break-all'}}/>
            <button onClick={onDismissShare} style={{marginTop:'14px',width:'100%',background:'var(--forest)',color:'#fff',border:'none',padding:'13px',borderRadius:'100px',fontFamily:'DM Sans,sans-serif',fontSize:'14px',fontWeight:'500',cursor:'pointer'}}>Done</button>
          </div>
        </div>
      )}
      <div className="res-hd">
        <div className="zone-badge">🌍 Zone {form.zone} · {form.style}</div>
        <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'32px',color:'var(--cream)',fontWeight:'400',lineHeight:'1.2'}}>Your Year-Round<br/>Bloom Garden</h2>
        <p className="res-sum">{plan.gardenSummary}</p>
        <div className="act-bar">
          <button className={`act-btn ${toast?'ok':''}`} onClick={onSave}>💾 {toast||'Save'}</button>
          <button className="act-btn" onClick={onShare}>🔗 Share</button>
          <button className="act-btn" onClick={onPrint}>🖨️ Print / PDF</button>
        </div>
      </div>
      <div className="tab-bar">
        {[{id:'calendar',lb:'📅 Calendar'},{id:'plants',lb:'🌿 Plants'},{id:'tips',lb:'💡 Seasonal'}].map(t=>(
          <button key={t.id} className={`tab-btn ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>{t.lb}</button>
        ))}
      </div>
      {tab==='calendar'&&<BloomCalendar plants={plan.plants}/>}
      {tab==='plants'&&<PlantList plants={plan.plants}/>}
      {tab==='tips'&&<SeasonalTips tips={plan.seasonalTips}/>}
      <div className="res-foot">
        <p style={{fontSize:'13px',color:'var(--muted)',textAlign:'center',marginBottom:'16px',lineHeight:'1.5',fontStyle:'italic'}}>{plan.continuityNote}</p>
        <button className="btn-rst" onClick={onRestart}>🔄 Plan a New Garden</button>
      </div>
    </div>
  );
}

/* ── BLOOM CALENDAR ───────────────────────────────────────────────────────── */
function BloomCalendar({plants}){
  return(
    <div className="sec">
      <h3 className="sec-ttl">🌸 Bloom Calendar</h3>
      <div className="legend">{Object.entries(TYPE_C).map(([t,c])=><div key={t} className="leg-i"><div className="leg-d" style={{background:c.bar}}/>{t}</div>)}</div>
      <p style={{fontSize:'12px',color:'#ccc',marginBottom:'14px'}}>← Scroll to see all months</p>
      <div className="cal-wrap"><div className="cal-tbl">
        <div className="cal-hd"><div/>{MO.map(m=><div key={m} className="cal-mth">{m}</div>)}</div>
        {plants.map((pl,pi)=>{
          const bs=new Set(pl.bloomMonths||[]);
          return(<div key={pi} className="cal-row">
            <div className="cal-nm" title={pl.name}>{pl.name}</div>
            {Array.from({length:12},(_,mi)=>{const mo=mi+1,bl=bs.has(mo),pr=bs.has(mo-1),nx=bs.has(mo+1);let cls='';if(bl){if(!pr&&!nx)cls='solo';else if(!pr)cls='first';else if(!nx)cls='last';}return <div key={mi} className={`cal-c ${bl?`bl ${cls}`:''}`} style={bl?{background:pl.bloomColor,opacity:.85}:{}}/>;})}</div>);
        })}
      </div></div>
    </div>
  );
}

/* ── PLANT LIST ───────────────────────────────────────────────────────────── */
function PlantList({plants}){
  const [open,setOpen]=useState(null);
  const toggle=i=>setOpen(open===i?null:i);

  return(
    <div className="sec">
      <h3 className="sec-ttl">🌿 Your Plants ({plants.length})</h3>
      {plants.map((pl,i)=>{
        const tc=TYPE_C[pl.type]||TYPE_C.perennial;
        const exp=open===i;
        const bloomPct=Math.round(((pl.bloomMonths||[]).length/12)*100);

        return(
          <div key={i} className="pc" style={{borderColor:exp?tc.bar:'#EEE8DE'}}>
            {/* HEADER — always visible */}
            <div className="pc-hdr" onClick={()=>toggle(i)}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'50%',background:pl.bloomColor||tc.bar,flexShrink:0,boxShadow:`0 2px 8px ${pl.bloomColor||tc.bar}55`}}/>
                <div>
                  <div className="pc-nm">{pl.name}</div>
                  <div className="pc-sci">{pl.scientificName}</div>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'5px'}}>
                <div className="pc-badge" style={{background:tc.bg,color:tc.tx}}>{pl.type}</div>
                <span style={{fontSize:'11px',color:'#ccc'}}>{exp?'▲':'▼'}</span>
              </div>
            </div>

            {/* MONTH CHIPS — always visible */}
            <div className="pc-months" onClick={()=>toggle(i)}>
              {MO.map((m,mi)=>{
                const bl=(pl.bloomMonths||[]).includes(mi+1);
                const bg=pl.bloomColor||tc.bar;
                return <div key={mi} className={`mchip ${bl?'':'off'}`} style={bl?{background:bg,color:getContrastColor(bg)}:{}}>{m[0]}</div>;
              })}
            </div>

            {/* EXPANDED DETAIL */}
            {exp&&(
              <div className="pc-detail">

                {/* BLOOM COLOR + SEASON BAR */}
                <div style={{background:'#F8F5F0',borderRadius:'12px',padding:'14px',marginBottom:'12px'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                    <span style={{fontSize:'11px',fontWeight:'600',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'1px'}}>Bloom Color</span>
                    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <div style={{width:'22px',height:'22px',borderRadius:'50%',background:pl.bloomColor||tc.bar,boxShadow:`0 1px 4px ${pl.bloomColor||tc.bar}66`}}/>
                      <span style={{fontSize:'12px',color:'var(--muted)',fontWeight:'500'}}>{hexToColorName(pl.bloomColor||tc.bar)}</span>
                    </div>
                  </div>
                  <div style={{fontSize:'11px',fontWeight:'600',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'6px'}}>Bloom Season — {bloomPct}% of year</div>
                  <div style={{display:'flex',gap:'2px',height:'8px',borderRadius:'4px',overflow:'hidden'}}>
                    {Array.from({length:12},(_,mi)=>{
                      const bl=(pl.bloomMonths||[]).includes(mi+1);
                      return <div key={mi} style={{flex:1,background:bl?pl.bloomColor||tc.bar:'#E8E4DC',borderRadius:'1px'}}/>;
                    })}
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:'3px'}}>
                    <span style={{fontSize:'9px',color:'#ccc'}}>Jan</span>
                    <span style={{fontSize:'9px',color:'#ccc'}}>Dec</span>
                  </div>
                </div>

                {/* STATS ROW */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'12px'}}>
                  <StatChip icon="↕" label="Height" value={pl.height||'Varies'}/>
                  <StatChip icon="☀️" label="Sun" value={pl.sunNeeds||'—'}/>
                  <StatChip icon="📅" label="Blooms" value={`${(pl.bloomMonths||[]).length} mo`}/>
                </div>

                {/* PLANTING TIP */}
                {pl.plantingTip&&(
                  <div style={{marginBottom:'10px'}}>
                    <div className="det-lbl">Planting Tip</div>
                    <div className="det-txt">{pl.plantingTip}</div>
                  </div>
                )}

                {/* WHY IT WORKS */}
                {pl.whyItWorks&&(
                  <div>
                    <div className="det-lbl">Why It Works</div>
                    <div className="det-txt">{pl.whyItWorks}</div>
                  </div>
                )}

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatChip({icon,label,value}){
  return(
    <div style={{background:'#F8F5F0',borderRadius:'10px',padding:'10px 8px',textAlign:'center'}}>
      <div style={{fontSize:'16px',marginBottom:'3px'}}>{icon}</div>
      <div style={{fontSize:'9px',fontWeight:'600',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:'3px'}}>{label}</div>
      <div style={{fontSize:'11px',fontWeight:'500',color:'var(--deep)',lineHeight:'1.3'}}>{value}</div>
    </div>
  );
}

/* ── SEASONAL TIPS ────────────────────────────────────────────────────────── */
function SeasonalTips({tips}){
  return(
    <div className="sec">
      <h3 className="sec-ttl">💡 Seasonal Tasks</h3>
      <div className="seas-grid">
        {[{k:'spring',ic:'🌱',lb:'Spring'},{k:'summer',ic:'☀️',lb:'Summer'},{k:'fall',ic:'🍂',lb:'Fall'},{k:'winter',ic:'❄️',lb:'Winter'}].map(s=>(
          <div key={s.k} className="seas-card"><div className="seas-icon">{s.ic}</div><div className="seas-lbl">{s.lb}</div><div className="seas-txt">{tips?.[s.k]}</div></div>
        ))}
      </div>
    </div>
  );
}
