export type LabelDto = {
    title: string;
    youtubeURL: string;
    labelDocument?: File | string;
};

export interface Label {
    label_id: number;
    users_id: number;
    title: string;
    youtubeURL: string;
    labelDocument: string;
    Status: number; // 0: Pending, 1: Approved, 2: Rejected, 3: Draft, 4: Approved
    created_at: string;
    updated_at: string;
}