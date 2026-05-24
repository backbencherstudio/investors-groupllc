export type UserRole = "admin" | "landlord";

/** GET /me → data (profile) */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  address: string | null;
  phone: string | null;
  type: string;
  gender: string | null;
  date_of_birth: string | null;
  created_at: string;
  job_title: string | null;
  annual_salary: string | null;
  fromTime: string | null;
  toTime: string | null;
  service_type: string | null;
  occupation: string | null;
  investment_budget: string | null;
  source_of_funds: string | null;
  annual_income: string | null;
  /** Raw JSON string from API; parse if needed */
  docs_url: string | null;
  photoIdUrl: string | null;
  proofOfIncomeUrl: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

/** POST /api/auth/login */
export interface LoginResponseBody {
  success?: boolean;
  message?: string;
  /** Role hint from login (e.g. ADMIN); full profile comes from /me */
  type?: string;
  authorization?: {
    type?: string;
    token?: string;
    access_token?: string;
    refresh_token?: string;
  };
  access_token?: string;
  refresh_token?: string;
}

export interface MeResponseBody {
  success?: boolean;
  data?: User;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isHydrated: boolean;
}
