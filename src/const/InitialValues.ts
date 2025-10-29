import { Position } from "@xyflow/react";
import type { TransitionTableData, TransitionType } from "../types";

export const transitionTableData: TransitionTableData = {
  A: ['B', '-', '-'],
  B: ['-', 'C', '-'],
  C: ['D', 'E', 'F'],
  D: ['-', '-', '-'],
  E: ['-', '-', '-'],
  F: ['-', '-', '-'],
};

export const transitionTableHeaders = ['A', 'T', 'C'];

export const initialIsoleucineTransitions: TransitionType[] = [
  {
    id: 'A-B',
    source: 'A',
    target: 'B',
    label: 'A',
    isTransitionValid: false,
    prevTransition: null,
    lastNodePrevTransition: false,
  },
  {
    id: 'B-C',
    source: 'B',
    target: 'C',
    label: 'T',
    isTransitionValid: false,
    prevTransition: 'A-B',
    lastNodePrevTransition: true,
  },
  {
    id: 'C-D',
    source: 'C',
    target: 'D',
    label: 'A',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: false,
  },
  {
    id: 'C-E',
    source: 'C',
    target: 'E',
    label: 'T',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: false,
  },
  {
    id: 'C-F',
    source: 'C',
    target: 'F',
    label: 'C',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: true,
  },
]

export const initialIsoleucineNodes = [
  {
    id: 'A',
    position: { x: -86.6, y: -50 },
    data: {
      label: 'A',
      showSource: true,
      sourcePosition: Position.Right,
    },
    type: 'custom',
  },
  {
    id: 'B',
    position: { x: 0, y: -100 },
    data: {
      label: 'B',
      showTarget: true,
      targetPosition: Position.Left,
      showSource: true,
      sourcePosition: Position.Right,
    },
    type: 'custom',
  },
  {
    id: 'C',
    position: { x: 86.6, y: -50 },
    data: {
      label: 'C',
      showTarget: true,
      targetPosition: Position.Left,
      showSource: true,
      sourcePosition: Position.Bottom,
    },
    type: 'custom',
  },
  {
    id: 'D',
    position: { x: 86.6, y: 50 },
    data: {
      label: 'D',
      showTarget: true,
      targetPosition: Position.Top,
      encircled: true,
    },
    type: 'custom',
  },
  {
    id: 'E',
    position: { x: 0, y: 100 },
    data: {
      label: 'E',
      showTarget: true,
      targetPosition: Position.Top,
      encircled: true,
    },
    type: 'custom',
  },
  {
    id: 'F',
    position: { x: -86.6, y: 50 },
    data: {
      label: 'F',
      showTarget: true,
      targetPosition: Position.Top,
      encircled: true,
    },
    type: 'custom',
  }
]

export const initialPhenylalanineTransitions: TransitionType[] = [
  {
    id: 'A-B',
    source: 'A',
    target: 'B',
    label: 'T',
    isTransitionValid: false,
    prevTransition: null,
    lastNodePrevTransition: false,
  },
  {
    id: 'B-C',
    source: 'B',
    target: 'C',
    label: 'T',
    isTransitionValid: false,
    prevTransition: 'A-B',
    lastNodePrevTransition: true,
  },
  {
    id: 'C-D',
    source: 'C',
    target: 'D',
    label: 'T',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: false,
  },
  {
    id: 'C-E',
    source: 'C',
    target: 'E',
    label: 'C',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: true,
  },
]

export const initialPhenylalanineNodes = [
  {
    id: 'A',
    position: { x: -86.6, y: -50 },
    data: {
      label: 'A',
      showSource: true,
      sourcePosition: Position.Right,
    },
    type: 'custom',
  },
  {
    id: 'B',
    position: { x: 0, y: -100 },
    data: {
      label: 'B',
      showTarget: true,
      targetPosition: Position.Left,
      showSource: true,
      sourcePosition: Position.Right,
    },
    type: 'custom',
  },
  {
    id: 'C',
    position: { x: 86.6, y: -50 },
    data: {
      label: 'C',
      showTarget: true,
      targetPosition: Position.Left,
      showSource: true,
      sourcePosition: Position.Bottom,
    },
    type: 'custom',
  },
  {
    id: 'D',
    position: { x: 86.6, y: 50 },
    data: {
      label: 'D',
      showTarget: true,
      targetPosition: Position.Top,
      encircled: true,
    },
    type: 'custom',
  },
  {
    id: 'E',
    position: { x: 0, y: 100 },
    data: {
      label: 'E',
      showTarget: true,
      targetPosition: Position.Top,
      encircled: true,
    },
    type: 'custom',
  }
]

export const initialGlutamineTransitions: TransitionType[] = [
  {
    id: 'A-B',
    source: 'A',
    target: 'B',
    label: 'C',
    isTransitionValid: false,
    prevTransition: null,
    lastNodePrevTransition: false,
  },
  {
    id: 'B-C',
    source: 'B',
    target: 'C',
    label: 'A',
    isTransitionValid: false,
    prevTransition: 'A-B',
    lastNodePrevTransition: true,
  },
  {
    id: 'C-D',
    source: 'C',
    target: 'D',
    label: 'A',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: false,
  },
  {
    id: 'C-E',
    source: 'C',
    target: 'E',
    label: 'G',
    isTransitionValid: false,
    prevTransition: 'B-C',
    lastNodePrevTransition: true,
  },
]

export const initialGlutamineNodes = [
  {
    id: 'A',
    position: { x: -86.6, y: -50 },
    data: {
      label: 'A',
      showSource: true,
      sourcePosition: Position.Right,
    },
    type: 'custom',
  },
  {
    id: 'B',
    position: { x: 0, y: -100 },
    data: {
      label: 'B',
      showTarget: true,
      targetPosition: Position.Left,
      showSource: true,
      sourcePosition: Position.Right,
    },
    type: 'custom',
  },
  {
    id: 'C',
    position: { x: 86.6, y: -50 },
    data: {
      label: 'C',
      showTarget: true,
      targetPosition: Position.Left,
      showSource: true,
      sourcePosition: Position.Bottom,
    },
    type: 'custom',
  },
  {
    id: 'D',
    position: { x: 86.6, y: 50 },
    data: {
      label: 'D',
      showTarget: true,
      targetPosition: Position.Top,
      encircled: true,
    },
    type: 'custom',
  },
  {
    id: 'E',
    position: { x: 0, y: 100 },
    data: {
      label: 'E',
      showTarget: true,
      targetPosition: Position.Top,
      encircled: true,
    },
    type: 'custom',
  }
]

