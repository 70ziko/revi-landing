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
  
  // Add a stronger layout algorithm for node addition
  const { assign: strongAssign } = useLayoutForceAtlas2({
    iterations: 10,
    settings: {
      gravity: 1,
      scalingRatio: 15,
      strongGravityMode: true,
      barnesHutOptimize: true,
    }
  });
  
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
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

      // Pause the animation loop temporarily
      setIsAnimating(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      const graph = graphRef.current;
      const nodeId = `n${graph.order}`;
      console.log("Adding node:", nodeId, "at coords:", coords);
      
      if (graph.hasNode(nodeId)) return; 

      // Get current camera state
      const camera = sigma.getCamera();
      const state = camera.getState();
      console.log("Camera state:", state);
      
      // Use exact center of viewable area
      const nodePosition = {
        x: state.x,
        y: state.y
      };
      
      console.log("Adding node at center:", nodePosition);

      // First clear any existing node with this ID (just in case)
      if (graph.hasNode(nodeId)) {
        graph.dropNode(nodeId);
      }

      // Add node with extreme visual properties for debug
      graph.addNode(nodeId, {
        label: `NEWNODE ${graph.order}`,
        x: nodePosition.x,
        y: nodePosition.y,
        size: 100, // Extremely large size
        color: "#FF00FF", // Magenta for maximum contrast
      }); 

      // Create connections to other nodes
      const existingNodes = graph.nodes().filter(n => n !== nodeId);
      // Connect to more nodes for stability
      const numConnections = Math.min(5, existingNodes.length);
      for (let i = 0; i < numConnections; i++) {
        const target = existingNodes[Math.floor(Math.random() * existingNodes.length)];
        if (target) {// && !graph.hasEdge(nodeId, target) && !graph.hasEdge(target, nodeId)) {
          graph.addEdge(nodeId, target, {
            size: 5, // Extra thick
            color: "#FFFF00", // Bright yellow
          });
        }
      }
      
      // Force immediate refresh
      sigma.refresh();
      
      // Apply stronger layout changes - use the pre-defined strongAssign
      assign();
      
      // Verify node exists after operations
      if (graph.hasNode(nodeId)) {
        console.log("Node still exists in graph after operations", graph.getNodeAttributes(nodeId));
      } else {
        console.error("Node was lost after operations");
      }
      
      // Reset camera with longer duration for better visibility
      // camera.animatedReset({ duration: 800 });
      
      console.log("New node added at", nodePosition);
      console.log("Total nodes:", graph.order);
      
      // Resume animation after a delay
      setTimeout(() => {
        setIsAnimating(true);
      }, 1000);
    }, [sigma, strongAssign]);

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
    if (!graphLoaded || !isAnimating) return;

    const animate = () => {
      if (isAnimating) {
        assign();
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [graphLoaded, isAnimating, assign]);

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
