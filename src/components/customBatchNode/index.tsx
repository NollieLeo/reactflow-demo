import { NodeProps, Position } from "reactflow";
import CustomNodeWrapper from "../customNodeWrapper";
import ActionsMenu from "../actionsMenu";
import CustomAddBtn from "../customAddBtn";
import { Divider, Image, MenuProps } from "antd";
import Thunder from "@/assets/thunder.svg";
import NodeOptionMenu from "../nodeOptionMenu";
import "./index.scss";
import { CustomBatchNodeType } from "@/types";
import { useEventsFlowContext } from "@/pages/events-flow/stores";

const CustomBatchNode = (props: NodeProps<CustomBatchNodeType["data"]>) => {
  const { data, id } = props;
  const { onUpdateAction, onDeleteAction } = useEventsFlowContext();
  function onSelectItem() {
    onUpdateAction(id, {
      data: {
        ...data,
        triggers: data.triggers.concat([1]),
      },
    });
  }

  const onNodeOptSelect: MenuProps["onClick"] = (param) => {
    const { key } = param;
    onDeleteAction(id, "tree");
  };

  const renderItems = () => {
    return data.triggers.map((data, key) => {
      return (
        <div className="customBatchNode-item" key={key}>
          <div className="customBatchNode-item-top">
            <Image src={Thunder} preview={false} />
            <span className="customBatchNode-item-name">{data}</span>
            <NodeOptionMenu onSelectItem={() => {}} />
          </div>
          <div className="customBatchNode-item-bottom">
            Content word count exceeds ma...
          </div>
        </div>
      );
    });
  };

  return (
    <CustomNodeWrapper {...props} addonBtns={[Position.Bottom]}>
      <div className="customBatchNode">
        <header className="customBatchNode-title">
          <span>Batch mutation</span>
          <NodeOptionMenu onSelectItem={onNodeOptSelect} />
        </header>
        <Divider className="customBatchNode-divider" type="vertical" />
        <main className="customBatchNode-container">
          {renderItems()}
          <ActionsMenu onSelectItem={onSelectItem}>
            <CustomAddBtn
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </ActionsMenu>
        </main>
      </div>
    </CustomNodeWrapper>
  );
};

export default CustomBatchNode;
