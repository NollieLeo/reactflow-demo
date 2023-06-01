import CustomNodeWrapper from "../customNodeWrapper";
import { Position, NodeProps } from "reactflow";
import "./index.scss";
import NodeOptionMenu from "../nodeOptionMenu";
import { MenuProps } from "antd";
import { useEventsFlowContext } from "@/pages/events-flow/stores";

const CustomDecisionNode = (props: NodeProps) => {
  const { data, id } = props;

  const { onDeleteAction } = useEventsFlowContext();

  const onSelectActionOpt: MenuProps["onClick"] = (param) => {
    const { key } = param;
    onDeleteAction(id, "tree");
  };

  return (
    <CustomNodeWrapper
      {...props}
      handles={[Position.Bottom, Position.Top]}
      addonBtns={[]}
    >
      <div className="customDecisionNode">
        <div className="customDecisionNode-label">{data.label}</div>
        <NodeOptionMenu onSelectItem={onSelectActionOpt} />
      </div>
    </CustomNodeWrapper>
  );
};

export default CustomDecisionNode;
