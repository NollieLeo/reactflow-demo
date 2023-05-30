import CustomNodeWrapper from "../customNodeWrapper";
import { NodeProps } from "reactflow";
import "./index.scss";
import { Image } from "antd";
import Thunder from "@/assets/thunder.svg";
import NodeOptionMenu from "../nodeOptionMenu";

const CustomProcessNode = (props: NodeProps) => {
  const { data } = props;
  return (
    <CustomNodeWrapper {...props}>
      <div className="customProcessNode">
        <div className="customProcessNode-top">
          <Image src={Thunder} preview={false} />
          <span className="customProcessNode-name">{data.label}</span>
          <NodeOptionMenu />
        </div>
        <div className="customProcessNode-bottom">
          Content word count exceeds ma...
        </div>
      </div>
    </CustomNodeWrapper>
  );
};

export default CustomProcessNode;
