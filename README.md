# node_assignment
node.js assignment for node lateral course 

# docker image to push in gcp artifact registery

sudo docker build -t asia-south1-docker.pkg.dev/niveustraining/node-assignment/node_assignment:v1 .

# from local using gcloud
sudo gcloud docker push gcr.io/niveustraining/node_assignment