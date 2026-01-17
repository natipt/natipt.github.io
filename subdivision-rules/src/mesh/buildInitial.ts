import type { MeshState, Vertex, Face } from "./types";
import { rebuildEdges } from "./edges";

let VID = 1;
let FID = 1;

export function buildInitialMesh(panelW: number, panelH: number): MeshState {
  const vertices = new Map<number, Vertex>();
  const faces = new Map<number, Face>();

  const v0: Vertex = { id: VID++, x: 0,      y: 0,      birth: 0 };
  const v1: Vertex = { id: VID++, x: panelW, y: 0,      birth: 0 };
  const v2: Vertex = { id: VID++, x: panelW, y: panelH, birth: 0 };
  const v3: Vertex = { id: VID++, x: 0,      y: panelH, birth: 0 };
  [v0, v1, v2, v3].forEach(v => vertices.set(v.id, v));

  const face: Face = {
    id: FID++,
    verts: [v0.id, v1.id, v2.id, v3.id],
    birth: 0,
    type: "quad",
  };
  faces.set(face.id, face);

  const state: MeshState = {
    step: 0,
    vertices,
    edges: new Map(),
    faces,
    newEdges: [],
    newFaces: [],
  };

  rebuildEdges(state);
  return state;
}
