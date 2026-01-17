import type { MeshState, Vertex, Face } from "./types";
import { rebuildEdges } from "./edges";

let VID = 100000;
let FID = 100000;

function midpoint(a: Vertex, b: Vertex, birth: number): Vertex {
  return { id: VID++, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, birth };
}

export function subdivide(state: MeshState): MeshState {
  const step = state.step + 1;

  // clone maps 
  const vertices = new Map(state.vertices);
  const faces = new Map<number, Face>();
  const newFaces: number[] = [];

    for (const parent of state.faces.values()) {
        if (parent.type == "tri") {

        }
        else if (parent.type == "quad") {
            
        }
        else if (parent.type == "pent") {

        }
        else {
            // pass (although this shouldnt happen)
            faces.set(parent.id, parent);
            continue;
        }

        const v = parent.verts.map(id => vertices.get(id)!);
        const [v0, v1, v2, v3] = v;

        const m01 = midpoint(v0, v1, step);
        const m12 = midpoint(v1, v2, step);
        const m23 = midpoint(v2, v3, step);
        const m30 = midpoint(v3, v0, step);

        const c: Vertex = {
        id: VID++,
        x: (v0.x + v1.x + v2.x + v3.x) / 4,
        y: (v0.y + v1.y + v2.y + v3.y) / 4,
        birth: step,
        };

        [m01, m12, m23, m30, c].forEach(p => vertices.set(p.id, p));

        const childIds: number[] = [];

        // 4 children around center (ordered)
        const kids: Face[] = [
        { id: FID++, verts: [v0.id, m01.id, c.id,  m30.id], birth: step, parent: parent.id, type: "quad" },
        { id: FID++, verts: [m01.id, v1.id, m12.id, c.id],  birth: step, parent: parent.id, type: "quad" },
        { id: FID++, verts: [c.id,  m12.id, v2.id, m23.id], birth: step, parent: parent.id, type: "quad" },
        { id: FID++, verts: [m30.id, c.id,  m23.id, v3.id], birth: step, parent: parent.id, type: "quad" },
        ];

        for (const k of kids) {
        faces.set(k.id, k);
        childIds.push(k.id);
        newFaces.push(k.id);
        }

        // Optional: store children list on parent (useful for ancestry hover later)
        parent.children = childIds;
    }

    const next: MeshState = {
        step,
        vertices,
        faces,
        edges: new Map(state.edges), // gets replaced by rebuildEdges anyway
        newEdges: [],
        newFaces,
    };

    rebuildEdges(next);
    return next;
}
