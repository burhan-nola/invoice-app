import axios from "axios";

function DetailParent(id: string) {
  axios
    .get(import.meta.env.VITE_URL_PARENT + `/parent/detail/${id}`, {
      headers: { token: localStorage.getItem("token") },
    })
    .then((res) => {
      console.log(res.data);
      const id = res.data.data._id;
      const father = res.data.data.father.name;
      const mother = res.data.data.mother.name;
      localStorage.setItem(
        "parentSelected",
        JSON.stringify({ id, father, mother })
      );
    });
}

export { DetailParent };
