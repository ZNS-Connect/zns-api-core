class FileUtil {
    /**
     * 
     * @param {String} contentType 
     * @returns {String}
     */
    static getFileTypeFromContentType = (contentType: string): string => {
        return contentType.split('/')[1]
    }
}

export default FileUtil