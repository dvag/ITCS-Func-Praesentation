import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = {
        "title": "Hands On: Request Funktion",
        "language": "TypeScript",
        "plan": "Standard Plan",
        "chapter": "1",
        "side": "1",
        "pictureUrl": "https://www.evkircheschaafheim.de/wp-content/uploads/2014/09/Dummybild.jpg",
        "picturePos": "left",
        "text": [
            {
                "text": "Funktionen werden Request und Response Objekt übergeben",
                "type": "main"
            },
            {
                "text": "Aus dem Request kommen:",
                "type": "main"
            },
            {
                "text": "Parameter (Path, Query)",
                "type": "bullet"
            },
            {
                "text": "Body",
                "type": "bullet"
            },
            {
                "text": "Response mittels fmt.Fprint()",
                "type": "bulet"
            }
        ]
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;