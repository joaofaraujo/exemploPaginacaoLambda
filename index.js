const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const params = {
        Bucket: "seubucketteste",
        Key: "arquivo.json",
    }; 
    try {
        var data = await s3.getObject(params).promise();
        var conteudo = JSON.parse(Buffer.from(data.Body).toString('utf8'));
        var paginacao = conteudo.slice((event.pagina -1) * event.limite, event.pagina * event.limite);
        return paginacao;
    } catch (err) {
        console.log(err);
        const message = `Error getting object.`;
        console.log(message);
        throw new Error(message);
    }
};
