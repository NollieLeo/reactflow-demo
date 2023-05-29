import CustomNodeWrapper from "../customNodeWrapper";
import { Position, NodeProps } from "reactflow";
import "./index.scss";

const CustomDecisionNode = (props: NodeProps) => {
  const { data } = props;
  return (
    <CustomNodeWrapper
      {...props}
      className="customDecisionNode"
      handles={[Position.Bottom, Position.Top]}
      addonBtns={[]}
    >
      <div className="customDecisionNode-background"></div>
      <div className="customDecisionNode-content">{data.label}</div>
    </CustomNodeWrapper>
  );
};

export default CustomDecisionNode;
