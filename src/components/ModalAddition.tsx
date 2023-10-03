import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { displayRupiah } from "../functions/DisplayRupiah";

interface ModalProps {
  id: string;
  show: boolean;
  onHide: (shouldClose: boolean) => void;
  title: string;
  body: {
    month: number;
    year: number;
  };
  addition: any;
}

const ModalAddition: React.FC<ModalProps> = ({
  id,
  show,
  onHide,
  title,
  body,
  addition,
}) => {
  const [selectedAddition, setSelectedAddition] = useState<string>("");

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAddition(event.target.value);
  };

  const selected: any = addition.find(
    (item: any) => item._id === selectedAddition
  );

  const header: any = useSelector((state: any) => state.header);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      month: body.month,
      year: body.year,
      additionFeeID: selectedAddition,
      studentID: id,
    };
    console.log(data);
    axios
      .post(
        import.meta.env.VITE_URL_INVOICE +
          `/invoices/add-additionfee/${data.studentID}`,
        data,
        header
      )
      .then((res) => {
        console.log(res.data);
        alert(res.status);
        onHide(true);
      })
      .catch((err) => {
        console.log(err);
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="itemDropdown">Pilih Item:</label>{" "}
          <select
            id="itemDropdown"
            name="addition"
            value={selectedAddition}
            onChange={handleDropdownChange}
          >
            <option value="-">-</option>

            {addition.map((item: any, index: number) => (
              <option key={index} value={item._id}>
                {item.item}
              </option>
            ))}
          </select>
        </form>
        <hr />
        {selected && (
          <>
            <h5>Item: {selected.item}</h5>
            <h5>Price: {displayRupiah(selected.price)}</h5>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddition;
