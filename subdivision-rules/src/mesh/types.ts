// Geometry Helpers
export type Vec2 = { x: number; y: number };

export const V = {
  add: (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y }),
  sub: (a: Vec2, b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y }),
  scale: (a: Vec2, s: number): Vec2 => ({ x: a.x * s, y: a.y * s }),
  dot: (a: Vec2, b: Vec2): number => a.x * b.x + a.y * b.y,
  cross: (a: Vec2, b: Vec2): number => a.x * b.y - a.y * b.x,
  len: (a: Vec2): number => Math.hypot(a.x, a.y),
  norm: (a: Vec2): Vec2 => {
    const L = Math.hypot(a.x, a.y);
    return L === 0 ? { x: 0, y: 0 } : { x: a.x / L, y: a.y / L };
  },
  rot: (a: Vec2, ang: number): Vec2 => {
    const c = Math.cos(ang), s = Math.sin(ang);
    return { x: c * a.x - s * a.y, y: s * a.x + c * a.y };
  },
};


export type Vertex = { 
    id: number; 
    x: number; y: number; 
    birth: number 
};

export type Edge = {
  key: string;
  a: number;
  b: number;
  birth: number;
  type?: "thin" | "thick";
};

export type Face = {
  id: number;
  verts: number[];         // ordered boundary
  birth: number;
  parent?: number;
  children?: number[];
  type?: "tri" | "quad" | "pent";
};

export type MeshState = {
  step: number;
  vertices: Map<number, Vertex>;
  edges: Map<string, Edge>;
  faces: Map<number, Face>;
  newEdges: string[];
  newFaces: number[];
};
