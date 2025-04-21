import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { ProfileFormData } from "@/components/StepTwo";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// FETCH PROFILE DATA BY NAME
export async function fetchCurrentUser(id: string) {
  try {
    const token = Cookies.get("token");
    if (!token) return null;

    const res = await axios.get(`${API_URL}/api/profile/current-user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching current user:", err);
    return null;
  }
}

// PATCH PROFILE DATA
export const patchUserData = async (data: any, id: string) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/api/profile/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to patch user data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("patchUserData error:", error);
    throw error;
  }
};

export const getReceivedDonations = async (id: string) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/api/donation/received/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) {
      throw new Error("Failed to patch user data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("patchUserData error:", error);
    throw error;
  }
};

export async function createProfile(userId: number, data: ProfileFormData) {
  try {
    const token = localStorage.getItem("token"); 
    if (!token) {
      console.log('Token is missing');
      return;
    }

    const res = await fetch(`${API_URL}/api/profile/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },

      
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to create profile');
    }

    return res.json();
  } catch (error: unknown) {
    console.error('Failed to create profile:', error);

    if (error instanceof Error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    } else {
      throw new Error('Failed to create profile: Unknown error');
    }
  }
}
      throw new Error("Failed to create profile");
    }

    return res.json();
  } catch (error) {
    console.error("Failed to create profile:", error);
    throw error;
  }
}


export const getBankCardInfo = async (id: string) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/api/bankcard/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) {
      throw new Error("Failed to patch user data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("patchUserData error:", error);
    throw error;
  }
};

export const getBalance = async (id: string) => {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/api/donation/total-earnings/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to patch user data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("patchUserData error:", error);
    throw error;
  }
};

export const OTPCheck = async (email: string, otp: string) => {
  console.log(`working`);
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/api/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        email: email,
        code: otp,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to verify OTP");
    }
    return result;
  } catch (error) {
    console.error("OTPCheck error:", error);
    throw error;
  }
};
