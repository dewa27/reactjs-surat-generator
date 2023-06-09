import axios from "axios";
const baseURL = `${import.meta.env.VITE_API_URL}/api`;

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
async function getFavoriteDocuments() {
  return client.get(`/document/all/favorite`);
}
export {
  storeDocument,
  getDocumentById,
  downloadDocumentById,
  getDocuments,
  toggleFavorite,
  getFavoriteDocuments,
};
