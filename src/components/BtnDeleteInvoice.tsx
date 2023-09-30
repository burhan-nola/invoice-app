import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface BtnDeleteInvoiceProps {
  id: string;
  del: (data: string) => void;
}

const BtnDeleteInvoice: React.FC<BtnDeleteInvoiceProps> = ({ id, del }) => {
  const date = new Date();
  // const formatDate = format(date, "dd/MM/yyyy");
  const header = useSelector((state: any) => state.header);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const deleteInvoice = () => {
    axios
      .delete(
        import.meta.env.VITE_URL_INVOICE + `/invoices/delete-invoice/${id}`,
        {
          data: { month: month, year: year },
          headers: { token: header.headers.token },
        }
      )
      .then((res) => {
        alert(res.data.message);
        del(res.data.data._id);
      })
      .catch((err) => alert(err.response.data.message));
  };
  return (
    <Link to="#" onClick={deleteInvoice} className="btn btn-danger">
      <i className="bi bi-trash3"></i> Delete
    </Link>
  );
};

export default BtnDeleteInvoice;
