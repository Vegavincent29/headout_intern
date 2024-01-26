# headout_inter
Certainly, here's a point-wise README for your project:

1. **Project Overview:**

   This project is a simple HTTP server designed to respond to GET requests on the `/data` endpoint. It supports two query parameters, `n` for the file name and `m` for the line number, providing flexibility in retrieving file content.

2. **Implementation Details:**

   - Implemented using [Choose your language/framework], e.g., Node.js with Express.
   - The server reads files from the `/tmp/data/` directory, such as `1.txt`, `2.txt`, ..., `30.txt`.

3. **Dockerization:**

   - The application is containerized using Docker.
   - Dockerfile is available in the root project directory.

4. **Build and Run Instructions:**

   - Build the Docker image:

     ```bash
     docker build -t your-image-name .
     ```

   - Run the Docker container:

     ```bash
     docker run -p 8080:8080 --memory=1500m --cpus=2 your-image-name
     ```

5. **Accessing the Server:**

   Assuming the server is running locally:

   - To get the entire content of a file:

     ```bash
     curl http://localhost:8080/data?n=1
     ```

   - To get a specific line from a file:

     ```bash
     curl http://localhost:8080/data?n=1&m=5
     ```

   Replace `1` with the desired file number and adjust the command accordingly.

Feel free to give feedback, Thank you
