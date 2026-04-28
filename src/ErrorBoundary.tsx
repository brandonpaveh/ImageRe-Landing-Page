import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message };
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error(err, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-100 text-brand-dracula p-8 font-sans">
          <h1 className="text-xl font-black uppercase tracking-tight mb-4">Something went wrong</h1>
          <p className="text-sm font-bold text-stone-600 mb-4">
            The app hit a runtime error. Open the browser console for details, or refresh the page.
          </p>
          {this.state.message && (
            <pre className="text-xs font-mono bg-white p-4 rounded-xl border border-stone-200 overflow-auto max-w-2xl">
              {this.state.message}
            </pre>
          )}
          <p className="mt-6 text-xs font-bold text-stone-500">
            If you deployed to a subpath, configure the Vite <code className="bg-stone-200 px-1 rounded">base</code>{' '}
            option and rebuild so JavaScript and CSS paths resolve.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
