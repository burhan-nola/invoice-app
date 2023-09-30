import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { displayRupiah } from "../functions/DisplayRupiah";
import axios from "axios";
import { useSelector } from "react-redux";

interface ModalProps {
  id: string;
  show: boolean;
  onHide: (shouldClose: boolean) => void;
  title: string;
  books: any;
  body: {
    month: number;
    year: number;
  };
}
const ModalAddBook: React.FC<ModalProps> = ({
  id,
  title,
  show,
  onHide,
  books,
  body,
}) => {
  const [selectedBook, setSelectedBook] = useState<string>("");

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedBook(event.target.value);
  };

  const selected: any = books.find((item: any) => item._id === selectedBook);

  const header: any = useSelector((state: any) => state.header);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      month: body.month,
      year: body.year,
      bookID: selectedBook,
      studentID: id,
    };
    axios
      .post(
        import.meta.env.VITE_URL_INVOICE +
          `/invoices/add-book/${data.studentID}`,
        data,
        header
      )
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
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
          <label htmlFor="bookDropdown">Pilih Buku:</label>{" "}
          <select
            id="bookDropdown"
            name="book"
            value={selectedBook}
            onChange={handleDropdownChange}>
            <option value="-">-</option>

            {books.map((item: any, index: number) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </form>
        <hr />
        {selected && (
          <>
            <h5>Book's Title: {selected.name}</h5>
            <h5>Author: {selected.author}</h5>
            <h5>Year: {selected.year}</h5>
            <h5>Price: {displayRupiah(selected.price)}</h5>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={selected ? false : true}>
          Add book
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddBook;
