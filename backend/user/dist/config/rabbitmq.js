import amqplib from "amqplib";
let channel;
export const connectRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect({
            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST,
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
        });
        channel = await connection.createChannel();
        console.log("✅Rabbit MQ connected");
    }
    catch (error) {
        console.log("Failed to connect to rabbitmq", error);
    }
};
export const publishToQueue = async (queueName, message) => {
    if (!channel) {
        console.log("RabbitMQ channel not initialized");
        return;
    }
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
};
