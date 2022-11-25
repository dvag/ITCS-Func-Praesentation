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
   
    @FunctionName("getStandardJava")
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
        response.setTitle("Hands on: Serverless Golang mit Azure Functions");
        response.setText(new Text[] {
                new Text("Die Inhalte werden per Functions geladen!", "main"),
                new Text("Unten Links seht ihr die Daten", "main"),
                new Text("Verschiedene Sprachen wurden verwendet:", "main"),
                new Text("Java", "bullet"),
                new Text("Typescript", "bullet"),
                new Text("Python", "bullet"),
                new Text("GoLang", "bullet"),
                new Text("Powershell", "bullet")
        });
        response.setPicturePos("left");
        response.setPictureUrl("https://www.jeffsblog.at/wp-content/uploads/2019/01/5-Windows-95-wallpaper.jpg");
        return response;
    }


}
