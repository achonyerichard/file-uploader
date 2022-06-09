import React from "react";
import Hero from "../../components/hero";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
import Card from "../../components/cards";
import { useState } from "react";


const Home = () => {

const [fileUrl,setFileUrl] = useState("")
const [isJpeg, setIsJpeg] = useState(false)
const [isMp,setIsMp]=useState(false)


const onClear=()=>{
  console.log('hi');
  setIsJpeg(false)
  setIsMp(false)
}

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    console.log(file.type);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      setIsJpeg(true);
      console.log(isJpeg);
    }
    if(file.type ==="video/mp4"){
      setIsMp(true)
    }
    const baseCon = await baseConverter(file);
    console.log(baseCon);
    setFileUrl(baseCon);
  };

  // function to convert to base-64
  const baseConverter = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <Nav />
      <Hero />
      <Card />
      <div className="mt-8">
        <div className=" text-2xl md:text-4xl font-bold pb-10 flex justify-center text-gray-500">
          Upload A File
        </div>
        <div className="flex justify-center  mb-6">
          <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2 border border-pink-500">
            <div className="m-4">
              <label className="inline-block mb-2 text-gray-500">
                Upload File(jpg,png,svg,jpeg)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a file
                    </p>
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    onChange={(e) => {
                      uploadFile(e);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex p-2 space-x-4">
              <button
                onClick={onClear}
                className="px-4 py-2 text-white bg-red-500 rounded shadow-xl"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center ml-40 my-20 ">
          {console.log(isJpeg)}
          {isJpeg && (
            <img
              className="rotate-90"
              width="200px"
              height="50px"
              src={fileUrl}
              alt=""
            />
          )}
          {isMp && <video src={fileUrl}></video>}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
