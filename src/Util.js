function loadAndScale(imageURL, width, height) {
    return new Promise((resolve, reject) => {
        loadImage(imageURL, (loadedImg) => {
            loadedImg.width = width;
            loadedImg.height = height;
            resolve(loadedImg);
        });
    });
}

async function loadMultiAndScale(num, prefix, suffix) {
    let res=[]
    for (let i = 1; i<=num; i++) {
        res[i-1] = await loadImage(prefix + i + suffix);
    }
    return res;
}

export {loadAndScale, loadMultiAndScale}