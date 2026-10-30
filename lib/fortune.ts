// 今日の開運バフ：日付で決まる固定テーブル方式（DBなし・引き直し不可）
// テーマは陰陽（陽/陰）×五行（木・火・土・金・水）の10通り。
// JST の日付文字列をシードにした決定的な選択で、その日は誰が見ても同じ結果になる。

export type SlotKey = "morning" | "noon" | "night";

export interface Buff {
  name: string;
  /** 一言：今日できる小さな行動の形で渡す（効果の断定はしない） */
  action: string;
  luckyItem: string;
  luckyColor: string;
}

export interface Theme {
  yinYang: "陽" | "陰";
  element: "木" | "火" | "土" | "金" | "水";
  /** テーマ名 */
  name: string;
  /** 巫女ねこの一言（ツンデレだが根は優しい） */
  nekoComment: string;
  slots: Record<SlotKey, Buff>;
}

export const SLOT_LABEL: Record<SlotKey, string> = {
  morning: "朝のバフ",
  noon: "昼のバフ",
  night: "夜のバフ",
};

export const SLOT_RANGE: Record<SlotKey, string> = {
  morning: "5:00 - 11:59",
  noon: "12:00 - 17:59",
  night: "18:00 - 4:59",
};

export const SLOT_ORDER: SlotKey[] = ["morning", "noon", "night"];

