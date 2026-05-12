// Test types

export interface Test {
  id: string;
  // TODO: add test fields
  created_at: string;
  updated_at: string;
}

export interface CreateTestDto {
  // TODO: fields needed to create a test
}

export interface UpdateTestDto extends Partial<CreateTestDto> {}

export interface TestListResponse {
  success: boolean;
  message: string;
  data: Test[];
}

export interface TestResponse {
  success: boolean;
  message: string;
  data: Test;
}
