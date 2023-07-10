export interface AttachmentModel {
  id: number,
  name: string,
  price: number,
  attachmentTypeId: number,
  hydraulicFlowsIds: number[],
  machineTypesIds: number[],
  weightCategoriesIds: number[],
  materialLengthsIds: number[],
  recommended?: boolean
}
