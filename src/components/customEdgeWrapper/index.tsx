import { FC, ReactNode } from "react";

import classnames from "classnames";

const CustomEdgeWrapper: FC<{
  className?: string;
  children: ReactNode;
}> = (props) => {
  const { children, className } = props;
  const cls = classnames("CustomEdgeWrapper", className);
  return <div className={cls}>{children}</div>;
};

export default CustomEdgeWrapper;
