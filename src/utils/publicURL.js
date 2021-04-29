// convert absolute path to PUBLIC_URL
export default (assetPath) => {
    return process.env.PUBLIC_URL + assetPath;
}