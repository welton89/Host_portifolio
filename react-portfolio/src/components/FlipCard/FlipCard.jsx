import { useState } from 'react'
import styles from './FlipCard.module.css'

function FlipCard({
    frontImage,
    frontImageAlt,
    frontTitle,
    frontDescription,
    backTitle,
    backDescription,
    githubLink
}) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div className={styles.flipCard} onClick={handleFlip}>
            <div className={`${styles.flipCardInner} ${isFlipped ? styles.flipped : ''}`}>
                <div className={styles.flipCardFront}>
                    <div className={styles.rotateHint}>
                        <i className="fas fa-sync-alt"></i>
                    </div>
                    <img src={frontImage} alt={frontImageAlt} />
                    <div className={styles.frontContent}>
                        <h3>{frontTitle}</h3>
                        <p dangerouslySetInnerHTML={{ __html: frontDescription }}></p>
                    </div>
                </div>
                <div className={styles.flipCardBack}>
                    <h3>{backTitle}</h3>
                    <p dangerouslySetInnerHTML={{ __html: backDescription }}></p>
                    {githubLink && (
                        <a
                            href={githubLink}
                            className={styles.linkGitHub}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <i className="fab fa-github"></i> Ver no GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FlipCard
