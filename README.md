# Joey AI Agent - Web Frontend

這是 Joey AI Agent 的 Web 前端專案，使用 Next.js 15、TypeScript 和 Tailwind CSS 建立。

## 功能特色

- 🎨 **現代化 UI**：使用 Tailwind CSS 打造美觀的介面
- 📊 **專案管理**：建立和管理 AI 網站建置專案
- 📡 **即時監控**：使用 SSE 即時顯示 AI 執行進度
- 📱 **響應式設計**：完美支援桌面和手機版本
- ⚡ **效能優化**：Next.js 15 App Router 提供極速體驗

## 技術堆疊

- **框架**: Next.js 15
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **狀態管理**: React Hooks
- **API 通訊**: Fetch API + Server-Sent Events (SSE)

## 開發環境設定

### 安裝依賴

```bash
npm install
```

### 設定環境變數

複製 `.env.local.example` 為 `.env.local`：

```bash
cp .env.local.example .env.local
```

修改 `.env.local` 中的 API URL。

### 啟動開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

## 專案結構

```
joey-ai-frontend/
├── app/                    # Next.js App Router 頁面
│   ├── dashboard/         # 儀表板頁面
│   ├── projects/          # 專案相關頁面
│   │   ├── new/          # 新建專案
│   │   └── [id]/         # 專案詳情
│   ├── layout.tsx        # 根佈局
│   ├── page.tsx          # 首頁
│   └── globals.css       # 全域樣式
├── components/            # React 元件
│   ├── ui/               # 基礎 UI 元件
│   ├── forms/            # 表單元件
│   └── progress/         # 進度元件
├── lib/                   # 工具函式
│   ├── api.ts            # API 客戶端
│   └── hooks/            # 自訂 Hooks
├── types/                 # TypeScript 類型定義
│   └── index.ts
└── public/                # 靜態資源
```

## 主要頁面

### 首頁 (`/`)
- 產品介紹和功能特色
- 工作流程說明
- CTA 按鈕引導用戶開始

### 儀表板 (`/dashboard`)
- 顯示所有專案列表
- 專案狀態統計
- 快速建立新專案

### 新建專案 (`/projects/new`)
- 專案名稱和描述
- 詳細需求輸入
- 表單驗證

### 專案詳情 (`/projects/[id]`)
- 專案資訊展示
- 即時日誌顯示 (SSE)
- 執行結果查看

## 部署

### 建置生產版本

```bash
npm run build
```

### 啟動生產伺服器

```bash
npm start
```

### 部署到 Render

此專案可作為 Static Site 部署到 Render：

1. 連接 GitHub repository
2. 選擇 Static Site
3. 設定：
   - Build Command: `npm install && npm run build`
   - Publish Directory: `.next`
4. 加入環境變數 `NEXT_PUBLIC_API_URL`

## API 整合

後端 API 文件請參考：`../joey-ai-agent/README.md`

### 主要 API 端點

- `GET /api/projects` - 取得專案列表
- `POST /api/projects` - 建立新專案
- `GET /api/projects/:id` - 取得專案詳情
- `GET /api/projects/:id/stream` - SSE 串流進度
- `GET /api/projects/:id/logs` - 取得專案日誌

## 開發規範

- 使用 TypeScript 嚴格模式
- 元件使用函式式寫法
- 遵循 React Hooks 規則
- 使用 Tailwind CSS 工具類別
- 註解使用繁體中文

## 授權

MIT License

---

**Built with ❤️ by Joey & Claude Code**
