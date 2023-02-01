// import AWS from "aws-sdk";
// const AWS = require("aws-sdk");

// AWS.config.update({
//   accessKeyId: "8EL21GNHMRNZYW8488OV",
//   secretAccessKey: "xBjwyBdSYz91ADgV9TH8oeTnAuZapmAJ8ycmrCiD",
//   region: "hn",
//   endpoint: "https://hn.ss.bfcplatform.vn",
//   apiVersions: {
//     s3: "2006-03-01",
//   },
// });
// const s3 = new AWS.S3();

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      loadImage: file => {
        // var uploadParams = {
        //   Bucket: "<BUCKET-NAME>",
        //   Key: file.name,
        //   Body: file,
        //   ACL: "public-read",
        //   ContentType: file.type,
        // };
        // var uploadOptions = {
        //   partSize: 10 * 1024 * 1024,
        //   queueSize: 1,
        // };
        // var upload = s3.upload(uploadParams, uploadOptions);
        // upload.send((err, data) => {
        //   if (err) {
        //     console.error("Upload lỗi:", err);
        //   } else if (data) {
        //     console.log("Upload thành công:", data);
        //   }
        // });
        // upload.on("httpUploadProgress", function (evt) {
        //   var progress = parseInt((evt.loaded * 100) / evt.total);
        //   console.log(progress + "%");
        // });
      },
    },
  };
});
