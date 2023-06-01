import { NodeProps, Position } from "reactflow";
import "./index.scss";
import CustomNodeWrapper from "../customNodeWrapper";

function CustomGroupNode(props: NodeProps) {
  const { data } = props;
  return (
    <CustomNodeWrapper {...props} addonBtns={[Position.Bottom]}>
      <div className="customGroupNode">
        <header>Loop</header>
        <main>this is a loop</main>
      </div>
    </CustomNodeWrapper>
  );
}

export default CustomGroupNode;
