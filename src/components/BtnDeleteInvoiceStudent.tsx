import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

interface BtnDeleteInvoiceStudentProps {
  id: string;
  del: (data: string) => void;
}
const BtnDeleteInvoiceStudent: React.FC<BtnDeleteInvoiceStudentProps> = ({
  id,
  del,
}) => {
  const header = useSelector((state: any) => state.header);
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const deleteData: any = (id: string) => {
    axios
      .delete(import.meta.env.VITE_URL_INVOICE + `/invoices/delete/${id}`, {
        data: { month: month, year: year },
        headers: { token: header.headers.token },
      })
      .then((res) => {
        alert(res.data.message);
        del(res.data.data._id);
      });
  };

  return (
    <>
      <button className="btn btn-danger" onClick={() => deleteData(id)}>
        x
      </button>
    </>
  );
};

export default BtnDeleteInvoiceStudent;
