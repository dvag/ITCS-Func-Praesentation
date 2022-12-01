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
        "pictureUrl": "https://stfuncitcsgolanent01.blob.core.windows.net/bilder/functions-png.PNG",
        "picturePos": "left",
        "text": [
            {
                "text": "Functions werden als SaaS angeboten",
                "type": "main"
            },
            {
                "text": "Functions sind für Linux und Windows verfügbar",
                "type": "main"
            },
            {
                "text": "Die Infrastruktur wird von Azure verwaltet",
                "type": "main"
            },
            {
                "text": "Verfügbare Bezahlmodelle",
                "type": "main"
            },
            {
                "text": "Consumptionplan -> Pay what you use",
                "type": "bullet"
            },
            {
                "text": "Premiumplan -> Worker sind permanent verfügbar",
                "type": "bullet"
            },
            {
                "text": "Das Ressourcenmanagement wird von Azure übernommen",
                "type": "main"
            },
            {
                "text": "Die Ressourcen werden automatisch skaliert",
                "type": "bullet"
            },
            {
                "text": "Das Routing übernimmt Azure",
                "type": "bullet"
            },
            {
                "text": "Deploymentslots für Hochverfügbarkeit / rollierende Deployments",
                "type": "bullet"
            }
            {
                "text": "Über Bindings können z.B. Datenbanken direkt angesprochen werden",
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