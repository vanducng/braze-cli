export type ErrorDetails = Record<string, string | number | boolean>;

export class CliError extends Error {
  readonly code: string;
  readonly retryable: boolean;
  readonly nextSteps: string[];
  readonly details?: ErrorDetails;

  constructor(
    code: string,
    message: string,
    options: {
      retryable?: boolean;
      nextSteps?: string[];
      details?: ErrorDetails;
    } = {},
  ) {
    super(message);
    this.name = "CliError";
    this.code = code;
    this.retryable = options.retryable ?? false;
    this.nextSteps = options.nextSteps ?? [];
    this.details = options.details;
  }
}

export function errorPayload(error: unknown): object {
  const safe =
    error instanceof CliError
      ? error
      : new CliError("unexpected_error", "The command failed unexpectedly.", {
          nextSteps: ["Run the command again or report the failure."],
        });

  return {
    ok: false,
    error: {
      code: safe.code,
      message: safe.message,
      retryable: safe.retryable,
      next_steps: safe.nextSteps,
      ...(safe.details ? { details: safe.details } : {}),
    },
  };
}
