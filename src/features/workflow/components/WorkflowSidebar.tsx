import type { WorkflowNodeType } from "../types/workflow.types";
import "../nodes/nodes.css"
interface SidebarNode {
  type: WorkflowNodeType;
  label: string;
  icon: string;
}

const sidebarNodes: SidebarNode[] = [
  {
    type: "start",
    label: "Start",
    icon: "▶",
  },
  {
    type: "task",
    label: "Task",
    icon: "✓",
  },
  {
    type: "approval",
    label: "Approval",
    icon: "✓",
  },
  {
    type: "automated",
    label: "Automated",
    icon: "⚡",
  },
  {
    type: "end",
    label: "End",
    icon: "■",
  },
];

export function WorkflowSidebar() {
  const handleDragStart = (
    event: React.DragEvent,
    nodeType: WorkflowNodeType
  ) => {
    event.dataTransfer.setData(
      "application/reactflow",
      nodeType
    );

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="workflow-sidebar">
      <div className="sidebar-title">
        Workflow Nodes
      </div>

      <div className="sidebar-description">
        Drag a node onto the canvas
      </div>

      <div className="sidebar-nodes">
        {sidebarNodes.map((node) => (
          <div
            key={node.type}
            className="sidebar-node"
            draggable
            onDragStart={(event) =>
              handleDragStart(
                event,
                node.type
              )
            }
          >
            <span className="sidebar-node-icon">
              {node.icon}
            </span>

            <span>
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}