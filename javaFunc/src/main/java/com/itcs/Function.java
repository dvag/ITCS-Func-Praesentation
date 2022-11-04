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
public class Function {
    /**
     * This function listens at endpoint "/api/HttpExample". Two ways to invoke it using "curl" command in bash:
     * 1. curl -d "HTTP Body" {your host}/api/HttpExample
     * 2. curl "{your host}/api/HttpExample?name=HTTP%20Query"
     */
    @FunctionName("JavaStandard")
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
        response.setLanguage("Java");
        response.setPlan("Standard");
        response.setTitle("Teaser");
        response.setText(new Text[] {
                new Text("Lorem ipsum dolor sit amet, " +
                        "consetetur sadipscing elitr, " +
                        "sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, " +
                        "sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " +
                        "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. " +
                        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, " +
                        "sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, " +
                        "sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. " +
                        "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                        "main")
        });
        response.setPicturePos("");
        response.setPictureUrl("");
        return response;
    }


}
