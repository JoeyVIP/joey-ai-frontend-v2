"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    task_prompt: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const project = await apiClient.createProject(formData);
      router.push(`/projects/${project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "建立專案失敗");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            建立新專案
          </h1>
          <p className="text-gray-600">填寫專案資訊，讓 AI 幫您建立網站</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          {/* 專案名稱 */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              專案名稱 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="例如：太空貓咖啡館官網"
            />
          </div>

          {/* 專案描述 */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              專案描述
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="簡短描述這個網站的用途..."
            />
          </div>

          {/* 任務需求 */}
          <div className="mb-6">
            <label
              htmlFor="task_prompt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              詳細需求 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="task_prompt"
              required
              value={formData.task_prompt}
              onChange={(e) =>
                setFormData({ ...formData, task_prompt: e.target.value })
              }
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
              placeholder={`描述您想要的網站功能和設計...

範例：
建立一個太空貓咖啡館的官網，需要包含：
- 首頁：展示主視覺和咖啡館特色
- 關於我們：介紹咖啡館理念
- 菜單：展示咖啡和輕食選項
- 聯絡我們：地址、營業時間、聯絡方式

設計風格：
- 太空科技感
- 藍紫色調為主
- 貓咪插圖元素
- 現代簡約風格

技術要求：
- 響應式設計
- SEO 優化
- 部署到 Render`}
            />
          </div>

          {/* 錯誤訊息 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* 提交按鈕 */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "建立中..." : "建立專案"}
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              取消
            </Link>
          </div>
        </form>

        {/* 提示 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 撰寫提示</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 越詳細的需求描述，AI 能做得越好</li>
            <li>• 包含頁面結構、設計風格、色彩偏好</li>
            <li>• 說明是否需要特殊功能（表單、地圖等）</li>
            <li>• 可以提供參考網站連結</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
