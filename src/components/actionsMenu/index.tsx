import { NodeCustomEnum } from "@/types/customNodes";
import { Dropdown, MenuProps } from "antd";
import { FC, ReactNode } from "react";

const items: MenuProps["items"] = [
  {
    key: NodeCustomEnum.PROCESS,
    label: "normal",
  },
  {
    key: NodeCustomEnum.DECISION,
    label: "condition",
  },
  {
    key: NodeCustomEnum.BATCH,
    label: "batch",
  },
  {
    key: NodeCustomEnum.GROUP,
    label: "list loop",
  },
];

const ActionsMenu: FC<{
  children: ReactNode;
  onSelectItem: MenuProps["onClick"];
}> = (props) => {
  const { children, onSelectItem } = props;

  const onClick: MenuProps["onClick"] = (data) => {
    if (onSelectItem) {
      onSelectItem(data);
    }
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
      {children}
    </Dropdown>
  );
};

export default ActionsMenu;
