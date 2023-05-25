import { Handle, Position } from "reactflow";
import "./index.scss";
import CustomNodeWrapper from "../customNodeWrapper";
import { NodeCustomEnum } from "../../types/customNodes";

function CustomStartNode(props) {
  const { isConnectable } = props;
  return (
    <CustomNodeWrapper className="customStartNode">
      <div>开始节点</div>
      <Handle
        type="source"
        className="customHandle"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id={NodeCustomEnum.START}
      />
    </CustomNodeWrapper>
  );
}

export default CustomStartNode;
