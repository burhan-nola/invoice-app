import React, { useEffect, useState } from "react";
import "../styles/table.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loading } from "../components/Loading";
import BtnGenerateInvoice from "../components/BtnGenerateInvoice";
import BtnManageInvoice from "../components/BtnManageInvoice";
import BtnDeleteInvoice from "../components/BtnDeleteInvoice";
import BtnPrintInvoice from "../components/BtnPrintInvoice";
import BtnManage from "../component/BtnManage";

const ManageInvoice: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const header = useSelector((state: any) => state.header);
  const { month, year } = useSelector((state: any) => state.date.date);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_URL_PARENT + "/parent/all", header)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);

  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_URL_INVOICE + `/invoices/all-history-invoices`,
        header
      )
      .then((res) => {
        const dataHistory = res.data.filter(
          (item: any) => item.month === month && item.year === year
        );
        setHistory(dataHistory);
      })
      .catch((err) => console.log(err));
  }, []);

  const isDisable = (id: string) => {
    const find = history.find((item: any) => item.idparent === id);
    return !!find;
  };

  const genSuccess = (data: any) => {
    setHistory((prevData) => [...prevData, data]);
  };

  const delSuccess = (data: string) => {
    const updateHist = history.filter((item) => item._id === data);
    setHistory(updateHist);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="tb-parent table-responsive">
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>Parents</th>
            <th>Whatsapp</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                Mr. {item.father.name} & Ms. {item.mother.name}
              </td>
              <td>
                <a href={`https://wa.me/${item.father.wa}`}>{item.father.wa}</a>
                / {item.mother.wa}
              </td>
              <td>
                {isDisable(item._id) ? (
                  <>
                    <BtnPrintInvoice id={item._id} />{" "}
                    <BtnDeleteInvoice id={item._id} del={delSuccess} />
                  </>
                ) : (
                  <>
                    <BtnManageInvoice
                      id={item._id}
                      father={item.father.name}
                      mother={item.mother.name}
                    />{" "}
                    <BtnGenerateInvoice id={item._id} gen={genSuccess} />
                    <BtnManage
                      id={item._id}
                      to={"/manage/students"}
                      action="show"
                      styBtn="btn btn-primary"
                      styTxt="bi bi-file-earmark-medical"
                      txt="Manage"
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInvoice;
