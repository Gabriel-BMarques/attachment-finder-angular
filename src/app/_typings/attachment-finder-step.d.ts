export interface AttachmentFinderStep {
  id: string,
  dataUrl: string,
  stepTitle: (inputs: any[]) => string;
  stepQuestion: (data?: string) => string | null;
}
