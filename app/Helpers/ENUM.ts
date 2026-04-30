export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED',
    DELETED = 'DELETED',
    DRAFT = 'DRAFT',
    ARCHIVED = 'ARCHIVED',
    UNKNOWN = 'UNKNOWN',
}

export enum RoleStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
    BLOCKED = 'BLOCKED',
    UNKNOWN = 'UNKNOWN',
}

export enum TenantStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED',
    DRAFT = 'DRAFT',
    BLOCKED = 'BLOCKED',
}

export enum RecordingStatus {
    UPLOADED = 'UPLOADED',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
}

export enum MeetingStatus {
    SCHEDULED = 'SCHEDULED',
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
}

export enum TranscriptionStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export type AIResult = {
    summary: string
    actions: string[]
    key_points: string[]
}
