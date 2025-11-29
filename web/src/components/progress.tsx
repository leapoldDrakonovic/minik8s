
export interface IProgress {
    // Highest number of progress num
    h: number;
    // Current number in system
    cur: number;
    // Lowwest number of progress num
    l: number;
    // Progress name. Exmpl: Gi, cores, etc.
    title?: string;
}


/**
 * IProgress interface defines the shape of progress data.
 * - h: Highest value of the range (inclusive).
 * - cur: Current value in the progress bar.
 * - l: Lowest value of the range (inclusive).
 * - title: (Optional) Label shown for this progress (e.g., Gi, cores).
 */
export interface IProgress {
    h: number;
    cur: number;
    l: number;
    title?: string;
}

/**
 * Props for the Progress component.
 * - data: Progress data following the IProgress interface.
 * - color: (Optional) Tailwind CSS class or color for the progress bar foreground.
 */
interface IProgressProps {
    data: IProgress;
    color?: string;
}

/**
 * TProgressComponent defines the Progress React functional component signature.
 */
type TProgressComponent = React.FC<IProgressProps>;

export const Progress: TProgressComponent = ({ data, color }) => {
    const { h, cur, l, title } = data;

    // Prevent division by zero and clamp cur between l and h
    const safeH = h === l ? l + 1 : h;
    const clampedCur = Math.max(l, Math.min(cur, safeH));
    const percent = ((clampedCur - l) / (safeH - l)) * 100;

    // Default color if not specified
    const progressColor = color || "bg-primary";

    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-1 text-xs">
                {/* <span className="font-medium">{title ?? ""}</span> */}
                <span>
                    {clampedCur} / {safeH}{" "}{title ?? ""}
                </span>
                <span>{clampedCur / safeH * 100}{"%"}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 relative">
                <div
                    className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
                    style={{
                        width: `${percent}%`
                    }}
                ></div>
            </div>
        </div>
    );
};