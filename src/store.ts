import { create } from "zustand"

interface AuthStore {
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<string>
}

export const useAuth = create<AuthStore>()((set) => ({
  isLoggedIn: false,
  login: async (login_id, login_password) => {
    try {
      const response = await fetch(
        "https://jp-dev.cityremit.global/web-api/config/v1/auths/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login_id, login_password }),
        }
      )

      const data = await response.json()
      if (data.token) {
        set((state) => ({ ...state, isLoggedIn: true }))
        return data.token
      }
      throw new Error("invalid username and password")
    } catch (err) {
      throw err
    }
  },
}))
