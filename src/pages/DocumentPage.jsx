import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getDocumentById, downloadDocumentById } from "../data/api";
import { useParams } from "react-router-dom";
const DocumentPage = () => {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState({});
  useEffect(() => {
    const fetchDocument = async () => {
      const response = await getDocumentById(id);
      const responseData = await response.data;
      setDocumentData(() => responseData.data);
    };
    document.title = "Detail Surat";
    fetchDocument();
  }, []);

  const onDownload = () => {
    const link = document.createElement("a");
    link.href = downloadDocumentById(id);
    link.click();
  };
  return (
    <>
      {documentData.path ? (
        <embed src={documentData.path} width="100%" height="750px" />
      ) : (
        "Loading preview ..."
      )}
      <Button
        sx={{
          width: "100%",
          padding: "16px 0",
          fontWeight: "bold",
          marginTop: "16px",
        }}
        variant="contained"
        onClick={() => {
          onDownload();
        }}
        disabled={!documentData.path}
      >
        Download Surat
      </Button>
    </>
  );
};

export default DocumentPage;
