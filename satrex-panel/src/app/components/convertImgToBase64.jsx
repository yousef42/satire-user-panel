const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const convertImgToBase64 = (url, setImageState, setPhotoState) => {
  const canvas = document.createElement('canvas');

  const img = new Image();
  // img.crossOrigin = "anonymous";
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    setImageState(dataUrl);
    setPhotoState(dataURLtoFile(dataUrl, 'Image.jpg'));
  };
  img.onerror = () => {
    setImageState(null);
  };
  img.src = url;
};
export default convertImgToBase64;
