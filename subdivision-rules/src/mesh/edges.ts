import type { MeshState, Edge } from "./types";

export function edgeKey(a: number, b: number) {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

/** Rebuild edges from faces. Marks edges that appear for the first time as birth=state.step. */
export function rebuildEdges(state: MeshState) {
  const prev = state.edges;
  const next = new Map<string, Edge>();
  const newEdges: string[] = [];

  for (const f of state.faces.values()) {
    const n = f.verts.length;
    for (let i = 0; i < n; i++) {
      const a = f.verts[i];
      const b = f.verts[(i + 1) % n];
      const key = edgeKey(a, b);

      if (!next.has(key)) {
        const old = prev.get(key);
        if (old) {
          next.set(key, old);
        } else {
          next.set(key, { key, a, b, birth: state.step });
          newEdges.push(key);
        }
      }
    }
  }

  state.edges = next;
  state.newEdges = newEdges;
}
