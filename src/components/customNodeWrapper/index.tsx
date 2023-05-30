import { CSSProperties, FC, ReactNode, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import classnames from "classnames";

import "./index.scss";
import CustomAddBtn from "../customAddBtn";
import { map } from "lodash-es";
import { useEventsFlowContext } from "@/pages/events-flow/stores";
import { NodeCustomEnum } from "@/types/customNodes";
import ActionsMenu from "../actionsMenu";
import { MenuProps } from "antd";

interface CustomWrapper extends NodeProps {
  className?: string;
  children?: ReactNode;
  id: NodeProps["id"];
  addonBtns?: Position[];
  handles?: Position[];
}

const BtnStyleMap: Record<Position, CSSProperties> = {
  [Position.Top]: {
    top: "-12px",
    left: 0,
    right: 0,
  },
  [Position.Bottom]: {
    bottom: "-12px",
    left: 0,
    right: 0,
  },
  [Position.Left]: {
    left: "-12px",
    top: 0,
    bottom: 0,
  },
  [Position.Right]: {
    right: "-12px",
    top: 0,
    bottom: 0,
  },
};

const DEFAULT_HANDlE = [Position.Top, Position.Bottom];
const DEFAULT_ADDON = [Position.Bottom];

const CustomNodeWrapper: FC<CustomWrapper> = (props) => {
  const {
    children,
    className,
    id,
    addonBtns = DEFAULT_ADDON,
    handles = DEFAULT_HANDlE,
    isConnectable,
    type: nodeType,
  } = props;

  const cls = classnames("customNodeWrapper", className);


  const { onAddNodes } = useEventsFlowContext();

  const onSelectItem: MenuProps["onClick"] = (params) => {
    const { key } = params;
    console.log(params);
    onAddNodes(id, key);
  };

  const renderNodeAddonBtn = () => {
    return map(addonBtns, (value) => {
      return (
        <ActionsMenu onSelectItem={onSelectItem} key={value}>
          <CustomAddBtn
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={BtnStyleMap[value]}
          />
        </ActionsMenu>
      );
    });
  };

  const renderNodeHandler = () => {
    return map([...new Set(handles)], (value) => {
      const type = [Position.Bottom, Position.Right, Position.Left].includes(
        value
      )
        ? "source"
        : "target";
      return (
        <Handle
          key={value}
          type={type}
          className="customHandle"
          position={value}
          isConnectable={isConnectable}
          id={value}
        />
      );
    });
  };

  return (
    <div className={cls}>
      {children}
      {renderNodeAddonBtn()}
      {children && renderNodeHandler()}
    </div>
  );
};
export default CustomNodeWrapper;
