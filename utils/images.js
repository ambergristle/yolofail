// encode canvas into base64
const getImage = () => document.getElementById("canvas-id").toDataURL("png");

// <a download="filename.png" href="" onClick={downloadCavas}/>

const toBlob = async () => {
  await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
};

// name, value, fileName
const toFormData = () => {
  const formData = new FormData();
  formData.append("image", imageBlob, "fileName.png");
};
