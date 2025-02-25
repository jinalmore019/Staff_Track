import React from "react";
import "./user-tree.css";

const DecisionNode = ({
  node,
  props,
  direction = "ltr",
  renderContent,
  hSpacing = 16,
  vSpacing = 48,
  lineColor = "#000",
}) => {
  const hspace = hSpacing / 2 + 10;
  const vspace = vSpacing / 2;

  const vertical = ["ttb", "btt"].includes(direction);
  const horizontal = ["ltr", "rtl"].includes(direction);

  const lineStyle = {
    color: lineColor,
    width: "80px",
    height: vertical ? `${vspace}px` : undefined,
  };

  const nodeStyle = {
    paddingTop: vertical ? `${vspace}px` : `${hspace / 4}px`,
    paddingBottom: vertical ? `${vspace}px` : `${hspace / 4}px`,
    // paddingLeft: horizontal ? `${hspace}px` : undefined,
    // paddingRight: horizontal ? `${hspace}px` : undefined,
  };

  const contentStyle = {
    paddingLeft: horizontal ? `${hspace}px` : undefined,
    paddingRight: horizontal ? `${hspace}px` : undefined,
    // paddingTop: vertical ? `${vspace}px` : undefined,
    // paddingBottom: vertical ? `${vspace}px` : undefined,
  };
  console.log(node, "node--------");
  return (
    <div className={`decision-tree-node ${direction}`} style={nodeStyle}>
      {/* conn-line */}

      {node?.data?.designation?.name !== "team leader" && node?.level > 1 && (
        <>
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "10px",
              width: "10px",
              backgroundColor: "#2a90f0",
              borderRadius: "100px",
            }}
          ></div>
          <div
            className="decision-tree-node-line"
            style={{
              top: node?.parent?.childNodes.length === 1 ? "50%" : 0,
              color: lineColor,
              width: node?.parent?.childNodes.length === 1 ? "80px" : "80px",
              height:
                node?.parent?.childNodes.length === 1
                  ? 0
                  : vertical
                  ? `${vspace}px`
                  : undefined,
            }}
          ></div>
        </>
      )}

      {/* {node?.data.children !== undefined && ( */}
      <div className="decision-tree-node-content" style={contentStyle}>
        <div
          style={{
            position: "relative",
            height: "10px",
            width: "10px",
            backgroundColor: "#2a90f0",
            borderRadius: "100px",
            zIndex: 2,
            display: node?.data.children !== undefined ? "block" : "none",
          }}
        ></div>
        <div
          className="decision-tree-node-sub-line"
          style={{
            color: lineColor,
            width: "80px",
            height: vertical ? `${vspace}px` : undefined,
            display: node?.data.children !== undefined ? "block" : "none",
          }}
        ></div>
      </div>
      {/* )} */}
      <NodeContent node={node.parent} renderContent={renderContent} />
      <div className="decision-tree-node-children">
        {node.childNodes.map((child) => (
          <DecisionNode
            key={child.key}
            node={child}
            props={props}
            direction={direction}
            hSpacing={hSpacing}
            vSpacing={vSpacing}
            lineColor={lineColor}
            renderContent={renderContent}
          />
        ))}
      </div>
    </div>
  );
};

const NodeContent = ({ node, renderContent }) => {
  const parent = node.parent;
  // const tree = parent.tree;
  const { data } = node;

  return renderContent ? (
    renderContent({ node, data })
  ) : (
    <span>{node.label || ""}</span>
  );
};

export default DecisionNode;