import { Percent } from '../../NumericRange';

/** The darkness of the printer setting, higher being printing darker. */
export type DarknessPercent = Percent;

/** Printer options related to the label media being printed */
export interface IPrinterLabelMediaOptions {
    /** How dark to print. 0 is blank, 99 is max darkness */
    darknessPercent: DarknessPercent;
    /** Mode the printer uses to detect separate labels when printing. */
    labelGapDetectMode: LabelMediaGapDetectionMode;
    /**
     * The gap / mark length between labels. Mandatory for markSensing black line mode.
     * Media with webSensing gaps can use AutoSense to get this value.
     */
    get labelGapInches(): number;
    /** Label gap in dots */
    labelGapDots: number;
    /** The height of the label media, in inches. */
    get labelHeightInches(): number;
    /** The height of the label media, in dots. */
    labelHeightDots: number;
    /** The width of the label media, in inches. */
    get labelWidthInches(): number;
    /** The width of the label media, in dots. */
    labelWidthDots: number;

    /** The offset of the printable area, from the top-left corner. */
    labelPrintOriginOffsetDots: Coordinate;

    /** Label print speed settings */
    speed: PrintSpeedSettings;

    /** The label media thermal print mode. */
    thermalPrintMode: ThermalPrintMode;

    /** The behavior of media after form printing. */
    mediaPrintMode: MediaPrintMode;

    /** Whether the label prints right-side-up or upside-down. */
    printOrientation: PrintOrientation;
}

/** Coordinates on a 2D plane. */
export interface Coordinate {
    /** Offset from the left side of the plane, incrementing to the right. --> */
    left: number;
    /** Offset from the top side of the plane, incrementing down. */
    top: number;
}

/** The orientation of a label as it comes out of the printer. */
export enum PrintOrientation {
    /** Right-side up when the printer faces the user. */
    normal,
    /** Upside-down when the printer faces the user. */
    inverted
}

/** Configured print speeds for a printer. */
export class PrintSpeedSettings {
    constructor(printSpeed: PrintSpeed, slewSpeed?: PrintSpeed) {
        this.printSpeed = printSpeed;
        this.slewSpeed = slewSpeed ?? printSpeed;
    }
    /** Speed during printing media. */
    printSpeed: PrintSpeed;
    /** Speed during feeding a blank label. ZPL only, same as media speed for EPL. */
    slewSpeed: PrintSpeed;
}

/** Printer speed values in inches per second (IPS). */
export enum PrintSpeed {
    /** Mobile printers can't be configured otherwise. */
    auto = 0,
    /** The lowest speed a given printer supports. */
    ipsPrinterMin,
    ips1,
    /** EPL-only. Not often supported */
    ips1_5, // eslint-disable-line
    ips2,
    /** EPL-only. Not often supported */
    ips2_5, // eslint-disable-line
    ips3,
    /** EPL-only. Not often supported */
    ips3_5, // eslint-disable-line
    ips4,
    ips5,
    ips6,
    ips7,
    ips8,
    ips9,
    ips10,
    ips11,
    ips12,
    /** Not often supported */
    ips13,
    /** Not often supported */
    ips14,
    /** The highest speed a given printer supports. */
    ipsPrinterMax
}

/** The thermal media print mode */
export enum ThermalPrintMode {
    /** Direct thermal with no ribbon. Printer must support this mode. */
    direct,
    /** Thermal transfer, using a ribbon. Printer must support this mode. */
    transfer
}

/** Describes the way the labels are marked for the printer to detect separate labels. */
export enum LabelMediaGapDetectionMode {
    /** Media is one continous label with no gaps. Used with cutters usually. */
    continuous,
    /** Media is opaque with gaps betwen labels that can be sensed by the printer. */
    webSensing,
    /** Media has black marks indicating label spacing. */
    markSensing,
    /** Autodetect during calibration. G-series printers only. */
    autoDuringCalibration,
    /** KR403 printer only. */
    continuousVariableLength
}

/** Printing behavior  */
export enum MediaPrintMode {
    /** Label advances so web is over tear bar, to be torn manually. */
    tearoff,
    /** Label advances over Label Taken sensor. Printing pauses until label is removed. */
    peel,
    /** Peel mode, but each label is fed to prepeel a small portion. Helps some media types. ZPL only.*/
    peelWithPrepeel,
    /** Peel mode, but printer waits for button tap between labels. */
    peelWithButtonTap,
    /** Label advances until web is over cutter. */
    cutter,
    /** Cutter, but cut operation waits for separate command. ZPL only. */
    cutterWaitForCommand,
    /** Label and liner are rewound on an external device. No backfeed motion. ZPL only. */
    rewind,
    /** Label advances far enough for applicator device to grab. Printers with applicator ports only. */
    applicator,
    /** Removes backfeed between RFID labels, improving throughput. RFID printers only. */
    rfid,
    /** Label is moved into a presentation position. ZPL only.*/
    kiosk
}