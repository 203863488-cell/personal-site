import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { ImageGesture } from "../../presentation/imageGesture";
import "./zoomable-image.css";

export function ZoomableImage({ src, alt, zh, onSwipe }: { src: string; alt: string; zh: boolean; onSwipe: (direction: number) => void }) {
  const viewport = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const gesture = useRef(new ImageGesture());
  const lastTap = useRef({ time: 0, x: 0, y: 0 });
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const sync = useCallback(() => setTransform({ ...gesture.current.transform }), []);
  const measure = useCallback(() => {
    if (viewport.current && image.current) {
      gesture.current.setBounds(viewport.current.clientWidth, viewport.current.clientHeight, image.current.offsetWidth, image.current.offsetHeight);
      sync();
    }
  }, [sync]);
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      gesture.current.reset();
      measure();
    });
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, [measure]);
  function point(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 };
  }
  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const position = point(event), time = performance.now();
    const result = gesture.current.end(event.pointerId, position, time, cancelled);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (result.swipe) onSwipe(result.swipe);
    if (result.tap) {
      const last = lastTap.current;
      if (last.time && time - last.time < 350 && Math.hypot(last.x - position.x, last.y - position.y) < 32) {
        gesture.current.zoom(gesture.current.transform.scale > 1 ? 1 : 2.5, position);
        lastTap.current.time = 0;
      } else lastTap.current = { time, ...position };
    } else lastTap.current.time = 0;
    sync();
  }
  return <div className="zoomable-image">
    <div ref={viewport} className="zoomable-image__viewport" aria-label={zh ? "图片缩放与拖动区域" : "Image zoom and pan area"}
      onPointerDown={event => {
        if (event.button !== 0) return;
        event.stopPropagation();
        event.currentTarget.setPointerCapture(event.pointerId);
        gesture.current.start(event.pointerId, point(event), performance.now());
      }}
      onPointerMove={event => { gesture.current.move(event.pointerId, point(event)); sync(); }}
      onPointerUp={event => finish(event)} onPointerCancel={event => finish(event, true)}>
      <img ref={image} src={src} alt={alt} draggable={false} onLoad={measure}
        style={{ transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})` }} />
    </div>
    <div className="zoomable-image__controls">
      <button type="button" aria-label={zh ? "缩小图片" : "Zoom out"} disabled={transform.scale <= 1} onClick={() => { gesture.current.zoom(transform.scale / 1.5); sync(); }}>−</button>
      <button type="button" aria-label={zh ? "还原图片大小" : "Reset image zoom"} onClick={() => { gesture.current.reset(); sync(); }}>{Math.round(transform.scale * 100)}%</button>
      <button type="button" aria-label={zh ? "放大图片" : "Zoom in"} disabled={transform.scale >= 6} onClick={() => { gesture.current.zoom(transform.scale * 1.5); sync(); }}>＋</button>
      <span>{zh ? (transform.scale > 1 ? "单指拖动 · 双击还原" : "双指缩放 · 双击放大 · 左右切图") : (transform.scale > 1 ? "Drag to pan · double-tap to reset" : "Pinch or double-tap to zoom · swipe to browse")}</span>
    </div>
  </div>;
}
