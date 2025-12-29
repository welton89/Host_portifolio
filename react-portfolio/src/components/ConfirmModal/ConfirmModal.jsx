import React from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <i className="fas fa-exclamation-triangle"></i>
                    <h3>{title || 'Confirmar Exclusão'}</h3>
                </div>
                <div className={styles.body}>
                    <p>{message || 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.'}</p>
                </div>
                <div className={styles.footer}>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
