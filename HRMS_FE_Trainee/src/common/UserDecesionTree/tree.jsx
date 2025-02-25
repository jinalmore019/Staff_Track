import React, { useEffect, useMemo, useRef, useState } from "react";
import NodeModel from "./nodeModel";
import DecisionNode from "./userDecesionTree";

const DecisionTree = ({
  data = [],
  renderContent,
  direction = "ltr",
  hSpacing = 16,
  vSpacing = 48,
  lineColor = "#000",
  props: { children = "children", label = "label" } = {},
}) => {
  const treeRef = useRef(null);
  const rootNode = new NodeModel({
    data,
    props: { children, label },
  });
  // const [root, setRoot] = useState(rootNode);
  const root = rootNode;

  // useEffect(() => {
  //   setRoot(rootNode);
  // }, [rootNode]);
  console.log("rootNode ", root);

  return (
    <div className="decision-tree" ref={treeRef}>
      {root &&
        root.childNodes.map((child) => {
          console.log(child,'child');
          return (
            <DecisionNode
              key={child.key}
              node={child}
              props={{
                children,
                label,
              }}
              direction={direction}
              hSpacing={hSpacing}
              vSpacing={vSpacing}
              lineColor={lineColor}
              renderContent={renderContent}
            />
          );
        })}
    </div>
  );
};

export default DecisionTree;