export class InputMask {
    mask: Array<RegExp> | Function;
    showMask?: boolean;
    placeholderChar?: string;
    pipe?: Function;
    guide?: boolean; // show placeholder characters or not
    keepCharPositions?: boolean; 

    // documentation: - https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme

    constructor(mask) {
        this.mask = mask;
        this.guide = false;
    }

    setPlaceholderChar(placeholderChar): InputMask {
        this.placeholderChar = placeholderChar;
        return this;
    }

    setShowMask(showMask): InputMask {
        this.showMask = showMask;
        return this;
    }

    setGuide(guide): InputMask {
        this.guide = guide;
        return this;
    }

    setPipe(pipe): InputMask {
        this.pipe = pipe;
        return this;
    }

    setKeepCharPositions(keepCharPositions): InputMask {
        this.showMask = keepCharPositions;
        return this;
    }
}