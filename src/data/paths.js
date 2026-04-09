export const PATHS = {
  mainEW:      [{x:0,y:163},{x:152,y:163},{x:272,y:163},{x:386,y:163},{x:560,y:163}],
  b188NS:      [{x:152,y:14},{x:152,y:163},{x:152,y:314}],
  porscheStr:  [{x:160,y:226},{x:272,y:226},{x:386,y:226}],
  vwRoad:      [{x:382,y:4},{x:382,y:114},{x:382,y:163}],
  secondaryEW: [{x:0,y:193},{x:152,y:193},{x:272,y:193},{x:560,y:193}],
  arenaRoad:   [{x:4,y:250},{x:148,y:250},{x:152,y:193}],
}

export const DOT_CFGS = [
  {p:'mainEW',      s:.00058,  t:.06,  type:'car'},
  {p:'mainEW',      s:-.00049, t:.52,  type:'car'},
  {p:'mainEW',      s:.00065,  t:.81,  type:'car'},
  {p:'b188NS',      s:.00085,  t:.22,  type:'car'},
  {p:'b188NS',      s:-.00068, t:.72,  type:'car'},
  {p:'vwRoad',      s:.0011,   t:.18,  type:'car'},
  {p:'secondaryEW', s:-.00059, t:.44,  type:'car'},
  {p:'arenaRoad',   s:.00095,  t:.3,   type:'car'},
  {p:'porscheStr',  s:.00048,  t:.12,  type:'ped'},
  {p:'porscheStr',  s:-.00041, t:.48,  type:'ped'},
  {p:'porscheStr',  s:.00043,  t:.76,  type:'ped'},
  {p:'mainEW',      s:.00031,  t:.33,  type:'ped'},
  {p:'arenaRoad',   s:-.00038, t:.62,  type:'ped'},
]

export function buildMeta(pts) {
  const lens = []
  let total = 0
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i+1].x - pts[i].x, pts[i+1].y - pts[i].y)
    lens.push(l)
    total += l
  }
  return { lens, total }
}

export function pathPos(pts, meta, t) {
  let tgt = t * meta.total, cum = 0
  for (let i = 0; i < meta.lens.length; i++) {
    if (cum + meta.lens[i] >= tgt - 0.001) {
      const st = Math.max(0, Math.min(1, (tgt - cum) / meta.lens[i]))
      return {
        x: pts[i].x + (pts[i+1].x - pts[i].x) * st,
        y: pts[i].y + (pts[i+1].y - pts[i].y) * st,
      }
    }
    cum += meta.lens[i]
  }
  return pts[pts.length - 1]
}
