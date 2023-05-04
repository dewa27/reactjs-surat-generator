import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  getDocumentById,
  downloadDocumentById,
  toggleFavorite,
} from "../data/api";
import { useParams } from "react-router-dom";
const DocumentPage = () => {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState({});
  useEffect(() => {
    const fetchDocument = async () => {
      const response = await getDocumentById(id);
      const responseData = await response.data;
      // console.log(responseData.data);
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
  const onFavorite = async () => {
    try {
      const response = await toggleFavorite(id);
      const responseData = await response.data;
      setDocumentData(responseData.data);
      console.log("berhasil menambahkan ke favorite");
    } catch (e) {
      console.log(e);
    }
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
      <Button
        sx={{
          width: "100%",
          padding: "16px 0",
          fontWeight: "bold",
          marginTop: "16px",
          backgroundColor: "#FFB6C1",
        }}
        variant="contained"
        onClick={() => {
          onFavorite();
        }}
      >
        {documentData.isFavorite == 1
          ? "Hapus dari Favorite"
          : "Tambahkan ke Favorite"}
      </Button>
    </>
  );
};

export default DocumentPage;
