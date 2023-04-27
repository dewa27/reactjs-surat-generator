import React from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useNavigate } from "react-router-dom";
import { downloadDocumentById } from "../data/api";

const DocumentCard = ({ documentData }) => {
  const navigate = useNavigate();
  const onPreviewClick = () => {
    navigate(`/surat/${documentData.id}`);
  };
  const onDownloadClick = () => {
    const link = document.createElement("a");
    link.href = downloadDocumentById(documentData.id);
    link.click();
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
          <Button
            sx={{ padding: "8px 16px" }}
            onClick={onDownloadClick}
            startIcon={<FileDownloadIcon />}
          >
            Download
          </Button>
          <Button
            sx={{ padding: "8px 16px" }}
            startIcon={<FavoriteIcon />}
            disabled={documentData.isFavorite == 1 ? true : false}
          >
            Favorite
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default DocumentCard;
