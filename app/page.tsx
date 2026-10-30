"use client";

import { useEffect, useState } from "react";
import {
  SLOT_LABEL,
  SLOT_ORDER,
  SLOT_RANGE,
  getDailyFortune,
  luckyColorHex,
  type DailyFortune,
  type SlotKey,
} from "@/lib/fortune";

export default function Home() {
  // 日付・時刻は JST 基準でクライアント側に確定させる（SSR との不一致を避ける）
  const [fortune, setFortune] = useState<DailyFortune | null>(null);
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFortune(getDailyFortune());
  }, []);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareText = fortune
    ? `今日の開運バフは「${fortune.theme.name}」（${fortune.theme.yinYang}・${fortune.theme.element}）だった。`
    : "";

  const handleLineShare = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(pageUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWebShare = async () => {
    const nav = window.navigator;
    if (typeof nav.share === "function") {
      try {
        await nav.share({ title: "今日の開運バフ", text: shareText, url: pageUrl });
      } catch {
        // ユーザーがキャンセルした場合は何もしない
      }
      return;
    }
    try {
      await nav.clipboard.writeText(`${shareText} ${pageUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-10 pt-8">
      <header className="text-center">
        <div className="motif-float flex justify-center" aria-hidden="true">
          <ToriiMark className="h-9 w-12 text-(--vermillion)" />
        </div>
        <p className="mt-3 text-xs tracking-[0.35em] text-(--muted)">まいにちの小さな儀式</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-wide text-(--vermillion)">
          今日の開運バフ
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-(--muted)">
          日付で決まる今日のテーマと、朝・昼・夜のバフ。
          <br />
          引き直しはなし、結果はその日固定だ。
        </p>
        {fortune && (
          <p className="mt-4 inline-block rounded-full border border-(--line) bg-(--surface) px-4 py-1.5 text-sm font-bold tracking-widest shadow-sm">
            {fortune.dateLabel}
          </p>
        )}
        <div className="mt-7 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-16 bg-(--gold-soft)" />
          <ToriiMark className="h-4 w-6 text-(--gold)" />
          <span className="h-px w-16 bg-(--gold-soft)" />
        </div>
      </header>

      {!fortune ? (
        <div className="mt-12 flex flex-col items-center" aria-hidden="true">
          <div className="seal-pulse flex h-36 w-36 items-center justify-center rounded-full border-4 border-(--gold) bg-(--surface)" />
        </div>
      ) : !opened ? (
        <section className="mt-12 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -top-5 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
              <CatEars className="h-8 w-24" />
            </div>
            <div className="seal-pulse flex h-36 w-36 flex-col items-center justify-center rounded-full border-4 border-(--gold) bg-(--vermillion) text-white shadow-lg ring-4 ring-(--gold-soft) ring-offset-2 ring-offset-transparent">
              <span className="font-display text-3xl font-bold tracking-[0.2em]">開運</span>
              <span className="mt-1 text-[10px] tracking-[0.3em]">KAIUN BUFF</span>
            </div>
          </div>
          <p className="mt-8 text-center text-sm leading-relaxed text-(--muted)">
            今日のバフは、まだ封の中だ。
            <br />
            心の準備ができたら開けるといい。
          </p>
          <button
            type="button"
            onClick={() => setOpened(true)}
            className="mt-6 w-full rounded-full bg-(--vermillion) px-6 py-4 text-lg font-bold tracking-wider text-white shadow-md transition hover:bg-(--vermillion-strong) active:scale-[0.99]"
          >
            今日の開運バフを開く
          </button>
          <p className="mt-3 text-xs text-(--muted)">1日1回・結果は日付で固定されています</p>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-(--muted)">
            <li className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-(--gold)" aria-hidden="true" />
              テーマは日付で決まる
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-(--gold)" aria-hidden="true" />
              朝・昼・夜の3つのバフ
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-(--gold)" aria-hidden="true" />
              引き直しはなし
            </li>
          </ul>
        </section>
      ) : (
        <>
          <section className="buff-reveal result-frame mt-10 rounded-3xl border border-(--line) bg-(--surface) p-6">
            <div className="flex items-center justify-center gap-2">
              <span className="rounded-full bg-(--vermillion-soft) px-3 py-1 text-xs font-bold text-(--vermillion)">
                {fortune.theme.yinYang}の気
              </span>
              <span className="rounded-full bg-(--vermillion-soft) px-3 py-1 text-xs font-bold text-(--vermillion)">
                五行・{fortune.theme.element}
              </span>
            </div>
            <h2 className="mt-4 text-center font-display text-3xl font-bold tracking-wide">
              {fortune.theme.name}
            </h2>
            <div className="mt-6 flex items-start gap-3">
              <div className="shrink-0 pt-1" aria-hidden="true">
                <NekoFace className="h-12 w-12" />
              </div>
              <div className="neko-bubble min-w-0 flex-1 rounded-2xl px-4 py-3">
                <p className="text-xs font-bold tracking-widest text-(--vermillion)">
                  巫女ねこ から
                </p>
                <p className="mt-1 text-sm leading-relaxed">{fortune.theme.nekoComment}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {SLOT_ORDER.map((slot) => (
                <SlotCard
                  key={slot}
                  slot={slot}
                  fortune={fortune}
                  isCurrent={slot === fortune.currentSlot}
                />
              ))}
            </div>
          </section>

          <section className="buff-reveal-late mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleLineShare}
              className="w-full rounded-full bg-(--line-green) px-6 py-3.5 text-base font-bold tracking-wider text-white shadow-sm transition active:scale-[0.99]"
            >
              LINEで送る
            </button>
            <button
              type="button"
              onClick={handleWebShare}
              className="w-full rounded-full border border-(--line) bg-(--surface) px-6 py-3.5 text-base font-bold tracking-wider text-(--text) shadow-sm transition active:scale-[0.99]"
            >
              {copied ? "リンクをコピーした" : "結果をシェアする"}
            </button>
          </section>
        </>
      )}

      <footer className="mt-auto pt-10 text-center">
        <p className="text-[11px] leading-relaxed text-(--muted)">
          占いはエンターテインメントとしてお楽しみください。
          <br />
          バフは「今日の小さな行動」の提案です。結果は日付ごとに固定され、引き直しはできません。
        </p>
      </footer>
    </main>
  );
}

function SlotCard({
  slot,
  fortune,
  isCurrent,
}: {
  slot: SlotKey;
  fortune: DailyFortune;
  isCurrent: boolean;
}) {
  const buff = fortune.theme.slots[slot];
  return (
    <article
      className={`rounded-2xl border p-4 ${
        isCurrent
          ? "border-(--vermillion) bg-(--vermillion-soft)/40"
          : "border-(--line) bg-white"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold tracking-wider">
          {SLOT_LABEL[slot]}
          <span className="ml-2 text-[11px] font-normal text-(--muted)">{SLOT_RANGE[slot]}</span>
        </h3>
        {isCurrent && (
          <span className="shrink-0 rounded-full bg-(--vermillion) px-2.5 py-0.5 text-[11px] font-bold text-white">
            いま
          </span>
        )}
      </div>
      <p className="mt-2 font-display text-lg font-bold text-(--vermillion)">{buff.name}</p>
      <p className="mt-1 text-sm leading-relaxed">{buff.action}</p>
      <dl className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-(--muted)">
        <div className="flex gap-1.5">
          <dt className="font-bold">ラッキーアイテム</dt>
          <dd>{buff.luckyItem}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="font-bold">ラッキーカラー</dt>
          <dd className="flex items-center gap-1.5">
            <span
              className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-black/15 shadow-inner"
              style={{ backgroundColor: luckyColorHex(buff.luckyColor) }}
              aria-hidden="true"
            />
            {buff.luckyColor}
          </dd>
        </div>
      </dl>
    </article>
  );
}

/** 鳥居のモチーフ（SVGのみ・装飾） */
function ToriiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" fill="currentColor" className={className} aria-hidden="true">
      <path d="M2 7 Q32 1 62 7 L59.5 13.5 Q32 8.5 4.5 13.5 Z" />
      <rect x="9" y="19" width="46" height="5" rx="2.5" />
      <rect x="15" y="13" width="5.5" height="31" rx="2" />
      <rect x="43.5" y="13" width="5.5" height="31" rx="2" />
      <rect x="29.5" y="13" width="5" height="11" />
    </svg>
  );
}

/** 封の印にのせる猫耳（SVGのみ・装飾） */
function CatEars({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 32" className={className} aria-hidden="true">
      <path d="M8 30 L4 4 Q3 0 7 2 L26 12 Q30 14 29 18 L27 30 Z" fill="#c9a227" />
      <path d="M88 30 L92 4 Q93 0 89 2 L70 12 Q66 14 67 18 L69 30 Z" fill="#c9a227" />
      <path d="M11 24 L9 10 L21 16 L20 24 Z" fill="#f6c9c4" />
      <path d="M85 24 L87 10 L75 16 L76 24 Z" fill="#f6c9c4" />
    </svg>
  );
}

/** 巫女ねこの顔（SVGのみ・装飾） */
function NekoFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M11 17 L8 3 Q7.5 0.5 10.5 2 L22 9 Z" fill="#fff8ec" stroke="#e2d3ac" strokeWidth="1.4" />
      <path d="M37 17 L40 3 Q40.5 0.5 37.5 2 L26 9 Z" fill="#fff8ec" stroke="#e2d3ac" strokeWidth="1.4" />
      <path d="M12.5 13.5 L11 6.5 L18 10.5 Z" fill="#f6c9c4" />
      <path d="M35.5 13.5 L37 6.5 L30 10.5 Z" fill="#f6c9c4" />
      <circle cx="24" cy="28" r="16.5" fill="#fff8ec" stroke="#e2d3ac" strokeWidth="1.4" />
      <path d="M14.5 27.5 Q17.5 30.5 20.5 27.5" fill="none" stroke="#2e3355" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M27.5 27.5 Q30.5 30.5 33.5 27.5" fill="none" stroke="#2e3355" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M21.5 34 Q24 36 26.5 34" fill="none" stroke="#2e3355" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="13" cy="33" rx="3" ry="1.8" fill="#f6c9c4" opacity="0.85" />
      <ellipse cx="35" cy="33" rx="3" ry="1.8" fill="#f6c9c4" opacity="0.85" />
      <g stroke="#cdbd93" strokeWidth="1" strokeLinecap="round">
        <line x1="3" y1="29" x2="9.5" y2="30.5" />
        <line x1="3.5" y1="34" x2="9.5" y2="33.5" />
        <line x1="45" y1="29" x2="38.5" y2="30.5" />
        <line x1="44.5" y1="34" x2="38.5" y2="33.5" />
      </g>
      <g>
        <path d="M38 8 L44 4.5 L43.5 11 Z" fill="#b03a2e" />
        <path d="M38 8 L33 4 L34.5 11 Z" fill="#b03a2e" />
        <circle cx="38.5" cy="8" r="1.9" fill="#93302a" />
      </g>
    </svg>
  );
}
