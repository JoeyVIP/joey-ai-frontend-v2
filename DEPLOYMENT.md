# Joey AI Frontend - 部署指南

## 專案狀態
✅ **專案建置完成**
✅ **GitHub Repository 已建立**
✅ **本地測試通過**
⚠️ **等待 Render 手動部署**

---

## 自動部署到 Render（推薦）

### 方式一：透過 Render Dashboard

1. **登入 Render Dashboard**
   - 前往 [https://dashboard.render.com](https://dashboard.render.com)
   - 使用您的帳號登入

2. **建立 New Web Service**
   - 點擊 "New +" → "Web Service"
   - 連接 GitHub repository: `JoeyVIP/joey-ai-frontend-v2`
   - 選擇 branch: `main`

3. **設定部署參數**
   ```
   Name: joey-ai-frontend-v2
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   Plan: Free
   ```

4. **加入環境變數**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NODE_ENV=production
   ```

   （如果後端已部署，請將 API URL 改為實際的後端網址）

5. **點擊 "Create Web Service"**
   - Render 會自動開始建置和部署
   - 建置時間約 3-5 分鐘
   - 完成後會獲得網址：`https://joey-ai-frontend-v2.onrender.com`

---

### 方式二：使用 render.yaml 自動配置

此專案已包含 `render.yaml`，Render 會自動讀取設定：

```yaml
services:
  - type: web
    name: joey-ai-frontend-v2
    runtime: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NEXT_PUBLIC_API_URL
        value: http://localhost:8000
      - key: NODE_ENV
        value: production
```

只需在 Dashboard 連接 repository 並建立服務即可。

---

## 本地開發

### 開發模式
```bash
cd ~/joey-ai-agent/joey-ai-frontend
npm run dev
```
開啟 http://localhost:3000

### 建置生產版本
```bash
npm run build
npm start
```

---

## 功能驗證清單

部署完成後，請驗證以下功能：

### 桌面版
- [ ] 首頁正確顯示
- [ ] 導航列功能正常
- [ ] 進入控制台
- [ ] 專案列表顯示
- [ ] 建立新專案表單
- [ ] 專案詳情頁面

### 手機版（使用 Chrome DevTools）
- [ ] 響應式佈局正常
- [ ] 導航列在手機版正常
- [ ] 卡片佈局正確
- [ ] 表單輸入正常
- [ ] 無水平滾動

---

## 技術規格

- **框架**: Next.js 15
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **部署**: Render (Node.js Web Service)
- **運行時**: Node.js
- **端口**: 自動分配

---

## 已知問題和限制

1. **API 連線**
   - 目前前端的 API URL 指向 localhost
   - 需要將後端部署後更新 `NEXT_PUBLIC_API_URL` 環境變數

2. **免費方案限制**
   - Render 免費方案會在 15 分鐘無活動後睡眠
   - 首次訪問可能需要 30 秒喚醒時間

3. **SSE 連線**
   - 如果後端和前端在不同網域，需要確保 CORS 設定正確

---

## 下一步

1. **部署後端 API**
   - 將 `~/joey-ai-agent` 後端部署到 Render
   - 獲取後端 API URL

2. **更新前端環境變數**
   - 在 Render Dashboard 更新 `NEXT_PUBLIC_API_URL`
   - 設定為後端實際網址

3. **測試完整流程**
   - 建立測試專案
   - 驗證 SSE 即時進度
   - 確認資料庫連線

---

## 支援

如有問題，請查看：
- [Next.js 文件](https://nextjs.org/docs)
- [Render 文件](https://render.com/docs)
- [專案 GitHub Issues](https://github.com/JoeyVIP/joey-ai-frontend-v2/issues)

---

**建立日期**: 2026-02-04
**版本**: 1.0.0
**建立者**: Joey & Claude Code
