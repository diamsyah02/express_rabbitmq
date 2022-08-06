"use strict"

const amqp = require('amqplib/callback_api');
const log = require('@repositories/log.repository')


const productReceiver = () => {
    amqp.connect(`amqp://localhost`, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            // Dibuat array supaya bisa multi Exchange ke depannya
            const subscribedExchanges = ['Product'];
            for(let i = 0; i < subscribedExchanges.length; i++){
                channel.assertExchange(subscribedExchanges[i], 'fanout', {
                    durable: false
                });
                // Deklarasi antrian
                channel.assertQueue('', {
                    exclusive: true
                }, function(error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(` [*] Client waiting for messages in %s. To exit press CTRL+C`, q.queue);
                    channel.bindQueue(q.queue, subscribedExchanges[i], '');
                    /* Menerima message yang dikirimkan oleh sender RabbitMQ */
                    channel.consume(q.queue, async function(msg) {
                        if(msg.content) {
                            console.log(` [x] Client received: ${ msg.content.toString() } `);
                            // message yang diterima dari sender RabbitMQ, simpan ke table log
                            const save_log = await log.store(JSON.parse(msg.content.toString()))
                            console.log(`Insert to log = ${(save_log) ? 'success' : 'failed'}`)
                        }
                    }, {
                        noAck: true
                    });
                });
            }
        });
    });
}

module.exports = { productReceiver }