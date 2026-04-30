// eslint-disable-next-line @typescript-eslint/naming-convention
export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
  DRAFT = 'DRAFT',
  BLOCKED = 'BLOCKED',
  UNKNOWN = 'UNKNOWN',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum MEETING_STATUS {
  PENDING = 'PENDING',
  RECORDING = 'RECORDING',
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum TRANSCRIPTION_STATUS {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
