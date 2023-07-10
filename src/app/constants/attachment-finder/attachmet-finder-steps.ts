import { AttachmentFinderStep } from "src/app/_typings/attachment-finder-step";

export const attachmentFinderSteps: AttachmentFinderStep[] = [
  {
    id: 'machineType',
    table: 'machine-types',
    stepTitle: (inputs: any[]) => `Attachment Finder - Step ${inputs[0]}`,
    stepQuestion: (data?: string) => `What type of machine the attachment will be installed on?`
  },
  {
    id: 'weigthCategory',
    table: 'weight-categories',
    stepTitle: (inputs: any[]) => `Attachment Finder - Step ${inputs[0]}`,
    stepQuestion: (data?: string) => `What is the weight category of the ${data}?`
  },
  {
    id: 'hydraulicFlow',
    table: 'hydraulic-flow',
    stepTitle: (inputs: any[]) => `Attachment Finder - Step ${inputs[0]}`,
    stepQuestion: (data?: string) => `What is the hydraulic flow of your ${data} in GPM (Gallons per minute)?`
  },
  {
    id: 'materialLength',
    table: 'material-lengths',
    stepTitle: (inputs: any[]) => `Attachment Finder - Step ${inputs[0]}`,
    stepQuestion: (data?: string) => 'What is the material length that your machine will work with?'
  },
  {
    id: 'result',
    table: 'attachments-models',
    stepTitle: (inputs: any[]) => `${inputs[0]} ${inputs[1]} match your equipment`,
    stepQuestion: (data?: string) => null
  }
];
