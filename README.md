Jamal's Dolls
1. Install TensorFlow docker image (CPU version)
  ```bash
  docker run -it gcr.io/tensorflow/tensorflow
  ```

2. Link all of the categories folders from images folder
  ```bash
  docker run -it -v $HOME/git/image_auto_tagging/tf_files:/tf_files/  gcr.io/tensorflow/tensorflow:latest-devel
  ```

3. Run inside docker for training the model
  ```bash
  cd /tensorflow
  ```
  ```bash
  python tensorflow/examples/image_retraining/retrain.py \
  --bottleneck_dir=/tf_files/bottlenecks \
  --how_many_training_steps 500 \
  --model_dir=/tf_files/inception \
  --output_graph=/tf_files/retrained_graph.pb \
  --output_labels=/tf_files/retrained_labels.txt \
  --image_dir /tf_files/
  ```
