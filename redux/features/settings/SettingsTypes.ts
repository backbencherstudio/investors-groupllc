// SettingsTypes.ts

export interface GeneralSettings {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface GeneralSettingsResponse {
  success: boolean;
  message: string;
  data: GeneralSettings;
}

export interface UpdateGeneralSettingsDto {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: File;
}

export interface UpdatePasswordDto {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}