import CustomNodeWrapper from "../customNodeWrapper";
import { NodeProps, Position } from "reactflow";
import "./index.scss";

const CustomEmptyNode = (props: NodeProps) => {
  return (
    <CustomNodeWrapper className="customEmptyNode-wrapper" {...props} handles={[Position.Top]}>
      <div className="customEmptyNode"></div>
    </CustomNodeWrapper>
  );
};

export default CustomEmptyNode;
