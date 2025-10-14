# 🏖️ Luxe Travel - 典藏旅遊

高端旅遊諮詢平台，採用現代 React 技術棧構建的響應式 Web 應用程式。

## 🚀 快速開始

### 開發環境設置

```bash
# 安裝依賴
npm install
# or
yarn install

# 啟動開發伺服器
npm run dev
# or
yarn dev
```

開啟 [http://localhost:3000](http://localhost:3000) 瀏覽應用程式。

## 🏗️ 專案架構

### 目錄結構

```
src/
├── app/                    # Next.js App Router 頁面
├── components/             # React 組件系統
│   ├── ui/                # 基礎 UI 組件庫
│   ├── layout/            # 頁面佈局組件
│   └── sections/          # 內容區塊組件
├── context/               # React Context 狀態管理
├── hooks/                 # 自定義 React Hooks
├── lib/                   # 核心工具庫
│   ├── design-system/     # 設計系統定義
│   └── utils.ts          # 通用工具函數
├── styles/                # 全局樣式
└── types/                 # TypeScript 類型定義
```

## 🧩 組件系統

### 三層組件架構

#### 🔧 UI 組件層 (`components/ui/`)

基礎可重用組件，基於 shadcn/ui 擴展：

**基礎組件**

- `Button` - 按鈕組件，支援多種變體和尺寸
- `Input` - 輸入框組件，統一底邊框樣式
- `Textarea` - 多行文本輸入
- `Form` - 表單相關組件 (FormField, FormItem, FormLabel, FormMessage)
- `Label`, `Checkbox`, `RadioGroup` - 表單控件

**進階組件**

- `FormSection` - 表單區段包裝器，統一卡片樣式
- `RequiredLabel` - 必填欄位標籤，支援星號和副文本
- `CounterInput` - 計數器輸入組件，支援加減按鈕
- `RadioFieldGroup` - 單選組選項映射組件
- `BorderInput` - 帶字符計數的底邊框輸入
- `CalendarIcon` - 日曆圖標組件

**使用範例**

```tsx
import { FormSection, RequiredLabel, CounterInput } from '@/components/ui'

const MyForm = () => (
  <FormSection title='基本資訊' hasBorder>
    <RequiredLabel required>姓名</RequiredLabel>
    <CounterInput label='人數' value={2} onChange={setValue} min={1} max={10} />
  </FormSection>
)
```

#### 🏠 佈局組件層 (`components/layout/`)

頁面結構和導航組件：

- `Header` - 響應式頁首，支援透明/固定模式
- `Footer` - 頁尾組件
- `Logo` - 品牌標誌組件，支援縮放動畫
- `Navigation` - 導航選單組件

#### 📄 內容組件層 (`components/sections/`)

頁面內容區塊：

- `Banner` - 首頁橫幅區塊
- `Services` - 服務介紹區塊
- `PopularDestinations` - 熱門目的地區塊

## 🎨 設計系統

### 顏色系統 (`lib/design-system/colors.ts`)

**主色調**

```typescript
colors.primary = {
  0: '#ffffff', // 純白
  300: '#b7b8c2', // 淺灰
  500: '#5b5b6e', // 中灰
  950: '#383841', // 深灰 (主要文字)
}
```

**品牌色**

```typescript
colors.secondary = {
  500: '#bda05e', // 金色主調
  950: '#926d3c', // 深金色
}
```

**功能色**

```typescript
colors.function = {
  alert: '#ff4757', // 錯誤/必填提示
  success: '#2ed573', // 成功狀態
}
```

### 字體系統 (`lib/design-system/typography.ts`)

**字體族群**

- **Noto Serif TC**: 標題和重要文字
- **GenSekiGothic2 JP**: 內文和介面文字
- **Luxurious Script**: 裝飾性文字

**字體規格**

```typescript
// 標題層級
h1Bold: { fontSize: '96px', fontWeight: 700 }
h2Bold: { fontSize: '64px', fontWeight: 700 }
h3Bold: { fontSize: '40px', fontWeight: 700 }

// 內文層級
bodyLBold: { fontSize: '24px', fontWeight: 700 }
bodyMRegular: { fontSize: '16px', fontWeight: 400 }
bodySRegular: { fontSize: '14px', fontWeight: 400 }
```

### 間距系統 (`lib/design-system/spacing.ts`)

遵循 8px 基準網格系統：

```typescript
spacing = {
  xs: '4px', // 0.5x
  sm: '8px', // 1x
  md: '16px', // 2x
  lg: '24px', // 3x
  xl: '32px', // 4x
  xxl: '64px', // 8x
}
```

## 🔧 開發工具

### Context 狀態管理 (`context/`)

**ScrollContext** - 滾動狀態管理

```tsx
import { useScrollContext } from '@/context/ScrollContext'

const { scrollY, logoProgress } = useScrollContext()
```

### 自定義 Hooks (`hooks/`)

**useScroll** - 高效能滾動監聽

```tsx
import { useScroll } from '@/hooks/useScroll'

const { scrollY, isScrolling } = useScroll()
```

- 內建節流優化 (throttling)
- 使用 requestAnimationFrame 確保效能
- 支援滾動狀態偵測

### 工具函數 (`lib/utils.ts`)

**樣式工具**

```tsx
import { cn } from '@/lib/utils'

// Tailwind CSS 類別合併
;<div className={cn('base-class', condition && 'conditional-class')} />
```

**功能工具**

```tsx
import { debounce, throttle, scrollToElement } from '@/lib/utils'

// 防抖和節流
const debouncedSearch = debounce(searchFunction, 300)
const throttledScroll = throttle(scrollHandler, 100)

// 平滑滾動到元素
scrollToElement('target-id', 80) // 80px offset
```

## 📋 類型系統

### 命名約定 (`types/`)

**類型前綴**

```typescript
type TComponentProps = {} // 組件 Props
type TApiResponse = {} // API 響應
type TUserData = {} // 資料模型
```

**主要類型定義**

**組件類型** (`types/components.ts`)

```typescript
type TBaseComponent = {
  children?: React.ReactNode
  className?: string
}

type THeader = TBaseComponent & {
  isHomePage: boolean
  logoScale?: number
  headerBehavior?: 'fixed' | 'sticky' | 'static'
}
```

**表單類型** (`types/inquiry.ts`)

```typescript
type TTravelInquiryFormData = {
  basicInfo: TBasicInfo
  budget: TBudget
  independentTravel: TIndependentTravel
  groupTravel: TGroupTravel
  requirementsDescription?: string
}
```

## 🚀 開發指南

### 新組件開發流程

1. **設計階段**
   - 確認組件用途和複用性
   - 選擇適當的組件層級 (ui/layout/sections)

2. **實作階段**

   ```typescript
   // 使用箭頭函數表達式
   export const NewComponent = ({
     prop1,
     prop2 = defaultValue
   }: TNewComponentProps) => {
     return <div>Component Content</div>
   }
   ```

3. **類型定義**

   ```typescript
   // types/components.ts
   export type TNewComponentProps = TBaseComponent & {
     specificProp: string
     optionalProp?: boolean
   }
   ```

4. **樣式規範**
   - 使用設計系統定義的顏色和字體
   - 遵循 Tailwind CSS 工具類
   - 利用 `cn()` 函數合併條件樣式

### 維護準則

**代碼品質**

- 所有組件使用 TypeScript 箭頭函數
- Props 必須定義明確的類型
- 使用設計系統常數，避免硬編碼樣式

**組件設計原則**

- **單一職責**: 每個組件專注單一功能
- **可組合**: 支援 children 和靈活的 props
- **可擴展**: 透過 className 支援樣式覆蓋
- **無障礙**: 遵循 WCAG 無障礙設計標準

**檔案組織**

- 組件檔案使用 PascalCase 命名
- 一個檔案一個主要組件
- 相關組件放在同一目錄
- 使用 index.ts 統一匯出

### 效能最佳化

**React 最佳實踐**

- 使用 `useMemo` 和 `useCallback` 優化昂貴計算
- 避免在 JSX 中創建新物件
- 適當使用 `React.memo` 防止不必要重渲染

**載入最佳化**

- 圖片使用 Next.js Image 組件
- 字體透過 Next.js font 優化
- 懶載入非關鍵資源

## 📐 技術規範

**開發環境**

- Node.js 18+
- TypeScript 5.3+
- Next.js 14 (App Router)
- React 18.2+

**主要依賴**

```json
{
  "next": "14.x",
  "react": "18.2.x",
  "typescript": "5.3.x",
  "tailwindcss": "3.x",
  "react-hook-form": "7.x",
  "@radix-ui/react-*": "1.x",
  "zod": "3.x"
}
```

**代碼規範**

- ESLint + Prettier 自動格式化
- 使用 Husky git hooks
- Commit 訊息遵循 Conventional Commits

---

**專案維護**: 遵循上述規範確保代碼一致性和可維護性  
**文檔更新**: 新功能開發時同步更新相關文檔
