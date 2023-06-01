import CustomNodeWrapper from "../customNodeWrapper";
import { NodeProps } from "reactflow";
import "./index.scss";
import { Image, MenuProps } from "antd";
import Thunder from "@/assets/thunder.svg";
import NodeOptionMenu from "../nodeOptionMenu";
import useFlowActions from "@/hooks/useFlowActions";

const CustomProcessNode = (props: NodeProps) => {
  const { data, id } = props;

  const { onDeleteAction } = useFlowActions();

  const onSelectActionOpt: MenuProps["onClick"] = (param) => {
    const { key } = param;
    onDeleteAction(id, "tree");
  };

  return (
    <CustomNodeWrapper {...props}>
      <div className="customProcessNode">
        <div className="customProcessNode-top">
          <Image src={Thunder} preview={false} />
          <span className="customProcessNode-name">{data.label}</span>
          <NodeOptionMenu onSelectItem={onSelectActionOpt} />
        </div>
        <div className="customProcessNode-bottom">
          Content word count exceeds ma...
        </div>
      </div>
    </CustomNodeWrapper>
  );
};

export default CustomProcessNode;
