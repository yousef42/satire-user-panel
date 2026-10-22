import React, { Component } from "react";
import { isemail } from "../../../utils";

class MatxSidenav extends Component {
  handleResizeRef;

  state = {
    email: isemail(),
  };

  handleWindowResize = () => {
    return (event) => {
      if (event.target.innerWidth < 768) {
        this.setState({ email: true });
      } else this.setState({ email: false });
    };
  };


  render() {
    let {
      open,
      children,
      toggleSidenav,
      width = "220px",
      bgClass,
    } = this.props;

    let { email } = this.state;

    return (
      <div className="flex h-100">
        <div
          className={`matx-sidenav bg-default ${bgClass}`}
          style={{ width: open || !email ? width : "0px" }}
        >
          {children}
        </div>
        {open && email && (
          <div onClick={toggleSidenav} className="matx-sidenav-overlay" />
        )}
      </div>
    );
  }
}

export default MatxSidenav;