// 並びは [陽木, 陽火, 陽土, 陽金, 陽水, 陰木, 陰火, 陰土, 陰金, 陰水]
export const THEMES: Theme[] = [
  {
    yinYang: "陽",
    element: "木",
    name: "青芽のテーマ",
    nekoComment: "芽吹きの日だ。始めるなら今日だな。……応援してやる。",
    slots: {
      morning: {
        name: "はじめの一歩バフ",
        action: "玄関を出る前に、今日やることを1つだけ声に出してみる",
        luckyItem: "木の箸",
        luckyColor: "若竹色",
      },
      noon: {
        name: "伸びゆく枝バフ",
        action: "止まっていた連絡を1件だけ返してみる",
        luckyItem: "グリーンの付箋",
        luckyColor: "常盤色",
      },
      night: {
        name: "芽吹き仕込みバフ",
        action: "明日の服を椅子にかけて、寝る準備を済ませておく",
        luckyItem: "木綿のタオル",
        luckyColor: "生成り色",
      },
    },
  },
  {
    yinYang: "陽",
    element: "火",
    name: "灯火のテーマ",
    nekoComment: "気持ちが上向く日だ。その灯り、大事にしろ。",
    slots: {
      morning: {
        name: "朝日の灯バフ",
        action: "カーテンを全開にして、朝の光を顔に当てる",
        luckyItem: "オレンジの果物",
        luckyColor: "茜色",
      },
      noon: {
        name: "あたため直しバフ",
        action: "温かい飲み物を両手で持って、ひと息つく",
        luckyItem: "湯呑み",
        luckyColor: "山吹色",
      },
      night: {
        name: "灯りを落とすバフ",
        action: "寝る30分前に、部屋の照明を一段暗くする",
        luckyItem: "小さな間接照明",
        luckyColor: "琥珀色",
      },
    },
  },
  {
    yinYang: "陽",
    element: "土",
    name: "実りのテーマ",
    nekoComment: "コツコツが実る日だ。地味でも、進めば勝ちだな。",
    slots: {
      morning: {
        name: "大地の足場バフ",
        action: "靴をそろえて置き、足元から一日を整える",
        luckyItem: "革の定期入れ",
        luckyColor: "黄土色",
      },
      noon: {
        name: "積み上げバフ",
        action: "机の上を3分だけ片づけて、作業の山を小さくする",
        luckyItem: "小さな収納箱",
        luckyColor: "ベージュ",
      },
      night: {
        name: "実りの仕分けバフ",
        action: "今日できたことを、メモに1行だけ残す",
        luckyItem: "手帳",
        luckyColor: "栗色",
      },
    },
  },
  {
    yinYang: "陽",
    element: "金",
    name: "輝きのテーマ",
    nekoComment: "磨けば光る日だ。少しの手入れで十分だぞ。",
    slots: {
      morning: {
        name: "磨き上げバフ",
        action: "鏡を見ながら背筋を伸ばして、笑顔を1回作ってみる",
        luckyItem: "金属のヘアピン",
        luckyColor: "シャンパンゴールド",
      },
      noon: {
        name: "輝き足しバフ",
        action: "お気に入りの小物を1つ身につけて出かける",
        luckyItem: "指輪やピアス",
        luckyColor: "真珠色",
      },
      night: {
        name: "研ぎ澄ましバフ",
        action: "明日の持ち物を、玄関にまとめて置いておく",
        luckyItem: "ポーチ",
        luckyColor: "銀鼠色",
      },
    },
  },
  {
    yinYang: "陽",
    element: "水",
    name: "潤いのテーマ",
    nekoComment: "流れのよい日だ。無理に逆らうな、だ。",
    slots: {
      morning: {
        name: "湧き水バフ",
        action: "起きてすぐ、コップ1杯の水を飲む",
        luckyItem: "ガラスのコップ",
        luckyColor: "水色",
      },
      noon: {
        name: "流れをよくするバフ",
        action: "席を立って窓の外を眺め、深呼吸を3回する",
        luckyItem: "ミントタブレット",
        luckyColor: "浅葱色",
      },
      night: {
        name: "静かな水面バフ",
        action: "お風呂で肩まで浸かって、今日の出来事を流す",
        luckyItem: "入浴剤",
        luckyColor: "藍色",
      },
    },
  },
  {
    yinYang: "陰",
    element: "木",
    name: "新緑のテーマ",
    nekoComment: "静かに伸びる日だ。焦らなくていい。それがお前の力だ。",
    slots: {
      morning: {
        name: "若葉の静けさバフ",
        action: "ベランダや窓辺で、緑を1分眺める",
        luckyItem: "小さな観葉植物",
        luckyColor: "萌葱色",
      },
      noon: {
        name: "木陰の休みバフ",
        action: "昼休みにスマホを置いて、目を閉じて休む",
        luckyItem: "アイマスク",
        luckyColor: "苔色",
      },
      night: {
        name: "根を張るバフ",
        action: "今日がんばった自分に「おつかれさま」と声をかける",
        luckyItem: "温かいお茶",
        luckyColor: "抹茶色",
      },
    },
  },
  {
    yinYang: "陰",
    element: "火",
    name: "月灯りのテーマ",
    nekoComment: "やさしい温もりの日だ。誰かに分けると、もっと温かくなるぞ。",
    slots: {
      morning: {
        name: "ほのかな灯バフ",
        action: "好きな香りをひと吹きしてから出かける",
        luckyItem: "ハンドクリーム",
        luckyColor: "珊瑚色",
      },
      noon: {
        name: "ぬくもり分けバフ",
        action: "誰かに「ありがとう」を1回伝える",
        luckyItem: "温かい飲み物",
        luckyColor: "杏色",
      },
      night: {
        name: "月灯りのバフ",
        action: "寝る前に、好きな音楽を1曲だけ聴く",
        luckyItem: "イヤホン",
        luckyColor: "藤色",
      },
    },
  },
  {
    yinYang: "陰",
    element: "土",
    name: "大地のテーマ",
    nekoComment: "休むための日だ。休むのも仕事のうちだな。",
    slots: {
      morning: {
        name: "土の落ち着きバフ",
        action: "朝ごはんを座って、ゆっくり食べる",
        luckyItem: "陶器の器",
        luckyColor: "胡桃色",
      },
      noon: {
        name: "ひと休みの土バフ",
        action: "お昼に5分だけ、外の空気を吸う",
        luckyItem: "日傘や帽子",
        luckyColor: "砂色",
      },
      night: {
        name: "大地に還るバフ",
        action: "足裏をマッサージして、一日を労わる",
        luckyItem: "温かいタオル",
        luckyColor: "小豆色",
      },
    },
  },
  {
    yinYang: "陰",
    element: "金",
    name: "星屑のテーマ",
    nekoComment: "小さな輝きが見つかる日だ。見逃すなよ。",
    slots: {
      morning: {
        name: "星屑の名残バフ",
        action: "ポケットに、小さなお守りやコインを入れて出かける",
        luckyItem: "小さなチャーム",
        luckyColor: "紺色",
      },
      noon: {
        name: "磨き直しバフ",
        action: "財布の中のレシートを整理する",
        luckyItem: "財布",
        luckyColor: "白銀色",
      },
      night: {
        name: "静かな輝きバフ",
        action: "明日の自分へ一言メモを書いて、枕元に置く",
        luckyItem: "メモ帳",
        luckyColor: "月白色",
      },
    },
  },
  {
    yinYang: "陰",
    element: "水",
    name: "清流のテーマ",
    nekoComment: "手放すと軽くなる日だ。……抱え込みすぎだ、お前は。",
    slots: {
      morning: {
        name: "清流の洗いバフ",
        action: "顔を洗うときに、心の中で「リセット」と唱える",
        luckyItem: "白いタオル",
        luckyColor: "白色",
      },
      noon: {
        name: "流れに任せるバフ",
        action: "詰まったら一度手を止めて、水を飲んで仕切り直す",
        luckyItem: "水筒",
        luckyColor: "群青色",
      },
      night: {
        name: "手放しの水バフ",
        action: "今日の気がかりを紙に書いて、伏せて置いてから寝る",
        luckyItem: "紙とペン",
        luckyColor: "深い藍色",
      },
    },
  },
];

