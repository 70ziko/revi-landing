// src/types/react-sigma-core.d.ts
// Missing types for @react-sigma/core wrapper

import { Settings } from 'sigma/settings';
import React from 'react';
import Graph from 'graphology';

declare module '@react-sigma/core' {
  
  interface SigmaContainerProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    graph?: Graph;
    settings?: Settings;
    onClickNode?: (event: MouseEvent) => void;
  }

  export const SigmaContainer: React.FC<SigmaContainerProps>;
}
