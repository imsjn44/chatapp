import amqplib from "amqplib";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const startSendOTPConsumer = async () => {
  try {
    const connection = await amqplib.connect({
      protocol: "amqp",
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      hostname: process.env.RABBITMQ_HOST,
    });
    const channel = await connection.createChannel();
    const queueName = "send-otp";
    await channel.assertQueue(queueName, { durable: true });
    console.log("Mail service started lisitening for an otp email");
    channel.consume(queueName, async (msg) => {
      if (msg) {
        try {
          const { to, subject, body } = JSON.parse(msg.content.toString());

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.USER,
              pass: process.env.PASSWORD,
            },
          });
          await transporter.sendMail({
            from: "Chat App",
            to,
            subject,
            text: body,
          });
          channel.ack(msg);
          console.log(`OTP mail send to ${to}`);
        } catch (error) {
          console.log("Failed to send otp");
        }
      }
    });
  } catch (error) {
    console.log("Failed to start rabbitMQ consumer");
  }
};
