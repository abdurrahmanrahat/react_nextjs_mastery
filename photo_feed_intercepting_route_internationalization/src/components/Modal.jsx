"use client";

import XMarkImage from "@/asserts/icons/xmark.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const modalRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    if (!modalRef.current?.open) {
      modalRef.current.showModal();
    }
  }, []);

  function onHide() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={modalRef}
      onClose={onHide}
      className="shadow-teal-700 shadow-md border border-teal-600 flex flex-col p-2 rounded-md dark:bg-black dark:bg-opacity-95 dark:text-gray-100"
    >
      <span onClick={onHide} className="flex justify-end cursor-pointer">
        <Image src={XMarkImage} alt="close" width={30} height={30} />
      </span>

      {children}
    </dialog>,
    document.getElementById("modal-root-content")
  );
};
// createPortal takes two argument, first one is the ui and the second one is where it will initialize. Here, we just give an element id where it will show.

export default Modal;
