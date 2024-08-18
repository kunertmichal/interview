import { SubmissionResult } from '@conform-to/react';

export function sendFormResult(
  status: 'success' | 'error',
  errors: Array<string> = []
): SubmissionResult<string[]> {
  return {
    status: status,
    error: {
      form: errors,
    },
  };
}
