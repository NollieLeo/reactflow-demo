import { FC, ReactNode } from "react";

import classnames from "classnames";
import "./index.scss";

interface CustomWrapper {
  className?: string;
  children: ReactNode;
}

const CustomNodeWrapper: FC<CustomWrapper> = (props) => {
  const { children, className } = props;

  const cls = classnames("customNodeWrapper", className);

  return <div className={cls}>{children}</div>;
};
export default CustomNodeWrapper;
