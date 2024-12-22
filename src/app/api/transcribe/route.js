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
    const result = transcribeClient.send(transciptionCommand);
}

async function getJob(fileName){
    const jobStatusCommand = new GetTranscriptionJobCommand({TranscriptionJobName : fileName});
    const transcribeClient = getClient();
    let jobStatusResult = null;
    try{
        jobStatusResult = transcribeClient.send(jobStatusCommand);
    }catch(err){

    }

    return jobStatusResult
    
}
export async function GET(req){
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const fileName = (searchParams.get('filename'));

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