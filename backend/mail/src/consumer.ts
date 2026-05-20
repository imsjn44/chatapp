import dotenv from "dotenv";
dotenv.config();
import amqplib from "amqplib";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!resend) {
  console.log(`RESEND_API_KEY not defined`);
}

export const startSendOTPConsumer = async () => {
  try {
    const connection = await amqplib.connect({
      protocol: "amqps",
      port: 443,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      hostname: process.env.RABBITMQ_HOST,
    });
    const channel = await connection.createChannel();
    const queueName = "send-otp";
    await channel.assertQueue(queueName, { durable: true });
    console.log("Mail service started listening for an OTP email");

    channel.consume(queueName, async (msg) => {
      if (msg) {
        try {
          const { to, subject, body } = JSON.parse(msg.content.toString());

          // Send via HTTP API instead of SMTP
          const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev", // Free tier requires this exact address
            to: to,
            subject: subject,
            text: body,
          });

          if (error) {
            console.error("Resend API Error:", error);
            return;
          }

          channel.ack(msg);
          console.log(`OTP mail sent successfully to ${to}. ID: ${data?.id}`);
        } catch (error) {
          console.error("Failed to process queue message:", error);
        }
      }
    });
  } catch (error) {
    console.error("Failed to start RabbitMQ consumer:", error);
  }
};
