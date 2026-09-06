export interface Point { x: number; y: number }
export interface ImageTransform extends Point { scale: number }
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/** Coordinates are relative to the image viewport centre, in CSS pixels. */
export class ImageGesture {
  transform: ImageTransform = { scale: 1, x: 0, y: 0 };
  private bounds = { width: 0, height: 0, imageWidth: 0, imageHeight: 0 };
  private pointers = new Map<number, Point>();
  private origin: Point = { x: 0, y: 0 };
  private baseline = this.transform;
  private pinchDistance = 1;
  private started = 0;
  private multi = false;
  private moved = false;
  private zoomed = false;

  setBounds(width: number, height: number, imageWidth: number, imageHeight: number) {
    this.bounds = { width, height, imageWidth, imageHeight };
    this.apply(this.transform);
  }
  private apply(value: ImageTransform) {
    const scale = Math.max(1, Math.min(6, value.scale));
    const xLimit = Math.max(0, (this.bounds.imageWidth * scale - this.bounds.width) / 2);
    const yLimit = Math.max(0, (this.bounds.imageHeight * scale - this.bounds.height) / 2);
    this.transform = { scale, x: xLimit ? Math.max(-xLimit, Math.min(xLimit, value.x)) : 0, y: yLimit ? Math.max(-yLimit, Math.min(yLimit, value.y)) : 0 };
  }
  zoom(scale: number, point: Point = { x: 0, y: 0 }) {
    const next = Math.max(1, Math.min(6, scale));
    const ratio = next / this.transform.scale;
    this.apply({ scale: next, x: point.x - (point.x - this.transform.x) * ratio, y: point.y - (point.y - this.transform.y) * ratio });
  }
  reset() { this.pointers.clear(); this.transform = { scale: 1, x: 0, y: 0 }; }
  private rebase() {
    const points = [...this.pointers.values()];
    this.baseline = { ...this.transform };
    this.origin = points.length > 1 ? midpoint(points[0], points[1]) : points[0];
    if (points.length > 1) this.pinchDistance = Math.max(1, distance(points[0], points[1]));
  }
  start(id: number, point: Point, time: number) {
    if (!this.pointers.size) { this.started = time; this.multi = false; this.moved = false; this.zoomed = this.transform.scale > 1; }
    this.pointers.set(id, point);
    if (this.pointers.size > 1) this.multi = true;
    this.rebase();
  }
  move(id: number, point: Point) {
    if (!this.pointers.has(id)) return;
    this.pointers.set(id, point);
    const points = [...this.pointers.values()];
    if (points.length > 1) {
      const centre = midpoint(points[0], points[1]);
      const scale = Math.max(1, Math.min(6, this.baseline.scale * distance(points[0], points[1]) / this.pinchDistance));
      const ratio = scale / this.baseline.scale;
      this.apply({ scale, x: centre.x - (this.origin.x - this.baseline.x) * ratio, y: centre.y - (this.origin.y - this.baseline.y) * ratio });
    } else {
      if (distance(point, this.origin) > 10) this.moved = true;
      if (this.transform.scale > 1) this.apply({ scale: this.baseline.scale, x: this.baseline.x + point.x - this.origin.x, y: this.baseline.y + point.y - this.origin.y });
    }
  }
  end(id: number, point: Point, time: number, cancelled = false): { swipe: number; tap: boolean } {
    if (!this.pointers.has(id)) return { swipe: 0, tap: false };
    this.move(id, point);
    this.pointers.delete(id);
    if (cancelled) this.multi = true;
    if (this.pointers.size) { this.rebase(); return { swipe: 0, tap: false }; }
    if (this.multi) return { swipe: 0, tap: false };
    const x = point.x - this.origin.x, y = point.y - this.origin.y;
    const swipe = !this.zoomed && this.transform.scale === 1 && time - this.started < 1600
      && Math.abs(x) >= Math.max(48, Math.min(90, this.bounds.width * .075)) && Math.abs(x) > Math.abs(y) * 1.5
      ? (x < 0 ? 1 : -1) : 0;
    return { swipe, tap: !this.moved && time - this.started < 300 };
  }
}
