import type { MouseEvent } from "react";

export default function scrollTosection(e:MouseEvent<HTMLButtonElement>, sectionId: string): void {
    e.preventDefault();
    const element: HTMLElement | null = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
}