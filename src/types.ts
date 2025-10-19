import type { Position } from "@xyflow/react"

export interface TransitionType {
  id: string
  source: string
  target: string
  label: string
  isTransitionValid: boolean
  prevTransition: string | null
  lastNodePrevTransition: boolean
}

export interface EdgeType {
  id: string;
  source: string;
  target: string;
  label: string;
  animated: boolean;
}

export interface NodeType {
  id: string;
  position: { x: number; y: number };
  data: CustomNodeData;
  type: string;
}

export interface CustomNodeData {
  label: string;
  showTarget?: boolean;
  showSource?: boolean;
  targetPosition?: Position;
  sourcePosition?: Position;
  encircled?: boolean;
  className?: string;
}

export interface TransitionTableData {
  [key: string]: (string | null)[];
}
