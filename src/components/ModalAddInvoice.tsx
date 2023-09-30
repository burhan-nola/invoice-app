import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { displayRupiah } from "../functions/DisplayRupiah";

interface ModalProps {
  addINV: (data: any) => void;
  show: boolean;
  onHide: (shouldClose: boolean) => void;
  title: string;
  body: {
    month: number;
    year: number;
    discount: number;
    id: string;
    monthlyfee: number;
  };
}

const ModalAddInvoice: React.FC<ModalProps> = ({
  addINV,
  show,
  onHide,
  title,
  body,
}) => {
  const header = useSelector((state: any) => state.header);
  const [discount, setDiscount] = useState(body.discount);
  const handleDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dis = parseFloat(event.target.value);
    setDiscount(dis);
  };
  const ripiahMonthlyFee = displayRupiah(body.monthlyfee);
  const openINV = () => {
    body.discount = discount;
    const varINV = {
      month: body.month,
      year: body.year,
      discount: body.discount,
    };
    axios
      .post(
        import.meta.env.VITE_URL_INVOICE + `/invoices/add-invoice/${body.id}`,
        varINV,
        header
      )
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        onHide(true);

        addINV(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
        onHide(true);
      });
  };
  return (
    <Modal show={show} onHide={() => onHide(true)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Month: {body.month}</h5>
        <h5>Year: {body.year}</h5>
        <h5>Actual Monthly Fee: {ripiahMonthlyFee}</h5>
        <h5>
          Discount:{" "}
          <input type="number" value={discount} onChange={handleDiscount} />
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={openINV}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddInvoice;
