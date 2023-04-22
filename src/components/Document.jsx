import React from "react";
import Arial from "./../assets/arial.ttf";
import ArialBold from "./../assets/arialbd.ttf";
import ArialItalic from "./../assets/ariali.ttf";
import { parse } from "node-html-parser";
import JsxParser from "react-jsx-parser";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottom: "2px solid black",
    // alignItems: "center",
  },
  page: {
    // fontFamily: "Arial",
    padding: "1cm 1.5cm",
    fontSize: "12pt",
  },
  docTitle: {
    fontWeight: "bold",
    fontFamily: "Arial-Bold",
    fontSize: "16pt",
    textTransform: "uppercase",
    textAlign: "center",
    // border: "1px solid red",
    // display: "block",
    width: "100%",
  },
  headerTitle: {
    // border: "1px solid black",
    // margin: "0 0 0 24pt",
    textAlign: "center",
  },
  image: {
    width: "2.25cm",
  },
  headerDetailWrapper: {
    display: "flex",
    flexDirection: "row",
    margin: "8pt 0",
    fontSize: "10pt",
    justifyContent: "space-between",
    gap: "5pt",
    width: "100%",
  },
  headerDetail: {
    width: 0,
    paddingLeft: "5pt",
    // border: "1px solid black",
  },
  headerDetailText: {
    // border: "1px solid black",
    width: "100%",
  },
  headerTextWrapper: {
    // border: "1px solid black",
    margin: "0 8pt 0 16pt",
    width: "100%",
  },
  body: {
    marginTop: "8pt",
  },
  title: {
    fontFamily: "Arial-Bold",
    // fontWeight: "bold",
    textAlign: "left",
    marginLeft: "7cm",
  },
  bodySpecWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "8pt",
    lineHeight: "1.5",
  },
  bodyText: {
    marginTop: "8pt",
    lineHeight: "1.5",
    textAlign: "justify",
    textIndent: "1cm",
  },
  ttdWrapper: {
    marginTop: "4cm",
    marginLeft: "10cm",
  },
  bodySpecValue: {
    flex: "10 1 0",
    marginLeft: "8pt",
    textAlign: "justify",
  },
  isiStyle: {
    fontSize: "12pt",
    fontFamily: "Arial",
  },
  tembusanWrapper: {
    marginTop: "2cm",
  },
});

const stylesheet = {
  p: {
    margin: 0,
    fontSize: "12pt",
    fontFamily: "Arial",
    fontWeight: "normal",
    textIndent: "1cm",
  },
};
const MyDocument = ({
  yth,
  hal,
  dari,
  tanggal,
  nomor_surat,
  isi,
  namaTtd,
  nipTtd,
  tembusan = "",
}) => {
  Font.register({ family: "Arial", src: Arial });
  Font.register({ family: "Arial-Bold", src: ArialBold });
  Font.register({ family: "Arial-Italic", src: ArialItalic });
  Font.registerHyphenationCallback((word) => [word]);

  const createTextFromHtml = (htmlText, isIndent) => {
    const text = parse(htmlText);
    let html = "";
    text.childNodes.forEach((nodes) => {
      html += nodes
        .toString()
        .replace(/<p[^>]*><br><\/p[^>]*>/g, "")
        .replace(
          /<p[^>]*>/g,
          `<Text style={{lineHeight:'1.5',${
            isIndent ? "textIndent:'1cm'," : ""
          }textAlign:'justify'}}>`
        )
        .replace(/<\/p[^>]*>/g, "</Text>")
        .replace(
          /<strong[^>]*>/g,
          `<Text style={{fontFamily:'Arial-Bold',${
            isIndent ? "textIndent:'1cm'" : ""
          }}}>`
        )
        .replace(/<\/strong[^>]*>/g, "</Text>")
        .replace(
          /<em[^>]*>/g,
          `<Text style={{fontFamily:'Arial-Italic',${
            isIndent ? "textIndent:'1cm'" : ""
          }}}>`
        )
        .replace(/<\/em[^>]*>/g, "</Text>");
    });
    return html;
  };
  const isiSurat = createTextFromHtml(isi, true);
  const tembusanSurat = createTextFromHtml(tembusan, false);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image style={styles.image} src="/logo.png" />
          </View>
          <View style={styles.headerTextWrapper}>
            <View style={styles.headerTitle}>
              <Text style={styles.docTitle}>Kementerian Perhubungan</Text>
              <Text style={styles.docTitle}>
                Direktorat Jenderal Perkeretaapian
              </Text>
            </View>
            <View style={styles.headerDetailWrapper}>
              <View style={{ ...styles.headerDetail, flex: "5 1 0" }}>
                <Text style={styles.headerDetailText}>GEDUNG KARYA</Text>
                <Text style={styles.headerDetailText}>
                  JL.MEDAN MERDEKA BARAT NO8
                </Text>
                <Text style={styles.headerDetailText}>JAKARTA 10110</Text>
              </View>
              <View
                style={{
                  ...styles.headerDetail,
                  borderLeft: "2pt solid black",
                  flex: "4 1 0",
                }}
              >
                <Text
                  style={{ ...styles.headerDetailText, textAlign: "right" }}
                >
                  TEL: (021) 3506204, 385683
                </Text>
                <Text
                  style={{ ...styles.headerDetailText, textAlign: "right" }}
                >
                  3505557, 3505558
                </Text>
                <Text
                  style={{ ...styles.headerDetailText, textAlign: "right" }}
                >
                  3505559, 3506526
                </Text>
              </View>
              <View
                style={{
                  ...styles.headerDetail,
                  borderLeft: "2pt solid black",
                  flex: "3 1 0",
                }}
              >
                <Text
                  style={{ ...styles.headerDetailText, textAlign: "right" }}
                >
                  Fax (021) 3506204,
                </Text>
                <Text
                  style={{ ...styles.headerDetailText, textAlign: "right" }}
                >
                  3813972
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>NOTA DINAS</Text>
          <Text
            style={{
              ...styles.title,
              marginBottom: "16pt",
            }}
          >
            Nomor : {nomor_surat}/ND/K2.TU/DJKA/2023
          </Text>
          <View style={{ padding: "0 1cm" }}>
            <View style={styles.bodySpecWrapper}>
              <Text style={{ flex: "2 1 0" }}>Yth</Text>
              <Text>:</Text>
              <Text style={styles.bodySpecValue}>{yth}</Text>
            </View>
            <View style={styles.bodySpecWrapper}>
              <Text style={{ flex: "2 1 0" }}>Dari</Text>
              <Text>:</Text>
              <Text style={styles.bodySpecValue}>{dari}</Text>
            </View>
            <View style={styles.bodySpecWrapper}>
              <Text style={{ flex: "2 1 0" }}>Hal</Text>
              <Text>:</Text>
              <Text style={styles.bodySpecValue}>{hal}</Text>
            </View>
            <View style={styles.bodySpecWrapper}>
              <Text style={{ flex: "2 1 0" }}>Tanggal</Text>
              <Text>:</Text>
              <Text style={styles.bodySpecValue}>{tanggal}</Text>
            </View>
            <View>
              <JsxParser components={{ Text }} jsx={isiSurat} />
            </View>
            <View style={styles.ttdWrapper}>
              <Text>{namaTtd}</Text>
              <Text style={{ marginTop: "2pt" }}>NIP. {nipTtd}</Text>
            </View>
            <View style={styles.tembusanWrapper}>
              <Text style={{ marginBottom: "8pt" }}>Tembusan :</Text>
              <JsxParser components={{ Text }} jsx={tembusanSurat} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default React.memo(MyDocument);
