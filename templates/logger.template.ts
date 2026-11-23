/**
 * ==============================================================================
 * Diagnostic & System Logger — Day 1 Template for AI-Driven Development
 * ==============================================================================
 * Features:
 * 1. In-Memory Ring Buffer: stores up to MAX_LOGS entries in RAM without disk bloat.
 * 2. Sensitive Data Redaction: auto-masks API keys, bearer tokens, passwords.
 * 3. Global Unhandled Errors: captures window.onerror and unhandledrejection.
 * 4. AI-Ready Markdown Report: generates ready-to-paste diagnostics for AI agents.
 */

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
export type LogCategory = 'APP' | 'UI' | 'DB' | 'AI' | 'NETWORK' | 'AUTH';

export interface LogEntry {
  id: string;
  timestamp: string; // ISO string
  level: LogLevel;
  category: LogCategory;
  message: string;
  details?: unknown;
}

class DiagnosticLogger {
  private static instance: DiagnosticLogger;
  private readonly maxLogs = 500;
  private logs: LogEntry[] = [];
  private listeners: Array<(entry: LogEntry) => void> = [];

  private constructor() {
    this.initGlobalHandlers();
  }

  public static getInstance(): DiagnosticLogger {
    if (!DiagnosticLogger.instance) {
      DiagnosticLogger.instance = new DiagnosticLogger();
    }
    return DiagnosticLogger.instance;
  }

  private initGlobalHandlers(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.error('APP', `Unhandled window error: ${event.message}`, {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error?.stack || event.error,
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        const reason = event.reason;
        this.error('APP', `Unhandled Promise rejection: ${reason?.message || reason}`, {
          stack: reason?.stack,
        });
      });
    }
  }

  /**
   * Redacts sensitive secrets, API keys, and bearer tokens from logs.
   */
  private sanitize(data: unknown): unknown {
    if (!data) return data;
    if (typeof data === 'string') {
      return data
        .replace(/(Bearer\s+)[A-Za-z0-9._~+/-]+=*/gi, '$1[REDACTED_TOKEN]')
        .replace(/(sk-[A-Za-z0-9_-]{20,})/gi, '[REDACTED_API_KEY]')
        .replace(/(password|secret|token|apiKey)\s*[:=]\s*["']?[^"'\s,]+["']?/gi, '$1=[REDACTED]');
    }
    if (typeof data === 'object') {
      try {
        const str = JSON.stringify(data);
        return JSON.parse(this.sanitize(str) as string);
      } catch {
        return '[Unserializable Object]';
      }
    }
    return data;
  }

  private addEntry(level: LogLevel, category: LogCategory, message: string, details?: unknown): void {
    const entry: LogEntry = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      level,
      category,
      message: String(this.sanitize(message)),
      details: this.sanitize(details),
    };

    if (this.logs.length >= this.maxLogs) {
      this.logs.shift(); // Ring buffer behavior: drop oldest
    }
    this.logs.push(entry);

    // Mirror to standard browser console in dev mode
    const prefix = `[${entry.timestamp.substring(11, 19)}] [${entry.level}] [${entry.category}]`;
    if (level === 'ERROR') {
      console.error(prefix, entry.message, entry.details ?? '');
    } else if (level === 'WARN') {
      console.warn(prefix, entry.message, entry.details ?? '');
    } else {
      console.log(prefix, entry.message, entry.details ?? '');
    }

    // Notify UI subscribers
    this.listeners.forEach((listener) => {
      try {
        listener(entry);
      } catch (err) {
        console.error('Failed to notify logger listener', err);
      }
    });
  }

  public debug(category: LogCategory, message: string, details?: unknown): void {
    this.addEntry('DEBUG', category, message, details);
  }

  public info(category: LogCategory, message: string, details?: unknown): void {
    this.addEntry('INFO', category, message, details);
  }

  public warn(category: LogCategory, message: string, details?: unknown): void {
    this.addEntry('WARN', category, message, details);
  }

  public error(category: LogCategory, message: string, details?: unknown): void {
    this.addEntry('ERROR', category, message, details);
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public clear(): void {
    this.logs = [];
  }

  public subscribe(listener: (entry: LogEntry) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Generates a 1-click Markdown Diagnostic Report for copying directly to an AI agent.
   */
  public exportMarkdownReport(): string {
    const total = this.logs.length;
    const errors = this.logs.filter((l) => l.level === 'ERROR');
    const warns = this.logs.filter((l) => l.level === 'WARN');

    let report = `# Diagnostic Report for AI Assistant\n\n`;
    report += `**Generated:** ${new Date().toISOString()}\n`;
    report += `**Summary:** Total events: ${total} | Errors: ${errors.length} | Warnings: ${warns.length}\n`;
    if (typeof navigator !== 'undefined') {
      report += `**User Agent:** ${navigator.userAgent}\n`;
    }
    report += `\n---\n\n`;

    if (errors.length > 0) {
      report += `## Critical Errors (${errors.length})\n\n`;
      errors.forEach((err) => {
        report += `- **[${err.timestamp.substring(11, 19)}] [${err.category}]**: ${err.message}\n`;
        if (err.details) {
          report += `  \`\`\`json\n  ${JSON.stringify(err.details, null, 2).replace(/\n/g, '\n  ')}\n  \`\`\`\n`;
        }
      });
      report += `\n---\n\n`;
    }

    report += `## Recent Activity Log (Last 30 Events)\n\n`;
    const recent = this.logs.slice(-30);
    recent.forEach((item) => {
      report += `- \`${item.timestamp.substring(11, 19)}\` **[${item.level}]** \`[${item.category}]\` ${item.message}\n`;
    });

    return report;
  }
}

export const logger = DiagnosticLogger.getInstance();
