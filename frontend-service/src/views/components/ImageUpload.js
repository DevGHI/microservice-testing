import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./ImageUpload.module.css";
export default function LivecreateDropzone2({
  setTeam2_logo,
  orlogo,
  title,
  height,
  width,
  defaultImg,
}) {
  const [banner, setBanner] = useState();
  const [showimg, setShowImg] = useState(defaultImg);
  const [btnloading, setBtnloading] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    if (
      acceptedFiles.type === "image/jpg" ||
      acceptedFiles === "image/jpeg" ||
      acceptedFiles === "image/png"
    ) {
      setTeam2_logo(acceptedFiles[0]);
      setShowImg(URL.createObjectURL(acceptedFiles[0]));
    } else {
      alert("This is only accept images! Thanks");
      return;
    }
  }, []);
  console.log("khtsbanner", banner);
  useEffect(() => {
    setShowImg(defaultImg);
    console.log("khtsorlogojfwijfwiofjwioe", defaultImg);
  }, [defaultImg]);

  console.log("khtsshowimg", showimg);
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: width,
    justifyContent: "center",
    height: height,
    // padding: "120px",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#525f7f",
    borderStyle: "dashed",
    backgroundColor: "transparent",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop,
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  //   const uploadHanlder = async () => {
  //     setBtnloading(true);
  //     console.log("click");
  //     const formData = new FormData();
  //     formData.append("banner_image", banner);
  //     console.log(formData);
  //     try {
  //       const response = await axios.request(
  //         PostForm(`api/xzonebet-affiliates/content`, formData)
  //       );
  //       console.log(response);
  //       if (response.data.status === "success") {
  //         NotificationManager.success(response.data.message);
  //         setBtnloading(false);
  //         // toast.success(response.data.message);
  //         console.log(response.data.message);
  //         // setRender(!render);
  //         return;
  //       }
  //       if (response.data.status === "error") {
  //         NotificationManager.error(response.data.message);
  //         // toast.error(response.data.message);
  //         console.log(response.data.message);
  //         setBtnloading(false);
  //         return;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setBtnloading(false);
  //       NotificationManager.error(error.data.message);
  //       // toast.error(error.response.data.message)
  //     }
  //   };

  return (
    <>
      <div {...getRootProps({ style })}>
        <input accept="image/png, image/gif, image/jpeg" {...getInputProps()} />
        {showimg === null ? (
          <>
            <p className={classes["title"]}>{title}</p>
            {/* <img className={classes["banner"]} src={orlogo} alt="" /> */}
          </>
        ) : (
          <img
            className={classes["banner"]}
            style={{
              width: width === "200px" ? "190px" : "90px",
              height: height === "150px" ? "140px" : "100px",
            }}
            src={showimg}
            alt=""
          />
        )}
        {/* <img className={classes["banner"]} src={showimg} alt="" /> */}
      </div>
    </>
  );
}
