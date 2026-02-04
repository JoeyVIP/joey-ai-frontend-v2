import { Project, CreateProjectRequest, TaskLog } from "@/types";

// API 基礎 URL（開發環境）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * API 客戶端類別
 * 處理所有後端 API 請求
 */
class ApiClient {
  private baseUrl: string;
  private userId: number = 1; // Temporary: 硬編碼使用者 ID

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * 設定使用者 ID（未來改用 JWT token）
   */
  setUserId(userId: number) {
    this.userId = userId;
  }

  /**
   * 通用請求方法
   */
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * 取得所有專案
   */
  async getProjects(skip: number = 0, limit: number = 20): Promise<Project[]> {
    return this.request<Project[]>(
      `/api/projects?skip=${skip}&limit=${limit}&user_id=${this.userId}`
    );
  }

  /**
   * 取得單一專案
   */
  async getProject(projectId: number): Promise<Project> {
    return this.request<Project>(
      `/api/projects/${projectId}?user_id=${this.userId}`
    );
  }

  /**
   * 建立新專案
   */
  async createProject(data: CreateProjectRequest): Promise<Project> {
    return this.request<Project>(`/api/projects?user_id=${this.userId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * 刪除專案
   */
  async deleteProject(projectId: number): Promise<void> {
    return this.request<void>(
      `/api/projects/${projectId}?user_id=${this.userId}`,
      {
        method: "DELETE",
      }
    );
  }

  /**
   * 取得專案日誌
   */
  async getProjectLogs(projectId: number): Promise<TaskLog[]> {
    return this.request<TaskLog[]>(
      `/api/projects/${projectId}/logs?user_id=${this.userId}`
    );
  }

  /**
   * SSE 串流專案進度
   * 返回 EventSource 物件
   */
  streamProjectProgress(
    projectId: number,
    onMessage: (event: MessageEvent) => void,
    onError?: (error: Event) => void
  ): EventSource {
    const url = `${this.baseUrl}/api/projects/${projectId}/stream?user_id=${this.userId}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = onMessage;

    if (onError) {
      eventSource.onerror = onError;
    }

    return eventSource;
  }
}

// 匯出單例
export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
