import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = {
        "title": "Hands On: Ansicht in Azure",
        "language": "TypeScript",
        "plan": "Standard Plan",
        "chapter": "1",
        "side": "1",
        "pictureUrl": "https://stfuncitcsgolanent01.blob.core.windows.net/bilder/function_portal.png",
        "picturePos": "left",
        "text": [
            {
                "text": "Functionen nach erfolgreichem Deployment in Azure einsehbar",
                "type": "main"
            }
        ]
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;