import { PlusOutlined } from "@ant-design/icons";
import "./index.scss";
import { CSSProperties, MouseEventHandler } from "react";

const CustomAddBtn = (props: {
  onClick: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}) => {
  const { style, onClick } = props;
  return (
    <div className="nodeAddonBtn" style={style} onClick={onClick}>
      <PlusOutlined />
    </div>
  );
};

export default CustomAddBtn;
