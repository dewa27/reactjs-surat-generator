import axios from "axios";
const baseURL = "https://suratkeretapi.definitelynotgod.com/api";
// const baseURL = "http://127.0.0.1:8000/api";
const client = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

async function storeDocument(data) {
  return client.post("/document", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
async function getDocumentById(id) {
  return client.get(`/document/${id}`);
}
function downloadDocumentById(id) {
  return `${baseURL}/document/${id}/download`;
}
async function getDocuments() {
  return client.get(`/document`);
}
async function toggleFavorite(id) {
  return client.post(`/document/${id}/favorite`);
}
export {
  storeDocument,
  getDocumentById,
  downloadDocumentById,
  getDocuments,
  toggleFavorite,
};
