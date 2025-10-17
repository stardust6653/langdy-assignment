"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./MoreModal.module.scss";
import { MdClose } from "react-icons/md";
import { ChannelData } from "@/types/channel";

import { MdLanguage } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { MdOutlineTrendingUp } from "react-icons/md";
import { formatSubscriberCount } from "@/utils/formatSubscriberCount";
import { MdOutlineIosShare } from "react-icons/md";
import { MdOutlineFlag } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ChannelData | null;
}

const MoreModal = ({ isOpen, onClose, data }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  console.log(data);

  const description =
    data?.stats?.description.replaceAll("\n", "<br/>") ?? "설명 없음";

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
        <div className={styles.header}>
          <h2 className={styles.title}>{data?.name}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <MdClose size={28} />
          </button>
        </div>

        <div className={styles.modalContent}>
          <span className={styles.sectionTitle}>설명</span>
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className={styles.content}
          />
          <span className={styles.sectionTitle}>링크</span>
          <div className={styles.contentItem}>
            <MdLanguage size={24} className={styles.icon} />
            <div className={styles.linkDetails}>
              <p className={styles.content}>{data?.links[0].name}</p>
              <a
                className={styles.content}
                href={data?.links[0].url ?? ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data?.links[0].url}
              </a>
            </div>
          </div>

          <span className={styles.sectionTitle}>추가 정보</span>
          <div className={styles.additionalInfo}>
            <div className={styles.contentItem}>
              <IoEarthOutline size={24} className={styles.icon} />
              <div className={styles.linkDetails}>
                <p className={styles.content}>{data?.country || "정보 없음"}</p>
              </div>
            </div>
            <div className={styles.contentItem}>
              <MdErrorOutline size={24} className={styles.icon} />
              <div className={styles.content}>
                가입일: {data?.joinDate || "정보 없음"}
              </div>
            </div>
            <div className={styles.contentItem}>
              <MdOutlinePersonAddAlt size={24} className={styles.icon} />
              <div className={styles.content}>
                구독자 {formatSubscriberCount(data?.stats.subscribers ?? 0)}명
              </div>
            </div>
            <div className={styles.contentItem}>
              <MdOutlinePlayCircleOutline size={24} className={styles.icon} />
              <div className={styles.content}>
                동영상 {data?.stats.videos.toLocaleString() ?? 0}개
              </div>
            </div>
            <div className={styles.contentItem}>
              <MdOutlineTrendingUp size={24} className={styles.icon} />
              <div className={styles.content}>
                조회수 {data?.stats.views.toLocaleString() ?? 0}회
              </div>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button>
              <MdOutlineIosShare size={18} className={styles.buttonIcon} />
              <span className={styles.content}>채널 공유</span>
            </button>
            <button>
              <MdOutlineFlag size={18} className={styles.buttonIcon} />
              <span className={styles.content}>사용자 신고</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MoreModal;
