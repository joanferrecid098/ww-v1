# WhatsApp Anonymous Messaging Bot

## IMPORTANT NOTE: THIS PROJECT WAS MADE FOR FUN AND IS OPEN TO VULNERABILITIES. It was made with a un-official package for the WhatsApp API.

Make your friends hate you by making your WhatsApp account say anything from anyone. There is basically a React website where you write any message you want in any of the defined group chats, and the device that scanned the QR code will send it.

## Requirements
- Node.js (version X.X.X)
- NPM (version X.X.X)
- WhatsApp account

## Installation

1. Clone the repository to your local machine.
``git clone https://github.com/joanferrecid098/ww-v1.git``

2. Navigate to the project root directory.

``cd frontend
npm install``

``cd ../backend
npm install``

5. Start the frontend.

``cd ../frontend
npm start``

6. Build the server.

``cd ../backend
npm build``

7. Install serve

``npm install -g serve``

8. Start the server

``serve -s build``

9. Open your browser and navigate to ``http://localhost:3000`` to access the WhatsApp anonymous messaging web interface.

10. (optional) If you want to make it accesible by anyone, you can port forward the port 3000 from the machine you are hosting it on.

## Configuration

1. In the ``backend`` directory, edit the ``config.yml`` file and set the `groups` value:

Change from:
```
groups: []
```

To

```
groups:
  - display: "[THE NAME YOU WANT TO DISPLAY IN THE WEBSITE]"
    name: "[THE *EXACT* NAME OF THE GROUP]"
```

## Usage

1. Scan the QR code using the WhatsApp app on your phone.
   - Open the WhatsApp app on your phone.
   - Go to Settings > WhatsApp Web/Desktop.
   - Scan the QR code displayed on the web interface.

2. Once you've successfully scanned the QR code, you can start sending anonymous messages to groups.
   - Type your message in the input field provided.
   - Select the group to which you want to send the message.
   - Click the "Send" button to send the message anonymously.

## Contributing

Contributions are welcome! If you have any improvements or new features to add, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your branch.
5. Create a pull request to merge your branch into the main repository.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute it as per your needs.

## Disclaimer

This WhatsApp anonymous messaging bot is intended for educational and personal use only. Please use it responsibly and respect the privacy and guidelines of the WhatsApp platform. We do not endorse or promote any misuse of this bot, including spamming or sending inappropriate messages. Use it at your own risk.

Note: his project will receive updates very rarely (except contributions)