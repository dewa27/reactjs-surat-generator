import React, { useRef, useEffect } from "react";
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
import { storeDocument } from "../data/api";
import Document from "../components/Document";
import { renderToFile, renderToStream, pdf, usePDF } from "@react-pdf/renderer";
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
const formatQuill = ["bold", "italic", "underline", "strike"];

const MainPage = () => {
  const navigate = useNavigate();
  const nomorRef = useRef();
  const ythRef = useRef();
  const halRef = useRef();
  const tanggalRef = useRef();
  const dariRef = useRef();
  const isiRef = useRef();
  const namaTtdRef = useRef();
  const nipTtdRef = useRef();
  const [isi, setIsi] = React.useState("");
  // const [tembusan, setTembusan] = React.useState("");

  useEffect(() => {
    document.title = "Cetak Surat";
  }, []);

  const generatePdfDocument = async (data) => {
    const file = new File(
      [await pdf(<Document {...data} />).toBlob()],
      "surat.pdf"
    );
    return file;
  };

  const onExportHandler = async () => {
    const data = {
      nomor_surat: nomorRef.current.value,
      yth: ythRef.current.value,
      dari: dariRef.current.value,
      hal: halRef.current.value,
      tanggal: tanggalRef.current.value,
      nama_ttd: namaTtdRef.current.value,
      nip_ttd: nipTtdRef.current.value,
      isi: isi,
      // tembusan: tembusan,
    };

    try {
      const file = await generatePdfDocument(data);
      const response = await storeDocument({
        ...data,
        file: file,
      });
      const responseData = await response.data;
      navigate(`/surat/${responseData.data.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeIsiQuill = (value, delta, source, editor) => {
    setIsi(value);
  };

  // const onChangeTembusanQuill = (value, delta, source, editor) => {
  //   setTembusan(value);
  // };

  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Nomor Surat"
          name="nomor_surat"
          inputRef={nomorRef}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Yang Terhormat (Yth)"
          name="yth"
          inputRef={ythRef}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Dari"
          name="dari"
          inputRef={dariRef}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Hal"
          name="hal"
          inputRef={halRef}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Tanggal"
          name="tanggal"
          inputRef={tanggalRef}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="Nama Penanda Tangan"
          inputRef={namaTtdRef}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-controlled"
          label="NIP Penanda Tangan"
          name="nip_ttd"
          inputRef={nipTtdRef}
          sx={{
            width: "100%",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <ReactQuill
          placeholder="Isi Surat"
          modules={toolbarQuill}
          onChange={onChangeIsiQuill}
          formats={formatQuill}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <ReactQuill
          placeholder="Isi Surat"
          modules={toolbarQuill}
          formats={formatQuill}
          onChange={onChangeTembusanQuill}
        />
      </Grid> */}
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
