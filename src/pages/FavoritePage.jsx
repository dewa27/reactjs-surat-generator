import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DocumentCard from "../components/DocumentCard";
import { getFavoriteDocuments } from "../data/api";

const FavoritePage = () => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getFavoriteDocuments();
      const responseData = await response.data;
      setDocuments(() => responseData.data);
    };
    document.title = "History Surat";
    fetchData();
  }, []);

  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      {documents.map((document) => (
        <Grid item xs={12} key={document.filename}>
          <DocumentCard documentData={document} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FavoritePage;
