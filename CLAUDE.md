# CLAUDE.md - Luxe Travel Project Guide

## 🎯 專案核心資訊

**專案名稱**: luxe-travel  
**專案類型**: Next.js 15 豪華旅遊網站  
**架構**: Next.js + TypeScript + TailwindCSS + Radix UI + Zustand  
**開發模式**: App Router + React 19 + TypeScript 5

## 📋 技術棧配置

```yaml
framework: Next.js@15.5.0 + React@19.1.0
language: TypeScript@5 (嚴格模式)
styling: TailwindCSS@4 + Radix UI Components
state: Zustand@5.0.8 (輕量狀態管理)
form: React-Hook-Form + Zod 驗證
ui: Radix UI + shadcn/ui + Lucide Icons
animation: tw-animate-css + embla-carousel
build: Next.js 內建 + PostCSS
quality: ESLint (Standard風格) + Prettier + Husky + Lint-staged
package: Yarn
coding_style: JavaScript Standard Style
```

## 🏗️ 專案架構 (必須嚴格遵守)

```
luxe-travel/
├─ src/
│  ├─ app/                # App Router (Next.js 15)
│  │  ├─ layout.tsx       # 根佈局
│  │  ├─ page.tsx         # 首頁
│  │  ├─ about/           # 關於頁面
│  │  ├─ search/          # 搜尋頁面
│  │  ├─ inquiry/         # 詢問頁面
│  │  └─ ClientLayout.tsx # 客戶端佈局
│  ├─ components/         # 組件系統 (分層架構)
│  │  ├─ pages/           # 頁面專屬組件
│  │  │  ├─ home/         # 首頁組件群
│  │  │  │  ├─ Banner/    # Banner 相關組件
│  │  │  │  ├─ BookShelf/ # 書架組件
│  │  │  │  └─ DestinationCard/ # 目的地卡片
│  │  │  └─ inquiry/      # 詢問頁面組件
│  │  ├─ shared/          # 共享組件
│  │  │  ├─ icons/        # 圖標組件
│  │  │  │  ├─ banner/    # Banner 圖標
│  │  │  │  └─ header/    # Header 圖標
│  │  │  └─ layout/       # 佈局組件
│  │  └─ ui/              # 基礎 UI 組件庫
│  ├─ context/            # React Context
│  ├─ hooks/              # 自定義 Hooks
│  ├─ lib/                # 工具函數和配置
│  ├─ styles/             # 樣式檔案
│  └─ types/              # TypeScript 型別定義
├─ public/                # 靜態資源
└─ 配置檔案 (next.config, tailwind, etc.)
```

### 🚨 架構規範 (強制遵守)

```yaml
組件分層規則:
  pages/: 頁面專屬組件，僅在特定頁面使用
  shared/: 跨頁面共享組件，可複用
  ui/: 基礎 UI 組件，最底層抽象

命名規則:
  組件檔案: PascalCase.tsx (例：ItalyIntroduction.tsx)
  目錄名稱: PascalCase (例：BookShelf/, DestinationCard/)
  Hook 檔案: camelCase.ts (例：useScrollContext.ts)

引入順序: 1. React 相關 import
  2. 第三方套件
  3. 專案內部 components
  4. 專案內部 hooks/lib/types
  5. 相對路徑 import
```

## 🎨 設計系統規範

### TypeScript 型別命名規則

```typescript
// ✅ 專案型別命名慣例 (與 MOP 不同)
export type TBaseComponent = {
  // T* 前綴
  children?: React.ReactNode
  className?: string
}

export type TScrollContext = {
  // 功能型別
  scrollY: number
  logoProgress: number
}

export type TNavItem = {
  // 業務型別
  name: string
  href: string
  hasSubmenu?: boolean
}

// Union Types for Route and Styling
export type TPageRoute =
  | '/'
  | '/about'
  | '/services'
  | '/destinations'
  | '/contact'
export type TTailwindGradient =
  | 'from-blue-400 to-blue-600'
  | 'from-green-400 to-green-600'
```

### 元件設計原則

```yaml
component_standards:
  props: 使用 TBaseComponent 基礎類型擴展
  styling: TailwindCSS classes + 條件式樣式
  state: Zustand store + local state 混合
  animation: tw-animate-css + 自定義 transition
  responsive: mobile-first 響應式設計
  accessibility: Radix UI 保證無障礙支援
```

