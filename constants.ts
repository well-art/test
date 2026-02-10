import { SectionData, DocumentItem } from './types';

// Helper to generate mock items
const generateItems = (count: number, prefix: string): DocumentItem[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${prefix}-${i}`,
    title: `${prefix} - 文件範例 ${i + 1}`,
    date: `2023-${10 + (i % 2)}-${10 + i}`,
    type: i % 3 === 0 ? 'pdf' : i % 3 === 1 ? 'doc' : 'sheet',
  }));
};

export const REGULATIONS_DATA: SectionData = {
  id: 'regulations',
  title: '規章制度',
  groups: [
    { name: '組織系列', items: generateItems(4, '組織架構與職掌') },
    { name: '技術系列', items: generateItems(5, '技術研發規範') },
    { name: '財務系列', items: generateItems(3, '財務報銷準則') },
    { name: '行銷系列', items: generateItems(4, '品牌識別手冊') },
    { name: '品格系列', items: generateItems(2, '員工行為準則') },
  ],
};

export const FLOWCHARTS_DATA: SectionData = {
  id: 'flowcharts',
  title: '粒子流程表',
  groups: [
    { name: '一部門', items: generateItems(3, '業務開發流程') },
    { name: '二部門', items: generateItems(3, '專案執行SOP') },
    { name: '三部門', items: generateItems(3, '採購驗收流程') },
    { name: '四部門', items: generateItems(3, '客戶服務流程') },
    { name: '五部門', items: generateItems(3, '資訊安全稽核') },
    { name: '六部門', items: generateItems(3, '教育訓練規劃') },
    { name: '七部門', items: generateItems(3, '後勤支援作業') },
  ],
};

export const FORMS_DATA: SectionData = {
  id: 'forms',
  title: '共用表格',
  groups: [
    { name: '人事相關', items: generateItems(5, '請假單/加班單') },
    { name: '公關相關', items: generateItems(3, '公關禮品申請') },
    { name: '文書檔案', items: generateItems(4, '用印申請書') },
    { name: '印鑑相關', items: generateItems(2, '印鑑使用登記') },
    { name: '財務相關', items: generateItems(6, '費用請款單') },
    { name: '管理相關', items: generateItems(3, '資產異動單') },
    { name: '穩盈相關', items: generateItems(3, '投資評估表') },
  ],
};

export const ALL_DATA = [REGULATIONS_DATA, FLOWCHARTS_DATA, FORMS_DATA];