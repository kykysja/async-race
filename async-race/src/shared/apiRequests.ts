const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
// const engine = `${base}/engine`;
// const winners = `${base}/winners`;

export const createCar = async (body: {
  name: string;
  color: string;
}): Promise<{ id: number; name: string; color: string }> => {
  const res = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resJSON = await res.json();

  return resJSON;
};
