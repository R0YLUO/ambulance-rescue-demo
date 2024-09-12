// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { lon, lat } = req.query;
  try {
    const response = await fetch(
      "https://dev-esta-incidents-notifications-api.au-s1.cloudhub.io/api/incidents",
      {
        method: "POST",
        headers: {
          client_id: "a6b976cade2544089f194528b150f4ca",
          client_secret: "54f75Cba07D54fb0b950e1A68B3d40F2",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: `${lat}, ${lon}`,
          notes:
            "Male, aged around 60 with of chest pain and difficult breathing",
          dispatchCode: 1,
        }),
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
}