## ⚙️ 開發工作流程

### 核心指令

```bash
# 開發環境
yarn dev                    # 啟動開發伺服器 (localhost:3000)
yarn build                  # 生產版本建置
yarn start                  # 生產模式啟動

# 代碼品質
yarn lint                   # ESLint 檢查
yarn format                 # Prettier 格式化

# UI 組件
yarn shadcn                 # shadcn/ui 組件管理
```

### Git 工作流程

```yaml
pre_commit_hooks:
  husky: 自動執行 lint-staged
  lint_staged:
    - TypeScript/JavaScript: ESLint 修復 + Prettier 格式化
    - CSS: Prettier 格式化
    - Markdown/JSON: Prettier 格式化
    - 其他檔案: Prettier 忽略未知格式
```

## 🛠️ 程式碼清潔規範 (完成任務後必執行)

### 🚨 強制清理檢查清單

```yaml
清理規則 (每次完成任務後必執行):
  移除註解: 移除所有非功能性註解和 TODO
  移除未使用: 清除未使用的變數、函數和 import
  移除除錯: 刪除所有 console.log 和除錯代碼
  移除空行: 清除多餘的空行和空格
  格式一致: 確保代碼格式符合 Standard 風格
```

### JavaScript Standard Style 規範

```typescript
// ✅ 遵循 Standard 風格
const component = () => {
  const [state, setState] = useState('')

  return (
    <div className='example'>
      <p>{state}</p>
    </div>
  )
}

// ❌ 禁止的模式
const badComponent = () => {
  // TODO: 需要移除的註解
  const unusedVariable = 'unused'  // 未使用變數
  console.log('debug')            // 除錯代碼

  return <div className="double-quotes"></div>  // 使用雙引號
}
```

### ESLint 配置驗證

```yaml
當前規則:
  @typescript-eslint/no-explicit-any: warn
  next/core-web-vitals: 啟用
  next/typescript: 啟用

自動修復:
  yarn lint --fix  # 自動修復可修復的問題
  yarn format      # Prettier 格式化
```

## 🛠️ 專案特定規範

### 1. 狀態管理策略

```typescript
// ✅ Zustand 輕量狀態管理
import { create } from 'zustand'

type TAppStore = {
  // 全局狀態定義
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

const useAppStore = create<TAppStore>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))
```

### 2. 組件開發模式

```typescript
// ✅ 基礎組件範本
import type { TBaseComponent } from '@/types'

type TCustomComponentProps = TBaseComponent & {
  // 擴展屬性
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const CustomComponent = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: TCustomComponentProps) => {
  return (
    <div
      className={cn(
        "base-styles",
        variant === 'primary' && "primary-styles",
        size === 'sm' && "small-styles",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### 3. 路由和導航

```typescript
// ✅ 型別安全的路由
import type { TPageRoute } from '@/types'

const navigation: Array<{
  name: string
  href: TPageRoute
  hasSubmenu?: boolean
}> = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', hasSubmenu: true },
]
```

### 4. 樣式設計原則

```yaml
styling_approach:
  primary: TailwindCSS utility classes
  components: Radix UI primitives + 自定義樣式
  responsive: mobile-first breakpoints
  animations: tw-animate-css + transition utilities
  gradients: 預定義 TTailwindGradient 類型
  spacing: Tailwind 標準間距系統
```

## 🔧 開發最佳實踐

### TypeScript 嚴格規範

```yaml
typescript_rules:
  strict_mode: true
  no_any_type: 禁用 any 類型，使用 T* 型別系統替代
  explicit_return_types: 組件和函數明確返回型別
  type_imports: 使用 import type 語法
  generic_constraints: 泛型約束和預設值
  no_unused_vars: 禁止未使用變數和 import
  no_console: 禁止 console.log 在生產代碼
  no_comments: 完成任務後移除所有非 JSDoc 註解
```

### 🚨 架構遵守規範 (強制執行)

```yaml
組件放置規則:
  頁面專屬組件: 必須放在 src/components/pages/[頁面名稱]/
  可重用組件: 必須放在 src/components/shared/
  基礎 UI 組件: 必須放在 src/components/ui/

