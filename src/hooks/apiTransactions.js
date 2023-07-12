import { BASE_URL, CHAIN } from "../utils/config";

export async function getTransaction(walletAddress) {
  let headers = new Headers();
  headers.set("Authorization", "Bearer cqt_rQmG7HGmC4rcqYXG69HHvcD6KbdM");

  const response = await fetch(
    `${BASE_URL}${CHAIN}/address/${walletAddress}/transactions_v3/`,
    {
      method: "GET",
      headers: headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transaction data");
  }

  const data = await response.json();
  console.log(data);

  return data;
}
