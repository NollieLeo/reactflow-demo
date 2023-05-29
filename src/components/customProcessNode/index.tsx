import { NodeCustomEnum } from "@/types/customNodes";
import CustomNodeWrapper from "../customNodeWrapper";
import { Position, Handle, NodeProps } from "reactflow";
import "./index.scss";

const CustomProcessNode = (props: NodeProps) => {
  const { data } = props;
  return (
    <CustomNodeWrapper className="customProcessNode" {...props}>
      <div>{data.label}</div>
    </CustomNodeWrapper>
  );
};

export default CustomProcessNode;
