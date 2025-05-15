import React, { useEffect, useState } from "react";
import { SigmaContainer, useSigma } from "@react-sigma/core";
import { useLoadGraph } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
import "../graph-styles.css"; // Import the new CSS file
// import "@react-sigma/core/lib/react-sigma.min.css";

const GraphLoaderAndLayout: React.FC = () => {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();
  const { assign } = useLayoutForceAtlas2({
    iterations: 100, 
    settings: {
      gravity: 1, 
      scalingRatio: 15,
      strongGravityMode: false, 
      barnesHutOptimize: true,
      barnesHutTheta: 0.6, 
    },
  });
  const [graphLoaded, setGraphLoaded] = useState(false);

  useEffect(() => {
    const graph = new Graph();
    const colors = [
      "#3d52a0",
      "#7091e6",
      "#8697c4",
      "#10b981",
      "#34d399",
      "#059669",
    ];
    const numNodes = 70;
    const numEdges = 100;

    // add nodes
    for (let i = 0; i < numNodes; i++) {
      graph.addNode(`n${i}`, {
        label: `Node ${i}`,
        x: (Math.random() - 0.5) * 2, 
        y: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 3,
        color: colors[i % colors.length],
      });
    }
    // add edges
    for (let i = 0; i < numEdges; i++) {
      const sourceIndex = Math.floor(Math.random() * numNodes);
      let targetIndex = Math.floor(Math.random() * numNodes);
      while (targetIndex === sourceIndex) {
        targetIndex = Math.floor(Math.random() * numNodes);
      }
      const source = `n${sourceIndex}`;
      const target = `n${targetIndex}`;

      if (!graph.hasEdge(source, target) && !graph.hasEdge(target, source)) {
        graph.addEdge(source, target, {
          size: Math.random() * 1 + 0.3,
          color: "#444",
        });
      }
    }

    loadGraph(graph);
    setGraphLoaded(true);
  }, [loadGraph]);

  useEffect(() => {
    console.log("Graph loaded:", graphLoaded);
    console.log("Sigma instance:", sigma);
    console.log("Graph order:", sigma?.getGraph().order);
    if (graphLoaded && sigma) { // Ensure sigma instance exists
      assign(); 
      if (sigma && sigma.getGraph && sigma.getGraph().order > 0) { 
        sigma.refresh(); 
        sigma.getCamera().animatedReset({ duration: 600 });
      }
    }
  }, [graphLoaded, assign, sigma]); 

  return null;
};

const GraphBackground: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        // zIndex: 10,
        backgroundColor: "#121212",
      }}
    >
      <SigmaContainer
        style={{
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        }}
        settings={{
          renderLabels: false,
          allowInvalidContainer: true, 
          hideEdgesOnMove: true,
          hideLabelsOnMove: true,
        enableEdgeHoverEvents: false,
        enableEdgeClickEvents: false,
        enableNodeHoverEvents: false,
        enableNodeClickEvents: false,
        defaultNodeColor: "#7091e6",
        defaultEdgeColor: "#555",
        nodeReducer: (_node: string, data) => ({ ...data, hidden: false }),
        edgeReducer: (_edge: string, data) => ({ ...data, hidden: false }),
        initialCameraState: { x: 0, y: 0, ratio: 0.1 }, // Added initial camera state
        }}
      >
        <GraphLoaderAndLayout />
    </SigmaContainer>
    </div>
  );
};

export default GraphBackground;
