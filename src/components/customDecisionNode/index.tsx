import { NodeCustomEnum } from "@/types/customNodes";
import CustomNodeWrapper from "../customNodeWrapper";
import { Position, Handle } from "reactflow";
import "./index.scss";

const CustomDecisionNode = (props) => {
  const { isConnectable, data } = props;
  return (
    <CustomNodeWrapper className="customDecisionNode">
      <Handle
        type="target"
        className="customHandle"
        position={Position.Top}
        isConnectable={isConnectable}
        id={NodeCustomEnum.DECISION}
      />
      <div className="customDecisionNode-background"></div>
      <div className="customDecisionNode-content">{data.label}</div>
      <Handle
        type="source"
        className="customHandle"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id={NodeCustomEnum.DECISION}
      />
    </CustomNodeWrapper>
  );
};

export default CustomDecisionNode;
