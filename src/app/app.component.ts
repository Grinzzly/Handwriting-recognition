import {Component, ViewChild, OnInit} from '@angular/core';
import {DrawableDirective} from './drawable.directive';

import {Tensor} from '@tensorflow/tfjs-core';

import {
    LayersModel,
    Sequential,
    sequential,
    layers,
    tensor1d ,
    tensor2d,
    loadLayersModel,
    tidy,
    browser,
    cast
} from '@tensorflow/tfjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public prediction: number;
    public predictions: number[];

    private model: LayersModel;
    private linearModel: Sequential;

    @ViewChild(DrawableDirective)
    public canvas: DrawableDirective;

    public ngOnInit(): void {
        this.trainNewModel();
        this.loadModel();
    }

    public linearPrediction(strValue: string): void {
        const numericValue = parseInt(strValue, 10);
        const output = this.linearModel.predict(tensor2d([numericValue], [1, 1])) as Tensor;

        this.prediction = Array.from(output.dataSync())[0];
    }

    public async predict(imageData: ImageData): Promise<any> {
        await tidy(() => {
            // Convert the canvas pixels to
            let img = browser.fromPixels(imageData, 1);

            img = img.reshape([1, 28, 28, 1]);
            img = cast(img, 'float32');

            // Make and format the predications
            const output = this.model.predict(img) as Tensor;

            // Save predictions on the component
            this.predictions = Array.from(output.dataSync());
        });
    }

    // -- TRAIN MODEL FROM SCRATCH -- //
    private async trainNewModel(): Promise<any> {
        // Define a model for linear regression.
        this.linearModel = sequential();
        this.linearModel.add(layers.dense({units: 1, inputShape: [1]}));

        // Prepare the model for training: Specify the loss and the optimizer.
        this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

        // Training data, completely random
        const xs = tensor1d([3.2, 4.4, 5.5, 6.71, 6.98, 7.168, 9.779, 6.182, 7.59, 2.16, 7.042, 10.71, 5.313, 7.97, 5.654, 9.7, 3.11]);
        const ys = tensor1d([1.6, 2.7, 2.9, 3.19, 1.684, 2.53, 3.366, 2.596, 2.53, 1.22, 2.87, 3.45, 1.65, 2.904, 2.42, 2.4, 1.31]);

        // Train
        await this.linearModel.fit(xs, ys);

        console.log('Model trained!');
    }

    // -- LOAD PRETRAINED KERAS MODEL -- //
    private async loadModel(): Promise<any> {
        this.model = await loadLayersModel('/assets/model.json');
        console.log('Model loaded!');
    }
}

