"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./MoreModal.module.scss";
import { ChannelData } from "@/types/channel";
import ModalHeader from "./ModalHeader";
import ModalContents from "./ModalContents";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ChannelData | null;
}

const MoreModal = ({ isOpen, onClose, data }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // 배경 클릭으로 닫기
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <ModalHeader onClose={onClose} data={data} />
        <ModalContents data={data} />
      </div>
    </div>,
    document.body
  );
};

export default MoreModal;
