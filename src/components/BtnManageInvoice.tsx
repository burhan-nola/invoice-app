import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setParent } from "../redux/slices/Parent";

interface BtnManageInvoiceProps {
  id: string;
  father: string;
  mother: string;
}
const BtnManageInvoice: React.FC<BtnManageInvoiceProps> = ({
  id,
  father,
  mother,
}) => {
  const dispatch = useDispatch();

  const manage: any = () => {
    localStorage.setItem(
      "parentSelected",
      JSON.stringify({ id, father, mother })
    );
    dispatch(setParent({ id, father, mother }));
  };

  return (
    <Link to="/manage/students" className="btn btn-success" onClick={manage}>
      <i className="bi bi-gear"></i> Manage
    </Link>
  );
};

export default BtnManageInvoice;
