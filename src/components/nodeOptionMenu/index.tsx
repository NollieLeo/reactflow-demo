import { Button, Dropdown, MenuProps } from "antd";
import { FC, ReactNode } from "react";
import { MoreOutlined } from "@ant-design/icons";
import "./index.scss";

const items: MenuProps["items"] = [
  {
    key: "delete",
    label: "delete",
  },
];

const NodeOptionMenu: FC<{
  onSelectItem: MenuProps["onClick"];
}> = (props) => {
  const { onSelectItem } = props;

  const onClick: MenuProps["onClick"] = (data) => {
    if (onSelectItem) {
      onSelectItem(data);
    }
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
      <span className="nodeOptionMenuBtn">
        <MoreOutlined />
      </span>
    </Dropdown>
  );
};

export default NodeOptionMenu;
