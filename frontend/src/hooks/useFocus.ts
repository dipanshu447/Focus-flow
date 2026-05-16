import { useContext } from "react";
import { FocusContext } from "../context/FocusContext";

export default function useFocus() {
    const context = useContext(FocusContext);

    if(!context) throw new Error("useFocus must be used inside FocusProvider");

    return context;
}