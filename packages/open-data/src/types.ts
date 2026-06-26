export interface ESRIResponse<T = unknown> {
  features: Array<T>;
  error?: {
    code?: number;
    message?: string;
  };
}
