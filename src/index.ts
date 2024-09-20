import { DefaultViewerParams, SpeckleLoader, UrlHelper } from '@speckle/viewer';
import { CameraController } from '@speckle/viewer';
import { CustomViewer } from './CustomViewer';

async function main() {
    /** Get the HTML container */
    const container = document.getElementById("renderer");

    /** Configure the viewer params */
    const params = DefaultViewerParams;
    params.showStats = true;
    params.verbose = true;

    /** Create Viewer instance */
    const viewer = new CustomViewer(<HTMLElement>container, params);
    /** Initialise the viewer */
    await viewer.init();

    viewer.resolutionScale = 0.5;

    /** Add the stock camera controller extension */
    viewer.createExtension(CameraController);

    /** Create a loader for the speckle stream */
    const urls = await UrlHelper.getResourceUrls(
        "https://app.speckle.systems/projects/2bc436d9f9/models/7163711d63"
    );
    for (const url of urls) {
        const loader = new SpeckleLoader(viewer.getWorldTree(), url, "");
        /** Load the speckle data */
        await viewer.loadObject(loader, true);
    }

    viewer.getRenderer().pipelineOptions = {
        ...viewer.getRenderer().pipelineOptions,
        pipelineOutput: 2, // PipelineOutput.COLOR
    };

    viewer.getRenderer().setSunLightConfiguration({ enabled: false });
    viewer.requestRender();

}



main();