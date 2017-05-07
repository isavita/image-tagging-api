import requests
import tensorflow as tf, sys

image_url = sys.argv[1]

# Downloading an image from url
response = requests.get(image_url)
if not response.ok:
  print response
else:
  image = response.content
  image_path = '/tf_files/image_temp.jpg'
  with open(image_path, 'wb') as handler:
    handler.write(image)

# Read the image with tensorflow
image_data = tf.gfile.FastGFile(image_path, 'rb').read()

# Read label file, strips off carriage return
label_lines = [line.rstrip() for line in tf.gfile.GFile("/tf_files/retrained_labels.txt")]

# Unpresists graph from file
with tf.gfile.FastGFile("/tf_files/retrained_graph.pb", 'rb') as f:
  graph_def = tf.GraphDef()
  graph_def.ParseFromString(f.read())
  _ = tf.import_graph_def(graph_def, name='')

with tf.Session() as sess:
  # Feed the image_data as input to the graph
  softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
  predictions = sess.run(softmax_tensor, {'DecodeJpeg/contents:0': image_data})

  top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]

  for node_id in top_k:
    human_label = label_lines[node_id]
    score = predictions[0][node_id]
    print('%s (score = %.5f)' % (human_label, score))
