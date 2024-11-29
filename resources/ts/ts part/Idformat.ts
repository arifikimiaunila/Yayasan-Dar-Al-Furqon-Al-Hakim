type idformat={
    document: Document | null;
    formatname: string,
    formatfunction: any
}

export function Idformat({ document, formatname, formatfunction }: idformat) { // Initialize document variable
    return document?.getElementById(formatname)?.addEventListener('click', () => {
        if (document) {
            formatfunction?.();
        }
    });
}

