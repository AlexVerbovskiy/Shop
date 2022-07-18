export const getRndStr =() => (Math.random() + 1).toString(36).substring(2);

export const readImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => {
        const buffer = reader.result;
        callback(buffer.toString());
    }
    reader.readAsDataURL(file);
}