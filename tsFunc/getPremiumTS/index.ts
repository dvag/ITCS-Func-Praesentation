import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = {
        "title": "Hier kommt ein Titel",
        "language": "TypeScript",
        "plan": "Premium Plan",
        "chapter": "1",
        "side": "1",
        "pictureUrl": "https://www.evkircheschaafheim.de/wp-content/uploads/2014/09/Dummybild.jpg",
        "picturePos": "left",
        "text": [
            {
                "text": "Dies ist Text Nr 1",
                "type": "main"
            },
            {
                "text": "Dies ist Text Nr 2",
                "type": "bullet"
            },
        ]
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;