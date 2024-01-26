import os
import shutil

def create_files(num_files, file_size):
    # Convert file size to bytes
    file_size_bytes = file_size * 1024 * 1024  # Convert MB to bytes

    # Create files
    for i in range(1, num_files + 1):
        filename = f"{i}.txt"
        with open(filename, 'wb') as file:
            file.write(os.urandom(file_size_bytes))

def download_files(destination_directory):
    # Ensure the destination directory exists
    os.makedirs(destination_directory, exist_ok=True)

    # Copy files to the destination directory
    for filename in os.listdir():
        if filename.endswith(".txt"):
            shutil.copy(filename, os.path.join(destination_directory, filename))

if __name__ == "__main__":
    num_files = 30
    file_size = 100  # in MB
    destination_directory = r"C:\Users\Sailesh G\Downloads\headout"  # Change this to your desired destination

    # Create files
    create_files(num_files, file_size)

    # Download files to the destination directory
    download_files(destination_directory)

    print(f"Files downloaded to {destination_directory}")
