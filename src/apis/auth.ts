import axios from "axios";

export const fetchUserData = async (accessToken: string) => {
  const response = await axios.get("https://moneyfulpublicpolicy.co.kr/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
