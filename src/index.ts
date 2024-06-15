import {BasePlugin, PluginOptions, Uppy} from '@uppy/core';

export interface UppyServerActionUploadOptions<T> extends PluginOptions {
    action: (files: FormData) => Promise<T>;
    formDataName?: string;
}

export default class UppyServerActionUpload<T> extends BasePlugin {
    private readonly action: (files: FormData) => Promise<T>;
    private readonly formDataName: string;

    constructor(uppy: Uppy, opts?: UppyServerActionUploadOptions<T>) {
        super(uppy, opts);
        this.id = opts?.id || 'UppyServerActionUpload';
        this.type = 'uploader';

        if(opts === undefined) {
            throw new Error('UppyServerActionUpload requires an action function to be passed in the options');
        }

        this.action = opts.action;
        this.formDataName = opts.formDataName || 'files';

        this.handleUpload = this.handleUpload.bind(this);
    }

    async handleUpload(fileIDs: string[]) {
        const {uppy} = this;
        const files = fileIDs.map(fileID => uppy.getFile(fileID));

        const formData = new FormData();

        files.forEach((file) => {
            formData.append(this.formDataName, file.data);
        });

        this.uppy.emit('upload-started', files)
        await this.action(formData);
        this.uppy.emit('upload-success', files);

        return Promise.resolve(); // Resolve the promise to indicate the upload is complete
    }

    install() {
        this.uppy.addUploader(this.handleUpload);
    }

    uninstall() {
        this.uppy.removeUploader(this.handleUpload);
    }
}
