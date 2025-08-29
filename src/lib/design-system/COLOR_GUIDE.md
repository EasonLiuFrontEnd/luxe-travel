# 顏色系統使用指南

## 🎨 顏色系統概述

本專案使用完整的設計系統顏色，包含以下主要色調：

### Primary（經典灰）
- **主色調**: `#383841` (primary-950)
- **完整色階**: `#383841` (950) → `#5B5B6E` (500) → `#737373` (400) → `#B7B8C2` (300) → `#EEEEF0` (100) → `#F7F7F8` (50) → `#FFFFFF` (0)

### Secondary（瓦磚黃）
- **主色調**: `#BDA05E` (secondary-500)
- **完整色階**: `#926D3C` (950) → `#BDA05E` (500) → `#E5D9BF` (300) → `#F7F4EC` (100) → `#FCFAF7` (50)

### Grayscale（灰度）
- **完整色階**: `#333333` → `#737373` → `#BDBDBD` → `#EBEBEB` → `#F5F5F5` → `#FFFFFF`

### Accent（強調色）
- **艷日黃**: `#FFD900` / `#FFFDF0`
- **天空藍**: `#8BC3DE` / `#EDF9FF`

### Warning（警告色）
- **綠色**: `#00D475` / `#0CF38B`

## 📝 使用方式

### 1. CSS 變數方式
```css
background-color: var(--color-figma-primary-500);
color: var(--color-figma-secondary-500);
```

### 2. Tailwind CSS 方式
```tsx
<div className="bg-figma-primary-500 text-figma-secondary-500">
  內容
</div>
```

### 3. JavaScript/TypeScript 方式
```tsx
import { colors, getColor } from '@/lib/design-system/colors'

// 直接使用
const primaryColor = colors.primary[500]

// 使用工具函數
const secondaryColor = getColor('secondary', 500)
```

## 🎯 使用建議

### 主要用途
- **Primary**: 主要文字、重要元素
- **Secondary**: 次要文字、裝飾元素
- **Grayscale**: 背景、邊框、中性元素
- **Accent**: 強調、CTA 按鈕
- **Warning**: 成功狀態、可用性指示

### 最佳實踐
1. **保持一致性**: 使用設計系統定義的顏色
2. **避免硬編碼**: 不要直接使用 hex 值
3. **考慮可訪問性**: 確保顏色對比度符合 WCAG 標準
4. **響應式設計**: 在不同主題下測試顏色效果

## 🔧 自定義顏色

如需添加新顏色，請：
1. 在 `src/lib/design-system/colors.ts` 中添加定義
2. 在 `src/styles/globals.css` 中添加 CSS 變數
3. 更新此指南文檔

### ⚠️ 重要提醒
- **不要修改現有的顏色值**，這會影響到專案中已使用的組件
- **新增顏色時使用新的色階編號**（如 600、700 等）
- **保持向後兼容性**，確保現有功能不受影響

## 📊 顏色對比度

所有顏色都經過對比度測試，確保符合：
- **AA 標準**: 4.5:1（正常文字）
- **AAA 標準**: 7:1（小文字） 