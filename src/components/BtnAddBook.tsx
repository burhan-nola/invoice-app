import React, { useEffect, useState } from "react";
import ModalAddBook from "./ModalAddBook";
import { useSelector } from "react-redux";
import axios from "axios";

interface BtnAddBookProps {
  id: string;
  name: string;
}
const BtnAddBook: React.FC<BtnAddBookProps> = ({ id, name }) => {
  const date = new Date();
  // const formatDate = format(date, "dd/MM/yyyy");
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const [showModal, setShowModal] = useState(false);
  const [allBook, setAllBook] = useState([]);
  const header = useSelector((state: any) => state.header);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_URL_BOOK + `/book/all`, header)
      .then((res) => {
        setAllBook(res.data);
      });
  }, []);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal: any = (closeModal: boolean) => {
    if (closeModal) {
      setShowModal(false);
    }
  };

  return (
    <>
      <button className="btn btn-success" onClick={() => openModal()}>
        <i className="bi bi-journal-plus"></i>
      </button>
      <ModalAddBook
        id={id}
        show={showModal}
        onHide={closeModal}
        title={"Add book for " + name}
        books={allBook}
        body={{ month, year }}
      />
    </>
  );
};

export default BtnAddBook;
