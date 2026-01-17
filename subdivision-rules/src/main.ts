import "./ui.css";
import { buildInitialMesh } from "./mesh/buildInitial";
import { subdivide } from "./mesh/subdivide";
import type { MeshState } from "./mesh/types";

const app = document.getElementById("app")!;
const btn = document.getElementById("subdivide") as HTMLButtonElement;

const svgNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNS, "svg");
app.appendChild(svg);

const g = document.createElementNS(svgNS, "g");
svg.appendChild(g);

const layerBlack = document.createElementNS(svgNS, "g");
const layerRed = document.createElementNS(svgNS, "g");
g.appendChild(layerBlack);
g.appendChild(layerRed);

let panelH = window.innerHeight;
let panelW = Math.round((2 / 3) * panelH);

// history is optional now, but sets you up for undo immediately
let history: MeshState[] = [buildInitialMesh(panelW, panelH)];
let cursor = 0;

function current() { return history[cursor]; }

function ensureViewBox() {
  svg.setAttribute("viewBox", `0 0 ${panelW} ${panelH}`);
  // center the panel in the viewport (letterbox horizontally)
  const extraW = window.innerWidth - panelW;
  const offsetX = Math.max(0, Math.floor(extraW / 2));
  g.setAttribute("transform", `translate(${offsetX},0)`);
}

function clear(el: SVGGElement) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function draw(state: MeshState) {
  clear(layerBlack);
  clear(layerRed);

  // Black edges (all edges)
  for (const e of state.edges.values()) {
    const a = state.vertices.get(e.a)!;
    const b = state.vertices.get(e.b)!;

    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", `${a.x}`);
    line.setAttribute("y1", `${a.y}`);
    line.setAttribute("x2", `${b.x}`);
    line.setAttribute("y2", `${b.y}`);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "1");
    layerBlack.appendChild(line);
  }

  // Red flash: edges created this step
  for (const key of state.newEdges) {
    const e = state.edges.get(key);
    if (!e) continue;
    const a = state.vertices.get(e.a)!;
    const b = state.vertices.get(e.b)!;

    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", `${a.x}`);
    line.setAttribute("y1", `${a.y}`);
    line.setAttribute("x2", `${b.x}`);
    line.setAttribute("y2", `${b.y}`);
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", "2");
    layerRed.appendChild(line);
  }

  // fade the red layer after a moment
  layerRed.style.opacity = "1";
  window.setTimeout(() => {
    layerRed.style.transition = "opacity 250ms linear";
    layerRed.style.opacity = "0";
    window.setTimeout(() => {
      layerRed.style.transition = "";
      clear(layerRed);
      layerRed.style.opacity = "1";
    }, 260);
  }, 150);
}

function rebuildAll() {
  panelH = window.innerHeight;
  panelW = Math.round((2 / 3) * panelH);
  // reset for now on resize (keeps it simple)
  history = [buildInitialMesh(panelW, panelH)];
  cursor = 0;
  ensureViewBox();
  draw(current());
}

btn.addEventListener("click", () => {
  const next = subdivide(current());
  history = history.slice(0, cursor + 1);
  history.push(next);
  cursor++;
  draw(next);
});

window.addEventListener("resize", rebuildAll);

ensureViewBox();
draw(current());
