import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { SigmaContainer, useSigma } from "@react-sigma/core";
import { useLoadGraph } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
import "../styles/graph-styles.css";

const GraphLoaderAndLayout: React.FC<{ onAddNodeRef: React.MutableRefObject<(() => void) | null> }> = ({ onAddNodeRef }) => {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();
  const { assign } = useLayoutForceAtlas2({
    iterations: 150, 
    settings: {
      gravity: 1, 
      scalingRatio: 15,
      strongGravityMode: false, 
      barnesHutOptimize: true,
      barnesHutTheta: 0.6, 
    },
  });
  const [graphLoaded, setGraphLoaded] = useState(false);
  const graphRef = useRef<Graph | null>(null);
  const colors = useMemo<string[]>(() => [
    "#3d52a0",
    "#7091e6",
    "#8697c4",
    "#10b981",
    "#34d399",
    "#059669",
  ], []);

  const addNodeAndConnect = useCallback(() => {
    if (!graphRef.current || !sigma) return;
    const graph = graphRef.current;
    const nodeId = `n${graph.order}`;
    graph.addNode(nodeId, {
      label: `Node ${graph.order}`,
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      size: Math.random() * 2 + 3,
      color: colors[graph.order % colors.length],
    });

    const existingNodes = graph.nodes().filter(n => n !== nodeId);
    const numConnections = Math.min(2 + Math.floor(Math.random() * 3), existingNodes.length);
    for (let i = 0; i < numConnections; i++) {
      const target = existingNodes[Math.floor(Math.random() * existingNodes.length)];
      if (target && !graph.hasEdge(nodeId, target) && !graph.hasEdge(target, nodeId)) {
        graph.addEdge(nodeId, target, {
          size: Math.random() * 1 + 0.3,
          color: "#444",
        });
      }
    }
    sigma.refresh();
    assign(); // bouncy animation: { iterations: 60, settings: { slowDown: 2 } }
    sigma.getCamera().animatedReset({ duration: 600 });
  }, [sigma, assign, colors]);

  useEffect(() => {
    const graph = new Graph();
    const numNodes = 210;
    const numEdges = 190;

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
    graphRef.current = graph;
    loadGraph(graph);
    setGraphLoaded(true);
  }, [loadGraph, colors]);
  
  // Expose the addNodeAndConnect function to parent via ref
  useEffect(() => {
    onAddNodeRef.current = addNodeAndConnect;
    return () => { onAddNodeRef.current = null; };
  }, [addNodeAndConnect, onAddNodeRef]);

  useEffect(() => {
    if (graphLoaded && sigma) {
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
  const addNodeRef = useRef<(() => void) | null>(null);

  // Handle click and custom event
  useEffect(() => {
    const handler = () => {
      console.log("add-graph-node event triggered");
      if (addNodeRef.current) addNodeRef.current();
    };
    window.addEventListener("add-graph-node", handler);
    // window.addEventListener("onClick", handler);
    return () => {
      window.removeEventListener("add-graph-node", handler);
      // window.removeEventListener("onClick", handler);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
        backgroundColor: "#121212",
      }}
      onClick={() => {
        if (addNodeRef.current) addNodeRef.current();
      }}
    >
      <SigmaContainer
        style={{
        width: "100%",
        height: "100%",
        zIndex: -1,
        // pointerEvents: "none",
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
        initialCameraState: { x: 0, y: 0, ratio: 0.1 },
        }}
      >
        <GraphLoaderAndLayout onAddNodeRef={addNodeRef} />
      </SigmaContainer>
    </div>
  );
};

export default GraphBackground;
