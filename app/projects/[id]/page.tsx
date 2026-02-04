"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { Project, ProjectStatus, SSEEvent } from "@/types";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProject();
    connectSSE();
  }, [id]);

  const loadProject = async () => {
    try {
      const data = await apiClient.getProject(parseInt(id));
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "載入專案失敗");
    } finally {
      setLoading(false);
    }
  };

  const connectSSE = () => {
    const eventSource = apiClient.streamProjectProgress(
      parseInt(id),
      (event) => {
        try {
          const data: SSEEvent = JSON.parse(event.data);

          if (data.type === "log") {
            setLogs((prev) => [...prev, data.message]);
          } else if (data.type === "status") {
            setProject((prev) =>
              prev ? { ...prev, status: data.status } : null
            );
          } else if (data.type === "complete") {
            setProject((prev) =>
              prev
                ? {
                    ...prev,
                    status: data.status,
                    result_summary: data.result_summary,
                    error_message: data.error_message,
                  }
                : null
            );
            eventSource.close();
          }
        } catch (err) {
          console.error("SSE parse error:", err);
        }
      },
      (error) => {
        console.error("SSE error:", error);
        eventSource.close();
      }
    );

    return () => {
      eventSource.close();
    };
  };

  const getStatusBadge = (status: ProjectStatus) => {
    const badges = {
      [ProjectStatus.PENDING]: "bg-gray-100 text-gray-800",
      [ProjectStatus.RUNNING]: "bg-blue-100 text-blue-800 animate-pulse",
      [ProjectStatus.COMPLETED]: "bg-green-100 text-green-800",
      [ProjectStatus.FAILED]: "bg-red-100 text-red-800",
      [ProjectStatus.CANCELLED]: "bg-gray-100 text-gray-600",
    };

    const labels = {
      [ProjectStatus.PENDING]: "等待中",
      [ProjectStatus.RUNNING]: "執行中",
      [ProjectStatus.COMPLETED]: "已完成",
      [ProjectStatus.FAILED]: "失敗",
      [ProjectStatus.CANCELLED]: "已取消",
    };

    return (
      <span
        className={`px-4 py-2 rounded-full text-sm font-medium ${badges[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">載入中...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error || "專案不存在"}</div>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-700"
          >
            返回控制台
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 導航列 */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold text-gray-900">
                Joey AI Agent
              </span>
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              返回控制台
            </Link>
          </div>
        </div>
      </nav>

      {/* 主要內容 */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* 專案標題 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {project.name}
            </h1>
            {getStatusBadge(project.status)}
          </div>
          {project.description && (
            <p className="text-gray-600 mb-4">{project.description}</p>
          )}
          <div className="text-sm text-gray-500">
            建立於 {new Date(project.created_at).toLocaleString("zh-TW")}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 執行日誌 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">即時日誌</h2>
            </div>
            <div className="p-6">
              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
                {logs.length === 0 && (
                  <div className="text-gray-500">等待執行...</div>
                )}
                {logs.map((log, index) => (
                  <div key={index} className="text-green-400 mb-1">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 專案資訊 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">專案資訊</h2>
            </div>
            <div className="p-6 space-y-4">
              {/* 任務需求 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  任務需求
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 whitespace-pre-wrap">
                  {project.task_prompt}
                </div>
              </div>

              {/* 執行結果 */}
              {project.result_summary && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    執行結果
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                    {project.result_summary}
                  </div>
                </div>
              )}

              {/* 錯誤訊息 */}
              {project.error_message && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    錯誤訊息
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-sm text-red-700 whitespace-pre-wrap">
                    {project.error_message}
                  </div>
                </div>
              )}

              {/* 完成時間 */}
              {project.completed_at && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    完成時間
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(project.completed_at).toLocaleString("zh-TW")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
