import { BasePlugin, PluginOptions, Uppy } from '@uppy/core';
export interface UppyServerActionUploadOptions<T> extends PluginOptions {
    action: (files: FormData) => Promise<T>;
    formDataName?: string;
}
export default class UppyServerActionUpload<T> extends BasePlugin {
    private readonly action;
    private readonly formDataName;
    constructor(uppy: Uppy, opts?: UppyServerActionUploadOptions<T>);
    handleUpload(fileIDs: string[]): Promise<void>;
    install(): void;
    uninstall(): void;
}
