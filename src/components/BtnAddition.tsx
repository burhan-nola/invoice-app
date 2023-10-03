import React, { useEffect, useState } from "react";
import ModalAddition from "./ModalAddition";
import axios from "axios";
import { useSelector } from "react-redux";

interface BtnAdditionProps {
  id: string;
  name: string;
}
const BtnAddition: React.FC<BtnAdditionProps> = ({ id, name }) => {
  const [showModal, setShowModal] = useState(false);
  const [allAddition, setAllAddition] = useState([]);
  const header = useSelector((state: any) => state.header);
  const { month, year } = useSelector((state: any) => state.date.date);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal: any = (closeModal: boolean) => {
    if (closeModal) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_URL_INVOICE + `/invoices/list-additionfee`,
        header
      )
      .then((res) => {
        setAllAddition(res.data);
      });
  }, []);

  return (
    <>
      <button className="btn btn-sm btn-secondary" onClick={() => openModal()}>
        <i className="bi bi-plus-lg"></i>
      </button>
      <ModalAddition
        id={id}
        show={showModal}
        onHide={closeModal}
        title={"Add additional item for " + name}
        addition={allAddition}
        body={{ month, year }}
      />
    </>
  );
};

export default BtnAddition;
