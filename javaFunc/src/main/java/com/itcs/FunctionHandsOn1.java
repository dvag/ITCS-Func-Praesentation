package com.itcs;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;

import java.util.Optional;

/**
 * Azure Functions with HTTP Trigger.
 */
public class FunctionStandard {
   
    @FunctionName("getHandsOnJava1")
    public HttpResponseMessage run(
            @HttpTrigger(
                    name = "req",
                    methods = {HttpMethod.GET, HttpMethod.POST},
                    authLevel = AuthorizationLevel.ANONYMOUS)
            HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");
        return request.createResponseBuilder(HttpStatus.OK).body(createTeaserResponse()).build();
    }

    public Response createTeaserResponse() {
        var response = new Response();
        response.setChapter(1);
        response.setSide(1);
        response.setLanguage("Java 11");
        response.setPlan("Standard");
        response.setTitle("Hands On: HTTP Server");
        response.setText(new Text[] {
                new Text("HTTP Server erstellen", "main"),
                new Text("Port wird von Azure generiert", "main"),
                new Text("Kann direkt aus Umgebungsvariable geladen werden", "main"),
                new Text("Endpunkte werden via HandleFunc() verknüpft", "bullet")
        });
        response.setPicturePos("left");
        response.setPictureUrl("https://www.jeffsblog.at/wp-content/uploads/2019/01/5-Windows-95-wallpaper.jpg");
        return response;
    }


}
