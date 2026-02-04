// 專案狀態
export enum ProjectStatus {
  PENDING = "pending",
  RUNNING = "running",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

// 日誌類型
export type LogType = "info" | "error" | "success" | "tool_use";

// 使用者
export interface User {
  id: number;
  github_id: string;
  username: string;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

// 專案
export interface Project {
  id: number;
  owner_id: number;
  name: string;
  description: string | null;
  status: ProjectStatus;
  task_prompt: string;
  uploaded_files: string | null;
  result_summary: string | null;
  output_files: string | null;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  updated_at: string;
  owner?: User;
}

// 建立專案的請求
export interface CreateProjectRequest {
  name: string;
  description?: string;
  task_prompt: string;
}

// 任務日誌
export interface TaskLog {
  id: number;
  project_id: number;
  message: string;
  log_type: LogType;
  created_at: string;
}

// SSE 事件
export interface SSELogEvent {
  type: "log";
  log_id: number;
  message: string;
  log_type: LogType;
  timestamp: string;
}

export interface SSEStatusEvent {
  type: "status";
  status: ProjectStatus;
  updated_at: string;
}

export interface SSECompleteEvent {
  type: "complete";
  status: ProjectStatus;
  result_summary: string | null;
  error_message: string | null;
}

export type SSEEvent = SSELogEvent | SSEStatusEvent | SSECompleteEvent;
