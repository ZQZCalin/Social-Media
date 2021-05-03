// convert absolute path to PUBLIC_URL
export default (assetPath) => {
    // address photo uploader
    const publicUrl = assetPath.startsWith('data:image') ? 
        '' : process.env.PUBLIC_URL
    return publicUrl + assetPath;
}