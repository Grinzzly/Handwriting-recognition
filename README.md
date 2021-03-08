# Handwriting-recognition

Handwritten digit recognizer from scratch with Tensorflow.js

## Development usage

```
npm i
ng serve
```
go to `localhost:2077`

## Change Keras Model

In order to use keras models you need to have [Tensorflow.js converter](https://www.npmjs.com/package/@tensorflow/tfjs-converter) and [pip](https://pip.pypa.io/en/stable/installing/) installed

```
tensorflowjs_converter --input_format keras keras/[model_name].h5 src/assets
```
