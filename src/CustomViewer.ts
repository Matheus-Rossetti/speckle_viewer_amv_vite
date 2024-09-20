import { Extension, Viewer } from '@speckle/viewer';

export class CustomViewer extends Viewer {
    protected _resolutionScale = 1;

    public set resolutionScale(value: number) {
        this._resolutionScale = value;
        this.resize();
    }

    /** We're overwritting the `resize` function */
    public resize() {
        /** Derive the scaled width and height and apply them*/
        const width = this.container.offsetWidth * this._resolutionScale;
        const height = this.container.offsetHeight * this._resolutionScale;
        this.speckleRenderer.resize(width, height);
        Object.values(this.extensions).forEach((value: Extension) => {
            value.onResize();
        });

        /** Keep the canvas style size to the original, so it gets automatically
         *  upscaled or downscaled. It might also apply filtering when up/down scaling
         */
        this.speckleRenderer.renderer.domElement.style.width = `${this.container.offsetWidth}px`;
        this.speckleRenderer.renderer.domElement.style.height = `${this.container.offsetHeight}px`;
    }
}
