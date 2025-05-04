export const graphData = {
  nodes: [
    { id: "n1", label: "Node 1", x: 0, y: 0, size: 3 },
    { id: "n2", label: "Node 2", x: 1, y: 1, size: 2 },
    { id: "n3", label: "Node 3", x: 1, y: 0, size: 1 },
  ],
  edges: [
    { id: "e1", source: "n1", target: "n2", label: "Edge 1" },
    { id: "e2", source: "n1", target: "n3", label: "Edge 2" },
  ],
};
