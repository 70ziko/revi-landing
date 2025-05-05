import React from "react";
import { SigmaContainer, ControlsContainer, ZoomControl } from "@react-sigma/core";
import { useLoadGraph } from "@react-sigma/core";
// import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";

const GraphBackground: React.FC = () => {
  const graph = new Graph();
  graph.addNode("e1", {
    label: "Node 1",
    x: 0,
    y: 0,
    size: 10,
    color: "#ec5148",
  });
  const graphLoad = useLoadGraph()
  graphLoad(graph);
  // const layout = useLayoutForceAtlas2({
  //   graph,
  //   worker: true,
  //   barnesHutOptimize: true,
  //   scalingRatio: 10,
  //   strongGravityMode: true,
  //   gravity: 1,
  //   timeout: 1000,
  //   iterationsPerRender: 1,
  //   adjustSizes: true,
  // });
  return (
    <SigmaContainer style={{ height: "100vh", pointerEvents: "none" }} settings={{ renderLabels: false }}>
      {/* <LoadGraph graph={graph} /> */}
      {/* <ForceAtlas2 iterationsPerRender={1} timeout={1000} settings={{ gravity: 1, scalingRatio: 10 }} /> */}
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default GraphBackground;
