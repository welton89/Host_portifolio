// Converte de YYYY-MM-DD para DD/MM/YYYY (para exibição)
export const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const trimmed = dateStr.trim();
    if (trimmed.includes('-')) {
        const [year, month, day] = trimmed.split('-');
        return `${day}/${month}/${year}`;
    }
    return trimmed;
};

// Converte qualquer formato para YYYY-MM-DD (para o input type="date")
export const parseToISODate = (dateStr) => {
    if (!dateStr) return '';
    const trimmed = dateStr.trim();
    if (trimmed.includes('-')) return trimmed;
    if (trimmed.includes('/')) {
        const [day, month, year] = trimmed.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return '';
};

// Converte string de data para timestamp numérico
export const parseToTimestamp = (dateStr) => {
    if (!dateStr) return 0;
    const trimmed = dateStr.trim();
    let year, month, day;

    if (trimmed.includes('-')) {
        [year, month, day] = trimmed.split('-').map(Number);
    } else if (trimmed.includes('/')) {
        [day, month, year] = trimmed.split('/').map(Number);
    } else {
        return 0;
    }

    if (year && month && day) {
        // Usamos meio-dia para evitar problemas de fuso horário na ordenação por dia
        return new Date(year, month - 1, day, 12, 0, 0).getTime();
    }
    return 0;
};
