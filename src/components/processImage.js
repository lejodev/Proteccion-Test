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
    console.log("file", file);
    fileReader.readAsDataURL(file);
  });
};

const loadFileReader = async (readerEvent, imageName) => {
  let image = new Image();
  const redefineImagePromise = new Promise((resolve, _reject) => {
    image.onload = () => resolve(redefineImage(image, imageName));
    image.src = readerEvent.target.result;
  });
  return await redefineImagePromise;
};

const redefineImage = (image, imageName) => {
  const pageWidth = 796;
  const pageHeight = 1123;
  let imageWidth = image.width;
  let imageHeight = image.height;
  const isVertical = imageWidth <= imageHeight ? true : false;
  let imageFillsPage = true;

  let ratio = 0;
  if (isVertical) {
    if (imageWidth > pageWidth) {
      ratio = pageWidth / imageWidth;
      imageWidth = imageWidth * ratio;
      imageHeight = imageHeight * ratio;
      imageFillsPage = false;
    }
    if (imageHeight > pageHeight) {
      ratio = pageHeight / imageHeight;
      imageWidth = imageWidth * ratio;
      imageHeight = imageHeight * ratio;
      imageFillsPage = false;
    }
  } else {
    // Horizontal
    if (imageWidth > pageHeight) {
      ratio = pageHeight / imageWidth;
      imageWidth = imageWidth * ratio;
      imageHeight = imageHeight * ratio;
      imageFillsPage = false;
    }
    if (imageHeight > pageWidth) {
      ratio = pageWidth / imageHeight;
      imageWidth = imageWidth * ratio;
      imageHeight = imageHeight * ratio;
      imageFillsPage = false;
    }
  }

  return {
    name: imageName,
    originalWidth: image.width,
    originalHeight: image.height,
    width: imageWidth.toFixed(2),
    height: imageHeight.toFixed(2),
    orientation: isVertical ? "VERTICAL" : "HORIZONTAL",
    resized: !imageFillsPage,
  };
};

export default processImages;
