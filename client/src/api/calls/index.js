import axios from "axios";

export async function getCalls() {
  try {
    const response = await axios.get("/api/calls");
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getLookups() {
  try {
    const contactTypes = await axios.get("/api/contacttype");
    const areas = await axios.get("/api/area");
    const contractors = await axios.get("/api/contractor");
    const callTypes = await axios.get("/api/calltype");

    return {
      contactTypes: contactTypes.data,
      areas: areas.data,
      contractors: contractors.data,
      callTypes: callTypes.data
    };
  } catch (err) {
    console.error(err);
  }
}

export async function newCall(newCall) {
  try {
    const response = await axios.post("/api/newcall", newCall);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
