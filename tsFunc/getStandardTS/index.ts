import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = {
        "title": "Was sind Azure Functions?",
        "language": "TypeScript",
        "plan": "Standard Plan",
        "chapter": "1",
        "side": "1",
        "pictureUrl": "https://stfuncitcsgolanent01.blob.core.windows.net/bilder/functions-png.PNG",
        "picturePos": "left",
        "text": [
            {
                "text": "Serverless, ereignisbasierte Lösung von Microsoft",
                "type": "main"
            },
            {
                "text": "Ereignisse können sein:",
                "type": "main"
            },
            {
                "text": "HTTP Trigger",
                "type": "bullet"
            },
            {
                "text": "Queue",
                "type": "bullet"
            },
            {
                "text": "Zeittrigger (CRON)",
                "type": "bulet"
            },
            {
                "text": "Event Grid",
                "type": "bullet"
            },
            {
                "text": "Bei Auslösen:",
                "type": "main"
            },
            {
                "text": "Sourcen aus Blobstorage",
                "type": "bullet"
            },
            {
                "text": "Kudu Container wird gestartet",
                "type": "bullet"
            },
            {
                "text": "Werden nach gewisser Zeit wieder abgeräumt",
                "type": "bullet"
            }
        ]
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;