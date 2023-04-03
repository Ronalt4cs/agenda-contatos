import axios from "axios";

export default axios.create({
  baseURL: 'https://api-contacts.pedagogico.cubos.academy',
  headers: { 'Content-Type': 'application/json', }
})