import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/services";

export const useFetchRecipient = (chat, user) => {
  const [recipientUser, setRecipietUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = (chat?.members || []).find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

      if (response.error) {
        return setError(response);
      }

      setRecipietUser(response);
    };

    getUser();
  }, [recipientId]);

  return { recipientUser, error };
};
