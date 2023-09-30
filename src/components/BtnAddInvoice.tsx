import React, { useState } from "react";
import ModalAddInvoice from "./ModalAddInvoice";
import axios from "axios";
import { useSelector } from "react-redux";

interface BtnAddInvoiceProps {
  id: string;
  name: string;
  addINV: (data: any) => void;
  grade: number;
}
const BtnAddInvoice: React.FC<BtnAddInvoiceProps> = ({
  id,
  name,
  addINV,
  grade,
}) => {
  const header = useSelector((state: any) => state.header);

  const { month, year } = useSelector((state: any) => state.date.date);

  const [showModal, setShowModal] = useState(false);
  const [monthlyfee, setMonthlyfee] = useState(0);

  const openModal = () => {
    setShowModal(true);
    axios
      .get(
        import.meta.env.VITE_URL_INVOICE + "/invoices/list-monthlyfee",
        header
      )
      .then((res) => {
        const monthfee = res.data.find((item: any) => item.grade === grade);
        console.log(monthfee);
        setMonthlyfee(monthfee.monthlyFee);
      });
  };
  const closeModal: any = (closeModal: boolean) => {
    if (closeModal) {
      setShowModal(false);
    }
  };
  const success: any = (data: any) => {
    addINV(data);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => openModal()}>
        <i className="bi bi-currency-dollar"></i>
      </button>
      <ModalAddInvoice
        show={showModal}
        onHide={closeModal}
        title={"Open Invoice for " + name}
        body={{ month, year, discount: 0, id, monthlyfee }}
        addINV={success}
      />
    </>
  );
};

export default BtnAddInvoice;
