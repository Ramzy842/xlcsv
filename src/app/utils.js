function getTotalSize(uploadedFiles) {
    let sizes = uploadedFiles.map((file) => Number(file.size));
    const result = sizes.reduce((prev, next) => prev + next);
    return result;
}

function convertBytes(value) {
    const units = {
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
    };

    if (value === 0) return "0 Bytes";
    const bytes = value;
    const i = Math.floor(Math.log(bytes) / Math.log(units.KB));
    const formattedValue = (bytes / Math.pow(units.KB, i)).toFixed(1);

    const unit =
        i >= units.GB / units.KB ? "GB" : ["Bytes", "KB", "MB", "GB"][i];
    return formattedValue + " " + unit;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export { getTotalSize, convertBytes, delay };
