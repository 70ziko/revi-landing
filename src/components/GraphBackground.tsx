import React, { useEffect, useState } from "react";
import { SigmaContainer, useSigma } from "@react-sigma/core";
import { useLoadGraph } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
// import "@react-sigma/core/lib/react-sigma.min.css";

const GraphLoaderAndLayout: React.FC = () => {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();
  const { assign } = useLayoutForceAtlas2({
    iterations: 150, // Number of iterations for the layout algorithm
    settings: {
      gravity: 1, 
      scalingRatio: 10,
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

    for (let i = 0; i < numNodes; i++) {
      graph.addNode(`n${i}`, {
        label: `Node ${i}`,
        // initial positions closer to center
        x: Math.random() * 5 - 2.5,
        y: Math.random() * 5 - 2.5,
        size: Math.random() * 4 + 2,
        color: colors[i % colors.length],
      });
    }

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
    if (graphLoaded) {
      assign(); 
      // setTimeout(() => sigma.getCamera().animatedReset({ duration: 600 }), 100);
    }
  }, [graphLoaded, assign, sigma]); 

  return null;
};

const GraphBackground: React.FC = () => {
  return (
    <SigmaContainer
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: "#121212",
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
        nodeReducer: (_node, data) => ({ ...data, hidden: false }),
        edgeReducer: (_edge, data) => ({ ...data, hidden: false }),
      }}
    >
      <GraphLoaderAndLayout />
    </SigmaContainer>
  );
};

export default GraphBackground;
