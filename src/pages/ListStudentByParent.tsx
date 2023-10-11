import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loading";
// import { format } from "date-fns";
import BtnAddInvoice from "../components/BtnAddInvoice";
import BtnDeleteInvoiceStudent from "../components/BtnDeleteInvoiceStudent";
import BtnAddBook from "../components/BtnAddBook";
import { Link } from "react-router-dom";
import BtnAddition from "../components/BtnAddition";
import DetailInvoiceStudent from "../components/DetailInvoiceStudent";

const ListStudentByParent: React.FC = () => {
  const [isLoading, setLoading] = useState(true);

  const parent1: any = localStorage.getItem("parentSelected");

  const parent = JSON.parse(parent1);

  const [data, setData] = useState([]);
  const [inv, setInv] = useState<any[]>([]);
  const header = useSelector((state: any) => state.header);

  const { month, year } = useSelector((state: any) => state.date.date);

  useEffect(() => {
    axios
      .post(
        import.meta.env.VITE_URL_INVOICE + "/invoices/students-invoice",
        { month, year },
        header
      )
      .then((res) => {
        const invThisMonth = res.data;
        setInv(invThisMonth);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_URL_STUDENT + `/student/mystudents/${parent.id}`,
        header
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);

  const addSuccess: any = (data: any) => {
    setInv((prevData) => [...prevData, data]);
  };

  const delSuccess: any = (id: string) => {
    const updateData = inv.filter((item: any) => item._id !== id);
    setInv(updateData);
  };

  const isDisabled = (stdID: string) => {
    const foundItem = inv.find((item: any) => item.studentID === stdID);
    return !!foundItem;
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <header style={{ textAlign: "center" }}>
        <h4>
          Mr. {parent.father} <i>&</i> Ms. {parent.mother}
        </h4>
      </header>

      <div className="tb-student table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ width: "15%" }}>Grade</th>
              <th>Email</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td style={{ width: "15%", textAlign: "center" }}>
                  {item.grade}
                </td>
                <td>{item.email}</td>
                <td className="button-group">
                  {isDisabled(item._id) ? (
                    ""
                  ) : (
                    <BtnAddInvoice
                      id={item._id}
                      name={item.name}
                      addINV={addSuccess}
                      grade={item.grade}
                    />
                  )}

                  {isDisabled(item._id) ? (
                    <>
                      <BtnAddBook id={item._id} name={item.name} />
                      <BtnAddition id={item._id} name={item.name} />
                      <BtnDeleteInvoiceStudent id={item._id} del={delSuccess} />
                    </>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/manage">{"<-"}Back</Link>
      </div>
      <hr />
      <DetailInvoiceStudent inv={inv} data={data} />
    </>
  );
};

export default ListStudentByParent;
