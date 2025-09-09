import axios from "axios";
import { useEffect, useState } from "react";
import type { ResponseModel } from "~/models/response.model";
import type { User } from "~/models/user.model";

export function useApi() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("user");
      if (storedData) {
        setUser(JSON.parse(storedData));
      }
    }
  }, []);

  const token = user ? `Bearer ${user.token}` : "";

  const axios_instance = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const get = async <T>(url: string): Promise<ResponseModel<T>> => {
    return await axios_instance
      .get(url)
      .then((response) => ({
        status: true,
        number_status: response.status,
        data: response.data.data,
      }))
      .catch((error) => ({
        status: false,
        number_status: error.response ? error.response.status : error,
        data: error.response ? error.response.data : error.message,
      }));
  };

  const post = async <T, K = any>(
    url: string,
    data: Partial<K>
  ): Promise<ResponseModel<T>> => {
    return await axios_instance
      .post(url, data)
      .then((response) => ({
        status: true,
        number_status: response.status,
        data: response.data.data,
      }))
      .catch((error) => ({
        status: false,
        number_status: error.response ? error.response.status : error,
        data: error.response ? error.response.data : error.message,
      }));
  };

  const put = async <T, K = any>(
    url: string,
    data: Partial<K>
  ): Promise<ResponseModel<T>> => {
    return await axios_instance
      .put(url, data)
      .then((response) => ({
        status: true,
        number_status: response.status,
        data: response.data.data,
      }))
      .catch((error) => ({
        status: false,
        number_status: error.response ? error.response.status : error,
        data: error.response ? error.response.data : error.message,
      }));
  };

  const patch = async <T, K = any>(
    url: string,
    data: Partial<K>
  ): Promise<ResponseModel<T>> => {
    return await axios_instance
      .patch(url, data)
      .then((response) => ({
        status: true,
        number_status: response.status,
        data: response.data.data,
      }))
      .catch((error) => ({
        status: false,
        number_status: error.response ? error.response.status : error,
        data: error.response ? error.response.data : error.message,
      }));
  };

  const del = async <T>(url: string): Promise<ResponseModel<T>> => {
    return await axios_instance
      .delete(url)
      .then((response) => ({
        status: true,
        number_status: response.status,
        data: response.data,
      }))
      .catch((error) => ({
        status: false,
        number_status: error.response ? error.response.status : error,
        data: error.response ? error.response.data : error.message,
      }));
  };

  return { get, post, put, patch, del };
}
