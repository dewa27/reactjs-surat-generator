import React from "react";
import { PDFDownloadLink, PDFViewer, BlobProvider } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import Document from "../components/Document";
import { Button } from "@mui/material";
const DocumentPage = () => {
  const location = useLocation();
  const onDownload = (url) => {
    const link = document.createElement("a");
    link.download = `surat.pdf`;
    link.href = url;
    link.click();
  };
  return (
    <>
      <PDFViewer width={"100%"} height={"650px"}>
        <Document {...location.state} />
      </PDFViewer>
      <BlobProvider document={<Document {...location.state} />}>
        {({ blob, url, loading, error }) => {
          console.log(url);
          return (
            <>
              <Button
                sx={{
                  width: "100%",
                  padding: "16px 0",
                  fontWeight: "bold",
                  marginTop: "16px",
                }}
                variant="contained"
                onClick={() => {
                  if (!loading) onDownload(url);
                }}
                disabled={loading}
              >
                Download Surat
              </Button>
            </>
          );
        }}
      </BlobProvider>
    </>
  );
};

export default DocumentPage;
