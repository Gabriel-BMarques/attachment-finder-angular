import { AttachmentFinderStep } from "src/app/_typings/attachment-finder-step";

export const attachmentFinderSteps: AttachmentFinderStep[] = [
  {
    id: 'machineType',
    dataUrl: '../../../assets/database/machyne-types.json',
    stepTitle: (inputs: any[]) => `Attachment Finder - Step ${inputs[0]}`,
    stepQuestion: (data?: string) => `What type of machine the attachment will be installed on?`
  },
  {
    id: 'weigthCategory',
    dataUrl: '../../../assets/database/weight-category.json',
    stepTitle: (inputs: any[]) => `Attachment Finder - Step ${inputs[0]}`,
    stepQuestion: (data?: string) => `What is the weight category of the ${data}?`
  },
  {
    id: 'hydraulicFlow',
    dataUrl: '../../../assets/database/hydraulic-flow.json',
    stepTitle: (inputs: any[]) => `Attachment Finder - Step ${inputs[0]}`,
    stepQuestion: (data?: string) => `What is the hydraulic flow of your ${data} in GPM (Gallons per minute)?`
  },
  {
    id: 'materialLength',
    dataUrl: '../../../assets/database/materialLength.json',
    stepTitle: (inputs: any[]) => `Attachment Finder - Step ${inputs[0]}`,
    stepQuestion: (data?: string) => 'What is the material length that your machine will work with?'
  },
  {
    id: 'result',
    dataUrl: '../../../assets/database/attachments-models.json',
    stepTitle: (inputs: any[]) => `${inputs[0]} ${inputs[1]} match your equipment`,
    stepQuestion: (data?: string) => null
  }
];
