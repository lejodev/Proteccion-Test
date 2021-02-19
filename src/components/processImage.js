const processImages = async (files) => {
  const processImagesPromises = Array.from(files).map(async (file) => {
    const readerEvent = await fileReaderPromise(file);
    return await loadFileReader(readerEvent, file.name);
  });
  return await Promise.all(processImagesPromises);
};

const fileReaderPromise = (file) => {
  var fileReader = new FileReader();
  return new Promise((resolve, _reject) => {
    fileReader.onload = (readerEvent) => resolve(readerEvent);
    fileReader.readAsDataURL(file);
  });
};

const loadFileReader = async (readerEvent, imageName) => {
  let image = new Image();
  const redefineImagePromise = new Promise((resolve, _reject) => {
    image.onload = () => resolve(redefineImage(image, imageName));
    image.src = readerEvent.target.result;
    image.title = imageName;
  });
  return await redefineImagePromise;
};

const redefineImage = (image) => {
  const pageWidth = 796;
  const pageHeight = 1123;
  let imageWidth = image.width;
  let imageHeight = image.height;
  const isVertical = imageWidth <= imageHeight ? true : false;
  let imageFitsInPage = true;
  let ratio = 0;
  
  if (isVertical) {
    if (imageWidth > pageWidth) {
      imageFitsInPage = false;
      ratio = pageWidth / imageWidth;
      imageWidth = imageWidth * ratio;
      imageHeight = imageHeight * ratio;
    }
    if (imageHeight > pageHeight) {
      imageFitsInPage = false;
      ratio = pageHeight / imageHeight;
      imageWidth = imageWidth * ratio;
      imageHeight = imageHeight * ratio;
    }
  } else {
    // Horizontal
    if (imageWidth > pageHeight) {
      imageFitsInPage = false;
      ratio = pageHeight / imageWidth;
      imageWidth = imageWidth * ratio;
      imageHeight = imageHeight * ratio;
    }
    if (imageHeight > pageWidth) {
      imageFitsInPage = false;
      ratio = pageWidth / imageHeight;
      imageWidth = imageWidth * ratio;
      imageHeight = imageHeight * ratio;
    }
  }

  return {
    name: image.title,
    originalWidth: image.width,
    originalHeight: image.height,
    width: imageWidth.toFixed(2),
    height: imageHeight.toFixed(2),
    orientation: isVertical ? "VERTICAL" : "HORIZONTAL",
    resized: !imageFitsInPage,
  };
};

export default processImages;
