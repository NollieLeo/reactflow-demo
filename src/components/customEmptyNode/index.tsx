import CustomNodeWrapper from "../customNodeWrapper";
import { NodeProps, Position } from "reactflow";
import "./index.scss";

const CustomEmptyNode = (props: NodeProps) => {
  return (
    <CustomNodeWrapper className="CustomEmptyNode-wrapper" {...props} handles={[Position.Top]}>
      <div className="CustomEmptyNode"></div>
    </CustomNodeWrapper>
  );
};

export default CustomEmptyNode;
