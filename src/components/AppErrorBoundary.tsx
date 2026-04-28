import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio render failed", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="relative z-10 grid min-h-screen place-items-center px-5 text-center">
          <section className="paper-card max-w-xl p-8">
            <p className="section-kicker">Runtime Guard</p>
            <h1 className="mt-4 text-3xl font-semibold text-[#111827]">页面暂时没有正确加载</h1>
            <p className="mt-4 text-sm leading-7 text-[#5D6673]">
              请刷新页面重试。如果仍然异常，可以从首页重新进入项目列表。
            </p>
            <a className="primary-button mt-6" href="#/">
              返回首页
            </a>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
