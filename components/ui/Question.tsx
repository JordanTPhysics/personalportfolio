"use client";

import { useState, useRef, useEffect } from "react";
import { QuestionModel } from "@/lib/QuestionModel";
import { Slider } from "./slider";
import { ImInfo } from "react-icons/im";
import Link from "next/link";
import { Button } from "./Button";

interface QuestionProps {
    question: QuestionModel;
    value: string[];
    onChange: (value: string[], extra: string) => void;
}

export default function Question({ question, value, onChange }: QuestionProps) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!tooltipOpen) return;
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
                setTooltipOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside, { passive: true });
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [tooltipOpen]);

    const showTooltip = tooltipOpen;

    return (
        <div className="border-2 border-black rounded-md bg-slate-200 shadow-md px-4 py-2 m-2">
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-h3 font-semibold flex-1 min-w-0">
                    {question.id}. {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                </h3>
                {question.tooltip && (
                    <div ref={tooltipRef} className="relative group">
                        <button
                            type="button"
                            onClick={() => setTooltipOpen((open) => !open)}
                            className="touch-manipulation p-1 -m-1 cursor-help"
                            aria-expanded={showTooltip}
                            aria-label="More information"
                        >
                            <ImInfo className="w-full h-full max-w-6 max-h-6" size={25} color={"teal"} aria-hidden />
                        </button>
                        <div
                            className={`absolute right-0 top-full z-10 mt-1 w-96 p-2 rounded-md bg-foreground text-background text-sm font-space-mono shadow-lg transition-opacity ${
                                showTooltip ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                            }`}
                        >
                            {question.tooltip}
                            <br />
                            {question.link && <div className="text-sm">Source: <Link href={question.link} data-tracker-id={`tooltip-link-${question.name.toLowerCase().replace(/ /g, "-")}`} className="text-blue-500 underline" target="_blank">{question.source}</Link></div>}
                        </div>
                    </div>
                )}
            </div>
            <div className=" mx-auto">

                {question.type === "text" && (
                    <textarea
                        value={value[0] ?? ""}
                        onChange={(e) => onChange([e.target.value], "")}
                        placeholder="Type your answer..."
                        rows={3}
                        className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 font-space-mono text-body text-foreground placeholder:text-foreground/50 focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                    />
                )}

                {question.type === "range" && (
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <span className="font-space-mono text-body">{question.options[0]}</span>
                            <Slider value={[Number(value[0])]} onValueChange={(value) => onChange([value[0].toString()], "")} min={1} max={10} />
                            <span className="font-space-mono text-body">{question.options[1]}</span>
                        </div>
                        <p className="font-space-mono text-sm">
                            Selected: {value[0] ?? question.options[0]}
                        </p>
                    </div>
                )}

                {question.type === "dropdown" && (
                    <select value={value[0] ?? ""} onChange={(e) => onChange([e.target.value], "")} className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 font-space-mono text-body text-foreground placeholder:text-foreground/50 focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue">
                        {question.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                )}

                {question.type === "radio" && (
                    <div className="grid grid-cols-2 gap-4">
                        {question.options.map((option) => (
                            <label key={option} className="flex items-center gap-2">
                                <input type="radio" value={option} checked={value[0] === option} onChange={() => onChange([option], "")} className="w-4 h-4" />
                                <span className="font-space-mono text-body">{option}</span>
                            </label>
                        ))}
                    </div>
                )}

                {question.type === "checkbox" && (
                    <div className="grid grid-cols-2 gap-4">
                        {question.options.map((option) => (
                            <label key={option} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={value.includes(option)}
                                    onChange={(e) => {
                                        const next = e.target.checked
                                            ? [...value, option]
                                            : value.filter((x) => x !== option);
                                        onChange(next, "");
                                    }}
                                    className="w-4 h-4"
                                />
                                <span className="font-space-mono text-body">{option}</span>
                            </label>
                        ))}

                        {value.includes("Other") && (
                            <textarea
                                value={question.extra ?? ""}
                                onChange={(e) => onChange(value, e.target.value)}
                                placeholder="Please specify..."
                                rows={3}
                                className="w-full col-span-2 rounded-md border border-foreground/20 bg-background px-3 py-2 font-space-mono text-body text-foreground placeholder:text-foreground/50 focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue"
                            />
                        )}
                    </div>
                )}
            </div>



        </div>
    );
}