檔案命名強制規範:
  組件檔案: PascalCase.tsx (例：ItalyIntroduction.tsx)
  Hook 檔案: use + PascalCase.ts (例：useScrollContext.ts)
  工具函數: camelCase.ts (例：formatDate.ts)
  型別檔案: index.ts 或 types.ts

import 順序執行標準: 1. React 和 Next.js
  2. 第三方套件 (@radix-ui, zustand 等)
  3. 專案內部組件 (@/components)
  4. 專案內部功能 (@/hooks, @/lib, @/types)
  5. 相對路徑 (./, ../)
```

### 效能優化策略

```yaml
performance_optimization:
  next_js_features:
    - App Router 自動程式碼分割
    - Image 組件優化
    - Font 優化 (next/font)
    - 靜態生成 (SSG) 和伺服器端渲染 (SSR)

  react_optimization:
    - React.memo 適當使用
    - useMemo/useCallback 優化重渲染
    - 動態 import() 延遲載入

  bundle_optimization:
    - Tree shaking 移除未使用代碼
    - Radix UI 按需引入
    - TailwindCSS purge 移除未使用樣式
```

### 測試和品質保證

```yaml
quality_assurance:
  code_quality:
    - ESLint 嚴格規則
    - Prettier 一致格式化
    - TypeScript 編譯時檢查
    - Husky pre-commit hooks

  accessibility:
    - Radix UI 無障礙基礎
    - 語義化 HTML 結構
    - ARIA 標籤適當使用
    - 鍵盤導航支援

  performance_monitoring:
    - Next.js 內建效能指標
    - Core Web Vitals 監控
    - Bundle analyzer 定期檢查
```

## 🚀 部署和維護

### 部署策略

```yaml
deployment:
  platform: Vercel (推薦) 或 Netlify
  build_command: yarn build
  output_directory: .next
  node_version: 18.0.0+
  environment_variables: 根據需求配置
```

### 維護檢查清單

```yaml
maintenance_checklist:
  dependencies:
    - 定期更新 Next.js 和 React
    - 監控安全漏洞更新
    - Radix UI 組件更新

  performance:
    - 定期執行 yarn build 檢查 bundle 大小
    - 監控 Core Web Vitals 指標
    - 圖片和資源優化

  code_quality:
    - 定期執行 yarn lint 檢查
    - TypeScript 編譯錯誤修復
    - 移除未使用的依賴和程式碼
```

## 📋 任務完成檢查清單 (每次必執行)

### 🔥 強制執行步驟

```yaml
1. 程式碼清理:
   - [ ] 移除所有非功能性註解
   - [ ] 清除未使用的變數和函數
   - [ ] 刪除所有 import 未使用項目
   - [ ] 移除 console.log 和除錯代碼
   - [ ] 清理多餘空行和格式

2. 架構驗證:
   - [ ] 組件放置在正確目錄
   - [ ] 檔案命名符合 PascalCase/camelCase 規範
   - [ ] import 順序符合專案標準
   - [ ] 型別定義使用 T* 前綴

3. 品質檢查:
   - [ ] yarn lint 無錯誤
   - [ ] yarn build 成功建置
   - [ ] TypeScript 編譯無警告
   - [ ] 符合 JavaScript Standard 風格

4. 功能驗證:
   - [ ] 組件渲染正常
   - [ ] 響應式設計正確
   - [ ] 無障礙屬性完整
   - [ ] 效能指標達標
```

### ⚠️ 重要提醒

```yaml
絕對禁止事項:
  - 使用 any 類型
  - 留下未使用的變數或 import
  - 保留除錯用的 console.log
  - 違反架構放置規則
  - 不遵循命名慣例
  - 跳過 lint 檢查

必須遵循事項:
  - JavaScript Standard Style 程式碼風格
  - 嚴格的 TypeScript 型別系統
  - 明確的架構分層規則
  - 完整的程式碼清理流程
  - 每次任務完成後的品質檢查
```

---

**📋 重要提醒**: 本專案採用 Next.js 15 + React 19 的最新技術棧，專注於豪華旅遊網站的使用者體驗和效能優化。所有開發都必須遵循 JavaScript Standard Style、TypeScript 嚴格模式、架構規範和完整的程式碼清理流程。每次任務完成後，務必執行上述檢查清單確保程式碼品質。
