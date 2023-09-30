import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface BtnGenerateInvoiceProps {
  id: string;
  gen: (data: any) => void;
}
const BtnGenerateInvoice: React.FC<BtnGenerateInvoiceProps> = ({ id, gen }) => {
  const { month, year } = useSelector((state: any) => state.date.date);
  const header = useSelector((state: any) => state.header);

  const [isLoading, setLoading] = useState<boolean>(false);

  const generate = () => {
    setLoading(true);
    console.log({ month, year });
    axios
      .post(
        import.meta.env.VITE_URL_INVOICE + `/invoices/generate/${id}`,
        { month: month, year: year },
        header
      )
      .then((res) => {
        console.log(res.data);
        gen(res.data);
        alert("Generate Invoice Success");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        setLoading(false);
      });
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <Link to="#" className="btn btn-primary" onClick={generate}>
      <i className="bi bi-file-earmark-medical"></i> Generate
    </Link>
  );
};

export default BtnGenerateInvoice;
