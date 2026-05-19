import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cyber-darker flex items-center justify-center">
          <div className="text-center px-4 max-w-lg">
            <h1
              className="font-display text-4xl md:text-5xl font-black text-cyber-magenta mb-4"
              style={{ textShadow: '0 0 20px #ff00ff, 0 0 60px #ff00ff66' }}
            >
              FATAL_ERROR
            </h1>
            <p className="font-mono text-sm text-gray-400 mb-8">
              A critical system failure has occurred. The neural interface has been interrupted.
            </p>
            <div className="border border-cyber-magenta/30 bg-cyber-surface/50 p-4 mb-8 text-left">
              <p className="font-mono text-xs text-cyber-magenta mb-1">ERR_CODE: 0x{Math.abs(this.state.error?.message?.length || 0).toString(16).toUpperCase()}</p>
              <p className="font-mono text-xs text-gray-500 break-all">
                {this.state.error?.message || 'Unknown exception'}
              </p>
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
              className="font-mono text-sm text-cyber-cyan border border-cyber-cyan/50 px-6 py-3
                         hover:bg-cyber-cyan/10 transition-colors cursor-pointer"
              style={{ boxShadow: '0 0 15px rgba(0,255,255,0.2)' }}
            >
              REBOOT_SYSTEM
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
