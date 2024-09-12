// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const { incidentId } = req.query;
    const response = await fetch(
      `https://dev-esta-incidents-notifications-api.au-s1.cloudhub.io/api/incidents/${incidentId}/routes`,
      {
        method: "GET",
        headers: {
          client_id: "a6b976cade2544089f194528b150f4ca",
          client_secret: "54f75Cba07D54fb0b950e1A68B3d40F2",
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
}
