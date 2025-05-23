import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { SigmaContainer, useSigma } from "@react-sigma/core";
import { useLoadGraph } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
import type Sigma from "sigma";
import "../styles/graph-styles.css";

const GraphLoaderAndLayout: React.FC<{ onAddNodeRef: React.RefObject<(() => void) | null> }> = ({ onAddNodeRef }) => {
  const loadGraph = useLoadGraph();
  const sigma = useSigma();
  const { assign } = useLayoutForceAtlas2({
    iterations: 1, 
    settings: {
      gravity: 1, 
      scalingRatio: 15,
      strongGravityMode: false, 
      barnesHutOptimize: true,
      barnesHutTheta: 0.6, 
    },
  });
  const [graphLoaded, setGraphLoaded] = useState(false);
  // const [isAnimating, setIsAnimating] = useState(true);
  const graphRef = useRef<Graph | null>(null);
  const animationRef = useRef<number | null>(null);
  const colors = useMemo<string[]>(() => [
    "#3d52a0",
    "#7091e6",
    "#8697c4",
    "#10b981",
    "#34d399",
    "#059669",
  ], []);

  const addNodeAndConnect = useCallback(
    (coords?: { x: number; y: number }) => {
      if (!graphRef.current || !sigma) return;

      const graph = graphRef.current;
      const nodeId = `n${graph.order}`;
      console.log("Adding node:", nodeId, "at coords:", coords);
      
      if (graph.hasNode(nodeId)) return; 

      // For debug - use random position within visible area instead of trying to convert
      const camera = sigma.getCamera();
      const state = camera.getState();
      console.log("Camera state:", state);
      
      // Generate position within current view (much more reliable than conversion)
      const viewRatio = state.ratio;
      const x = ((Math.random() * 2) - 1) * viewRatio + state.x;
      const y = ((Math.random() * 2) - 1) * viewRatio + state.y;
      console.log("Generated position in view:", { x, y });

      graph.addNode(nodeId, {
        label: `Node ${graph.order}`,
        x: x,
        y: y,
        // Debug: make new nodes MUCH larger to spot them easily
        size: 30, // Huge size for visibility
        color: "#FF3333", // Bright red for visibility
      }); 

      const existingNodes = graph.nodes().filter(n => n !== nodeId);
      const numConnections = Math.min(2 + Math.floor(Math.random() * 3), existingNodes.length);
      for (let i = 0; i < numConnections; i++) {
        const target = existingNodes[Math.floor(Math.random() * existingNodes.length)];
        if (target && !graph.hasEdge(nodeId, target) && !graph.hasEdge(target, nodeId)) {
          graph.addEdge(nodeId, target, {
            size: 2, // Thicker edges for debug
            color: "#FF7700", // Orange for visibility
          });
        }
      }
      
      // Force sigma to refresh and show the new nodes
      sigma.refresh();
      assign();
      
      // Debug: Log all nodes positions for comparison
      console.log("New node added at", { x, y });
      console.log("Total nodes:", graph.order);
    }, [sigma, assign]);

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

  // render loop for continuous layout updates
  useEffect(() => {
    if (!graphLoaded ) return; //|| !isAnimating

    const animate = () => {
      // if (isAnimating) {
        assign();
        animationRef.current = requestAnimationFrame(animate);
      // }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [graphLoaded, assign]);

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
  const addNodeRef = useRef<((coords?: { x: number; y: number }) => void) | null>(null);
  const sigmaRef = useRef<Sigma | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: CustomEvent<{ x: number; y: number } | undefined>) => {
      const coords = e.detail || undefined;
      console.log("Custom event received:", coords);
      if (addNodeRef.current) addNodeRef.current(coords);
    };
    window.addEventListener("add-graph-node", handler);
    return () => {
      window.removeEventListener("add-graph-node", handler);
    };
  }, []);

  // Global document-level click handler
  useEffect(() => {
    const globalClickHandler = (e: MouseEvent) => {
      console.log("Global click detected");
      if (!addNodeRef.current || !containerRef.current) return;
      
      // Get container position to calculate relative coordinates
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate coordinates relative to container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only process clicks if they're within the container bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        console.log("Global click within graph area:", { x, y });
        addNodeRef.current({ x, y });
      }
    };
    
    // Add global click handler
    document.addEventListener('click', globalClickHandler);
    console.log("Added global click handler to document");
    
    return () => {
      document.removeEventListener('click', globalClickHandler);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
        backgroundColor: "#121212",
      }}
    >
      <SigmaContainer
        style={{
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "auto",
        }}
        settings={{
          renderLabels: false,
          allowInvalidContainer: true, 
          hideEdgesOnMove: true,
          hideLabelsOnMove: true,
          enableEdgeHoverEvents: false,
          enableEdgeClickEvents: true,
          enableNodeHoverEvents: false,
          enableNodeClickEvents: true,
          defaultNodeColor: "#7091e6",
          defaultEdgeColor: "#555",
          nodeReducer: (_node: string, data) => ({ ...data, hidden: false }),
          edgeReducer: (_edge: string, data) => ({ ...data, hidden: false }),
          initialCameraState: { x: 0, y: 0, ratio: 0.1 },
        }}
        ref={(instance) => {
          sigmaRef.current = instance?.sigma;
        }}
      >
        <GraphLoaderAndLayout onAddNodeRef={addNodeRef} />
      </SigmaContainer>
    </div>
  );
};

export default GraphBackground;
