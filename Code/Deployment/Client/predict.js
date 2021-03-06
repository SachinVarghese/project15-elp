const tf = require("@tensorflow/tfjs-node");
const dataset = require("./test_dataset.json");
const path = require("path");
const modelPath = path.join(__dirname, "/model/gunshot-detection/model.json");

X = dataset["mfcc"];
Y = dataset["labels"];

const predictFunction = async function (key) {
  let num = Math.floor(key * X.length);

  const model = await tf.loadGraphModel("file:///" + modelPath);

  x = tf.tensor(X[num]);
  x = x.reshape([-1, 10, 13]);

  z = await model.predict(x);
  y = await z.array();
  y = y[0][0];
  // console.log(num, y, Y[num]);

  return {
    gunshot_reality: Y[num],
    gunshot_probability: y,
    gunshot_alert: y > 0.5,
  };
};

module.exports = predictFunction;
