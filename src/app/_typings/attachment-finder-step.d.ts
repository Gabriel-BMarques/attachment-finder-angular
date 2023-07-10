export interface AttachmentFinderStep {
  id: string,
  table: string,
  stepTitle: (inputs: any[]) => string;
  stepQuestion: (data?: string) => string | null;
}
