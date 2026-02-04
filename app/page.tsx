import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 導航列 */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold text-gray-900">Joey AI Agent</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                進入控制台
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            AI 自動建置網站平台
          </h1>
          <p className="text-2xl text-gray-600 mb-12">
            從需求到部署，一站式自動化網站建置服務
          </p>

          <div className="flex justify-center gap-4 mb-16">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              開始建立網站
            </Link>
            <a
              href="https://github.com/JoeyVIP/joey-ai-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-lg font-semibold shadow-lg border border-gray-200"
            >
              查看文件
            </a>
          </div>

          {/* 功能特色 */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">快速建置</h3>
              <p className="text-gray-600">
                從需求分析到網站部署，平均只需 5-10 分鐘
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">客製化設計</h3>
              <p className="text-gray-600">
                支援色彩、字體、佈局完全客製化
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">響應式設計</h3>
              <p className="text-gray-600">
                自動適配桌面、平板、手機所有裝置
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">SEO 優化</h3>
              <p className="text-gray-600">
                內建 SEO 最佳實踐，提升搜尋引擎排名
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">即時監控</h3>
              <p className="text-gray-600">
                實時查看 AI 執行進度，透明可追蹤
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">自動部署</h3>
              <p className="text-gray-600">
                完成後自動部署到 Render，立即上線
              </p>
            </div>
          </div>

          {/* 工作流程 */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">簡單三步驟</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">填寫需求</h3>
                <p className="text-gray-600">
                  描述您的網站需求、設計偏好和功能要求
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI 建置</h3>
                <p className="text-gray-600">
                  AI 自動分析需求、生成程式碼、建立網站
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">上線使用</h3>
                <p className="text-gray-600">
                  網站自動部署上線，獲得網址立即使用
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Joey AI Agent. Powered by Claude Code & Render.
          </p>
        </div>
      </footer>
    </div>
  );
}
