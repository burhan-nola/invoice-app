function displayRupiah(price: any) {
  const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return rupiahFormatter.format(price).replace(/\,00$/, ",-");
}

export { displayRupiah };
