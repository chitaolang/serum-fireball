export const abbreviate = (text, size = 4) => {
    return text.slice(0, size) + '…' + text.slice(-size);
}