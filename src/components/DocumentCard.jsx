import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useNavigate } from "react-router-dom";
import { downloadDocumentById, toggleFavorite } from "../data/api";

const DocumentCard = ({ documentData }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(documentData.isFavorite);
  const onPreviewClick = () => {
    navigate(`/surat/${documentData.id}`);
  };
  const onDownloadClick = () => {
    const link = document.createElement("a");
    link.href = downloadDocumentById(documentData.id);
    link.click();
  };
  const onFavoriteClick = async () => {
    try {
      const response = await toggleFavorite(documentData.id);
      const responseData = await response.data;
      setIsFavorite(parseInt(responseData.data.isFavorite));
      console.log("berhasil menambahkan ke favorite");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 18, textAlign: "left" }}
          color="text.primary"
        >
          {documentData.filename}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography
            sx={{ fontSize: 14, textAlign: "left" }}
            color="text.secondary"
          >
            Dibuat pada : {documentData.tanggal_dibuat}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{ padding: "8px 16px" }}
          startIcon={<VisibilityIcon />}
          onClick={onPreviewClick}
        >
          Preview
        </Button>
        <Box>
          <IconButton
            sx={{ width: "48px", height: "48px" }}
            onClick={onDownloadClick}
            color="primary"
          >
            <FileDownloadIcon />
          </IconButton>
          <IconButton
            sx={{ width: "48px", height: "48px" }}
            onClick={onFavoriteClick}
            color="primary"
          >
            {isFavorite == 1 ? (
              <FavoriteOutlinedIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default DocumentCard;
