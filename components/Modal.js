import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { CameraIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

import { modalState } from "../atoms/modal-atom";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

const Modal = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const filePickerRef = useRef();
  const captionRef = useRef();

  const handleFile = (event) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const handlePost = async () => {
    setIsLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user?.username,
      caption: captionRef.current.value,
      profileImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    console.log(docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setIsLoading(false);
    setIsOpen(false);
    setSelectedFile(null);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
            setSelectedFile(null);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {selectedFile ? (
                    <img
                      className="w-full h-[400px] object-contain cursor-pointer"
                      src={selectedFile}
                      alt=""
                      onClick={() => setSelectedFile(null)}
                    />
                  ) : (
                    <div className="flex justify-center ">
                      <CameraIcon
                        onClick={() => filePickerRef.current.click()}
                        className="h-12 w-12 p-2 text-blue-500 bg-blue-100 border border-gray-200 rounded-full cursor-pointer"
                      />
                    </div>
                  )}

                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center my-5 font-medium leading-6 text-gray-900"
                  >
                    Upload a photo
                  </Dialog.Title>

                  <div className="mt-2 text-center">
                    <input
                      ref={filePickerRef}
                      type="file"
                      onChange={handleFile}
                      hidden
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      ref={captionRef}
                      className="border-gray-200 rounded-md focus:ring-0 w-full "
                      type="text"
                      placeholder="Please enter a caption"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      disabled={!selectedFile}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent shadow-sm bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handlePost}
                    >
                      {isLoading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
