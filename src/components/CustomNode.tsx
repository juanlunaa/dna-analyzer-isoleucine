import { Handle, Position } from "@xyflow/react";
import type { CustomNodeData } from "../types";

function CustomNode({ data }: { data: CustomNodeData } ) {
  const content = (
    <div className={`custom-node ${data.className || ''}`}>
      {data.label}

      {data.showTarget && (
        <Handle
          type="target"
          position={data.targetPosition || Position.Top}
        />
      )}

      {data.showSource && (
        <Handle
          type="source"
          position={data.sourcePosition || Position.Bottom}
        />
      )}
    </div>
  );

  if (!data.encircled) return content;
  
  return (
    <div className="custom-node-circle-aux">
      <div className="custom-node-circle"></div>
      {content}
    </div>
  )
}

export default CustomNode
