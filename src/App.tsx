import Login from "./pages/Login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "./redux/slices/AdminLogin";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import PageRouter from "./pages/Router";

function App() {
  const dispatch = useDispatch();
  const [isValid, setValid] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const token: string | null = localStorage.getItem("token");
  if (!token) {
    return <Login />;
  }

  const header = useSelector((state: any) => state.header);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_URL_ADMIN + "/admin/detail", header)
      .then((res) => {
        const { name, role } = res.data;
        dispatch(setAdmin({ name, role }));
        setValid(true);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setLoading(false);
        localStorage.clear();
        location.reload();
      });
  }, []);

  return isLoading ? <Loading /> : isValid ? <PageRouter /> : <Login />;
}

export default App;
