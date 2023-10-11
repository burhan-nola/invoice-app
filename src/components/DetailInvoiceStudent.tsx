import React, { useEffect } from "react";

interface DataProps {
  inv: any;
  data: any;
}

const DetailInvoiceStudent: React.FC<DataProps> = ({ inv, data }) => {
  console.log(inv);
  console.log(data);
  // useEffect(() => {
  const newData = data.filter((std: any) =>
    inv.some((item: any) => item.studentID === std.studentID)
  );

  console.log(newData);
  // }, []);

  return newData.map(
    (item: any, index: number) =>
      (item.length = 0 ? (
        ""
      ) : (
        <p key={index}>
          name: {item.name}, grade: {item.grade} <br />
          <strong>Books:</strong>
          {
            (item.std.books.length = 0 ? (
              item.std.books.map((book: any, indexB: number) => (
                <li key={indexB}>{book.name}</li>
              ))
            ) : (
              <>
                -
                <br />
              </>
            ))
          }
          <strong>Addition:</strong>
          {item.std.additionFee.length > 0 ? (
            item.std.additionFee.map((add: any, indexA: number) => (
              <li key={indexA}>{add.item}</li>
            ))
          ) : (
            <>
              -
              <br />
            </>
          )}
        </p>
      ))
  );
};

export default DetailInvoiceStudent;
