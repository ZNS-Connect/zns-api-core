"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileUtil {
}
FileUtil.getFileTypeFromContentType = (contentType) => {
    return contentType.split('/')[1];
};
exports.default = FileUtil;
