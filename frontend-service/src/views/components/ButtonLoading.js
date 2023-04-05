import React from "react";
import { Button, Spinner } from "reactstrap";
import classnames from "classnames";
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children, loading, type, block, ...rest }) => (
  <Button
    {...rest}
    block={block}
    type={type === "submit" ? "submit" : "button"}
    style={{ width: "100%" }}
  >
    {!(block && !loading) && (
      <Spinner
        className={classnames({
          "position-relative": true,
          width: "100%",

          "button-style": !block,
          visible: loading,
          invisible: !loading,
        })}
        size="sm"
        // type="grow"
      />
    )}
    {!(!block && loading) && (
      <span
        className={classnames({
          invisible: loading,
          visible: !loading,
          "span-style": !block,
        })}
      >
        {children}
      </span>
    )}
  </Button>
);
