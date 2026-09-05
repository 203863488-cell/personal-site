import { useEffect, useState } from "react";
import { CheckCircle2, Download, LoaderCircle, WifiOff } from "lucide-react";
import { useLanguage } from "../languageContext";

interface OfflineState {
  type: "status" | "progress" | "complete" | "error";
  ready?: boolean;
  completed?: number;
  total?: number;
  bytes?: number;
  message?: string;
}

async function workerRequest(command: string, onProgress?: (state: OfflineState) => void): Promise<OfflineState> {
  if (!("serviceWorker" in navigator) || !import.meta.env.PROD) throw new Error("unavailable");
  let readinessTimer: ReturnType<typeof setTimeout> | undefined;
  const registration = await Promise.race([
    navigator.serviceWorker.ready,
    new Promise<never>((_, reject) => { readinessTimer = setTimeout(() => reject(new Error("worker-not-ready")), 12000); })
  ]).finally(() => clearTimeout(readinessTimer));
  const worker = registration.active;
  if (!worker) throw new Error("worker-not-ready");
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    let timer: ReturnType<typeof setTimeout>;
    const close = () => { clearTimeout(timer); channel.port1.close(); };
    const armTimeout = () => {
      clearTimeout(timer);
      timer = setTimeout(() => { close(); reject(new Error("timeout")); }, 60000);
    };
    channel.port1.onmessage = event => {
      const state = event.data as OfflineState;
      armTimeout();
      if (state.type === "progress") onProgress?.(state);
      else if (state.type === "error") { close(); reject(new Error(state.message)); }
      else { close(); resolve(state); }
    };
    armTimeout();
    worker.postMessage({ type: command }, [channel.port2]);
  });
}

export function OfflinePreparation() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [state, setState] = useState<OfflineState>({ type: "status" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const available = "serviceWorker" in navigator && import.meta.env.PROD;

  useEffect(() => {
    let alive = true;
    workerRequest("OFFLINE_STATUS").then(result => { if (alive) setState(result); }).catch(() => {});
    return () => { alive = false; };
  }, []);

  async function prepare() {
    setBusy(true); setError(false);
    try {
      const result = await workerRequest("PREPARE_OFFLINE", setState);
      setState(result);
    } catch {
      setError(true);
    } finally { setBusy(false); }
  }

  const ready = state.ready || state.type === "complete";
  const percent = state.total ? Math.round((state.completed ?? 0) / state.total * 100) : 0;
  return <section className="presentation-offline">
    {ready ? <CheckCircle2 size={29} aria-hidden="true" /> : <WifiOff size={29} aria-hidden="true" />}
    <h3>{zh ? "出发前，准备离线展示" : "Prepare for an offline presentation"}</h3>
    <p>{zh ? "提前保存演示页、全部项目详情、高清图片和简历。准备完成后，断网也能继续讲解。" : "Save the presentation, all project details, full-resolution images and resume before your meeting."}</p>
    <small>{zh ? "首次准备需要联网。邮件发送、GitHub 和扫码后在其他设备打开仍需要网络。" : "The initial download needs a connection. Email, GitHub and opening a QR link on another device still need internet."}</small>
    <div className="presentation-offline-status" role="status" aria-live="polite">
      {busy && <><progress value={state.completed ?? 0} max={state.total || 1} /><p>{zh ? "正在准备 " : "Preparing "}{percent}%{state.total ? " · " + (state.completed ?? 0) + " / " + state.total : ""}</p></>}
      {ready && !busy && <p>{zh ? "已准备完成 · 可以断网展示" : "Ready · available offline"}{state.bytes ? " · " + (state.bytes / 1048576).toFixed(1) + " MB" : ""}</p>}
    </div>
    {error && <p role="alert">{zh ? "准备尚未完成。请保持联网后重试，已下载的文件会继续使用。" : "Preparation is incomplete. Check your connection and retry; completed downloads will be reused."}</p>}
    {!available && <p>{zh ? "离线准备将在正式发布的网站中启用。" : "Offline preparation is available on the published website."}</p>}
    <button className="presentation-primary" disabled={busy || !available} onClick={prepare}>
      {busy ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : <Download size={18} aria-hidden="true" />}
      {busy ? (zh ? "正在准备…" : "Preparing…") : ready ? (zh ? "检查离线文件" : "Check offline files") : (zh ? "准备离线展示" : "Prepare offline")}
    </button>
  </section>;
}
