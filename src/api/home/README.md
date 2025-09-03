# Home API Hooks

首頁相關的 API Hooks 集合，使用 TanStack Query 進行資料管理。

## Hook 概覽

| Hook                  | 功能         | API 端點                       | 快取時間 |
| --------------------- | ------------ | ------------------------------ | -------- |
| `useAdvantages`       | 服務優勢列表 | `/api/admin/advantages`        | 30分鐘   |
| `useConcerns`         | 客戶關注點   | `/api/admin/concerns`          | 30分鐘   |
| `useMenu`             | 網站選單     | `/api/admin/menu`              | 30分鐘   |
| `useBanners`          | 輪播橫幅     | `/api/admin/banners`           | 15分鐘   |
| `useCountryShowcases` | 國家展示     | `/api/admin/country-showcases` | 30分鐘   |

## 使用方式

### 基本使用

```typescript
import { useAdvantages, useBanners, useMenu } from './hooks/home'

const HomePage = () => {
  const { data: advantages, isLoading: advantagesLoading, error } = useAdvantages()
  const { data: banners, isLoading: bannersLoading } = useBanners()
  const { data: menu } = useMenu()

  if (advantagesLoading || bannersLoading) {
    return <div>載入中...</div>
  }

  if (error) {
    return <div>載入失敗：{error.message}</div>
  }

  return (
    <div>
      {banners?.map(banner => (
        <div key={banner.id}>{banner.title}</div>
      ))}

      {advantages?.map(advantage => (
        <div key={advantage.id}>
          <h3>{advantage.title}</h3>
          <p>{advantage.content}</p>
        </div>
      ))}
    </div>
  )
}
```

### 進階使用

```typescript
import { useAdvantages } from './hooks/home'

const AdvantagesSection = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching
  } = useAdvantages()

  const handleRefresh = () => {
    refetch()
  }

  return (
    <div>
      <button onClick={handleRefresh} disabled={isRefetching}>
        {isRefetching ? '重新載入中...' : '重新載入'}
      </button>

      {data?.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}
```

## Hook 詳細說明

### useAdvantages

獲取服務優勢列表資料。

**回傳型別：**

```typescript
{
  id: string
  moduleId: string
  imageUrl: string
  title: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}
;[]
```

**特性：**

- 快取時間：30分鐘
- 自動重試：3次
- 適用於展示公司服務優勢

### useConcerns

獲取客戶關注點列表。

**回傳型別：**

```typescript
{
  id: string
  moduleId: string
  number: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}
;[]
```

**特性：**

- 快取時間：30分鐘
- 編號格式：01、02、03...
- 適用於展示解決的客戶痛點

### useMenu

獲取網站導航選單，支援層級結構。

**回傳型別：**

```typescript
{
  id: string
  title: string
  linkUrl: string
  icon: string | null
  order: number
  isActive: boolean
  parentId: string | null
  createdAt: string
  updatedAt: string
  children: TMenuItem[]
}[]
```

**特性：**

- 快取時間：30分鐘
- 支援多層級選單結構
- 包含啟用狀態控制

### useBanners

獲取首頁輪播橫幅資料。

**回傳型別：**

```typescript
{
  id: string
  imageUrl: string
  title: string
  subtitle: string
  linkText: string
  linkUrl: string
  order: number
  createdAt: string
  updatedAt: string
}
;[]
```

**特性：**

- 快取時間：15分鐘（較短，因為可能更新頻繁）
- 包含完整的 CTA 連結資訊

### useCountryShowcases

獲取經典行程國家展示資料。

**回傳型別：**

```typescript
{
  id: string
  imageUrl: string
  title: string
  subtitle: string
  description: string | null
  linkText: string | null
  linkUrl: string | null
  order: number
  createdAt: string
  updatedAt: string
}
;[]
```

**特性：**

- 快取時間：30分鐘
- 支援多語言標題（中文 + 英文）
- 可選的描述和連結資訊

## 錯誤處理

所有 hooks 都包含統一的錯誤處理機制：

```typescript
const { data, error, isLoading } = useAdvantages()

if (error) {
  console.error('API 錯誤:', error.message)
}
```

## 快取策略

- **靜態內容**（advantages, concerns, menu, countries）：30分鐘快取
- **動態內容**（banners）：15分鐘快取
- **垃圾回收時間**：所有 hooks 設為 1小時
- **重試機制**：失敗時自動重試 3次，採用指數退避策略

## 最佳實踐

1. **並行載入**：可同時使用多個 hooks，TanStack Query 會自動處理並行請求
2. **條件查詢**：可使用 `enabled` 選項控制查詢時機
3. **背景更新**：資料會在背景自動更新，保持最新狀態
4. **離線支援**：快取機制提供離線時的資料存取
