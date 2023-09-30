import React from "react";
import logo from "../assets/logo.png";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { displayRupiah } from "../functions/DisplayRupiah";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    padding: "1cm",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: "75px",
    height: "35px",
  },
  address: {
    marginLeft: "10px",
  },
  pkbm: {
    fontSize: "20pt",
    fontWeight: "bold",
    color: "rgb(23, 108, 108)",
  },
  alamat: {
    fontSize: "10pt",
    //   fontFamily: 'Comfortaa',
  },
  title: {
    fontSize: "22pt",
    marginTop: "10px",
    fontWeight: "bold",
    // fontFamily: 'Comfortaa',
  },
  border: {
    width: "100%",
    borderBottomWidth: 10, // Ubah sesuai dengan ketebalan yang Anda inginkan
    borderBottomColor: "rgb(23, 108, 108)",
  },
  line: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginTop: 10,
    marginBottom: 10,
  },
  section: {
    flexDirection: "row",
  },
  section1: {
    fontSize: "14pt",
    marginBottom: "10pt",
  },
  section2: {
    marginLeft: "200px",
    fontSize: "14pt",
    // fontFamily: 'Lora-Basic',
    marginBottom: "10px",
  },
  section3: {
    flexDirection: "row",
    // fontFamily: 'Comfortaa-Bold',
    fontSize: "12pt",
    // marginBottom: '5px'
  },
  section4: {
    // fontFamily: 'Lora-Basic',
    fontSize: "11pt",
  },
  judul: {
    backgroundColor: "rgb(214, 214, 214)",
    paddingLeft: "20px",
    paddingVertical: "2px",
    marginTop: "5px",
  },
  isi: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  isiDesc: {
    paddingLeft: "10px",
    paddingBottom: "1px",
    width: "50%",
  },
  price: {
    // textAlign: "rigth",
  },
  section5: {
    flexDirection: "row",
    justifyContent: "space-between",
    // fontFamily: 'Comfortaa-Bold'
  },
  footer: {
    width: "60%",
    fontSize: "8pt",
  },
  total: {
    width: "20%",
    fontSize: "16pt",
    textAlign: "center",
  },
  totalNum: {
    width: "20%",
    textAlign: "right",
    fontSize: "16pt",
    color: "red",
  },
  // Define your other styles here
});

const PrintInvoice: React.FC = () => {
  const getData: any = localStorage.getItem("printInv");
  const invData = JSON.parse(getData);
  const { month, year } = useSelector((state: any) => state.date.date);
  const monthStr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const preview = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.border}></View>

        <view style={{ padding: "20px" }}>
          <View style={styles.header}>
            <Image src={logo} style={styles.logo} />
            <View style={styles.address}>
              <Text style={styles.pkbm}>PKBM NOLA</Text>
              <View style={styles.alamat}>
                <Text style={{ marginBottom: "2px" }}>
                  Jl. Klampis Jaya No.37H
                </Text>
                <Text style={{ marginBottom: "2px" }}>
                  Surabaya - 60117, Jawa Timur
                </Text>
                <Text>+31 595-6677 | info@cahayautaraindonesia.com</Text>
              </View>
            </View>
          </View>

          <Text style={styles.title}>Invoice</Text>
          <View style={styles.line}></View>

          <View style={styles.section}>
            <View style={styles.section1}>
              <Text>Invoice Date</Text>
              <Text style={{ marginTop: "5pt" }}>
                01 - {monthStr[month]} - {year}
              </Text>
            </View>

            <View style={styles.section2}>
              <Text>For</Text>
              <View style={{ fontSize: "12pt", marginTop: "7px" }}>
                <Text>Mr. {invData.father}</Text>
                <Text>Ms. {invData.mother}</Text>
              </View>
            </View>
          </View>

          <View style={styles.line}></View>

          <View style={styles.section3}>
            <Text style={{ marginLeft: "60px" }}>Description</Text>
            <Text style={{ marginLeft: "260px" }}>Price</Text>
          </View>

          <View style={styles.section4}>
            <Text style={styles.judul}>Monthly Fee</Text>
            <View style={styles.isi}>
              <View style={styles.isiDesc}>
                {invData.detail.map((item: any, index: number) => (
                  <View key={index}>
                    <Text>
                      {item.name} - G{item.grade}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.price}>
                {invData.detail.map((item: any, index: number) => (
                  <View key={index}>
                    <Text>{displayRupiah(item.monthlyFee)}</Text>
                  </View>
                ))}
              </View>
            </View>

            <Text style={styles.judul}>Books</Text>
            <View style={styles.isi}>
              <View style={styles.isiDesc}>
                {invData.detail.map((item: any) =>
                  item.book.map((book: any, bookIndex: number) => (
                    <View key={bookIndex}>
                      <Text>{book.name}</Text>
                    </View>
                  ))
                )}
              </View>
              <View style={styles.price}>
                {invData.detail.map((item: any) =>
                  item.book.map((book: any, bookIndex: number) => (
                    <View key={bookIndex}>
                      <Text>{displayRupiah(book.price)}</Text>
                    </View>
                  ))
                )}
              </View>
            </View>

            <Text style={styles.judul}>Addition Fee</Text>
            <View style={styles.isi}>
              <View style={styles.isiDesc}>
                {invData.detail.map((item: any) =>
                  item.additionFee.map((add: any, addIndex: number) => (
                    <View key={addIndex}>
                      <Text>{add.item}</Text>
                    </View>
                  ))
                )}
              </View>
              <View style={styles.price}>
                {invData.detail.map((item: any) =>
                  item.additionFee.map((add: any, addIndex: number) => (
                    <View key={addIndex}>
                      <Text>{displayRupiah(add.price)}</Text>
                    </View>
                  ))
                )}
              </View>
            </View>
          </View>

          <View style={styles.line}></View>

          <View style={styles.section5}>
            <View style={styles.footer}>
              <Text>Thank you for enrolling in our school!</Text>
              <Text>
                Transfer ke BCA: 0106662023 Yayasan Tefila Cahaya Indonesia
              </Text>
              <Text>
                Transfer ke Mandiri: 1400022797972 Yayasan Tefila Cahaya
                Indonesia
              </Text>
            </View>
            <Text style={styles.total}>TOTAL</Text>
            <Text style={styles.totalNum}>{displayRupiah(invData.total)}</Text>
          </View>
        </view>
        <View style={styles.border}></View>
      </Page>
    </Document>
  );
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Link to="/manage">{"<-"} Back </Link>{" "}
        <PDFDownloadLink
          document={preview}
          fileName={
            year.toString() + "-" + month.toString() + "-" + invData.idparent
          }
        >
          {({ loading }) =>
            loading ? "Loading document..." : <button>Download Now</button>
          }
        </PDFDownloadLink>
      </div>

      <PDFViewer style={{ width: "100%", height: "90vh" }}>{preview}</PDFViewer>
    </>
  );
};

export default PrintInvoice;
