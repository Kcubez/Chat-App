# Chat Application

This is a real-time chat application that supports text and image messages. The front-end is hosted on Amazon S3, and the server runs on an EC2 instance using Node.js, Express, Socket.io, and AWS SDK for handling image uploads to S3.

## Features

- Real-time chat functionality using Socket.io
- Supports text and image messages
- User nicknames
- Images stored on Amazon S3

## Prerequisites

- AWS Account
- Node.js installed on your machine
- AWS CLI configured with your credentials
- An S3 bucket and an EC2 instance

## Setup

### Front-end: Hosting on Amazon S3

1. **Create S3 Bucket**
    - Log in to your AWS Management Console.
    - Go to the S3 service.
    - Create a new bucket with a unique name.

2. **Upload `index.html`**
    - Upload your `index.html` file and any associated assets (CSS, JavaScript) to the bucket.
    - Set the appropriate permissions to make the files public.

3. **Enable Static Website Hosting**
    - Select your bucket, go to the "Properties" tab.
    - Under "Static website hosting," choose "Use this bucket to host a website."
    - Set `index.html` as the index document.
    - Note the endpoint URL provided.

## Back-end: Running on EC2

###  Launch EC2 Instance and Configure Security Group

- Log in to your AWS Management Console

### Navigate to EC2 Dashboard

- From the AWS Management Console, navigate to the EC2 Dashboard.

### Launch Instance

- Click on the `Launch Instance` button.

### Choose an Amazon Machine Image (AMI)

- Select an Ubuntu Server AMI (e.g., Ubuntu Server 20.04 LTS).

### Choose an Instance Type

- Select an instance type (e.g., t2.micro which is free tier eligible).

### Configure Instance

- Click "Next: Configure Instance Details".
Configure as per your needs, then click "Next: Add Storage".

### Add Storage

- Configure the storage as per your needs, then click "Next: Add Tags".

### Add Tags

- Optionally add tags for better organization, then click "Next: Configure Security Group".

### Configure Security Group

Create a new security group.
Add rules to allow inbound traffic:
- **SSH**: Port 22 from your IP (e.g., `0.0.0.0/0` or `YOUR_IP/32` for better security).
- **HTTP**: Port 80 (if you want to serve HTTP traffic, though your app uses port 3000).
- **Custom TCP Rule**: Port 3000 from `0.0.0.0/0` to allow access to your app running on port 3000.

#### Example Security Group Configuration:
```graphql
 Type         | Protocol | Port Range | Source      |
--------------|----------|------------|-------------|
| SSH          | TCP      | 22         | 0.0.0.0/0   |
| HTTP         | TCP      | 80         | 0.0.0.0/0   |
| Custom TCP   | TCP      | 3000       | 0.0.0.0/0   |
```
### Review and Launch

- Review the configuration and click "Launch".
Select an existing key pair or create a new key pair for SSH access, then click "Launch Instances".

### Wait for the Instance to Initialize

- Wait for the instance to reach the running state.

## SSH into Your EC2 Instance

### Get the Public DNS or IP Address

- From the EC2 Dashboard, select your instance.
Note the Public DNS (IPv4) or IPv4 Public IP.

### Open Terminal or Command Prompt

- On your local machine, open a terminal (or command prompt).

### Navigate to the Directory with Your Key Pair

- Navigate to the directory where your .pem key file is located.

### Connect to Your Instance via SSH

- Run the following command:

```bash
ssh -i /path/to/your-key-pair.pem ubuntu@your-public-dns
```
- Replace /path/to/your-key-pair.pem with the path to your key file and your-public-dns with the public DNS or IP address of your instance.

Example
```bash
ssh -i ~/path/to/my-key-pair.pem ubuntu@ec2-203-0-113-25.compute-1.amazonaws.com
```
- Accept the SSH Key Fingerprint
If prompted, type `yes` and press Enter.

### Install Node.js
    ```bash
    sudo apt update
    sudo apt install -y nodejs npm
    ```

### Clone the Repository
    ```bash
    git clone https://github.com/Kcubez/Chat-App.git
    cd Chat-App
    ```

### Install Dependencies
    ```bash
    npm install socket.io express aws-sdk multer multer-s3 dotenv
    ```

### Configure Environment Variables
    - Create a `.env` file in the root of your project and add your AWS credentials and bucket name.
    ```plaintext
    AWS_ACCESS_KEY_ID=your-access-key-id
    AWS_SECRET_ACCESS_KEY=your-secret-access-key
    AWS_REGION=your-region
    S3_BUCKET_NAME=your-bucket-name
    PORT=3000
    ```

### Start the Server
    ```bash
    node server.js
    ```

## Accessing the Application

- Open your browser and navigate to:

- ```(http://ec2-public-ip:3000)```
- Enter a nickname to join the chat.
- You should now be able to send text messages and upload images.

## Conclusion
By following the above steps, you will set up a real-time chat application with text and image message support, hosted on Amazon S3 and an EC2 instance. If you encounter any issues or have further questions, feel free to open an issue or contact to kcubez21@gmail.com.