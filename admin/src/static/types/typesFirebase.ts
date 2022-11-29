export type TFile = Blob | Uint8Array | ArrayBuffer

export interface IUpload {
    file: TFile;
    label: string;
    path: string;
}
