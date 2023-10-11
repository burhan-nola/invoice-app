import React from "react";
import { Link } from "react-router-dom";
import { DetailParent } from "../functions/DetailParent";

interface Props {
  id: string;
  to: string;
  action: string;
  styBtn: string;
  styTxt: string;
  txt: string;
}

const BtnManage: React.FC<Props> = ({
  id,
  to,
  action,
  styBtn,
  styTxt,
  txt,
}) => {
  function act(action: string) {
    switch (action) {
      case "show":
        DetailParent(id);
        break;

      default:
        break;
    }
  }

  return (
    <Link to={to} className={styBtn} onClick={() => act(action)}>
      <i className={styTxt}></i> {txt}
    </Link>
  );
};

export default BtnManage;
