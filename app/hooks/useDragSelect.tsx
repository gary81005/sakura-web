"use client";

import { useEffect, useRef } from "react";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseDragSelectOptions {
  /** 要偵測的目標元素 CSS selector，例如 ".info-card" 或 "[data-selectable]" */
  selector: string;
  /** 圈選結束時的 callback，回傳被圈到的元素陣列 */
  onSelect: (elements: Element[]) => void;
  /** 框選框的 z-index，預設 9998 */
  zIndex?: number;
}

/**
 * useDragSelect
 *
 * 拖曳滑鼠畫框，回傳所有與框重疊的目標元素。
 *
 * 用法：
 *   const containerRef = useDragSelect({
 *     selector: '.info-card',
 *     onSelect: (els) => console.log(els),
 *   });
 *
 *   <div ref={containerRef}> ... </div>
 */
export function useDragSelect<T extends HTMLElement = HTMLDivElement>({
  selector,
  onSelect,
  zIndex = 9998,
}: UseDragSelectOptions) {
  const containerRef = useRef<T>(null);

  // 用 ref 存 callback，避免 effect 重複掛載
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 建立框選框 DOM ──────────────────────────────
    const box = document.createElement("div");
    box.style.cssText = `
      position: fixed;
      border: 1.5px dashed #e91e8c;
      background: rgba(233, 30, 140, 0.08);
      border-radius: 4px;
      pointer-events: none;
      z-index: ${zIndex};
      display: none;
    `;
    document.body.appendChild(box);

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    // ── 計算兩點構成的 Rect ────────────────────────
    const getSelectionRect = (
      ax: number,
      ay: number,
      bx: number,
      by: number,
    ): Rect => ({
      x: Math.min(ax, bx),
      y: Math.min(ay, by),
      width: Math.abs(bx - ax),
      height: Math.abs(by - ay),
    });

    // ── 判斷兩個 Rect 是否重疊 ────────────────────
    const isOverlapping = (a: Rect, b: DOMRect): boolean =>
      a.x < b.right &&
      a.x + a.width > b.left &&
      a.y < b.bottom &&
      a.y + a.height > b.top;

    // ── mousedown ─────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      // 只處理左鍵，且不是點在 input / button / a 上
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      if (
        ["INPUT", "BUTTON", "SELECT", "TEXTAREA", "A"].includes(target.tagName)
      )
        return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      box.style.left = `${startX}px`;
      box.style.top = `${startY}px`;
      box.style.width = "0px";
      box.style.height = "0px";
      box.style.display = "block";

      e.preventDefault();
    };

    // ── mousemove ─────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const rect = getSelectionRect(startX, startY, e.clientX, e.clientY);
      box.style.left = `${rect.x}px`;
      box.style.top = `${rect.y}px`;
      box.style.width = `${rect.width}px`;
      box.style.height = `${rect.height}px`;
    };

    // ── mouseup ───────────────────────────────────
    const onMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      isDragging = false;
      box.style.display = "none";

      const selRect = getSelectionRect(startX, startY, e.clientX, e.clientY);

      // 太小的框（誤觸點擊）忽略
      if (selRect.width < 4 && selRect.height < 4) return;

      // 找出所有符合 selector 且與框重疊的元素
      const targets = Array.from(document.querySelectorAll(selector));
      const hit = targets.filter((el) => {
        const br = el.getBoundingClientRect();
        return isOverlapping(selRect, br);
      });

      onSelectRef.current(hit);
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeChild(box);
    };
  }, [selector, zIndex]);

  return containerRef;
}

export default useDragSelect;
