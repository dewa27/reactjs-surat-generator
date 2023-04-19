import React from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import DocumentPage from "./DocumentPage";
const toolbarQuill = {
  toolbar: [
    // [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    // [
    //   { list: "ordered" },
    //   { list: "bullet" },
    //   { indent: "-1" },
    //   { indent: "+1" },
    // ],
    // ["link", "image"],
    // ["clean"],
  ],
};
const MainPage = () => {
  const navigate = useNavigate();
  const [nomor, setNomor] = React.useState("");
  const [yth, setYth] = React.useState("");
  const [hal, setHal] = React.useState("");
  const [tanggal, setTanggal] = React.useState("");
  const [dari, setDari] = React.useState("");
  const [isi, setIsi] = React.useState("");
  const [namaTtd, setNamaTtd] = React.useState("");
  const [nipTtd, setNipTtd] = React.useState("");

  const onExportHandler = () => {
    navigate("/cetak-surat", {
      state: { nomor, yth, hal, tanggal, dari, isi, namaTtd, nipTtd },
    });
  };

  const onChangeQuill = (value, delta, source, editor) => {
    setIsi(value);
  };
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Nomor Surat"
          value={nomor}
          onChange={(event) => {
            setNomor(event.target.value);
          }}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Yang Terhormat (Yth)"
          value={yth}
          onChange={(event) => {
            setYth(event.target.value);
          }}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Dari"
          value={dari}
          onChange={(event) => {
            setDari(event.target.value);
          }}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Hal"
          value={hal}
          onChange={(event) => {
            setHal(event.target.value);
          }}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Tanggal"
          value={tanggal}
          onChange={(event) => {
            setTanggal(event.target.value);
          }}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Nama Penanda Tangan"
          value={namaTtd}
          onChange={(event) => {
            setNamaTtd(event.target.value);
          }}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="NIP Penanda Tangan"
          value={nipTtd}
          onChange={(event) => {
            setNipTtd(event.target.value);
          }}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <ReactQuill
          placeholder="Isi Surat"
          modules={toolbarQuill}
          onChange={onChangeQuill}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{ width: "100%", padding: "16px 0", fontWeight: "bold" }}
          variant="contained"
          onClick={onExportHandler}
        >
          Cetak Surat
        </Button>
      </Grid>
    </Grid>
  );
};

export default MainPage;
