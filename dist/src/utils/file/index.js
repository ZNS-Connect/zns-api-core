"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileUtil {
}
/**
 *
 * @param {String} contentType
 * @returns {String}
 */
FileUtil.getFileTypeFromContentType = (contentType) => {
    return contentType.split('/')[1];
};
exports.default = FileUtil;
