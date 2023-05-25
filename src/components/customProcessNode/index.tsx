import { NodeCustomEnum } from "@/types/customNodes";
import CustomNodeWrapper from "../customNodeWrapper";
import { Position, Handle } from "reactflow";
import "./index.scss";

const CustomProcessNode = (props) => {
  const { isConnectable, data } = props;
  return (
    <CustomNodeWrapper className="customProcessNode">
      <Handle
        type="target"
        className="customHandle"
        position={Position.Top}
        isConnectable={isConnectable}
        id={NodeCustomEnum.PROCESS}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        className="customHandle"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id={NodeCustomEnum.PROCESS}
      />
    </CustomNodeWrapper>
  );
};

export default CustomProcessNode;
