import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface BtnPrintInvoiceProps {
  id: string;
}
const BtnPrintInvoice: React.FC<BtnPrintInvoiceProps> = ({ id }) => {
  const header = useSelector((state: any) => state.header);

  const { month, year } = useSelector((state: any) => state.date.date);


  const print = async () => {
    await axios
      .get(
        import.meta.env.VITE_URL_INVOICE + `/invoices/history-invoices/${id}`,
        header
      )
      .then((res) => {
        const printData:any = res.data.find(
          (item: any) => item.month == month && item.year == year
        );
        console.log(printData)
        localStorage.setItem('printInv', JSON.stringify(printData))
      });
  };

  return (
    <>
      <Link to="/print-invoice" className="btn btn-warning" onClick={print}>
        <i className="bi bi-printer"></i> Print
      </Link>
    </>
  );
};

export default BtnPrintInvoice;