/** ラッキーカラー名 → 表示用スウォッチ色（日本の伝統色の近似値） */
export const LUCKY_COLOR_HEX: Record<string, string> = {
  若竹色: "#68be8d",
  常盤色: "#007b43",
  生成り色: "#f0e9d6",
  茜色: "#e03c31",
  山吹色: "#f8b500",
  琥珀色: "#bf783a",
  黄土色: "#be9a3d",
  ベージュ: "#d9c6a5",
  栗色: "#7a4a21",
  シャンパンゴールド: "#dbc07a",
  真珠色: "#efeae0",
  銀鼠色: "#afafb0",
  水色: "#a0d8ef",
  浅葱色: "#00a3af",
  藍色: "#165e83",
  萌葱色: "#006e54",
  苔色: "#6b7c3f",
  抹茶色: "#c5c56a",
  珊瑚色: "#ef857d",
  杏色: "#f7b977",
  藤色: "#a59aca",
  胡桃色: "#9c7a54",
  砂色: "#dcd3b2",
  小豆色: "#96514d",
  紺色: "#25304b",
  白銀色: "#dedede",
  月白色: "#e3e8ec",
  白色: "#ffffff",
  群青色: "#465daa",
  深い藍色: "#0f2d4a",
};

/** ラッキーカラー名からスウォッチ色を引く（未知の名前は金の色で代替） */
export function luckyColorHex(name: string): string {
  return LUCKY_COLOR_HEX[name] ?? "#c9a227";
}

/** 実行環境のタイムゾーンに依らず、JST の「いま」を返す */
export function jstNow(from: Date = new Date()): Date {
  return new Date(from.getTime() + (9 * 60 + from.getTimezoneOffset()) * 60000);
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

export interface DailyFortune {
  /** 例: 2026-10-31 */
  dateKey: string;
  /** 例: 2026年10月31日（土） */
  dateLabel: string;
  theme: Theme;
  themeIndex: number;
  currentSlot: SlotKey;
}

/** 文字列の決定的ハッシュ（FNV-1a） */
function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** JST の時（0-23）から時間帯を求める：朝 5-11 / 昼 12-17 / 夜 18-4 */
export function slotFromHour(hour: number): SlotKey {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "noon";
  return "night";
}

/** JST の現在日時から、その日の占いを決定的に求める */
export function getDailyFortune(from: Date = new Date()): DailyFortune {
  const jst = jstNow(from);
  const y = jst.getFullYear();
  const m = jst.getMonth() + 1;
  const d = jst.getDate();
  const pad = (n: number) => String(n).padStart(2, "0");
  const dateKey = `${y}-${pad(m)}-${pad(d)}`;
  const dateLabel = `${y}年${m}月${d}日（${WEEKDAYS[jst.getDay()]}）`;
  const themeIndex = hashString(`kaiun-buff:${dateKey}`) % THEMES.length;
  return {
    dateKey,
    dateLabel,
    theme: THEMES[themeIndex],
    themeIndex,
    currentSlot: slotFromHour(jst.getHours()),
  };
}
