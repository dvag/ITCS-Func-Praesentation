import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = {
        "title": "Warum auf Functions wechseln",
        "language": "TypeScript",
        "plan": "Premium Plan",
        "chapter": "1",
        "side": "1",
        "pictureUrl": "https://www.evkircheschaafheim.de/wp-content/uploads/2014/09/Dummybild.jpg",
        "picturePos": "left",
        "text": [
            {
                "text": "Functions werden als SaaS angeboten",
                "type": "main"
            },
            {
                "text": "Für Linux und Windows verfügbar",
                "type": "main"
            },
            {
                "text": "Infrastruktur von Azure verwaltet",
                "type": "main"
            },
            {
                "text": "Consumptionplan -> Pay what you use",
                "type": "main"
            },
            {
                "text": "Ressourcen sind dabei nur kurz Online",
                "type": "bullet"
            },
            {
                "text": "Premiumplan -> Worker sind permanent verfügbar",
                "type": "main"
            },
            {
                "text": "Ressourcen werden automatisch skaliert",
                "type": "main"
            },
            {
                "text": "Routing übernimmt Azure",
                "type": "main"
            },
            {
                "text": "Deploymentslots für Hochverfügbarkeit / rollierende Deployments",
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