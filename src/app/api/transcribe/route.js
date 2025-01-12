import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient} from "@aws-sdk/client-transcribe";

function getClient(){
     return new TranscribeClient({
        region : "ap-south-1",
        credentials : {
            accessKeyId : process.env.AWS_ACCESS_KEY,
            secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
        }
    })
}

function getTranscriptionCommand(fileName){
    return new StartTranscriptionJobCommand({
        TranscriptionJobName : fileName,
        OutputBucketName : process.env.BUCKET_NAME,
        OutputKey : fileName + '.transcription',
        IdentifyLanguage : true,
        Media : {
            MediaFileUri : 's3://' + process.env.BUCKET_NAME + '/' + fileName
        }
    })
}

async function createJob(fileName){

    const transcribeClient = getClient();
    const transciptionCommand = getTranscriptionCommand(fileName);
    return transcribeClient.send(transciptionCommand);
}

async function getJob(fileName){
    const jobStatusCommand = new GetTranscriptionJobCommand({TranscriptionJobName : fileName});
    const transcribeClient = getClient();
    let jobStatusResult = null;
    try{
        jobStatusResult = await transcribeClient.send(jobStatusCommand);
    }catch(err){
    }
    if(jobStatusResult){
        return jobStatusResult;
    }
}

async function streamToString(stream){
    const chunks = [];
    return new Promise((resolve,reject) => {
        stream.on('data', (chunk) => {
            chunks.push(chunk);
        })
        stream.on('end', () => {
            resolve(Buffer.concat(chunks).toString('utf-8'));
        })
        stream.on('error', reject);
    })
}

async function getTranscriptionFile(fileName){
    const transcriptionFile = fileName + '.transcription';
    const s3Client = new S3Client({
            region : "ap-south-1",
            credentials : {
                accessKeyId : process.env.AWS_ACCESS_KEY,
                secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
            }
        })
    const getObjectCommand = new GetObjectCommand({
        Bucket : process.env.BUCKET_NAME,
        Key : transcriptionFile
    })
    let TranscriptionResponse = null;
    try{
        TranscriptionResponse = await s3Client.send(getObjectCommand);
    }catch(err){}

    if(TranscriptionResponse){
       return  JSON.parse(await streamToString(TranscriptionResponse.Body));
    }

    return null;
    
}
export async function GET(req){
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const fileName = (searchParams.get('filename'));


    const transcription = await getTranscriptionFile(fileName);
    if(transcription){
        return Response.json({
            'status' : 'COMPLETED',
            transcription
        });
    }

    const existingJob = await getJob(fileName);

    if(existingJob){
        return Response.json(existingJob.TranscriptionJob.TranscriptionJobStatus);
    }
    if(!existingJob){
        const newJob = await createJob(fileName)
        return Response.json({
            'status' : newJob.TranscriptionJob.TranscriptionJobStatus
        })
    }
    
    return Response.json('ok');
}