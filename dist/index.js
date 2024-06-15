var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BasePlugin } from '@uppy/core';
export default class UppyServerActionUpload extends BasePlugin {
    constructor(uppy, opts) {
        super(uppy, opts);
        this.id = (opts === null || opts === void 0 ? void 0 : opts.id) || 'UppyServerActionUpload';
        this.type = 'uploader';
        if (opts === undefined) {
            throw new Error('UppyServerActionUpload requires an action function to be passed in the options');
        }
        this.action = opts.action;
        this.formDataName = opts.formDataName || 'files';
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleUpload(fileIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uppy } = this;
            const files = fileIDs.map(fileID => uppy.getFile(fileID));
            const formData = new FormData();
            files.forEach((file) => {
                formData.append(this.formDataName, file.data);
            });
            this.uppy.emit('upload-started', files);
            yield this.action(formData);
            this.uppy.emit('upload-success', files);
            return Promise.resolve(); // Resolve the promise to indicate the upload is complete
        });
    }
    install() {
        this.uppy.addUploader(this.handleUpload);
    }
    uninstall() {
        this.uppy.removeUploader(this.handleUpload);
    }
}
